// Handlebars is the default template engine; the built-in renderer remains as the simple fallback.
import Handlebars from 'handlebars/dist/handlebars.js';
export const EXTENSION_ID = 'tracktor';
export const METADATA_KEY = 'tracktor';
export const SETTINGS_PATH = 'settings.json';
export const SCHEMA_PRESETS_PATH = 'schema-presets.json';
export const DIAGNOSTICS_PATH = 'diagnostics/latest.json';
export const VERSION = '0.3.1';
export const DEFAULT_SYSTEM_PROMPT = `You are a structured tracker extraction assistant. Analyze the conversation and return only tracker data that matches the requested schema. Do not roleplay, continue the scene, explain yourself, or include markdown unless the tracker format instructions explicitly ask for it. Preserve continuity with previous tracker snapshots, but update the tracker from the newest chat evidence.`;
export const DEFAULT_EXTRACTION_PROMPT = `Create a complete tracker update for the target message. Fill every required field. If a field is not explicitly stated, infer a short, reasonable value from the conversation context. Keep values concise and concrete.`;
export const DEFAULT_JSON_PROMPT_TEMPLATE = [
    'Return only one valid JSON object.',
    'Do not include markdown fences, commentary, or prose outside JSON.',
    'The object must conform to this JSON Schema:',
    '{{schema}}',
    'Example shape:',
    '{{example_response}}',
].join('\n\n');
export const DEFAULT_XML_PROMPT_TEMPLATE = [
    'Return tracker data as valid JSON even if the model was asked for XML-style structure.',
    'Use this schema as the authority:',
    '{{schema}}',
].join('\n\n');
export const DEFAULT_TOON_PROMPT_TEMPLATE = [
    'Return tracker data as valid JSON. Keep values compact like TOON, but the response must still parse as JSON.',
    'Use this schema as the authority:',
    '{{schema}}',
].join('\n\n');
export const DEFAULT_SCHEMA = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'SceneTracker',
    type: 'object',
    properties: {
        time: {
            type: 'string',
            description: 'Current in-scene time, including date if known.',
        },
        location: {
            type: 'string',
            description: 'Specific current location.',
        },
        situation: {
            type: 'string',
            description: 'One sentence summary of what is currently happening.',
        },
        mood: {
            type: 'string',
            description: 'Dominant emotional tone.',
        },
        charactersPresent: {
            type: 'array',
            description: 'Names of characters currently present.',
            items: { type: 'string' },
        },
        characters: {
            type: 'array',
            description: 'Visible state for each present character.',
            'x-tracktor-idKey': 'name',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    appearance: { type: 'string' },
                    outfit: { type: 'string' },
                    posture: { type: 'string' },
                    notableState: { type: 'string' },
                },
                required: ['name', 'appearance', 'outfit', 'posture', 'notableState'],
            },
        },
        openThreads: {
            type: 'array',
            description: 'Unresolved goals, tensions, promises, clues, or pending actions.',
            items: { type: 'string' },
        },
    },
    required: ['time', 'location', 'situation', 'mood', 'charactersPresent', 'characters', 'openThreads'],
};
export const DEFAULT_TEMPLATE_HTML = `
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
export const defaultSchemaPresets = {
    scene: normalizeSchemaPreset({
        key: 'scene',
        id: 'scene',
        name: 'Scene Tracker',
        description: 'General roleplay scene state.',
        jsonSchema: DEFAULT_SCHEMA,
        schema: DEFAULT_SCHEMA,
        renderTemplate: DEFAULT_TEMPLATE_HTML,
        templateHtml: DEFAULT_TEMPLATE_HTML,
        systemPrompt: DEFAULT_SYSTEM_PROMPT,
        extractionPrompt: DEFAULT_EXTRACTION_PROMPT,
        trackerInstructionPrompt: DEFAULT_EXTRACTION_PROMPT,
        jsonPromptTemplate: DEFAULT_JSON_PROMPT_TEMPLATE,
        xmlPromptTemplate: DEFAULT_XML_PROMPT_TEMPLATE,
        toonPromptTemplate: DEFAULT_TOON_PROMPT_TEMPLATE,
        templateEngine: 'handlebars',
    }, 'scene'),
};
export const defaultSnapshotTransformPresets = {
    default_json: {
        key: 'default_json',
        name: 'Default JSON',
        input: 'pretty_json',
        regexPattern: '',
        regexFlags: '',
        replacement: '',
        codeFenceLang: 'json',
        wrapInCodeFence: true,
    },
    minimal: {
        key: 'minimal',
        name: 'Minimal Lines',
        input: 'top_level_lines',
        regexPattern: '',
        regexFlags: '',
        replacement: '',
        codeFenceLang: '',
        wrapInCodeFence: false,
    },
    toon: {
        key: 'toon',
        name: 'TOON',
        input: 'toon',
        regexPattern: '',
        regexFlags: '',
        replacement: '',
        codeFenceLang: 'toon',
        wrapInCodeFence: true,
    },
};
export const defaultSettings = {
    version: VERSION,
    schemaPresets: structuredClone(defaultSchemaPresets),
    activeTrackerPresetKey: 'scene',
    activeSchemaPresetKey: 'scene',
    activeSchemaId: 'scene',
    trackerConnectionId: null,
    trackerPresetId: null,
    autoMode: 'none',
    sequentialGeneration: false,
    sequentialPartGeneration: false,
    maxResponseTokens: 4096,
    skipFirstMessages: 0,
    trackerContextMessageLimit: 12,
    includeLastMessages: 12,
    includeLastTrackers: 1,
    includeCharacterCardInTrackerPrompt: false,
    trackerConversationRoleMode: 'preserve',
    structuredOutputMode: 'json_prompt',
    generationMode: 'json',
    systemPrompt: DEFAULT_SYSTEM_PROMPT,
    extractionPrompt: DEFAULT_EXTRACTION_PROMPT,
    trackerInstructionPrompt: DEFAULT_EXTRACTION_PROMPT,
    jsonPromptTemplate: DEFAULT_JSON_PROMPT_TEMPLATE,
    xmlPromptTemplate: DEFAULT_XML_PROMPT_TEMPLATE,
    toonPromptTemplate: DEFAULT_TOON_PROMPT_TEMPLATE,
    trackerSystemPromptSource: 'saved_tracker_prompt',
    savedTrackerPromptId: null,
    injectTrackerSnapshots: true,
    trackerSnapshotCount: 1,
    snapshotRole: 'system',
    injectAsVirtualCharacter: false,
    snapshotHeader: 'Recent tracker snapshot',
    snapshotTransformPresetKey: 'default_json',
    snapshotTransformPresets: structuredClone(defaultSnapshotTransformPresets),
    injection: {
        enabled: true,
        includeLastTrackers: 1,
        role: 'system',
        header: 'Recent tracker snapshot',
    },
    chatVariableExport: {
        enabled: true,
        key: 'tracktor',
    },
    trackerWorldBookMode: 'include_all',
    allowedWorldBookIds: [],
    allowedWorldBookEntryIds: [],
    debugLogging: false,
    templateEngine: 'handlebars',
    trackerPlacement: 'message_bottom',
};
export function deepMergeSettings(input, schemaPresets) {
    const saved = isPlainObject(input) ? input : {};
    const merged = structuredClone(defaultSettings);
    assignKnown(merged, saved, [
        'version',
        'trackerConnectionId',
        'trackerPresetId',
        'maxResponseTokens',
        'skipFirstMessages',
        'trackerContextMessageLimit',
        'includeLastMessages',
        'includeLastTrackers',
        'includeCharacterCardInTrackerPrompt',
        'systemPrompt',
        'extractionPrompt',
        'trackerInstructionPrompt',
        'jsonPromptTemplate',
        'xmlPromptTemplate',
        'toonPromptTemplate',
        'trackerSystemPromptSource',
        'savedTrackerPromptId',
        'injectTrackerSnapshots',
        'trackerSnapshotCount',
        'injectAsVirtualCharacter',
        'snapshotHeader',
        'debugLogging',
    ]);
    merged.schemaPresets = sanitizeSchemaPresetMap(schemaPresets ?? saved.schemaPresets, merged);
    merged.activeTrackerPresetKey = sanitizeId(readString(saved.activeTrackerPresetKey)
        || readString(saved.activeSchemaPresetKey)
        || readString(saved.activeSchemaId)
        || merged.activeTrackerPresetKey) || 'scene';
    merged.activeSchemaPresetKey = merged.activeTrackerPresetKey;
    merged.activeSchemaId = merged.activeTrackerPresetKey;
    merged.autoMode = normalizeAutoMode(saved.autoMode);
    merged.sequentialGeneration = readBool(saved.sequentialGeneration, readBool(saved.sequentialPartGeneration, merged.sequentialGeneration));
    merged.sequentialPartGeneration = merged.sequentialGeneration;
    merged.structuredOutputMode = normalizeStructuredOutputMode(saved.structuredOutputMode ?? saved.generationMode);
    merged.generationMode = merged.structuredOutputMode === 'native_json_schema' ? 'native_json' : 'json';
    merged.trackerConversationRoleMode = normalizeEnum(saved.trackerConversationRoleMode, ['preserve', 'all_assistant', 'plain_transcript'], 'preserve');
    merged.templateEngine = normalizeTemplateEngine(saved.templateEngine);
    merged.trackerPlacement = normalizeEnum(saved.trackerPlacement, ['message_bottom', 'message_top', 'chat_top_pinned'], 'message_bottom');
    merged.snapshotRole = normalizeEnum(saved.snapshotRole, ['system', 'user', 'assistant'], 'system');
    merged.trackerWorldBookMode = normalizeEnum(saved.trackerWorldBookMode, ['include_all', 'exclude_all', 'allowlist'], 'include_all');
    merged.snapshotTransformPresetKey = normalizeEnum(saved.snapshotTransformPresetKey, ['default_json', 'minimal', 'toon', 'custom'], 'default_json');
    merged.allowedWorldBookIds = sanitizeStringArray(saved.allowedWorldBookIds);
    merged.allowedWorldBookEntryIds = sanitizeStringArray(saved.allowedWorldBookEntryIds);
    if (saved.trackerContextMessageLimit === undefined && saved.includeLastMessages !== undefined) {
        merged.trackerContextMessageLimit = saved.includeLastMessages;
    }
    if (saved.trackerInstructionPrompt === undefined && typeof saved.extractionPrompt === 'string') {
        merged.trackerInstructionPrompt = saved.extractionPrompt;
    }
    if (isPlainObject(saved.snapshotTransformPresets)) {
        merged.snapshotTransformPresets = {
            ...structuredClone(defaultSnapshotTransformPresets),
            ...sanitizeSnapshotTransformPresets(saved.snapshotTransformPresets),
        };
    }
    if (isPlainObject(saved.injection)) {
        const injection = saved.injection;
        merged.injectTrackerSnapshots = readBool(injection.enabled, merged.injectTrackerSnapshots);
        merged.trackerSnapshotCount = sanitizeInteger(injection.includeLastTrackers, merged.trackerSnapshotCount, 0, 25);
        merged.snapshotRole = normalizeEnum(injection.role, ['system', 'user', 'assistant'], merged.snapshotRole);
        merged.snapshotHeader = readString(injection.header) || merged.snapshotHeader;
    }
    if (isPlainObject(saved.chatVariableExport)) {
        assignKnown(merged.chatVariableExport, saved.chatVariableExport, ['enabled', 'key']);
    }
    merged.maxResponseTokens = sanitizeInteger(merged.maxResponseTokens, 4096, 1, 64000);
    merged.skipFirstMessages = sanitizeInteger(merged.skipFirstMessages, 0, 0, 1000);
    merged.trackerContextMessageLimit = sanitizeInteger(merged.trackerContextMessageLimit, merged.includeLastMessages, 0, 400);
    merged.includeLastMessages = merged.trackerContextMessageLimit;
    merged.includeLastTrackers = sanitizeInteger(merged.includeLastTrackers, 1, 0, 25);
    merged.trackerSnapshotCount = sanitizeInteger(merged.trackerSnapshotCount, 1, 0, 25);
    merged.injection = {
        enabled: merged.injectTrackerSnapshots,
        includeLastTrackers: merged.trackerSnapshotCount,
        role: merged.snapshotRole,
        header: merged.snapshotHeader,
    };
    merged.chatVariableExport.enabled = readBool(merged.chatVariableExport.enabled, true);
    merged.chatVariableExport.key = sanitizeVariableKey(String(merged.chatVariableExport.key ?? 'tracktor')) || 'tracktor';
    merged.trackerConnectionId = normalizeNullableString(merged.trackerConnectionId);
    merged.trackerPresetId = normalizeNullableString(merged.trackerPresetId);
    merged.savedTrackerPromptId = normalizeNullableString(merged.savedTrackerPromptId);
    merged.trackerInstructionPrompt = merged.trackerInstructionPrompt || merged.extractionPrompt || DEFAULT_EXTRACTION_PROMPT;
    merged.extractionPrompt = merged.trackerInstructionPrompt;
    if (!merged.schemaPresets[merged.activeTrackerPresetKey]) {
        merged.activeTrackerPresetKey = Object.keys(merged.schemaPresets)[0] ?? 'scene';
        merged.activeSchemaPresetKey = merged.activeTrackerPresetKey;
        merged.activeSchemaId = merged.activeTrackerPresetKey;
    }
    if (!merged.schemaPresets[merged.activeTrackerPresetKey]) {
        merged.schemaPresets = structuredClone(defaultSchemaPresets);
        merged.activeTrackerPresetKey = 'scene';
        merged.activeSchemaPresetKey = 'scene';
        merged.activeSchemaId = 'scene';
    }
    return merged;
}
export function settingsForStorage(settings) {
    const copy = structuredClone(settings);
    delete copy.schemaPresets;
    delete copy.activeSchemaId;
    delete copy.generationMode;
    delete copy.sequentialPartGeneration;
    delete copy.includeLastMessages;
    delete copy.injection;
    delete copy.extractionPrompt;
    return copy;
}
export function sanitizeSchemaPresetMap(input, promptDefaults = defaultSettings) {
    if (!isPlainObject(input))
        return structuredClone(defaultSchemaPresets);
    const out = {};
    for (const [fallbackKey, value] of Object.entries(input)) {
        if (!isPlainObject(value))
            continue;
        const preset = normalizeSchemaPreset(value, fallbackKey, promptDefaults);
        if (preset)
            out[preset.key] = preset;
    }
    return Object.keys(out).length > 0 ? out : structuredClone(defaultSchemaPresets);
}
export function normalizeSchemaPreset(input, fallbackKey = 'schema', promptDefaults = {}) {
    const value = isPlainObject(input) ? input : {};
    const key = sanitizeId(readString(value.key) || readString(value.id) || fallbackKey) || sanitizeId(fallbackKey) || 'schema';
    const schema = isPlainObject(value.jsonSchema)
        ? value.jsonSchema
        : isPlainObject(value.schema)
            ? value.schema
            : DEFAULT_SCHEMA;
    const template = readString(value.renderTemplate) || readString(value.templateHtml) || DEFAULT_TEMPLATE_HTML;
    const systemPrompt = readString(value.systemPrompt) || readString(promptDefaults.systemPrompt) || DEFAULT_SYSTEM_PROMPT;
    const trackerInstructionPrompt = readString(value.trackerInstructionPrompt)
        || readString(value.extractionPrompt)
        || readString(promptDefaults.trackerInstructionPrompt)
        || readString(promptDefaults.extractionPrompt)
        || DEFAULT_EXTRACTION_PROMPT;
    const now = Date.now();
    const preset = {
        id: key,
        key,
        name: readString(value.name) || key,
        description: readString(value.description) || undefined,
        schema: schema,
        jsonSchema: schema,
        templateHtml: template,
        renderTemplate: template,
        systemPrompt,
        extractionPrompt: trackerInstructionPrompt,
        trackerInstructionPrompt,
        jsonPromptTemplate: readString(value.jsonPromptTemplate) || readString(promptDefaults.jsonPromptTemplate) || DEFAULT_JSON_PROMPT_TEMPLATE,
        xmlPromptTemplate: readString(value.xmlPromptTemplate) || readString(promptDefaults.xmlPromptTemplate) || DEFAULT_XML_PROMPT_TEMPLATE,
        toonPromptTemplate: readString(value.toonPromptTemplate) || readString(promptDefaults.toonPromptTemplate) || DEFAULT_TOON_PROMPT_TEMPLATE,
        templateEngine: normalizeTemplateEngine(value.templateEngine ?? promptDefaults.templateEngine),
        createdAt: sanitizeInteger(value.createdAt, now, 0, Number.MAX_SAFE_INTEGER),
        updatedAt: sanitizeInteger(value.updatedAt, now, 0, Number.MAX_SAFE_INTEGER),
    };
    const outputMode = normalizeOptionalStructuredOutputMode(value.structuredOutputMode);
    if (outputMode)
        preset.structuredOutputMode = outputMode;
    return preset;
}
export function schemaPresetNeedsMigration(input) {
    if (!isPlainObject(input))
        return false;
    const requiredFields = [
        'systemPrompt',
        'trackerInstructionPrompt',
        'jsonPromptTemplate',
        'xmlPromptTemplate',
        'toonPromptTemplate',
    ];
    return Object.values(input).some((value) => (isPlainObject(value)
        && requiredFields.some((field) => typeof value[field] !== 'string' || !value[field])));
}
export function getSchemaPreset(settings, preferredId) {
    const key = preferredId && settings.schemaPresets[preferredId]
        ? preferredId
        : settings.activeTrackerPresetKey || settings.activeSchemaPresetKey;
    return settings.schemaPresets[key] ?? settings.schemaPresets[Object.keys(settings.schemaPresets)[0]];
}
export function getTopLevelSchemaKeys(schema) {
    const properties = schema.properties;
    if (!isPlainObject(properties))
        return [];
    return Object.keys(properties);
}
export function selectLatestSnapshotsByMessageOrder(messages, snapshots, limit) {
    if (limit <= 0 || snapshots.length === 0)
        return [];
    const messageIndex = new Map(messages.map((message, index) => [message.id, index]));
    return snapshots
        .filter((snapshot) => messageIndex.has(snapshot.messageId))
        .sort((a, b) => {
        const left = messageIndex.get(a.messageId) ?? 0;
        const right = messageIndex.get(b.messageId) ?? 0;
        return left - right;
    })
        .slice(-limit);
}
export function buildTopLevelPartSchema(schema, key) {
    const properties = isPlainObject(schema.properties) ? schema.properties : {};
    const property = properties[key];
    if (!property)
        throw new Error(`Unknown schema part: ${key}`);
    return {
        $schema: schema.$schema ?? 'http://json-schema.org/draft-07/schema#',
        title: `${String(schema.title ?? 'Tracker')}Part`,
        type: 'object',
        properties: { [key]: property },
        required: [key],
    };
}
export function schemaToExample(schema) {
    if (!isPlainObject(schema))
        return null;
    if ('example' in schema)
        return schema.example;
    if ('default' in schema)
        return schema.default;
    switch (schema.type) {
        case 'object': {
            const out = {};
            const properties = isPlainObject(schema.properties) ? schema.properties : {};
            for (const [key, value] of Object.entries(properties))
                out[key] = schemaToExample(value);
            return out;
        }
        case 'array':
            return [schemaToExample(schema.items)];
        case 'number':
        case 'integer':
            return 0;
        case 'boolean':
            return false;
        case 'string':
            return typeof schema.description === 'string' ? schema.description : 'string';
        default:
            return null;
    }
}
export function renderTrackerTemplate(templateHtml, data, options = {}) {
    const sanitizedTemplate = stripDangerousHtml(templateHtml);
    const templateEngine = options.templateEngine ?? 'handlebars';
    try {
        const rendered = templateEngine === 'simple'
            ? renderBuiltinTemplate(sanitizedTemplate, data, data)
            : renderHandlebarsTemplate(sanitizedTemplate, data, options.onWarning);
        return stripDangerousHtml(rendered);
    }
    catch (error) {
        options.onWarning?.(`Template rendering failed: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
    }
}
export function assertTrackerTemplateRenders(templateHtml, data, options = {}) {
    try {
        return renderTrackerTemplate(templateHtml, data, options);
    }
    catch (error) {
        const label = options.label ? `${options.label}: ` : '';
        throw new Error(`${label}Template render failed: ${error instanceof Error ? error.message : String(error)}`);
    }
}
export function testRenderTrackerPreset(preset, settings) {
    const engine = preset.templateEngine ?? settings?.templateEngine ?? 'handlebars';
    return assertTrackerTemplateRenders(preset.renderTemplate || preset.templateHtml, schemaToExample(preset.schema), {
        templateEngine: engine,
        label: `Tracker preset "${preset.name}" (${preset.key})`,
    });
}
export function getTemplateCompatibilityWarnings(templateHtml) {
    const warnings = [];
    if (/{{{\s*[\s\S]*?}}}/.test(templateHtml) || /{{&\s*[^}]+}}/.test(templateHtml)) {
        warnings.push('Template uses unescaped Handlebars output. Tracktor sanitizes rendered HTML, but normal {{...}} output is safer.');
    }
    return warnings;
}
export function snapshotToRecord(snapshot, preset) {
    const schema = preset?.schema ?? preset?.jsonSchema ?? {};
    const template = snapshot.renderTemplate || preset?.templateHtml || preset?.renderTemplate || '';
    const templateEngine = snapshot.templateEngine ?? preset?.templateEngine ?? 'handlebars';
    return {
        version: VERSION,
        snapshotId: snapshot.id,
        schemaId: snapshot.schemaPresetKey,
        schemaName: preset?.name ?? snapshot.schemaPresetKey,
        schema,
        templateHtml: template,
        templateEngine,
        data: snapshot.value,
        renderedHtml: safeRenderTracker(template, snapshot.value, { templateEngine }),
        updatedAt: new Date(snapshot.updatedAt).toISOString(),
        sourceMessageId: snapshot.messageId,
        pendingRedactions: snapshot.pendingRedactions,
    };
}
export function safeRenderTracker(templateHtml, data, options = {}) {
    try {
        return renderTrackerTemplate(templateHtml, data, options);
    }
    catch {
        return `<pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>`;
    }
}
export function formatTrackerSnapshot(record, header = 'Tracker', transform = defaultSnapshotTransformPresets.default_json) {
    const data = 'value' in record ? record.value : 'data' in record ? record.data : record;
    let body = formatSnapshotBody(data, transform.input);
    if (transform.regexPattern) {
        try {
            body = body.replace(new RegExp(transform.regexPattern, transform.regexFlags), transform.replacement);
        }
        catch {
            // Keep the base snapshot if a custom regex is invalid.
        }
    }
    const fenced = transform.wrapInCodeFence
        ? `\`\`\`${transform.codeFenceLang}\n${body}\n\`\`\``
        : body;
    return `${header}\n${fenced}`;
}
export function formatSnapshotBody(data, input) {
    if (input === 'top_level_lines' && isPlainObject(data)) {
        return Object.entries(data)
            .map(([key, value]) => `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`)
            .join('\n');
    }
    if (input === 'toon')
        return toToon(data);
    return JSON.stringify(data, null, 2);
}
export function safePreview(value, max = 160) {
    const compact = value.replace(/\s+/g, ' ').trim();
    if (compact.length <= max)
        return compact;
    return `${compact.slice(0, Math.max(0, max - 1))}...`;
}
export function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}
export function stripDangerousHtml(html) {
    return html
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
        .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
        .replace(/<iframe\b[^>]*\/?>/gi, '')
        .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, '')
        .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, '')
        .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, '')
        .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, '')
        .replace(/\s(href|src)\s*=\s*javascript:[^\s>]+/gi, '');
}
export function sanitizeId(value) {
    return value.trim().toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 64);
}
export function sanitizeVariableKey(value) {
    return value.trim().replace(/[^a-zA-Z0-9_.-]+/g, '_').slice(0, 80);
}
export function safeStorageKey(value) {
    const sanitized = value.replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 120);
    return sanitized || 'unknown';
}
export function chatConfigPath(chatId) {
    return `chats/${safeStorageKey(chatId)}.json`;
}
export function snapshotsPath(chatId) {
    return `snapshots/${safeStorageKey(chatId)}.json`;
}
export function jobsPath(chatId) {
    return `jobs/${safeStorageKey(chatId)}.json`;
}
export function isPlainObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}
function sanitizeSnapshotTransformPresets(input) {
    const out = {};
    for (const [key, raw] of Object.entries(input)) {
        if (!isPlainObject(raw))
            continue;
        const presetKey = normalizeEnum(raw.key ?? key, ['default_json', 'minimal', 'toon', 'custom'], 'custom');
        out[key] = {
            key: presetKey,
            name: readString(raw.name) || key,
            input: normalizeEnum(raw.input, ['pretty_json', 'top_level_lines', 'toon'], 'pretty_json'),
            regexPattern: readString(raw.regexPattern),
            regexFlags: readString(raw.regexFlags),
            replacement: readString(raw.replacement),
            codeFenceLang: readString(raw.codeFenceLang),
            wrapInCodeFence: readBool(raw.wrapInCodeFence, presetKey !== 'minimal'),
        };
    }
    return out;
}
function normalizeAutoMode(value) {
    if (value === 'off')
        return 'none';
    if (value === 'assistant_message')
        return 'responses';
    if (value === 'user_message')
        return 'inputs';
    return normalizeEnum(value, ['none', 'responses', 'inputs', 'both'], 'none');
}
function normalizeStructuredOutputMode(value) {
    if (value === 'native_json')
        return 'native_json_schema';
    if (value === 'json')
        return 'json_prompt';
    return normalizeEnum(value, ['native_json_schema', 'json_prompt', 'xml_prompt', 'toon_prompt'], 'json_prompt');
}
function normalizeTemplateEngine(value) {
    return normalizeEnum(value, ['handlebars', 'simple'], 'handlebars');
}
function normalizeOptionalStructuredOutputMode(value) {
    if (value === undefined || value === null || value === '')
        return undefined;
    return normalizeStructuredOutputMode(value);
}
function normalizeEnum(value, allowed, fallback) {
    return typeof value === 'string' && allowed.includes(value) ? value : fallback;
}
function normalizeNullableString(value) {
    if (typeof value !== 'string')
        return null;
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
}
function sanitizeStringArray(value) {
    if (!Array.isArray(value))
        return [];
    return value.flatMap((item) => typeof item === 'string' && item.trim() ? [item.trim()] : []);
}
function readString(value) {
    return typeof value === 'string' ? value : '';
}
function readBool(value, fallback) {
    return typeof value === 'boolean' ? value : fallback;
}
function assignKnown(target, source, keys) {
    const writable = target;
    for (const key of keys) {
        if (source[key] !== undefined)
            writable[key] = source[key];
    }
}
function sanitizeInteger(value, fallback, min, max) {
    const parsed = typeof value === 'number' ? value : Number.parseInt(String(value), 10);
    if (!Number.isFinite(parsed))
        return fallback;
    return Math.min(max, Math.max(min, Math.floor(parsed)));
}
const handlebarsRuntime = createHandlebarsRuntime();
function createHandlebarsRuntime() {
    try {
        const runtime = Handlebars.create();
        runtime.registerHelper('join', (value, separator) => {
            if (!Array.isArray(value))
                return '';
            const delimiter = typeof separator === 'string' ? separator : ', ';
            return value.map((item) => {
                if (item == null)
                    return '';
                return typeof item === 'object' ? JSON.stringify(item) : String(item);
            }).join(delimiter);
        });
        runtime.registerHelper('json', (value) => JSON.stringify(value, null, 2));
        return runtime;
    }
    catch {
        return null;
    }
}
function renderHandlebarsTemplate(template, data, onWarning) {
    if (!handlebarsRuntime) {
        onWarning?.('Handlebars runtime was unavailable; falling back to the simple template renderer.');
        return renderBuiltinTemplate(template, data, data);
    }
    const compiled = handlebarsRuntime.compile(template, {
        noEscape: false,
        strict: false,
    });
    const context = isPlainObject(data)
        ? { ...data, data }
        : { data };
    return compiled(context, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false,
    });
}
/**
 * Built-in safe template engine that handles the Handlebars subset used by
 * zTracker / WTracker templates without any external dependency.
 *
 * Supported syntax:
 *   {{data.x}}                    — escaped variable interpolation
 *   {{{data.x}}}                  — raw interpolation (still sanitized after render)
 *   {{#if data.x}}...{{/if}}      — conditional block
 *   {{#if data.x}}...{{else}}...{{/if}}
 *   {{#unless data.x}}...{{/unless}}
 *   {{#each data.arr}}...{{/each}} — iteration (supports nesting)
 *   {{this}}  / {{this.field}}     — current iteration item
 *   {{join data.arr ', '}}         — join array helper
 *   {{json data.x}}                — JSON pretty-print helper
 */
