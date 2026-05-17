import { deepMergeSettings, escapeHtml, safePreview, sanitizeId, stripDangerousHtml, } from './shared.js';
let state;
let root;
let ctxRef;
const widgetCleanups = new Map();
export function setup(ctx) {
    ctxRef = ctx;
    const removeStyle = ctx.dom.addStyle(STYLES);
    const tab = ctx.ui.registerDrawerTab({
        id: 'tracktor',
        title: 'Tracktor',
        shortName: 'Track',
        headerTitle: 'Tracktor',
        description: 'Generate and manage structured chat trackers',
        keywords: ['tracker', 'state', 'schema', 'ztracker'],
        iconSvg: TRACKTOR_ICON,
    });
    root = tab.root;
    root.classList.add('tracktor-root');
    const openAction = ctx.ui.registerInputBarAction?.({
        id: 'open-tracktor',
        label: 'Open Tracktor',
        enabled: true,
        iconSvg: TRACKTOR_SMALL_ICON,
    });
    const unbindOpenAction = openAction?.onClick(() => {
        tab.activate();
        ctx.sendToBackend({ type: 'get_state' });
    });
    const inputAction = ctx.ui.registerInputBarAction?.({
        id: 'generate-latest-tracker',
        label: 'Generate Latest Tracker',
        enabled: true,
        iconSvg: TRACKTOR_SMALL_ICON,
    });
    const unbindInputAction = inputAction?.onClick(() => {
        ctx.sendToBackend({ type: 'generate_tracker' });
        tab.activate();
    });
    const unbindBackend = ctx.onBackendMessage((payload) => {
        if (payload?.type === 'state') {
            state = payload.state;
            tab.setBadge(state?.activeChat?.trackers.length ? String(state.activeChat.trackers.length) : null);
            render();
            renderMessageWidgets();
        }
    });
    const unbindActivate = tab.onActivate(() => {
        ctx.sendToBackend({ type: 'get_state' });
    });
    root.addEventListener('click', handleClick);
    root.addEventListener('change', handleChange);
    root.addEventListener('input', handleInput);
    ctx.sendToBackend({ type: 'get_state' });
    return () => {
        root.removeEventListener('click', handleClick);
        root.removeEventListener('change', handleChange);
        root.removeEventListener('input', handleInput);
        for (const cleanup of widgetCleanups.values())
            cleanup();
        widgetCleanups.clear();
        unbindInputAction?.();
        inputAction?.destroy();
        unbindOpenAction?.();
        openAction?.destroy();
        unbindActivate();
        unbindBackend();
        tab.destroy();
        removeStyle();
        ctx.dom.cleanup();
    };
}
function render() {
    if (!root)
        return;
    if (!state) {
        root.innerHTML = '<div class="tracktor-empty">Loading Tracktor...</div>';
        return;
    }
    root.innerHTML = `
    <div class="tracktor-shell">
      ${renderStatus(state)}
      ${renderToolbar(state)}
      ${renderTrackers(state)}
      ${renderSettings(state.settings)}
      ${renderSchemaEditor(state.settings)}
    </div>
  `;
}
function renderStatus(current) {
    const warnings = current.permissionWarnings.length
        ? `<div class="tracktor-warning">Grant permissions in Lumiverse Extensions: ${current.permissionWarnings.map(escapeHtml).join(', ')}</div>`
        : '';
    const error = current.lastError ? `<div class="tracktor-error">${escapeHtml(current.lastError)}</div>` : '';
    const busy = current.busy ? '<div class="tracktor-busy">Working...</div>' : '';
    return `${warnings}${error}${busy}`;
}
function renderToolbar(current) {
    const chat = current.activeChat;
    return `
    <section class="tracktor-section tracktor-toolbar">
      <div>
        <strong>${escapeHtml(chat?.name ?? 'No active chat')}</strong>
        <span>${chat ? `${chat.messageCount} messages, ${chat.trackers.length} trackers` : 'Open a chat to generate trackers.'}</span>
      </div>
      <div class="tracktor-actions">
        <button type="button" data-action="refresh">Refresh</button>
        <button type="button" data-action="generate-latest" ${chat && !current.busy ? '' : 'disabled'}>Generate Latest</button>
        <button type="button" data-action="generate-latest-sequential" ${chat && !current.busy ? '' : 'disabled'}>Generate Sequential</button>
      </div>
    </section>
  `;
}
function renderTrackers(current) {
    const trackers = current.activeChat?.trackers ?? [];
    if (!current.activeChat) {
        return '<section class="tracktor-section"><h2>Trackers</h2><div class="tracktor-empty">No active chat.</div></section>';
    }
    if (trackers.length === 0) {
        return '<section class="tracktor-section"><h2>Trackers</h2><div class="tracktor-empty">No trackers yet. Generate one for the latest message to get started.</div></section>';
    }
    return `
    <section class="tracktor-section">
      <h2>Trackers</h2>
      <div class="tracktor-list">
        ${trackers.map(renderTrackerItem).join('')}
      </div>
    </section>
  `;
}
function renderTrackerItem(item) {
    return `
    <article class="tracktor-item" data-chat-id="${escapeHtml(item.chatId)}" data-message-id="${escapeHtml(item.messageId)}">
      <div class="tracktor-item-head">
        <div>
          <strong>${escapeHtml(item.tracker.schemaName)}</strong>
          <span>${escapeHtml(item.role)} message: ${escapeHtml(item.messagePreview || item.messageId)}</span>
        </div>
        <div class="tracktor-actions">
          <button type="button" data-action="regenerate" data-chat-id="${escapeHtml(item.chatId)}" data-message-id="${escapeHtml(item.messageId)}">Regenerate</button>
          <button type="button" data-action="edit" data-chat-id="${escapeHtml(item.chatId)}" data-message-id="${escapeHtml(item.messageId)}">Edit JSON</button>
          <button type="button" data-action="delete" data-chat-id="${escapeHtml(item.chatId)}" data-message-id="${escapeHtml(item.messageId)}">Delete</button>
        </div>
      </div>
      <div class="tracktor-rendered">${stripDangerousHtml(item.tracker.renderedHtml)}</div>
    </article>
  `;
}
function renderSettings(settings) {
    return `
    <section class="tracktor-section">
      <h2>Settings</h2>
      <div class="tracktor-form-grid">
        <label>Generation mode
          <select data-setting="generationMode">
            <option value="json" ${settings.generationMode === 'json' ? 'selected' : ''}>Prompted JSON</option>
            <option value="native_json" ${settings.generationMode === 'native_json' ? 'selected' : ''}>Native JSON schema</option>
          </select>
        </label>
        <label>Auto mode
          <select data-setting="autoMode">
            <option value="off" ${settings.autoMode === 'off' ? 'selected' : ''}>Off</option>
            <option value="assistant_message" ${settings.autoMode === 'assistant_message' ? 'selected' : ''}>After assistant messages</option>
            <option value="user_message" ${settings.autoMode === 'user_message' ? 'selected' : ''}>After user messages</option>
          </select>
        </label>
        <label>Recent messages
          <input data-setting="includeLastMessages" type="number" min="1" max="200" value="${settings.includeLastMessages}">
        </label>
        <label>Tracker context
          <input data-setting="includeLastTrackers" type="number" min="0" max="25" value="${settings.includeLastTrackers}">
        </label>
        <label>Max response tokens
          <input data-setting="maxResponseTokens" type="number" min="1" max="64000" value="${settings.maxResponseTokens}">
        </label>
        <label class="tracktor-check">
          <input data-setting="sequentialPartGeneration" type="checkbox" ${settings.sequentialPartGeneration ? 'checked' : ''}>
          Sequential part generation
        </label>
        <label class="tracktor-check">
          <input data-setting="injection.enabled" type="checkbox" ${settings.injection.enabled ? 'checked' : ''}>
          Inject snapshots into normal generations
        </label>
        <label>Injected snapshots
          <input data-setting="injection.includeLastTrackers" type="number" min="0" max="25" value="${settings.injection.includeLastTrackers}">
        </label>
        <label>Injection role
          <select data-setting="injection.role">
            <option value="system" ${settings.injection.role === 'system' ? 'selected' : ''}>System</option>
            <option value="user" ${settings.injection.role === 'user' ? 'selected' : ''}>User</option>
            <option value="assistant" ${settings.injection.role === 'assistant' ? 'selected' : ''}>Assistant</option>
          </select>
        </label>
        <label>Chat variable key
          <input data-setting="chatVariableExport.key" value="${escapeHtml(settings.chatVariableExport.key)}">
        </label>
      </div>
      <label>System prompt
        <textarea data-setting="systemPrompt" rows="5">${escapeHtml(settings.systemPrompt)}</textarea>
      </label>
      <label>Extraction prompt
        <textarea data-setting="extractionPrompt" rows="4">${escapeHtml(settings.extractionPrompt)}</textarea>
      </label>
      <div class="tracktor-actions">
        <button type="button" data-action="save-settings">Save Settings</button>
      </div>
    </section>
  `;
}
function renderSchemaEditor(settings) {
    const presets = Object.values(settings.schemaPresets);
    const active = settings.schemaPresets[settings.activeSchemaId] ?? presets[0];
    return `
    <section class="tracktor-section">
      <h2>Schema</h2>
      <div class="tracktor-form-grid">
        <label>Active preset
          <select data-setting="activeSchemaId">
            ${presets.map((preset) => `<option value="${escapeHtml(preset.id)}" ${preset.id === active.id ? 'selected' : ''}>${escapeHtml(preset.name)}</option>`).join('')}
          </select>
        </label>
        <label>Preset id
          <input data-schema-field="id" value="${escapeHtml(active.id)}">
        </label>
        <label>Preset name
          <input data-schema-field="name" value="${escapeHtml(active.name)}">
        </label>
      </div>
      <label>JSON schema
        <textarea data-schema-field="schema" rows="14" spellcheck="false">${escapeHtml(JSON.stringify(active.schema, null, 2))}</textarea>
      </label>
      <label>HTML template
        <textarea data-schema-field="templateHtml" rows="10" spellcheck="false">${escapeHtml(active.templateHtml)}</textarea>
      </label>
      <div class="tracktor-actions">
        <button type="button" data-action="save-schema">Save Schema Preset</button>
        <button type="button" data-action="use-schema-for-chat" ${state?.activeChat ? '' : 'disabled'}>Use For This Chat</button>
      </div>
    </section>
  `;
}
function handleClick(event) {
    const target = event.target;
    const button = target?.closest('[data-action]');
    if (!button || !state)
        return;
    const action = button.dataset.action;
    if (action === 'refresh') {
        ctxRef.sendToBackend({ type: 'get_state' });
    }
    else if (action === 'generate-latest') {
        ctxRef.sendToBackend({ type: 'generate_tracker', chatId: state.activeChat?.id });
    }
    else if (action === 'generate-latest-sequential') {
        ctxRef.sendToBackend({ type: 'generate_tracker', chatId: state.activeChat?.id, sequential: true });
    }
    else if (action === 'regenerate') {
        ctxRef.sendToBackend({ type: 'generate_tracker', chatId: button.dataset.chatId, messageId: button.dataset.messageId });
    }
    else if (action === 'edit') {
        openEditModal(button.dataset.chatId, button.dataset.messageId);
    }
    else if (action === 'delete') {
        void confirmDelete(button.dataset.chatId, button.dataset.messageId);
    }
    else if (action === 'save-settings') {
        saveSettingsFromDom();
    }
    else if (action === 'save-schema') {
        saveSchemaFromDom();
    }
    else if (action === 'use-schema-for-chat') {
        ctxRef.sendToBackend({
            type: 'set_chat_schema',
            chatId: state.activeChat?.id,
            schemaId: state.settings.activeSchemaId,
        });
    }
}
function handleChange(event) {
    const target = event.target;
    if (!target?.dataset.setting || !state)
        return;
    applySettingValue(target);
    render();
}
function handleInput(event) {
    const target = event.target;
    if (!target?.dataset.setting || !state)
        return;
    applySettingValue(target);
}
function applySettingValue(target) {
    if (!state)
        return;
    const settings = state.settings;
    const path = target.dataset.setting.split('.');
    let owner = settings;
    for (const part of path.slice(0, -1)) {
        owner = owner[part];
    }
    const key = path[path.length - 1];
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
        owner[key] = target.checked;
    }
    else if (target instanceof HTMLInputElement && target.type === 'number') {
        owner[key] = Number.parseInt(target.value, 10);
    }
    else {
        owner[key] = target.value;
    }
}
function saveSettingsFromDom() {
    if (!state)
        return;
    ctxRef.sendToBackend({ type: 'save_settings', settings: deepMergeSettings(state.settings) });
}
function saveSchemaFromDom() {
    if (!state)
        return;
    const idInput = root.querySelector('[data-schema-field="id"]');
    const nameInput = root.querySelector('[data-schema-field="name"]');
    const schemaInput = root.querySelector('[data-schema-field="schema"]');
    const templateInput = root.querySelector('[data-schema-field="templateHtml"]');
    if (!idInput || !nameInput || !schemaInput || !templateInput)
        return;
    try {
        const id = sanitizeId(idInput.value) || 'schema';
        const schema = JSON.parse(schemaInput.value);
        const settings = structuredClone(state.settings);
        settings.schemaPresets[id] = {
            id,
            name: nameInput.value.trim() || id,
            schema,
            templateHtml: templateInput.value,
        };
        settings.activeSchemaId = id;
        ctxRef.sendToBackend({ type: 'save_settings', settings });
    }
    catch (error) {
        showErrorModal(error instanceof Error ? error.message : String(error));
    }
}
function openEditModal(chatId, messageId) {
    if (!state || !chatId || !messageId)
        return;
    const tracker = state.activeChat?.trackers.find((item) => item.chatId === chatId && item.messageId === messageId);
    if (!tracker)
        return;
    const modal = ctxRef.ui.showModal({ title: 'Edit Tracker JSON', width: 720, maxHeight: 720 });
    modal.root.innerHTML = `
    <div class="tracktor-modal-body">
      <textarea class="tracktor-json-editor" spellcheck="false">${escapeHtml(JSON.stringify(tracker.tracker.data, null, 2))}</textarea>
      <div class="tracktor-actions">
        <button type="button" data-modal-action="save">Save</button>
        <button type="button" data-modal-action="cancel">Cancel</button>
      </div>
    </div>
  `;
    modal.root.addEventListener('click', (event) => {
        const action = event.target?.closest('[data-modal-action]');
        if (!action)
            return;
        if (action.dataset.modalAction === 'cancel') {
            modal.dismiss();
            return;
        }
        const textarea = modal.root.querySelector('.tracktor-json-editor');
        if (!textarea)
            return;
        try {
            JSON.parse(textarea.value);
            ctxRef.sendToBackend({ type: 'update_tracker', chatId, messageId, data: textarea.value });
            modal.dismiss();
        }
        catch (error) {
            showErrorModal(error instanceof Error ? error.message : String(error));
        }
    });
}
async function confirmDelete(chatId, messageId) {
    if (!chatId || !messageId)
        return;
    const { confirmed } = await ctxRef.ui.showConfirm({
        title: 'Delete Tracker',
        message: 'Delete tracker data from this message?',
        variant: 'danger',
        confirmLabel: 'Delete',
    });
    if (confirmed) {
        ctxRef.sendToBackend({ type: 'delete_tracker', chatId, messageId });
    }
}
function showErrorModal(message) {
    const modal = ctxRef.ui.showModal({ title: 'Tracktor Error', width: 420, maxHeight: 320 });
    modal.root.innerHTML = `<p class="tracktor-error-text">${escapeHtml(message)}</p>`;
}
function renderMessageWidgets() {
    if (!ctxRef.messages || !state?.activeChat)
        return;
    const activeIds = new Set(state.activeChat.trackers.map((item) => item.messageId));
    for (const [messageId, cleanup] of widgetCleanups.entries()) {
        if (!activeIds.has(messageId)) {
            cleanup();
            widgetCleanups.delete(messageId);
        }
    }
    for (const tracker of state.activeChat.trackers) {
        const existing = widgetCleanups.get(tracker.messageId);
        if (existing) {
            existing();
            widgetCleanups.delete(tracker.messageId);
        }
        const cleanup = ctxRef.messages.renderWidget({
            messageId: tracker.messageId,
            widgetId: 'tracktor-tracker',
            html: buildWidgetHtml(tracker),
        }, (message) => {
            if (message?.type === 'regenerate') {
                ctxRef.sendToBackend({ type: 'generate_tracker', chatId: tracker.chatId, messageId: tracker.messageId });
            }
            else if (message?.type === 'edit') {
                openEditModal(tracker.chatId, tracker.messageId);
            }
            else if (message?.type === 'delete') {
                void confirmDelete(tracker.chatId, tracker.messageId);
            }
        });
        widgetCleanups.set(tracker.messageId, cleanup);
    }
}
function buildWidgetHtml(item) {
    const rendered = stripDangerousHtml(item.tracker.renderedHtml);
    return `
    <style>
      body { margin: 0; color: var(--lumiverse-text, #e8e8e8); font: 13px/1.45 system-ui, sans-serif; }
      .wrap { border: 1px solid var(--lumiverse-border, #444); background: var(--lumiverse-fill-subtle, #1f1f1f); border-radius: 8px; padding: 10px; }
      .bar { display: flex; justify-content: space-between; gap: 8px; align-items: center; margin-bottom: 8px; }
      .title { font-weight: 650; }
      .meta { color: var(--lumiverse-text-muted, #aaa); font-size: 11px; }
      button { border: 1px solid var(--lumiverse-border, #444); background: var(--lumiverse-fill, #111); color: inherit; border-radius: 6px; padding: 4px 7px; cursor: pointer; }
      button:hover { border-color: var(--lumiverse-border-hover, #777); }
      .actions { display: flex; gap: 5px; flex-wrap: wrap; }
      table { width: 100%; border-collapse: collapse; }
      td { border-top: 1px solid var(--lumiverse-border, #444); padding: 4px 6px; vertical-align: top; }
      details { margin-top: 8px; }
      .tracktor-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
      .tracktor-grid div { border: 1px solid var(--lumiverse-border, #444); border-radius: 6px; padding: 6px; }
      .tracktor-grid strong, .tracktor-grid span, .tracktor-character span { display: block; }
      .tracktor-situation { margin: 8px 0; }
      .tracktor-character { border-top: 1px solid var(--lumiverse-border, #444); padding: 6px 0; }
    </style>
    <div class="wrap">
      <div class="bar">
        <div>
          <div class="title">${escapeHtml(item.tracker.schemaName)}</div>
          <div class="meta">${escapeHtml(safePreview(item.messagePreview, 80))}</div>
        </div>
        <div class="actions">
          <button data-action="regenerate">Regenerate</button>
          <button data-action="edit">Edit</button>
          <button data-action="delete">Delete</button>
        </div>
      </div>
      ${rendered}
    </div>
    <script>
      document.addEventListener('click', function (event) {
        var button = event.target.closest('[data-action]');
        if (!button) return;
        window.spindleSandbox.postMessage({ type: button.getAttribute('data-action') });
      });
      window.spindleSandbox.requestResize();
    </script>
  `;
}
const TRACKTOR_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 5h11a3 3 0 0 1 3 3v1h1.2a2 2 0 0 1 1.8 1.1l1 2V17h-2.1a3 3 0 0 1-5.8 0H10a3 3 0 0 1-5.8 0H2V7a2 2 0 0 1 2-2Zm0 2v8h.8a3 3 0 0 1 4.4 0H14V8a1 1 0 0 0-1-1H4Zm12 4v4h.8a3 3 0 0 1 1.6-.8h1.6v-1.7l-.7-1.5H16ZM7 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>';
const TRACKTOR_SMALL_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M4 5h11a3 3 0 0 1 3 3v1h1.2a2 2 0 0 1 1.8 1.1l1 2V17h-2.1a3 3 0 0 1-5.8 0H10a3 3 0 0 1-5.8 0H2V7a2 2 0 0 1 2-2Z"/></svg>';
const STYLES = `
  .tracktor-root { height: 100%; overflow: auto; color: var(--lumiverse-text); }
  .tracktor-shell { display: flex; flex-direction: column; gap: 10px; padding: 10px; }
  .tracktor-section { border-top: 1px solid var(--lumiverse-border); padding-top: 10px; }
  .tracktor-section:first-child { border-top: 0; padding-top: 0; }
  .tracktor-section h2 { font-size: 13px; margin: 0 0 8px; font-weight: 650; }
  .tracktor-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .tracktor-toolbar span, .tracktor-item-head span { display: block; color: var(--lumiverse-text-muted); font-size: 11px; margin-top: 2px; }
  .tracktor-actions { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
  .tracktor-actions button, .tracktor-section select, .tracktor-section input, .tracktor-section textarea {
    border: 1px solid var(--lumiverse-border);
    background: var(--lumiverse-fill);
    color: var(--lumiverse-text);
    border-radius: 6px;
  }
  .tracktor-actions button { padding: 6px 9px; cursor: pointer; }
  .tracktor-actions button:hover { border-color: var(--lumiverse-border-hover); }
  .tracktor-actions button:disabled { opacity: .45; cursor: default; }
  .tracktor-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .tracktor-section label { display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--lumiverse-text-muted); margin-bottom: 8px; }
  .tracktor-check { flex-direction: row !important; align-items: center; color: var(--lumiverse-text) !important; }
  .tracktor-section input, .tracktor-section select { min-height: 30px; padding: 4px 7px; }
  .tracktor-section textarea { width: 100%; resize: vertical; padding: 7px; font: 12px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; box-sizing: border-box; }
  .tracktor-list { display: flex; flex-direction: column; gap: 8px; }
  .tracktor-item { border: 1px solid var(--lumiverse-border); background: var(--lumiverse-fill-subtle); border-radius: 8px; padding: 9px; }
  .tracktor-item-head { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
  .tracktor-rendered { font-size: 12px; }
  .tracktor-rendered table { width: 100%; border-collapse: collapse; }
  .tracktor-rendered td { border-top: 1px solid var(--lumiverse-border); padding: 4px 6px; vertical-align: top; }
  .tracktor-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
  .tracktor-grid div { border: 1px solid var(--lumiverse-border); border-radius: 6px; padding: 6px; }
  .tracktor-grid strong, .tracktor-grid span, .tracktor-character span { display: block; }
  .tracktor-situation { margin: 8px 0; }
  .tracktor-character { border-top: 1px solid var(--lumiverse-border); padding: 6px 0; }
  .tracktor-warning, .tracktor-error, .tracktor-busy, .tracktor-empty {
    border: 1px solid var(--lumiverse-border);
    background: var(--lumiverse-fill-subtle);
    border-radius: 8px;
    padding: 8px;
    font-size: 12px;
  }
  .tracktor-warning { color: #d8a72d; }
  .tracktor-error, .tracktor-error-text { color: #e46c6c; }
  .tracktor-busy { color: var(--lumiverse-accent); }
  .tracktor-modal-body { display: flex; flex-direction: column; gap: 8px; }
  .tracktor-json-editor { min-height: 420px; width: 100%; box-sizing: border-box; font: 12px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  @media (max-width: 680px) {
    .tracktor-toolbar, .tracktor-item-head { flex-direction: column; align-items: stretch; }
    .tracktor-form-grid, .tracktor-grid { grid-template-columns: 1fr; }
  }
`;
