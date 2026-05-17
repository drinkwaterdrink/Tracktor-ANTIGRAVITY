// src/shared.ts
var VERSION = "0.2.0";
var DEFAULT_SYSTEM_PROMPT = `You are a structured tracker extraction assistant. Analyze the conversation and return only tracker data that matches the requested schema. Do not roleplay, continue the scene, explain yourself, or include markdown unless the tracker format instructions explicitly ask for it. Preserve continuity with previous tracker snapshots, but update the tracker from the newest chat evidence.`;
var DEFAULT_EXTRACTION_PROMPT = `Create a complete tracker update for the target message. Fill every required field. If a field is not explicitly stated, infer a short, reasonable value from the conversation context. Keep values concise and concrete.`;
var DEFAULT_JSON_PROMPT_TEMPLATE = [
  "Return only one valid JSON object.",
  "Do not include markdown fences, commentary, or prose outside JSON.",
  "The object must conform to this JSON Schema:",
  "{{schema}}",
  "Example shape:",
  "{{example_response}}"
].join("\n\n");
var DEFAULT_XML_PROMPT_TEMPLATE = [
  "Return tracker data as valid JSON even if the model was asked for XML-style structure.",
  "Use this schema as the authority:",
  "{{schema}}"
].join("\n\n");
var DEFAULT_TOON_PROMPT_TEMPLATE = [
  "Return tracker data as valid JSON. Keep values compact like TOON, but the response must still parse as JSON.",
  "Use this schema as the authority:",
  "{{schema}}"
].join("\n\n");
var DEFAULT_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "SceneTracker",
  type: "object",
  properties: {
    time: {
      type: "string",
      description: "Current in-scene time, including date if known."
    },
    location: {
      type: "string",
      description: "Specific current location."
    },
    situation: {
      type: "string",
      description: "One sentence summary of what is currently happening."
    },
    mood: {
      type: "string",
      description: "Dominant emotional tone."
    },
    charactersPresent: {
      type: "array",
      description: "Names of characters currently present.",
      items: { type: "string" }
    },
    characters: {
      type: "array",
      description: "Visible state for each present character.",
      "x-tracktor-idKey": "name",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          appearance: { type: "string" },
          outfit: { type: "string" },
          posture: { type: "string" },
          notableState: { type: "string" }
        },
        required: ["name", "appearance", "outfit", "posture", "notableState"]
      }
    },
    openThreads: {
      type: "array",
      description: "Unresolved goals, tensions, promises, clues, or pending actions.",
      items: { type: "string" }
    }
  },
  required: ["time", "location", "situation", "mood", "charactersPresent", "characters", "openThreads"]
};
var DEFAULT_TEMPLATE_HTML = `
<section class="tracktor-card">
  <div class="tracktor-grid">
    <div><strong>Time</strong><span>{{data.time}}</span></div>
    <div><strong>Location</strong><span>{{data.location}}</span></div>
    <div><strong>Mood</strong><span>{{data.mood}}</span></div>
  </div>
  <p class="tracktor-situation">{{data.situation}}</p>
  <details>
    <summary>Details</summary>
    <p><strong>Present:</strong> {{join data.charactersPresent ', '}}</p>
    {{#each data.characters}}
      <div class="tracktor-character">
        <strong>{{name}}</strong>
        <span>{{appearance}}</span>
        <span>{{outfit}}</span>
        <span>{{posture}}</span>
        <span>{{notableState}}</span>
      </div>
    {{/each}}
    <p><strong>Open threads:</strong> {{join data.openThreads '; '}}</p>
  </details>
</section>
`.trim();
var defaultSchemaPresets = {
  scene: normalizeSchemaPreset({
    key: "scene",
    id: "scene",
    name: "Scene Tracker",
    description: "General roleplay scene state.",
    jsonSchema: DEFAULT_SCHEMA,
    schema: DEFAULT_SCHEMA,
    renderTemplate: DEFAULT_TEMPLATE_HTML,
    templateHtml: DEFAULT_TEMPLATE_HTML
  }, "scene")
};
var defaultSnapshotTransformPresets = {
  default_json: {
    key: "default_json",
    name: "Default JSON",
    input: "pretty_json",
    regexPattern: "",
    regexFlags: "",
    replacement: "",
    codeFenceLang: "json",
    wrapInCodeFence: true
  },
  minimal: {
    key: "minimal",
    name: "Minimal Lines",
    input: "top_level_lines",
    regexPattern: "",
    regexFlags: "",
    replacement: "",
    codeFenceLang: "",
    wrapInCodeFence: false
  },
  toon: {
    key: "toon",
    name: "TOON",
    input: "toon",
    regexPattern: "",
    regexFlags: "",
    replacement: "",
    codeFenceLang: "toon",
    wrapInCodeFence: true
  }
};
var defaultSettings = {
  version: VERSION,
  schemaPresets: structuredClone(defaultSchemaPresets),
  activeSchemaPresetKey: "scene",
  activeSchemaId: "scene",
  trackerConnectionId: null,
  trackerPresetId: null,
  autoMode: "none",
  sequentialGeneration: false,
  sequentialPartGeneration: false,
  maxResponseTokens: 4096,
  skipFirstMessages: 0,
  trackerContextMessageLimit: 12,
  includeLastMessages: 12,
  includeLastTrackers: 1,
  includeCharacterCardInTrackerPrompt: false,
  trackerConversationRoleMode: "preserve",
  structuredOutputMode: "json_prompt",
  generationMode: "json",
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  extractionPrompt: DEFAULT_EXTRACTION_PROMPT,
  trackerInstructionPrompt: DEFAULT_EXTRACTION_PROMPT,
  jsonPromptTemplate: DEFAULT_JSON_PROMPT_TEMPLATE,
  xmlPromptTemplate: DEFAULT_XML_PROMPT_TEMPLATE,
  toonPromptTemplate: DEFAULT_TOON_PROMPT_TEMPLATE,
  trackerSystemPromptSource: "saved_tracker_prompt",
  savedTrackerPromptId: null,
  injectTrackerSnapshots: true,
  trackerSnapshotCount: 1,
  snapshotRole: "system",
  injectAsVirtualCharacter: false,
  snapshotHeader: "Recent tracker snapshot",
  snapshotTransformPresetKey: "default_json",
  snapshotTransformPresets: structuredClone(defaultSnapshotTransformPresets),
  injection: {
    enabled: true,
    includeLastTrackers: 1,
    role: "system",
    header: "Recent tracker snapshot"
  },
  chatVariableExport: {
    enabled: true,
    key: "tracktor"
  },
  trackerWorldBookMode: "include_all",
  allowedWorldBookIds: [],
  allowedWorldBookEntryIds: [],
  debugLogging: false
};
function deepMergeSettings(input, schemaPresets) {
  const saved = isPlainObject(input) ? input : {};
  const merged = structuredClone(defaultSettings);
  assignKnown(merged, saved, [
    "version",
    "trackerConnectionId",
    "trackerPresetId",
    "maxResponseTokens",
    "skipFirstMessages",
    "trackerContextMessageLimit",
    "includeLastMessages",
    "includeLastTrackers",
    "includeCharacterCardInTrackerPrompt",
    "systemPrompt",
    "extractionPrompt",
    "trackerInstructionPrompt",
    "jsonPromptTemplate",
    "xmlPromptTemplate",
    "toonPromptTemplate",
    "trackerSystemPromptSource",
    "savedTrackerPromptId",
    "injectTrackerSnapshots",
    "trackerSnapshotCount",
    "injectAsVirtualCharacter",
    "snapshotHeader",
    "debugLogging"
  ]);
  merged.schemaPresets = sanitizeSchemaPresetMap(schemaPresets ?? saved.schemaPresets);
  merged.activeSchemaPresetKey = sanitizeId(readString(saved.activeSchemaPresetKey) || readString(saved.activeSchemaId) || merged.activeSchemaPresetKey) || "scene";
  merged.activeSchemaId = merged.activeSchemaPresetKey;
  merged.autoMode = normalizeAutoMode(saved.autoMode);
  merged.sequentialGeneration = readBool(saved.sequentialGeneration, readBool(saved.sequentialPartGeneration, merged.sequentialGeneration));
  merged.sequentialPartGeneration = merged.sequentialGeneration;
  merged.structuredOutputMode = normalizeStructuredOutputMode(saved.structuredOutputMode ?? saved.generationMode);
  merged.generationMode = merged.structuredOutputMode === "native_json_schema" ? "native_json" : "json";
  merged.trackerConversationRoleMode = normalizeEnum(saved.trackerConversationRoleMode, ["preserve", "all_assistant", "plain_transcript"], "preserve");
  merged.snapshotRole = normalizeEnum(saved.snapshotRole, ["system", "user", "assistant"], "system");
  merged.trackerWorldBookMode = normalizeEnum(saved.trackerWorldBookMode, ["include_all", "exclude_all", "allowlist"], "include_all");
  merged.snapshotTransformPresetKey = normalizeEnum(saved.snapshotTransformPresetKey, ["default_json", "minimal", "toon", "custom"], "default_json");
  merged.allowedWorldBookIds = sanitizeStringArray(saved.allowedWorldBookIds);
  merged.allowedWorldBookEntryIds = sanitizeStringArray(saved.allowedWorldBookEntryIds);
  if (saved.trackerContextMessageLimit === void 0 && saved.includeLastMessages !== void 0) {
    merged.trackerContextMessageLimit = saved.includeLastMessages;
  }
  if (saved.trackerInstructionPrompt === void 0 && typeof saved.extractionPrompt === "string") {
    merged.trackerInstructionPrompt = saved.extractionPrompt;
  }
  if (isPlainObject(saved.snapshotTransformPresets)) {
    merged.snapshotTransformPresets = {
      ...structuredClone(defaultSnapshotTransformPresets),
      ...sanitizeSnapshotTransformPresets(saved.snapshotTransformPresets)
    };
  }
  if (isPlainObject(saved.injection)) {
    const injection = saved.injection;
    merged.injectTrackerSnapshots = readBool(injection.enabled, merged.injectTrackerSnapshots);
    merged.trackerSnapshotCount = sanitizeInteger(injection.includeLastTrackers, merged.trackerSnapshotCount, 0, 25);
    merged.snapshotRole = normalizeEnum(injection.role, ["system", "user", "assistant"], merged.snapshotRole);
    merged.snapshotHeader = readString(injection.header) || merged.snapshotHeader;
  }
  if (isPlainObject(saved.chatVariableExport)) {
    assignKnown(merged.chatVariableExport, saved.chatVariableExport, ["enabled", "key"]);
  }
  merged.maxResponseTokens = sanitizeInteger(merged.maxResponseTokens, 4096, 1, 64e3);
  merged.skipFirstMessages = sanitizeInteger(merged.skipFirstMessages, 0, 0, 1e3);
  merged.trackerContextMessageLimit = sanitizeInteger(merged.trackerContextMessageLimit, merged.includeLastMessages, 0, 400);
  merged.includeLastMessages = merged.trackerContextMessageLimit;
  merged.includeLastTrackers = sanitizeInteger(merged.includeLastTrackers, 1, 0, 25);
  merged.trackerSnapshotCount = sanitizeInteger(merged.trackerSnapshotCount, 1, 0, 25);
  merged.injection = {
    enabled: merged.injectTrackerSnapshots,
    includeLastTrackers: merged.trackerSnapshotCount,
    role: merged.snapshotRole,
    header: merged.snapshotHeader
  };
  merged.chatVariableExport.enabled = readBool(merged.chatVariableExport.enabled, true);
  merged.chatVariableExport.key = sanitizeVariableKey(String(merged.chatVariableExport.key ?? "tracktor")) || "tracktor";
  merged.trackerConnectionId = normalizeNullableString(merged.trackerConnectionId);
  merged.trackerPresetId = normalizeNullableString(merged.trackerPresetId);
  merged.savedTrackerPromptId = normalizeNullableString(merged.savedTrackerPromptId);
  merged.trackerInstructionPrompt = merged.trackerInstructionPrompt || merged.extractionPrompt || DEFAULT_EXTRACTION_PROMPT;
  merged.extractionPrompt = merged.trackerInstructionPrompt;
  if (!merged.schemaPresets[merged.activeSchemaPresetKey]) {
    merged.activeSchemaPresetKey = Object.keys(merged.schemaPresets)[0] ?? "scene";
    merged.activeSchemaId = merged.activeSchemaPresetKey;
  }
  if (!merged.schemaPresets[merged.activeSchemaPresetKey]) {
    merged.schemaPresets = structuredClone(defaultSchemaPresets);
    merged.activeSchemaPresetKey = "scene";
    merged.activeSchemaId = "scene";
  }
  return merged;
}
function sanitizeSchemaPresetMap(input) {
  if (!isPlainObject(input)) return structuredClone(defaultSchemaPresets);
  const out = {};
  for (const [fallbackKey, value] of Object.entries(input)) {
    if (!isPlainObject(value)) continue;
    const preset = normalizeSchemaPreset(value, fallbackKey);
    if (preset) out[preset.key] = preset;
  }
  return Object.keys(out).length > 0 ? out : structuredClone(defaultSchemaPresets);
}
function normalizeSchemaPreset(input, fallbackKey = "schema") {
  const value = isPlainObject(input) ? input : {};
  const key = sanitizeId(readString(value.key) || readString(value.id) || fallbackKey) || sanitizeId(fallbackKey) || "schema";
  const schema = isPlainObject(value.jsonSchema) ? value.jsonSchema : isPlainObject(value.schema) ? value.schema : DEFAULT_SCHEMA;
  const template = readString(value.renderTemplate) || readString(value.templateHtml) || DEFAULT_TEMPLATE_HTML;
  const now = Date.now();
  return {
    id: key,
    key,
    name: readString(value.name) || key,
    description: readString(value.description) || void 0,
    schema,
    jsonSchema: schema,
    templateHtml: template,
    renderTemplate: template,
    createdAt: sanitizeInteger(value.createdAt, now, 0, Number.MAX_SAFE_INTEGER),
    updatedAt: sanitizeInteger(value.updatedAt, now, 0, Number.MAX_SAFE_INTEGER)
  };
}
function safePreview(value, max = 160) {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, Math.max(0, max - 1))}...`;
}
function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function stripDangerousHtml(html) {
  return html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "").replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "").replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "").replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "").replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, "");
}
function sanitizeId(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 64);
}
function sanitizeVariableKey(value) {
  return value.trim().replace(/[^a-zA-Z0-9_.-]+/g, "_").slice(0, 80);
}
function isPlainObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function sanitizeSnapshotTransformPresets(input) {
  const out = {};
  for (const [key, raw] of Object.entries(input)) {
    if (!isPlainObject(raw)) continue;
    const presetKey = normalizeEnum(raw.key ?? key, ["default_json", "minimal", "toon", "custom"], "custom");
    out[key] = {
      key: presetKey,
      name: readString(raw.name) || key,
      input: normalizeEnum(raw.input, ["pretty_json", "top_level_lines", "toon"], "pretty_json"),
      regexPattern: readString(raw.regexPattern),
      regexFlags: readString(raw.regexFlags),
      replacement: readString(raw.replacement),
      codeFenceLang: readString(raw.codeFenceLang),
      wrapInCodeFence: readBool(raw.wrapInCodeFence, presetKey !== "minimal")
    };
  }
  return out;
}
function normalizeAutoMode(value) {
  if (value === "off") return "none";
  if (value === "assistant_message") return "responses";
  if (value === "user_message") return "inputs";
  return normalizeEnum(value, ["none", "responses", "inputs", "both"], "none");
}
function normalizeStructuredOutputMode(value) {
  if (value === "native_json") return "native_json_schema";
  if (value === "json") return "json_prompt";
  return normalizeEnum(value, ["native_json_schema", "json_prompt", "xml_prompt", "toon_prompt"], "json_prompt");
}
function normalizeEnum(value, allowed, fallback) {
  return typeof value === "string" && allowed.includes(value) ? value : fallback;
}
function normalizeNullableString(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}
function sanitizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => typeof item === "string" && item.trim() ? [item.trim()] : []);
}
function readString(value) {
  return typeof value === "string" ? value : "";
}
function readBool(value, fallback) {
  return typeof value === "boolean" ? value : fallback;
}
function assignKnown(target, source, keys) {
  const writable = target;
  for (const key of keys) {
    if (source[key] !== void 0) writable[key] = source[key];
  }
}
function sanitizeInteger(value, fallback, min, max) {
  const parsed = typeof value === "number" ? value : Number.parseInt(String(value), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(parsed)));
}

// src/frontend.ts
var state;
var roots = [];
var ctxRef;
var lastKnownChatId = null;
var widgetCleanups = /* @__PURE__ */ new Map();
function setup(ctx) {
  ctxRef = ctx;
  const removeStyle = ctx.dom.addStyle(STYLES);
  const placement = createPlacement(ctx);
  const settingsRoot = tryCreateSettingsRoot(ctx);
  roots = uniqueRoots([placement.root, settingsRoot].filter((value) => !!value));
  roots.forEach((root) => root.classList.add("tracktor-root"));
  render();
  const openAction = ctx.ui?.registerInputBarAction?.({
    id: "open-tracktor",
    label: "Open Tracktor",
    enabled: true,
    iconSvg: TRACKTOR_SMALL_ICON
  });
  const unbindOpenAction = openAction?.onClick(() => {
    placement.activate();
    sendBackend({ type: "refresh_state" });
  });
  const inputAction = ctx.ui?.registerInputBarAction?.({
    id: "generate-latest-tracker",
    label: "Generate Latest Tracker",
    enabled: true,
    iconSvg: TRACKTOR_SMALL_ICON
  });
  const unbindInputAction = inputAction?.onClick(() => {
    sendBackend({ type: "generate_tracker" });
    placement.activate();
  });
  const toggleInjectionAction = ctx.ui?.registerInputBarAction?.({
    id: "toggle-tracktor-injection",
    label: "Toggle Tracker Injection",
    enabled: true,
    iconSvg: TRACKTOR_SMALL_ICON
  });
  const unbindToggleInjectionAction = toggleInjectionAction?.onClick(() => {
    sendBackend({ type: "toggle_injection" });
  });
  const unbindBackend = ctx.onBackendMessage((payload) => {
    if (payload?.type === "state") {
      state = payload.state;
      lastKnownChatId = state?.activeChat?.id ?? lastKnownChatId;
      placement.setBadge(state?.activeChat?.trackers.length ? String(state.activeChat.trackers.length) : null);
      render();
      renderMessageWidgets();
    } else if (payload?.type === "diagnostic") {
      if (!state) return;
      state.diagnostics = [String(payload.message ?? "Diagnostic"), ...state.diagnostics ?? []].slice(0, 12);
      render();
    } else if (payload?.type === "job_started" || payload?.type === "job_progress" || payload?.type === "job_finished" || payload?.type === "job_failed") {
      sendBackend({ type: "refresh_state" });
    }
  });
  const unbindActivate = placement.onActivate(() => {
    sendBackend({ type: "refresh_state" });
  });
  const eventCleanups = [
    "CHAT_CHANGED",
    "CHAT_SWITCHED",
    "MESSAGE_SENT",
    "MESSAGE_EDITED",
    "MESSAGE_DELETED",
    "MESSAGE_SWIPED",
    "GENERATION_ENDED"
  ].flatMap((eventName) => {
    if (!ctx.events?.on) return [];
    return [ctx.events.on(eventName, (payload) => {
      const chatId = readChatId(payload);
      if (typeof chatId !== "undefined") lastKnownChatId = chatId;
      sendBackend({ type: "refresh_state", chatId: chatId ?? lastKnownChatId ?? void 0 });
    })];
  });
  roots.forEach((root) => {
    root.addEventListener("click", handleClick);
    root.addEventListener("change", handleChange);
    root.addEventListener("input", handleInput);
  });
  sendBackend({ type: "ready" });
  return () => {
    roots.forEach((root) => {
      root.removeEventListener("click", handleClick);
      root.removeEventListener("change", handleChange);
      root.removeEventListener("input", handleInput);
    });
    roots = [];
    for (const cleanup of widgetCleanups.values()) cleanup();
    widgetCleanups.clear();
    unbindInputAction?.();
    inputAction?.destroy();
    unbindOpenAction?.();
    openAction?.destroy();
    unbindToggleInjectionAction?.();
    toggleInjectionAction?.destroy();
    unbindActivate();
    unbindBackend();
    eventCleanups.forEach((cleanup) => cleanup());
    placement.destroy();
    removeStyle();
    ctx.dom.cleanup();
  };
}
function createPlacement(ctx) {
  const drawerTab = tryCreateDrawerTab(ctx);
  if (drawerTab) {
    return {
      root: drawerTab.root,
      activate: drawerTab.activate,
      setBadge(text) {
        drawerTab.setBadge(text);
      },
      onActivate: drawerTab.onActivate,
      destroy() {
        drawerTab.destroy();
      }
    };
  }
  return createFallbackPanel(ctx);
}
function sendBackend(payload) {
  const chatId = payload.chatId ?? getActiveChatId();
  if (typeof chatId === "string" && chatId) {
    lastKnownChatId = chatId;
    ctxRef.sendToBackend({ ...payload, chatId });
    return;
  }
  ctxRef.sendToBackend(payload);
}
function getActiveChatId() {
  try {
    const active = ctxRef.getActiveChat?.();
    const chatId = active?.chatId ?? active?.id ?? lastKnownChatId ?? void 0;
    return typeof chatId === "string" && chatId ? chatId : void 0;
  } catch {
    return lastKnownChatId ?? void 0;
  }
}
function readChatId(payload) {
  if (!payload || typeof payload !== "object") return void 0;
  const obj = payload;
  if (typeof obj.chatId === "string") return obj.chatId;
  if (typeof obj.chat_id === "string") return obj.chat_id;
  if (obj.chatId === null || obj.chat_id === null) return null;
  const message = obj.message;
  if (message && typeof message === "object") {
    const nested = message;
    if (typeof nested.chatId === "string") return nested.chatId;
    if (typeof nested.chat_id === "string") return nested.chat_id;
  }
  return void 0;
}
function tryCreateDrawerTab(ctx) {
  if (typeof ctx.ui?.registerDrawerTab !== "function") {
    return void 0;
  }
  try {
    const tab = ctx.ui.registerDrawerTab({
      id: "tracktor",
      title: "Tracktor",
      shortName: "Track",
      headerTitle: "Tracktor",
      description: "Generate and manage structured chat trackers",
      keywords: ["tracker", "state", "schema", "ztracker"],
      iconSvg: TRACKTOR_ICON
    });
    return {
      root: tab.root,
      activate: () => tab.activate(),
      setBadge: (text) => tab.setBadge(text),
      onActivate: (handler) => tab.onActivate(handler),
      destroy: () => tab.destroy()
    };
  } catch (error) {
    console.warn("Tracktor: drawer tab registration failed, falling back to a fixed launcher panel.", error);
    return void 0;
  }
}
function createFallbackPanel(ctx) {
  const shell = injectHostElement(
    ctx,
    "body",
    `
      <div class="tracktor-fallback-shell">
        <button type="button" class="tracktor-floating-launcher" title="Open Tracktor">${TRACKTOR_SMALL_ICON}<span>Tracktor</span></button>
        <aside class="tracktor-fallback-panel" aria-hidden="true">
          <div class="tracktor-fallback-header">
            <strong>Tracktor</strong>
            <button type="button" class="tracktor-fallback-close" title="Close Tracktor">Close</button>
          </div>
          <div class="tracktor-fallback-body"></div>
        </aside>
      </div>
    `
  );
  const body = shell.querySelector(".tracktor-fallback-body");
  const launcher = shell.querySelector(".tracktor-floating-launcher");
  const close = shell.querySelector(".tracktor-fallback-close");
  if (!body) {
    throw new Error("Tracktor fallback panel failed to mount.");
  }
  const activateHandlers = /* @__PURE__ */ new Set();
  const activate = () => {
    shell.classList.add("is-open");
    shell.querySelector(".tracktor-fallback-panel")?.setAttribute("aria-hidden", "false");
    activateHandlers.forEach((handler) => handler());
  };
  const deactivate = () => {
    shell.classList.remove("is-open");
    shell.querySelector(".tracktor-fallback-panel")?.setAttribute("aria-hidden", "true");
  };
  launcher?.addEventListener("click", activate);
  close?.addEventListener("click", deactivate);
  return {
    root: body,
    activate,
    setBadge(text) {
      launcher?.setAttribute("data-tracktor-badge", text ?? "");
      launcher?.classList.toggle("has-tracktor-badge", !!text);
    },
    onActivate(handler) {
      activateHandlers.add(handler);
      return () => activateHandlers.delete(handler);
    },
    destroy() {
      launcher?.removeEventListener("click", activate);
      close?.removeEventListener("click", deactivate);
      shell.remove();
    }
  };
}
function tryCreateSettingsRoot(ctx) {
  if (typeof ctx.ui?.mount !== "function") {
    return void 0;
  }
  try {
    const mount = ctx.ui.mount("settings_extensions");
    mount.querySelector("[data-tracktor-settings-root]")?.remove();
    return injectHostElement(
      ctx,
      mount,
      '<section class="tracktor-settings-surface" data-tracktor-settings-root></section>'
    );
  } catch (error) {
    console.warn("Tracktor: extension settings mount failed.", error);
    return void 0;
  }
}
function uniqueRoots(values) {
  const seen = /* @__PURE__ */ new Set();
  const unique = [];
  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    unique.push(value);
  }
  return unique;
}
function injectHostElement(ctx, target, html, position = "beforeend") {
  if (typeof ctx.dom.inject === "function") {
    try {
      return ctx.dom.inject(target, html, position);
    } catch (error) {
      if (typeof target === "string") throw error;
      console.warn("Tracktor: DOM helper rejected an Element target, using direct host insertion.", error);
    }
  }
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  const element = template.content.firstElementChild;
  if (!element) {
    throw new Error("Tracktor failed to create host element.");
  }
  const parent = typeof target === "string" ? document.querySelector(target) : target;
  if (!parent) {
    throw new Error("Tracktor failed to find a host mount point.");
  }
  parent.insertAdjacentElement(position, element);
  return element;
}
function render() {
  if (roots.length === 0) return;
  for (const root of roots) {
    if (!state) {
      root.innerHTML = `
        <div class="tracktor-shell">
          ${renderHeader()}
          <section class="tracktor-section tracktor-toolbar">
            <div>
              <strong>Connecting to Tracktor</strong>
              <span>The backend state has not arrived yet. You can still refresh or open extension settings.</span>
            </div>
            <div class="tracktor-actions">
              <button type="button" data-action="refresh">Refresh</button>
              <button type="button" data-action="open-extension-settings">Extension Settings</button>
            </div>
          </section>
          <div class="tracktor-empty">Loading Tracktor state...</div>
          ${renderSettings(defaultSettings)}
          ${renderSchemaEditor(defaultSettings)}
        </div>
      `;
      continue;
    }
    root.innerHTML = `
      <div class="tracktor-shell">
        ${renderHeader()}
        ${renderStatus(state)}
        ${renderToolbar(state)}
        ${renderTrackers(state)}
        ${renderSettings(state.settings)}
        ${renderSchemaEditor(state.settings)}
      </div>
    `;
  }
}
function renderHeader() {
  return `
    <header class="tracktor-header">
      <div>
        <strong>Tracktor</strong>
        <span>Schema tracker snapshots for Lumiverse chats</span>
      </div>
      <div class="tracktor-tabs" aria-label="Tracktor sections">
        <span>Current</span>
        <span>Settings</span>
        <span>Schema</span>
        <span>Diagnostics</span>
      </div>
    </header>
  `;
}
function renderStatus(current) {
  const warnings = current.permissionWarnings.length ? `<div class="tracktor-warning">Grant permissions in Lumiverse Extensions: ${current.permissionWarnings.map(escapeHtml).join(", ")}</div>` : "";
  const error = current.lastError ? `<div class="tracktor-error">${escapeHtml(current.lastError)}</div>` : "";
  const jobs = current.jobs?.length ? `<div class="tracktor-busy">${current.jobs.map((job) => `${escapeHtml(job.label)}${job.totalParts ? ` ${job.currentPart ?? 0}/${job.totalParts}` : ""}`).join("<br>")}</div>` : current.busy ? '<div class="tracktor-busy">Working...</div>' : "";
  const diagnostics = current.diagnostics?.length ? `<details class="tracktor-diagnostics"><summary>Diagnostics</summary>${current.diagnostics.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</details>` : "";
  return `${warnings}${error}${jobs}${diagnostics}`;
}
function renderToolbar(current) {
  const chat = current.activeChat;
  return `
    <section class="tracktor-section tracktor-toolbar">
      <div>
        <strong>${escapeHtml(chat?.name ?? "No active chat")}</strong>
        <span>${chat ? `${chat.messageCount} messages, ${chat.trackers.length} trackers` : "Open a chat to generate trackers."}</span>
      </div>
      <div class="tracktor-actions">
        <button type="button" data-action="refresh">Refresh</button>
        <button type="button" data-action="generate-latest" ${chat && !current.busy ? "" : "disabled"}>Generate Tracker</button>
        <button type="button" data-action="generate-latest-sequential" ${chat && !current.busy ? "" : "disabled"}>Generate Sequential</button>
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
        ${trackers.map(renderTrackerItem).join("")}
      </div>
    </section>
  `;
}
function renderTrackerItem(item) {
  const partButtons = (item.snapshot.partsOrder ?? []).map((partKey) => `<button type="button" data-action="regenerate-part" data-chat-id="${escapeHtml(item.chatId)}" data-message-id="${escapeHtml(item.messageId)}" data-part-key="${escapeHtml(partKey)}">${escapeHtml(partKey)}</button>`).join("");
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
      ${partButtons ? `<details class="tracktor-parts"><summary>Regenerate section</summary><div class="tracktor-actions">${partButtons}</div></details>` : ""}
      <div class="tracktor-rendered">${stripDangerousHtml(item.tracker.renderedHtml)}</div>
    </article>
  `;
}
function renderSettings(settings) {
  return `
    <section class="tracktor-section">
      <h2>Settings</h2>
      <div class="tracktor-form-grid">
        <label>Structured output
          <select data-setting="structuredOutputMode">
            <option value="json_prompt" ${settings.structuredOutputMode === "json_prompt" ? "selected" : ""}>Prompted JSON</option>
            <option value="native_json_schema" ${settings.structuredOutputMode === "native_json_schema" ? "selected" : ""}>Native JSON schema</option>
            <option value="xml_prompt" ${settings.structuredOutputMode === "xml_prompt" ? "selected" : ""}>XML prompt fallback</option>
            <option value="toon_prompt" ${settings.structuredOutputMode === "toon_prompt" ? "selected" : ""}>TOON prompt fallback</option>
          </select>
        </label>
        <label>Auto mode
          <select data-setting="autoMode">
            <option value="none" ${settings.autoMode === "none" ? "selected" : ""}>None</option>
            <option value="responses" ${settings.autoMode === "responses" ? "selected" : ""}>Responses</option>
            <option value="inputs" ${settings.autoMode === "inputs" ? "selected" : ""}>Inputs</option>
            <option value="both" ${settings.autoMode === "both" ? "selected" : ""}>Both</option>
          </select>
        </label>
        <label>Tracker connection id
          <input data-setting="trackerConnectionId" value="${escapeHtml(settings.trackerConnectionId ?? "")}" placeholder="Use active connection">
        </label>
        <label>Tracker preset id
          <input data-setting="trackerPresetId" value="${escapeHtml(settings.trackerPresetId ?? "")}" placeholder="Optional">
        </label>
        <label>Recent messages
          <input data-setting="trackerContextMessageLimit" type="number" min="0" max="400" value="${settings.trackerContextMessageLimit}">
        </label>
        <label>Skip first messages
          <input data-setting="skipFirstMessages" type="number" min="0" max="1000" value="${settings.skipFirstMessages}">
        </label>
        <label>Tracker context
          <input data-setting="includeLastTrackers" type="number" min="0" max="25" value="${settings.includeLastTrackers}">
        </label>
        <label>Max response tokens
          <input data-setting="maxResponseTokens" type="number" min="1" max="64000" value="${settings.maxResponseTokens}">
        </label>
        <label class="tracktor-check">
          <input data-setting="sequentialGeneration" type="checkbox" ${settings.sequentialGeneration ? "checked" : ""}>
          Sequential part generation
        </label>
        <label class="tracktor-check">
          <input data-setting="injectTrackerSnapshots" type="checkbox" ${settings.injectTrackerSnapshots ? "checked" : ""}>
          Inject snapshots into normal generations
        </label>
        <label>Injected snapshots
          <input data-setting="trackerSnapshotCount" type="number" min="0" max="25" value="${settings.trackerSnapshotCount}">
        </label>
        <label>Injection role
          <select data-setting="snapshotRole">
            <option value="system" ${settings.snapshotRole === "system" ? "selected" : ""}>System</option>
            <option value="user" ${settings.snapshotRole === "user" ? "selected" : ""}>User</option>
            <option value="assistant" ${settings.snapshotRole === "assistant" ? "selected" : ""}>Assistant</option>
          </select>
        </label>
        <label>Conversation roles
          <select data-setting="trackerConversationRoleMode">
            <option value="preserve" ${settings.trackerConversationRoleMode === "preserve" ? "selected" : ""}>Preserve</option>
            <option value="all_assistant" ${settings.trackerConversationRoleMode === "all_assistant" ? "selected" : ""}>All assistant</option>
            <option value="plain_transcript" ${settings.trackerConversationRoleMode === "plain_transcript" ? "selected" : ""}>Plain transcript</option>
          </select>
        </label>
        <label>Snapshot transform
          <select data-setting="snapshotTransformPresetKey">
            <option value="default_json" ${settings.snapshotTransformPresetKey === "default_json" ? "selected" : ""}>Default JSON</option>
            <option value="minimal" ${settings.snapshotTransformPresetKey === "minimal" ? "selected" : ""}>Minimal</option>
            <option value="toon" ${settings.snapshotTransformPresetKey === "toon" ? "selected" : ""}>TOON</option>
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
        <textarea data-setting="trackerInstructionPrompt" rows="4">${escapeHtml(settings.trackerInstructionPrompt)}</textarea>
      </label>
      <div class="tracktor-actions">
        <button type="button" data-action="save-settings">Save Settings</button>
        <button type="button" data-action="restore-default-prompts">Restore Built-in Tracker Prompt</button>
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
          <select data-setting="activeSchemaPresetKey">
            ${presets.map((preset) => `<option value="${escapeHtml(preset.id)}" ${preset.id === active.id ? "selected" : ""}>${escapeHtml(preset.name)}</option>`).join("")}
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
        <button type="button" data-action="use-schema-for-chat" ${state?.activeChat ? "" : "disabled"}>Use For This Chat</button>
      </div>
    </section>
  `;
}
function handleClick(event) {
  const target = event.target;
  const button = target?.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "refresh") {
    sendBackend({ type: "refresh_state" });
  } else if (action === "open-extension-settings") {
    ctxRef.events?.emit?.("open-settings", { view: "extensions" });
  } else if (!state) {
    return;
  } else if (action === "generate-latest") {
    sendBackend({ type: "generate_tracker", chatId: state.activeChat?.id });
  } else if (action === "generate-latest-sequential") {
    sendBackend({ type: "generate_tracker", chatId: state.activeChat?.id, sequential: true });
  } else if (action === "regenerate") {
    sendBackend({ type: "regenerate_tracker", chatId: button.dataset.chatId, messageId: button.dataset.messageId });
  } else if (action === "regenerate-part") {
    sendBackend({ type: "regenerate_part", chatId: button.dataset.chatId, messageId: button.dataset.messageId, partKey: button.dataset.partKey });
  } else if (action === "edit") {
    openEditModal(button.dataset.chatId, button.dataset.messageId);
  } else if (action === "delete") {
    void confirmDelete(button.dataset.chatId, button.dataset.messageId);
  } else if (action === "save-settings") {
    saveSettingsFromDom();
  } else if (action === "restore-default-prompts") {
    restoreDefaultPrompts();
  } else if (action === "save-schema") {
    saveSchemaFromDom(getRootForAction(button));
  } else if (action === "use-schema-for-chat") {
    sendBackend({
      type: "set_chat_schema",
      chatId: state.activeChat?.id,
      schemaId: state.settings.activeSchemaPresetKey
    });
  }
}
function handleChange(event) {
  const target = event.target;
  if (!target?.dataset.setting || !state) return;
  applySettingValue(target);
  render();
}
function handleInput(event) {
  const target = event.target;
  if (!target?.dataset.setting || !state) return;
  applySettingValue(target);
}
function applySettingValue(target) {
  if (!state) return;
  const settings = state.settings;
  const path = target.dataset.setting.split(".");
  let owner = settings;
  for (const part of path.slice(0, -1)) {
    owner = owner[part];
  }
  const key = path[path.length - 1];
  if (target instanceof HTMLInputElement && target.type === "checkbox") {
    owner[key] = target.checked;
  } else if (target instanceof HTMLInputElement && target.type === "number") {
    owner[key] = Number.parseInt(target.value, 10);
  } else {
    owner[key] = target.value;
  }
}
function saveSettingsFromDom() {
  if (!state) return;
  ctxRef.sendToBackend({ type: "save_settings", settings: deepMergeSettings(state.settings) });
}
function restoreDefaultPrompts() {
  if (!state) return;
  state.settings.systemPrompt = DEFAULT_SYSTEM_PROMPT;
  state.settings.extractionPrompt = DEFAULT_EXTRACTION_PROMPT;
  state.settings.trackerInstructionPrompt = DEFAULT_EXTRACTION_PROMPT;
  ctxRef.sendToBackend({ type: "save_settings", settings: deepMergeSettings(state.settings) });
  render();
}
function saveSchemaFromDom(sourceRoot) {
  if (!state) return;
  const idInput = sourceRoot.querySelector('[data-schema-field="id"]');
  const nameInput = sourceRoot.querySelector('[data-schema-field="name"]');
  const schemaInput = sourceRoot.querySelector('[data-schema-field="schema"]');
  const templateInput = sourceRoot.querySelector('[data-schema-field="templateHtml"]');
  if (!idInput || !nameInput || !schemaInput || !templateInput) return;
  try {
    const id = sanitizeId(idInput.value) || "schema";
    const schema = JSON.parse(schemaInput.value);
    const settings = structuredClone(state.settings);
    settings.schemaPresets[id] = {
      id,
      key: id,
      name: nameInput.value.trim() || id,
      schema,
      jsonSchema: schema,
      templateHtml: templateInput.value,
      renderTemplate: templateInput.value,
      createdAt: state.settings.schemaPresets[id]?.createdAt ?? Date.now(),
      updatedAt: Date.now()
    };
    settings.activeSchemaPresetKey = id;
    settings.activeSchemaId = id;
    ctxRef.sendToBackend({ type: "save_settings", settings });
  } catch (error) {
    showErrorModal(error instanceof Error ? error.message : String(error));
  }
}
function getRootForAction(button) {
  return button.closest(".tracktor-root") ?? roots[0];
}
function openEditModal(chatId, messageId) {
  if (!state || !chatId || !messageId) return;
  const tracker = state.activeChat?.trackers.find((item) => item.chatId === chatId && item.messageId === messageId);
  if (!tracker) return;
  if (typeof ctxRef.ui?.showModal !== "function") {
    const next = window.prompt("Edit tracker JSON", JSON.stringify(tracker.tracker.data, null, 2));
    if (next === null) return;
    try {
      JSON.parse(next);
      sendBackend({ type: "edit_snapshot", chatId, messageId, data: next });
    } catch (error) {
      showErrorModal(error instanceof Error ? error.message : String(error));
    }
    return;
  }
  const modal = ctxRef.ui.showModal({ title: "Edit Tracker JSON", width: 720, maxHeight: 720 });
  modal.root.innerHTML = `
    <div class="tracktor-modal-body">
      <textarea class="tracktor-json-editor" spellcheck="false">${escapeHtml(JSON.stringify(tracker.tracker.data, null, 2))}</textarea>
      <div class="tracktor-actions">
        <button type="button" data-modal-action="save">Save</button>
        <button type="button" data-modal-action="cancel">Cancel</button>
      </div>
    </div>
  `;
  modal.root.addEventListener("click", (event) => {
    const action = event.target?.closest("[data-modal-action]");
    if (!action) return;
    if (action.dataset.modalAction === "cancel") {
      modal.dismiss();
      return;
    }
    const textarea = modal.root.querySelector(".tracktor-json-editor");
    if (!textarea) return;
    try {
      JSON.parse(textarea.value);
      sendBackend({ type: "edit_snapshot", chatId, messageId, data: textarea.value });
      modal.dismiss();
    } catch (error) {
      showErrorModal(error instanceof Error ? error.message : String(error));
    }
  });
}
async function confirmDelete(chatId, messageId) {
  if (!chatId || !messageId) return;
  const { confirmed } = typeof ctxRef.ui?.showConfirm === "function" ? await ctxRef.ui.showConfirm({
    title: "Delete Tracker",
    message: "Delete tracker data from this message?",
    variant: "danger",
    confirmLabel: "Delete"
  }) : { confirmed: window.confirm("Delete tracker data from this message?") };
  if (confirmed) {
    sendBackend({ type: "delete_snapshot", chatId, messageId });
  }
}
function showErrorModal(message) {
  if (typeof ctxRef.ui?.showModal !== "function") {
    window.alert(`Tracktor Error: ${message}`);
    return;
  }
  const modal = ctxRef.ui.showModal({ title: "Tracktor Error", width: 420, maxHeight: 320 });
  modal.root.innerHTML = `<p class="tracktor-error-text">${escapeHtml(message)}</p>`;
}
function renderMessageWidgets() {
  if (!ctxRef.messages) return;
  if (!state?.activeChat) {
    for (const cleanup of widgetCleanups.values()) cleanup();
    widgetCleanups.clear();
    return;
  }
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
    const cleanup = ctxRef.messages.renderWidget(
      {
        messageId: tracker.messageId,
        widgetId: "tracktor-tracker",
        html: buildWidgetHtml(tracker)
      },
      (message) => {
        if (message?.type === "regenerate") {
          sendBackend({ type: "regenerate_tracker", chatId: tracker.chatId, messageId: tracker.messageId });
        } else if (message?.type === "edit") {
          openEditModal(tracker.chatId, tracker.messageId);
        } else if (message?.type === "delete") {
          void confirmDelete(tracker.chatId, tracker.messageId);
        }
      }
    );
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
    <\/script>
  `;
}
var TRACKTOR_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 5h11a3 3 0 0 1 3 3v1h1.2a2 2 0 0 1 1.8 1.1l1 2V17h-2.1a3 3 0 0 1-5.8 0H10a3 3 0 0 1-5.8 0H2V7a2 2 0 0 1 2-2Zm0 2v8h.8a3 3 0 0 1 4.4 0H14V8a1 1 0 0 0-1-1H4Zm12 4v4h.8a3 3 0 0 1 1.6-.8h1.6v-1.7l-.7-1.5H16ZM7 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>';
var TRACKTOR_SMALL_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M4 5h11a3 3 0 0 1 3 3v1h1.2a2 2 0 0 1 1.8 1.1l1 2V17h-2.1a3 3 0 0 1-5.8 0H10a3 3 0 0 1-5.8 0H2V7a2 2 0 0 1 2-2Z"/></svg>';
var STYLES = `
  .tracktor-root { height: 100%; overflow: auto; color: var(--lumiverse-text); }
  .tracktor-settings-surface {
    min-height: 0;
    padding-block: 8px;
  }
  .tracktor-floating-launcher {
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 2147483000;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--lumiverse-border, #444);
    background: var(--lumiverse-fill-subtle, #202020);
    color: var(--lumiverse-text, #fff);
    border-radius: 999px;
    padding: 8px 11px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, .24);
    cursor: pointer;
    font: 12px/1 system-ui, sans-serif;
  }
  .tracktor-floating-launcher:hover { border-color: var(--lumiverse-border-hover, #777); }
  .tracktor-floating-launcher.has-tracktor-badge::after {
    content: attr(data-tracktor-badge);
    min-width: 16px;
    height: 16px;
    border-radius: 999px;
    display: inline-grid;
    place-items: center;
    padding: 0 4px;
    background: var(--lumiverse-accent, #58a6ff);
    color: var(--lumiverse-accent-fg, #fff);
    font-size: 10px;
    font-weight: 700;
  }
  .tracktor-fallback-panel {
    position: fixed;
    right: 16px;
    bottom: 58px;
    z-index: 2147482999;
    width: min(560px, calc(100vw - 24px));
    max-height: min(760px, calc(100vh - 84px));
    display: none;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--lumiverse-border, #444);
    background: var(--lumiverse-fill, #161616);
    color: var(--lumiverse-text, #fff);
    border-radius: 10px;
    box-shadow: 0 18px 48px rgba(0, 0, 0, .35);
  }
  .tracktor-fallback-shell.is-open .tracktor-fallback-panel { display: flex; }
  .tracktor-fallback-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px;
    border-bottom: 1px solid var(--lumiverse-border, #444);
  }
  .tracktor-fallback-close {
    border: 1px solid var(--lumiverse-border, #444);
    background: var(--lumiverse-fill-subtle, #202020);
    color: inherit;
    border-radius: 6px;
    padding: 5px 8px;
    cursor: pointer;
  }
  .tracktor-fallback-body {
    overflow: auto;
  }
  .tracktor-shell { display: flex; flex-direction: column; gap: 10px; padding: 10px; }
  .tracktor-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    border-bottom: 1px solid var(--lumiverse-border);
    padding-bottom: 10px;
  }
  .tracktor-header span {
    display: block;
    color: var(--lumiverse-text-muted);
    font-size: 11px;
    margin-top: 2px;
  }
  .tracktor-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: flex-end;
  }
  .tracktor-tabs span {
    border: 1px solid var(--lumiverse-border);
    border-radius: 6px;
    padding: 4px 6px;
    color: var(--lumiverse-text);
    background: var(--lumiverse-fill-subtle);
  }
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
  .tracktor-parts { margin: 7px 0; }
  .tracktor-parts summary { cursor: pointer; font-size: 12px; color: var(--lumiverse-text-muted); }
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
  .tracktor-diagnostics {
    border: 1px solid var(--lumiverse-border);
    background: var(--lumiverse-fill-subtle);
    border-radius: 8px;
    padding: 8px;
    font-size: 12px;
  }
  .tracktor-diagnostics p { margin: 6px 0 0; color: var(--lumiverse-text-muted); }
  .tracktor-modal-body { display: flex; flex-direction: column; gap: 8px; }
  .tracktor-json-editor { min-height: 420px; width: 100%; box-sizing: border-box; font: 12px/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  @media (max-width: 680px) {
    .tracktor-toolbar, .tracktor-item-head { flex-direction: column; align-items: stretch; }
    .tracktor-form-grid, .tracktor-grid { grid-template-columns: 1fr; }
  }
`;
export {
  setup
};