function renderBuiltinTemplate(template, scope, rootData) {
    return processTemplate(template, scope, rootData, 0);
}
const MAX_TEMPLATE_DEPTH = 32;
function processTemplate(template, scope, rootData, depth) {
    if (depth > MAX_TEMPLATE_DEPTH)
        return '<!-- template depth exceeded -->';
    let result = '';
    let pos = 0;
    while (pos < template.length) {
        // Find the next tag
        const tagStart = template.indexOf('{{', pos);
        if (tagStart === -1) {
            result += template.slice(pos);
            break;
        }
        // Output text before the tag
        result += template.slice(pos, tagStart);
        // Check for triple-stache {{{raw}}}
        if (template[tagStart + 2] === '{') {
            const tripleEnd = template.indexOf('}}}', tagStart + 3);
            if (tripleEnd === -1) {
                result += '{{{';
                pos = tagStart + 3;
                continue;
            }
            const inner = template.slice(tagStart + 3, tripleEnd).trim();
            const value = resolveTemplatePath(inner, scope, rootData);
            result += String(value ?? '');
            pos = tripleEnd + 3;
            continue;
        }
        const tagEnd = template.indexOf('}}', tagStart + 2);
        if (tagEnd === -1) {
            result += template.slice(tagStart);
            break;
        }
        const tagContent = template.slice(tagStart + 2, tagEnd).trim();
        pos = tagEnd + 2;
        // Block helpers: {{#each}}, {{#if}}, {{#unless}}
        const blockMatch = tagContent.match(/^#(each|if|unless)\s+(.+)$/);
        if (blockMatch) {
            const [, blockType, blockPath] = blockMatch;
            const { body, elseBody, endPos } = findBlockEnd(template, pos, blockType);
            pos = endPos;
            if (blockType === 'each') {
                const items = resolveTemplatePath(blockPath.trim(), scope, rootData);
                if (Array.isArray(items)) {
                    result += items.map((item) => processTemplate(body, item, rootData, depth + 1)).join('');
                }
                else if (elseBody !== undefined) {
                    result += processTemplate(elseBody, scope, rootData, depth + 1);
                }
            }
            else if (blockType === 'if') {
                const value = resolveTemplatePath(blockPath.trim(), scope, rootData);
                if (isTruthy(value)) {
                    result += processTemplate(body, scope, rootData, depth + 1);
                }
                else if (elseBody !== undefined) {
                    result += processTemplate(elseBody, scope, rootData, depth + 1);
                }
            }
            else if (blockType === 'unless') {
                const value = resolveTemplatePath(blockPath.trim(), scope, rootData);
                if (!isTruthy(value)) {
                    result += processTemplate(body, scope, rootData, depth + 1);
                }
                else if (elseBody !== undefined) {
                    result += processTemplate(elseBody, scope, rootData, depth + 1);
                }
            }
            continue;
        }
        // {{join path 'sep'}} helper
        const joinMatch = tagContent.match(/^join\s+(\S+)\s+(['"])(.*?)\2$/);
        if (joinMatch) {
            const value = resolveTemplatePath(joinMatch[1].trim(), scope, rootData);
            if (Array.isArray(value)) {
                result += escapeHtml(value.map((item) => typeof item === 'object' ? JSON.stringify(item) : String(item)).join(joinMatch[3]));
            }
            continue;
        }
        // {{json path}} helper
        const jsonMatch = tagContent.match(/^json\s+(.+)$/);
        if (jsonMatch) {
            const value = resolveTemplatePath(jsonMatch[1].trim(), scope, rootData);
            result += escapeHtml(JSON.stringify(value, null, 2));
            continue;
        }
        // {{variable}} — escaped interpolation
        if (/^[a-zA-Z0-9_.@-]+$/.test(tagContent) || tagContent === 'this') {
            result += escapeHtml(resolveTemplatePath(tagContent, scope, rootData));
            continue;
        }
        // Unknown tag — output as-is
        result += `{{${tagContent}}}`;
    }
    return result;
}
/**
 * Finds the matching {{/blockType}} for an opening block tag, correctly
 * handling nested blocks of the same type. Returns the body, optional else
 * body, and the position after the closing tag.
 */
function findBlockEnd(template, startPos, blockType) {
    const openTag = `{{#${blockType}`;
    const closeTag = `{{/${blockType}}}`;
    const elseTag = '{{else}}';
    let depth = 1;
    let pos = startPos;
    let elsePos;
    while (pos < template.length && depth > 0) {
        const nextOpen = template.indexOf(openTag, pos);
        const nextClose = template.indexOf(closeTag, pos);
        const nextElse = depth === 1 ? template.indexOf(elseTag, pos) : -1;
        // No closing tag found — treat rest as body
        if (nextClose === -1) {
            return { body: template.slice(startPos), elseBody: undefined, endPos: template.length };
        }
        // Check for else at current depth (before next open or close)
        if (nextElse !== -1 && (nextOpen === -1 || nextElse < nextOpen) && nextElse < nextClose && elsePos === undefined) {
            elsePos = nextElse;
        }
        // Opening tag comes first — increase depth
        if (nextOpen !== -1 && nextOpen < nextClose) {
            depth += 1;
            pos = nextOpen + openTag.length;
            continue;
        }
        // Closing tag
        depth -= 1;
        if (depth === 0) {
            const endPos = nextClose + closeTag.length;
            if (elsePos !== undefined) {
                return {
                    body: template.slice(startPos, elsePos),
                    elseBody: template.slice(elsePos + elseTag.length, nextClose),
                    endPos,
                };
            }
            return {
                body: template.slice(startPos, nextClose),
                elseBody: undefined,
                endPos,
            };
        }
        pos = nextClose + closeTag.length;
    }
    return { body: template.slice(startPos), elseBody: undefined, endPos: template.length };
}
function isTruthy(value) {
    if (value == null)
        return false;
    if (value === false)
        return false;
    if (value === 0)
        return false;
    if (value === '')
        return false;
    if (Array.isArray(value) && value.length === 0)
        return false;
    return true;
}
function resolveTemplatePath(path, scope, rootData) {
    if (path === 'this')
        return scope;
    if (path === 'data')
        return rootData;
    const parts = path.split('.').filter(Boolean);
    let current;
    if (parts[0] === 'data') {
        current = rootData;
        parts.shift();
    }
    else if (parts[0] === 'this') {
        current = scope;
        parts.shift();
    }
    else {
        current = scope;
    }
    for (const part of parts) {
        if (current == null)
            return '';
        if (Array.isArray(current)) {
            const index = Number.parseInt(part, 10);
            current = Number.isFinite(index) ? current[index] : undefined;
            continue;
        }
        if (!isPlainObject(current))
            return '';
        current = current[part];
    }
    return current ?? '';
}
function toToon(data, indent = '') {
    if (Array.isArray(data)) {
        return data.map((item, index) => `${indent}${index}: ${isPlainObject(item) || Array.isArray(item) ? `\n${toToon(item, `${indent}  `)}` : String(item)}`).join('\n');
    }
    if (isPlainObject(data)) {
        return Object.entries(data)
            .map(([key, value]) => `${indent}${key}: ${isPlainObject(value) || Array.isArray(value) ? `\n${toToon(value, `${indent}  `)}` : String(value)}`)
            .join('\n');
    }
    return String(data ?? '');
}
