// src/shared.ts
var METADATA_KEY = "tracktor";
var SETTINGS_PATH = "settings.json";
var SCHEMA_PRESETS_PATH = "schema-presets.json";
var DIAGNOSTICS_PATH = "diagnostics/latest.json";
var VERSION = "0.3.1";
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
    templateHtml: DEFAULT_TEMPLATE_HTML,
    systemPrompt: DEFAULT_SYSTEM_PROMPT,
    extractionPrompt: DEFAULT_EXTRACTION_PROMPT,
    trackerInstructionPrompt: DEFAULT_EXTRACTION_PROMPT,
    jsonPromptTemplate: DEFAULT_JSON_PROMPT_TEMPLATE,
    xmlPromptTemplate: DEFAULT_XML_PROMPT_TEMPLATE,
    toonPromptTemplate: DEFAULT_TOON_PROMPT_TEMPLATE,
    templateEngine: "handlebars"
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
  activeTrackerPresetKey: "scene",
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
  debugLogging: false,
  templateEngine: "handlebars",
  trackerPlacement: "message_bottom"
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
  merged.schemaPresets = sanitizeSchemaPresetMap(schemaPresets ?? saved.schemaPresets, merged);
  merged.activeTrackerPresetKey = sanitizeId(
    readString(saved.activeTrackerPresetKey) || readString(saved.activeSchemaPresetKey) || readString(saved.activeSchemaId) || merged.activeTrackerPresetKey
  ) || "scene";
  merged.activeSchemaPresetKey = merged.activeTrackerPresetKey;
  merged.activeSchemaId = merged.activeTrackerPresetKey;
  merged.autoMode = normalizeAutoMode(saved.autoMode);
  merged.sequentialGeneration = readBool(saved.sequentialGeneration, readBool(saved.sequentialPartGeneration, merged.sequentialGeneration));
  merged.sequentialPartGeneration = merged.sequentialGeneration;
  merged.structuredOutputMode = normalizeStructuredOutputMode(saved.structuredOutputMode ?? saved.generationMode);
  merged.generationMode = merged.structuredOutputMode === "native_json_schema" ? "native_json" : "json";
  merged.trackerConversationRoleMode = normalizeEnum(saved.trackerConversationRoleMode, ["preserve", "all_assistant", "plain_transcript"], "preserve");
  merged.templateEngine = normalizeTemplateEngine(saved.templateEngine);
  merged.trackerPlacement = normalizeEnum(saved.trackerPlacement, ["message_bottom", "message_top", "chat_top_pinned"], "message_bottom");
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
  if (!merged.schemaPresets[merged.activeTrackerPresetKey]) {
    merged.activeTrackerPresetKey = Object.keys(merged.schemaPresets)[0] ?? "scene";
    merged.activeSchemaPresetKey = merged.activeTrackerPresetKey;
    merged.activeSchemaId = merged.activeTrackerPresetKey;
  }
  if (!merged.schemaPresets[merged.activeTrackerPresetKey]) {
    merged.schemaPresets = structuredClone(defaultSchemaPresets);
    merged.activeTrackerPresetKey = "scene";
    merged.activeSchemaPresetKey = "scene";
    merged.activeSchemaId = "scene";
  }
  return merged;
}
function settingsForStorage(settings) {
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
function sanitizeSchemaPresetMap(input, promptDefaults = defaultSettings) {
  if (!isPlainObject(input)) return structuredClone(defaultSchemaPresets);
  const out = {};
  for (const [fallbackKey, value] of Object.entries(input)) {
    if (!isPlainObject(value)) continue;
    const preset = normalizeSchemaPreset(value, fallbackKey, promptDefaults);
    if (preset) out[preset.key] = preset;
  }
  return Object.keys(out).length > 0 ? out : structuredClone(defaultSchemaPresets);
}
function normalizeSchemaPreset(input, fallbackKey = "schema", promptDefaults = {}) {
  const value = isPlainObject(input) ? input : {};
  const key = sanitizeId(readString(value.key) || readString(value.id) || fallbackKey) || sanitizeId(fallbackKey) || "schema";
  const schema = isPlainObject(value.jsonSchema) ? value.jsonSchema : isPlainObject(value.schema) ? value.schema : DEFAULT_SCHEMA;
  const template = readString(value.renderTemplate) || readString(value.templateHtml) || DEFAULT_TEMPLATE_HTML;
  const systemPrompt = readString(value.systemPrompt) || readString(promptDefaults.systemPrompt) || DEFAULT_SYSTEM_PROMPT;
  const trackerInstructionPrompt = readString(value.trackerInstructionPrompt) || readString(value.extractionPrompt) || readString(promptDefaults.trackerInstructionPrompt) || readString(promptDefaults.extractionPrompt) || DEFAULT_EXTRACTION_PROMPT;
  const now = Date.now();
  const preset = {
    id: key,
    key,
    name: readString(value.name) || key,
    description: readString(value.description) || void 0,
    schema,
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
    updatedAt: sanitizeInteger(value.updatedAt, now, 0, Number.MAX_SAFE_INTEGER)
  };
  const outputMode = normalizeOptionalStructuredOutputMode(value.structuredOutputMode);
  if (outputMode) preset.structuredOutputMode = outputMode;
  return preset;
}
function schemaPresetNeedsMigration(input) {
  if (!isPlainObject(input)) return false;
  const requiredFields = [
    "systemPrompt",
    "trackerInstructionPrompt",
    "jsonPromptTemplate",
    "xmlPromptTemplate",
    "toonPromptTemplate"
  ];
  return Object.values(input).some((value) => isPlainObject(value) && requiredFields.some((field) => typeof value[field] !== "string" || !value[field]));
}
function getSchemaPreset(settings, preferredId) {
  const key = preferredId && settings.schemaPresets[preferredId] ? preferredId : settings.activeTrackerPresetKey || settings.activeSchemaPresetKey;
  return settings.schemaPresets[key] ?? settings.schemaPresets[Object.keys(settings.schemaPresets)[0]];
}
function getTopLevelSchemaKeys(schema) {
  const properties = schema.properties;
  if (!isPlainObject(properties)) return [];
  return Object.keys(properties);
}
function buildTopLevelPartSchema(schema, key) {
  const properties = isPlainObject(schema.properties) ? schema.properties : {};
  const property = properties[key];
  if (!property) throw new Error(`Unknown schema part: ${key}`);
  return {
    $schema: schema.$schema ?? "http://json-schema.org/draft-07/schema#",
    title: `${String(schema.title ?? "Tracker")}Part`,
    type: "object",
    properties: { [key]: property },
    required: [key]
  };
}
function schemaToExample(schema) {
  if (!isPlainObject(schema)) return null;
  if ("example" in schema) return schema.example;
  if ("default" in schema) return schema.default;
  switch (schema.type) {
    case "object": {
      const out = {};
      const properties = isPlainObject(schema.properties) ? schema.properties : {};
      for (const [key, value] of Object.entries(properties)) out[key] = schemaToExample(value);
      return out;
    }
    case "array":
      return [schemaToExample(schema.items)];
    case "number":
    case "integer":
      return 0;
    case "boolean":
      return false;
    case "string":
      return typeof schema.description === "string" ? schema.description : "string";
    default:
      return null;
  }
}
function renderTrackerTemplate(templateHtml, data, options = {}) {
  const sanitizedTemplate = stripDangerousHtml(templateHtml);
  try {
    const rendered = renderBuiltinTemplate(sanitizedTemplate, data, data);
    return stripDangerousHtml(rendered);
  } catch (error) {
    options.onWarning?.(`Template rendering failed: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}
function assertTrackerTemplateRenders(templateHtml, data, options = {}) {
  try {
    return renderTrackerTemplate(templateHtml, data, options);
  } catch (error) {
    const label = options.label ? `${options.label}: ` : "";
    throw new Error(`${label}Template render failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
function getTemplateCompatibilityWarnings(templateHtml) {
  const warnings = [];
  if (/{{{\s*[\s\S]*?}}}/.test(templateHtml) || /{{&\s*[^}]+}}/.test(templateHtml)) {
    warnings.push("Template uses unescaped Handlebars output. Tracktor sanitizes rendered HTML, but normal {{...}} output is safer.");
  }
  return warnings;
}
function snapshotToRecord(snapshot, preset) {
  const schema = preset?.schema ?? preset?.jsonSchema ?? {};
  const template = snapshot.renderTemplate || preset?.templateHtml || preset?.renderTemplate || "";
  const templateEngine = snapshot.templateEngine ?? preset?.templateEngine ?? "handlebars";
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
    pendingRedactions: snapshot.pendingRedactions
  };
}
function safeRenderTracker(templateHtml, data, options = {}) {
  try {
    return renderTrackerTemplate(templateHtml, data, options);
  } catch {
    return `<pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>`;
  }
}
function formatTrackerSnapshot(record, header = "Tracker", transform = defaultSnapshotTransformPresets.default_json) {
  const data = "value" in record ? record.value : "data" in record ? record.data : record;
  let body = formatSnapshotBody(data, transform.input);
  if (transform.regexPattern) {
    try {
      body = body.replace(new RegExp(transform.regexPattern, transform.regexFlags), transform.replacement);
    } catch {
    }
  }
  const fenced = transform.wrapInCodeFence ? `\`\`\`${transform.codeFenceLang}
${body}
\`\`\`` : body;
  return `${header}
${fenced}`;
}
function formatSnapshotBody(data, input) {
  if (input === "top_level_lines" && isPlainObject(data)) {
    return Object.entries(data).map(([key, value]) => `${key}: ${typeof value === "string" ? value : JSON.stringify(value)}`).join("\n");
  }
  if (input === "toon") return toToon(data);
  return JSON.stringify(data, null, 2);
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
  return html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "").replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "").replace(/<iframe\b[^>]*\/?>/gi, "").replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "").replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "").replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "").replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, "").replace(/\s(href|src)\s*=\s*javascript:[^\s>]+/gi, "");
}
function sanitizeId(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 64);
}
function sanitizeVariableKey(value) {
  return value.trim().replace(/[^a-zA-Z0-9_.-]+/g, "_").slice(0, 80);
}
function safeStorageKey(value) {
  const sanitized = value.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 120);
  return sanitized || "unknown";
}
function chatConfigPath(chatId) {
  return `chats/${safeStorageKey(chatId)}.json`;
}
function snapshotsPath(chatId) {
  return `snapshots/${safeStorageKey(chatId)}.json`;
}
function jobsPath(chatId) {
  return `jobs/${safeStorageKey(chatId)}.json`;
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
function normalizeTemplateEngine(value) {
  return normalizeEnum(value, ["handlebars", "simple"], "handlebars");
}
function normalizeOptionalStructuredOutputMode(value) {
  if (value === void 0 || value === null || value === "") return void 0;
  return normalizeStructuredOutputMode(value);
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
function renderBuiltinTemplate(template, scope, rootData) {
  return processTemplate(template, scope, rootData, 0);
}
var MAX_TEMPLATE_DEPTH = 32;
function processTemplate(template, scope, rootData, depth) {
  if (depth > MAX_TEMPLATE_DEPTH) return "<!-- template depth exceeded -->";
  let result = "";
  let pos = 0;
  while (pos < template.length) {
    const tagStart = template.indexOf("{{", pos);
    if (tagStart === -1) {
      result += template.slice(pos);
      break;
    }
    result += template.slice(pos, tagStart);
    if (template[tagStart + 2] === "{") {
      const tripleEnd = template.indexOf("}}}", tagStart + 3);
      if (tripleEnd === -1) {
        result += "{{{";
        pos = tagStart + 3;
        continue;
      }
      const inner = template.slice(tagStart + 3, tripleEnd).trim();
      const value = resolveTemplatePath(inner, scope, rootData);
      result += String(value ?? "");
      pos = tripleEnd + 3;
      continue;
    }
    const tagEnd = template.indexOf("}}", tagStart + 2);
    if (tagEnd === -1) {
      result += template.slice(tagStart);
      break;
    }
    const tagContent = template.slice(tagStart + 2, tagEnd).trim();
    pos = tagEnd + 2;
    const blockMatch = tagContent.match(/^#(each|if|unless)\s+(.+)$/);
    if (blockMatch) {
      const [, blockType, blockPath] = blockMatch;
      const { body, elseBody, endPos } = findBlockEnd(template, pos, blockType);
      pos = endPos;
      if (blockType === "each") {
        const items = resolveTemplatePath(blockPath.trim(), scope, rootData);
        if (Array.isArray(items)) {
          result += items.map((item) => processTemplate(body, item, rootData, depth + 1)).join("");
        } else if (elseBody !== void 0) {
          result += processTemplate(elseBody, scope, rootData, depth + 1);
        }
      } else if (blockType === "if") {
        const value = resolveTemplatePath(blockPath.trim(), scope, rootData);
        if (isTruthy(value)) {
          result += processTemplate(body, scope, rootData, depth + 1);
        } else if (elseBody !== void 0) {
          result += processTemplate(elseBody, scope, rootData, depth + 1);
        }
      } else if (blockType === "unless") {
        const value = resolveTemplatePath(blockPath.trim(), scope, rootData);
        if (!isTruthy(value)) {
          result += processTemplate(body, scope, rootData, depth + 1);
        } else if (elseBody !== void 0) {
          result += processTemplate(elseBody, scope, rootData, depth + 1);
        }
      }
      continue;
    }
    const joinMatch = tagContent.match(/^join\s+(\S+)\s+(['"])(.*?)\2$/);
    if (joinMatch) {
      const value = resolveTemplatePath(joinMatch[1].trim(), scope, rootData);
      if (Array.isArray(value)) {
        result += escapeHtml(value.map((item) => typeof item === "object" ? JSON.stringify(item) : String(item)).join(joinMatch[3]));
      }
      continue;
    }
    const jsonMatch = tagContent.match(/^json\s+(.+)$/);
    if (jsonMatch) {
      const value = resolveTemplatePath(jsonMatch[1].trim(), scope, rootData);
      result += escapeHtml(JSON.stringify(value, null, 2));
      continue;
    }
    if (/^[a-zA-Z0-9_.@-]+$/.test(tagContent) || tagContent === "this") {
      result += escapeHtml(resolveTemplatePath(tagContent, scope, rootData));
      continue;
    }
    result += `{{${tagContent}}}`;
  }
  return result;
}
function findBlockEnd(template, startPos, blockType) {
  const openTag = `{{#${blockType}`;
  const closeTag = `{{/${blockType}}}`;
  const elseTag = "{{else}}";
  let depth = 1;
  let pos = startPos;
  let elsePos;
  while (pos < template.length && depth > 0) {
    const nextOpen = template.indexOf(openTag, pos);
    const nextClose = template.indexOf(closeTag, pos);
    const nextElse = depth === 1 ? template.indexOf(elseTag, pos) : -1;
    if (nextClose === -1) {
      return { body: template.slice(startPos), elseBody: void 0, endPos: template.length };
    }
    if (nextElse !== -1 && (nextOpen === -1 || nextElse < nextOpen) && nextElse < nextClose && elsePos === void 0) {
      elsePos = nextElse;
    }
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      pos = nextOpen + openTag.length;
      continue;
    }
    depth -= 1;
    if (depth === 0) {
      const endPos = nextClose + closeTag.length;
      if (elsePos !== void 0) {
        return {
          body: template.slice(startPos, elsePos),
          elseBody: template.slice(elsePos + elseTag.length, nextClose),
          endPos
        };
      }
      return {
        body: template.slice(startPos, nextClose),
        elseBody: void 0,
        endPos
      };
    }
    pos = nextClose + closeTag.length;
  }
  return { body: template.slice(startPos), elseBody: void 0, endPos: template.length };
}
function isTruthy(value) {
  if (value == null) return false;
  if (value === false) return false;
  if (value === 0) return false;
  if (value === "") return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}
function resolveTemplatePath(path, scope, rootData) {
  if (path === "this") return scope;
  if (path === "data") return rootData;
  const parts = path.split(".").filter(Boolean);
  let current;
  if (parts[0] === "data") {
    current = rootData;
    parts.shift();
  } else if (parts[0] === "this") {
    current = scope;
    parts.shift();
  } else {
    current = scope;
  }
  for (const part of parts) {
    if (current == null) return "";
    if (Array.isArray(current)) {
      const index = Number.parseInt(part, 10);
      current = Number.isFinite(index) ? current[index] : void 0;
      continue;
    }
    if (!isPlainObject(current)) return "";
    current = current[part];
  }
  return current ?? "";
}
function toToon(data, indent = "") {
  if (Array.isArray(data)) {
    return data.map((item, index) => `${indent}${index}: ${isPlainObject(item) || Array.isArray(item) ? `
${toToon(item, `${indent}  `)}` : String(item)}`).join("\n");
  }
  if (isPlainObject(data)) {
    return Object.entries(data).map(([key, value]) => `${indent}${key}: ${isPlainObject(value) || Array.isArray(value) ? `
${toToon(value, `${indent}  `)}` : String(value)}`).join("\n");
  }
  return String(data ?? "");
}

// src/parser.ts
function parseJsonTrackerResponse(content) {
  const repairSteps = [];
  const candidates = [
    content,
    stripFences(content),
    extractBalancedJson(content)
  ].filter((candidate) => typeof candidate === "string" && candidate.trim().length > 0);
  for (const candidate of candidates) {
    const normalized = normalizeJsonCandidate(candidate, repairSteps);
    try {
      return {
        data: JSON.parse(normalized),
        repairSteps: [...new Set(repairSteps)]
      };
    } catch {
    }
  }
  throw new Error("The model did not return valid JSON tracker data.");
}
function stripFences(content) {
  const trimmed = content.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fenced) return fenced[1].trim();
  const firstFence = trimmed.indexOf("```");
  if (firstFence === -1) return trimmed;
  const afterOpen = trimmed.indexOf("\n", firstFence);
  const lastFence = trimmed.lastIndexOf("```");
  if (afterOpen !== -1 && lastFence > afterOpen) {
    return trimmed.slice(afterOpen + 1, lastFence).trim();
  }
  return trimmed;
}
function normalizeJsonCandidate(content, repairSteps) {
  let out = content.trim().replace(/\r\n?/g, "\n");
  if (out !== content.trim()) repairSteps.push("line-ending normalization");
  const smartQuoteNormalized = out.replace(/[\u201c\u201d\u201e\u201f]/g, '"');
  if (smartQuoteNormalized !== out) repairSteps.push("smart quote normalization");
  out = smartQuoteNormalized;
  const trailingCommaNormalized = removeTrailingCommas(out);
  if (trailingCommaNormalized !== out) repairSteps.push("trailing comma removal");
  out = trailingCommaNormalized;
  return out;
}
function removeTrailingCommas(content) {
  let output = "";
  let inString = false;
  let escaped = false;
  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    if (inString) {
      output += char;
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
      output += char;
      continue;
    }
    if (char === ",") {
      let j = i + 1;
      while (/\s/.test(content[j] ?? "")) j += 1;
      if (content[j] === "}" || content[j] === "]") {
        continue;
      }
    }
    output += char;
  }
  return output;
}
function extractBalancedJson(content) {
  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    if (char !== "{" && char !== "[") continue;
    const end = findBalancedEnd(content, i);
    if (end !== void 0) return content.slice(i, end + 1);
  }
  return void 0;
}
function findBalancedEnd(content, start) {
  const stack = [content[start] === "{" ? "}" : "]"];
  let inString = false;
  let escaped = false;
  for (let i = start + 1; i < content.length; i += 1) {
    const char = content[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === "{") stack.push("}");
    if (char === "[") stack.push("]");
    if (char === "}" || char === "]") {
      const expected = stack.pop();
      if (expected !== char) return void 0;
      if (stack.length === 0) return i;
    }
  }
  return void 0;
}

// src/backend.ts
var settingsCache = /* @__PURE__ */ new Map();
var activeJobs = /* @__PURE__ */ new Map();
var lastErrors = /* @__PURE__ */ new Map();
var diagnostics = /* @__PURE__ */ new Map();
var chatUserIds = /* @__PURE__ */ new Map();
var connectionListWarnings = /* @__PURE__ */ new Set();
var connectionStateWarnings = /* @__PURE__ */ new Set();
var generationDiagnostics = /* @__PURE__ */ new Set();
var lastFrontendUserId = null;
var interceptorRegistered = false;
function setUserFromFrontend(userId, chatId) {
  if (userId) lastFrontendUserId = userId;
  if (userId && chatId) chatUserIds.set(chatId, userId);
}
function resolveUserId(chatId, explicitUserId) {
  if (explicitUserId) return explicitUserId;
  if (chatId) {
    const mapped = chatUserIds.get(chatId);
    if (mapped) return mapped;
  }
  return lastFrontendUserId;
}
function send(userId, payload) {
  if (!userId) {
    spindle.log.warn(`Tracktor skipped frontend send without userId: ${JSON.stringify(payload).slice(0, 220)}`);
    return;
  }
  spindle.sendToFrontend(payload, userId);
}
async function addDiagnostic(userId, message) {
  const target = userId ?? lastFrontendUserId;
  spindle.log.warn(message);
  if (!target) return;
  const list = [message, ...diagnostics.get(target) ?? []].slice(0, 12);
  diagnostics.set(target, list);
  await spindle.userStorage.setJson(DIAGNOSTICS_PATH, { messages: list, updatedAt: Date.now() }, { indent: 2, userId: target }).catch(() => {
  });
  send(target, { type: "diagnostic", message });
}
function hasPermission(permission) {
  try {
    return !!spindle.permissions?.has?.(permission);
  } catch {
    return false;
  }
}
function permissionWarnings() {
  const warnings = [];
  for (const permission of ["generation", "chats", "chat_mutation", "interceptor", "ui_panels", "app_manipulation"]) {
    if (!hasPermission(permission)) warnings.push(permission);
  }
  return warnings;
}
async function listConnectionProfiles(userId) {
  if (typeof spindle.connections?.list !== "function") return [];
  try {
    const raw = await spindle.connections.list(userId);
    const entries = Array.isArray(raw) ? raw : Array.isArray(raw?.connections) ? raw.connections : Array.isArray(raw?.profiles) ? raw.profiles : Array.isArray(raw?.items) ? raw.items : [];
    return entries.flatMap((entry) => normalizeConnectionOption(entry)).sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    if (!connectionListWarnings.has(userId)) {
      connectionListWarnings.add(userId);
      await addDiagnostic(userId, `Tracktor could not list Lumiverse connection profiles: ${error instanceof Error ? error.message : String(error)}`);
    }
    return [];
  }
}
function normalizeConnectionOption(input) {
  if (!isPlainObject(input)) return [];
  const id = readConnectionString(input.id) || readConnectionString(input.connection_id) || readConnectionString(input.key);
  if (!id) return [];
  const name = readConnectionString(input.name) || readConnectionString(input.label) || readConnectionString(input.displayName) || id;
  const provider = readConnectionString(input.provider) || readConnectionString(input.providerName);
  const model = readConnectionString(input.model) || readConnectionString(input.modelName);
  return [{
    id,
    name,
    ...provider ? { provider } : {},
    ...model ? { model } : {}
  }];
}
function readConnectionString(value) {
  return typeof value === "string" ? value.trim() : "";
}
async function loadSettings(userId) {
  const cached = settingsCache.get(userId);
  if (cached) return cached;
  const [savedSettings, savedSchemas, savedDiagnostics] = await Promise.all([
    spindle.userStorage.getJson(SETTINGS_PATH, { fallback: defaultSettings, userId }).catch(() => defaultSettings),
    spindle.userStorage.getJson(SCHEMA_PRESETS_PATH, { fallback: null, userId }).catch(() => null),
    spindle.userStorage.getJson(DIAGNOSTICS_PATH, { fallback: { messages: [] }, userId }).catch(() => ({ messages: [] }))
  ]);
  const rawSchemaPresets = savedSchemas ?? (isPlainObject(savedSettings) ? savedSettings.schemaPresets : null);
  const migrationNeeded = schemaPresetNeedsMigration(rawSchemaPresets);
  const promptDefaults = isPlainObject(savedSettings) ? savedSettings : defaultSettings;
  const schemaPresets = sanitizeSchemaPresetMap(rawSchemaPresets, promptDefaults);
  const settings = deepMergeSettings(savedSettings, schemaPresets);
  settingsCache.set(userId, settings);
  if (Array.isArray(savedDiagnostics?.messages)) {
    diagnostics.set(userId, savedDiagnostics.messages.filter((item) => typeof item === "string").slice(0, 12));
  }
  if (migrationNeeded) {
    await addDiagnostic(userId, "Tracktor migrated schema presets into tracker presets with per-preset prompts and templates.");
  }
  await saveSettings(settings, userId);
  return settings;
}
async function saveSettings(settings, userId, validatePresetKey) {
  const merged = deepMergeSettings(settings, settings.schemaPresets);
  if (validatePresetKey) {
    const preset = getSchemaPreset(merged, validatePresetKey);
    const runtime = resolvePresetRuntime(merged, preset);
    await assertRuntimeTemplateRenders(userId, preset, runtime, schemaToExample(runtime.schema));
  }
  settingsCache.set(userId, merged);
  await Promise.all([
    spindle.userStorage.setJson(SETTINGS_PATH, settingsForStorage(merged), { indent: 2, userId }),
    spindle.userStorage.setJson(SCHEMA_PRESETS_PATH, merged.schemaPresets, { indent: 2, userId })
  ]);
  return merged;
}
async function loadChatConfig(userId, chatId) {
  return spindle.userStorage.getJson(chatConfigPath(chatId), { fallback: {}, userId });
}
async function saveChatConfig(userId, chatId, config) {
  await spindle.userStorage.setJson(chatConfigPath(chatId), config, { indent: 2, userId });
}
async function loadSnapshots(userId, chatId) {
  const file = await spindle.userStorage.getJson(snapshotsPath(chatId), {
    fallback: { chatId, snapshots: [] },
    userId
  }).catch(() => ({ chatId, snapshots: [] }));
  const snapshots = Array.isArray(file?.snapshots) ? file.snapshots : [];
  return snapshots.flatMap((snapshot) => normalizeSnapshot(snapshot, chatId));
}
async function saveSnapshots(userId, chatId, snapshots) {
  snapshots.sort((a, b) => a.updatedAt - b.updatedAt);
  await spindle.userStorage.setJson(snapshotsPath(chatId), { chatId, snapshots }, { indent: 2, userId });
}
function normalizeSnapshot(input, fallbackChatId) {
  if (!isPlainObject(input)) return [];
  if (!isPlainObject(input.value) || typeof input.messageId !== "string") return [];
  const now = Date.now();
  return [{
    id: typeof input.id === "string" ? input.id : makeId("snapshot"),
    chatId: typeof input.chatId === "string" ? input.chatId : fallbackChatId,
    messageId: input.messageId,
    schemaPresetKey: typeof input.schemaPresetKey === "string" ? input.schemaPresetKey : typeof input.schemaId === "string" ? input.schemaId : "scene",
    value: input.value,
    renderTemplate: typeof input.renderTemplate === "string" ? input.renderTemplate : typeof input.templateHtml === "string" ? input.templateHtml : "",
    partsOrder: Array.isArray(input.partsOrder) ? input.partsOrder.filter((part) => typeof part === "string") : [],
    partsMeta: isPlainObject(input.partsMeta) ? input.partsMeta : {},
    pendingRedactions: isPlainObject(input.pendingRedactions) ? input.pendingRedactions : {},
    templateEngine: input.templateEngine === "simple" || input.templateEngine === "handlebars" ? input.templateEngine : void 0,
    createdAt: typeof input.createdAt === "number" ? input.createdAt : now,
    updatedAt: typeof input.updatedAt === "number" ? input.updatedAt : now
  }];
}
async function upsertSnapshot(userId, snapshot) {
  const snapshots = await loadSnapshots(userId, snapshot.chatId);
  const index = snapshots.findIndex((item) => item.messageId === snapshot.messageId);
  if (index >= 0) snapshots[index] = snapshot;
  else snapshots.push(snapshot);
  await saveSnapshots(userId, snapshot.chatId, snapshots);
}
async function deleteSnapshot(userId, chatId, messageId) {
  const snapshots = await loadSnapshots(userId, chatId);
  await saveSnapshots(userId, chatId, snapshots.filter((item) => item.messageId !== messageId));
}
async function buildState(userId, chatId) {
  const settings = await loadSettings(userId);
  const userJobs = [...activeJobs.values()].filter((job) => job.userId === userId).map((job) => job.state);
  const availableConnections = await listConnectionProfiles(userId);
  if (settings.trackerConnectionId && availableConnections.length > 0 && !availableConnections.some((item) => item.id === settings.trackerConnectionId)) {
    const warningKey = `${userId}:missing:${settings.trackerConnectionId}`;
    if (!connectionStateWarnings.has(warningKey)) {
      connectionStateWarnings.add(warningKey);
      await addDiagnostic(userId, `Selected Tracktor connection was not found: ${settings.trackerConnectionId}`);
    }
  }
  const activePresetKey = settings.activeTrackerPresetKey || settings.activeSchemaPresetKey || settings.activeSchemaId;
  if (activePresetKey && !settings.schemaPresets[activePresetKey]) {
    const warningKey = `${userId}:missing-preset:${activePresetKey}`;
    if (!connectionStateWarnings.has(warningKey)) {
      connectionStateWarnings.add(warningKey);
      await addDiagnostic(userId, `Selected Tracktor preset was not found: ${activePresetKey}`);
    }
  }
  return {
    settings,
    availableConnections,
    activeChat: await getActiveChatState(settings, userId, chatId),
    permissionWarnings: permissionWarnings(),
    busy: userJobs.length > 0,
    jobs: userJobs,
    diagnostics: diagnostics.get(userId) ?? [],
    ...lastErrors.get(userId) ? { lastError: lastErrors.get(userId) } : {}
  };
}
async function sendState(userId, chatId) {
  send(userId, { type: "state", state: await buildState(userId, chatId) });
}
async function getActiveChatState(settings, userId, chatId) {
  if (!hasPermission("chats") || !hasPermission("chat_mutation")) return null;
  const chat = chatId ? await spindle.chats.get(chatId, userId).catch(() => null) : await spindle.chats.getActive(userId).catch(() => null);
  if (!chat?.id) return null;
  chatUserIds.set(chat.id, userId);
  const messages = await spindle.chat.getMessages(chat.id, userId);
  const snapshots = await loadSnapshots(userId, chat.id);
  return {
    id: chat.id,
    name: chat.name ?? "Active chat",
    messageCount: messages.length,
    trackers: collectTrackerSummaries(chat.id, messages, snapshots, settings)
  };
}
function collectTrackerSummaries(chatId, messages, snapshots, settings) {
  const byMessage = new Map(snapshots.map((snapshot) => [snapshot.messageId, snapshot]));
  return messages.flatMap((message) => {
    const snapshot = byMessage.get(message.id) ?? legacySnapshotFromMessage(chatId, message);
    if (!snapshot) return [];
    const preset = settings.schemaPresets[snapshot.schemaPresetKey];
    return [{
      chatId,
      messageId: message.id,
      role: message.role,
      messagePreview: safePreview(message.content || ""),
      snapshot,
      tracker: snapshotToRecord(snapshot, preset)
    }];
  });
}
function legacySnapshotFromMessage(chatId, message) {
  const candidate = message.metadata?.[METADATA_KEY];
  if (!isPlainObject(candidate) || !("data" in candidate) || !candidate.data || !candidate.sourceMessageId) return void 0;
  const record = candidate;
  if (!isPlainObject(record.data)) return void 0;
  const updatedAt = Date.parse(record.updatedAt || "") || Date.now();
  return {
    id: record.snapshotId ?? makeSnapshotId(chatId, message.id),
    chatId,
    messageId: message.id,
    schemaPresetKey: record.schemaId,
    value: record.data,
    renderTemplate: record.templateHtml,
    partsOrder: getTopLevelSchemaKeys(record.schema),
    partsMeta: {},
    pendingRedactions: record.pendingRedactions ?? {},
    createdAt: updatedAt,
    updatedAt
  };
}
function resolveTargetMessage(messages, requestedMessageId) {
  if (requestedMessageId) {
    const found = messages.find((message) => message.id === requestedMessageId);
    if (!found) throw new Error(`Message not found: ${requestedMessageId}`);
    return found;
  }
  const latest = messages[messages.length - 1];
  if (!latest) throw new Error("No messages are available in the active chat.");
  return latest;
}
function resolvePresetRuntime(settings, preset) {
  const trackerInstructionPrompt = preset.trackerInstructionPrompt || preset.extractionPrompt || settings.trackerInstructionPrompt || settings.extractionPrompt || defaultSettings.trackerInstructionPrompt;
  return {
    schema: preset.schema ?? preset.jsonSchema,
    renderTemplate: preset.renderTemplate || preset.templateHtml,
    systemPrompt: preset.systemPrompt || settings.systemPrompt || defaultSettings.systemPrompt,
    trackerInstructionPrompt,
    jsonPromptTemplate: preset.jsonPromptTemplate || settings.jsonPromptTemplate || defaultSettings.jsonPromptTemplate,
    xmlPromptTemplate: preset.xmlPromptTemplate || settings.xmlPromptTemplate || defaultSettings.xmlPromptTemplate,
    toonPromptTemplate: preset.toonPromptTemplate || settings.toonPromptTemplate || defaultSettings.toonPromptTemplate,
    structuredOutputMode: preset.structuredOutputMode ?? settings.structuredOutputMode,
    templateEngine: preset.templateEngine ?? settings.templateEngine ?? "handlebars"
  };
}
async function addGenerationDiagnosticOnce(userId, key, message, debugOnly = false, settings) {
  if (debugOnly && !settings?.debugLogging) return;
  const diagnosticKey = `${userId}:${key}`;
  if (generationDiagnostics.has(diagnosticKey)) return;
  generationDiagnostics.add(diagnosticKey);
  await addDiagnostic(userId, message);
}
async function assertRuntimeTemplateRenders(userId, preset, runtime, data, savedTemplate, templateEngine) {
  const template = savedTemplate ?? runtime.renderTemplate;
  const engine = templateEngine ?? runtime.templateEngine;
  for (const warning of getTemplateCompatibilityWarnings(template)) {
    await addGenerationDiagnosticOnce(userId, `template-warning:${preset.key}:${warning}`, `Tracktor template warning for "${preset.name}" (${preset.key}): ${warning}`);
  }
  try {
    assertTrackerTemplateRenders(template, data, {
      templateEngine: engine,
      label: `Tracker preset "${preset.name}" (${preset.key})`,
      onWarning: (message) => {
        void addDiagnostic(userId, `Tracktor template warning for "${preset.name}" (${preset.key}): ${message}`);
      }
    });
  } catch (error) {
    const message = `Tracktor template render failed for "${preset.name}" (${preset.key}): ${error instanceof Error ? error.message : String(error)}`;
    spindle.log.warn(message);
    throw new Error(message);
  }
}
async function generateTrackerForMessage(options) {
  if (!hasPermission("generation")) throw new Error("Generation permission is not granted.");
  if (!hasPermission("chats")) throw new Error("Chats permission is not granted.");
  if (!hasPermission("chat_mutation")) throw new Error("Chat mutation permission is not granted.");
  const settings = await loadSettings(options.userId);
  const chat = options.chatId ? await spindle.chats.get(options.chatId, options.userId).catch(() => ({ id: options.chatId })) : await spindle.chats.getActive(options.userId);
  if (!chat?.id) throw new Error("No active chat is open.");
  chatUserIds.set(chat.id, options.userId);
  const messages = await spindle.chat.getMessages(chat.id, options.userId);
  const target = resolveTargetMessage(messages, options.messageId);
  const targetIndex = messages.findIndex((message) => message.id === target.id);
  if (settings.skipFirstMessages > 0 && targetIndex < settings.skipFirstMessages) {
    throw new Error(`Tracker generation is skipped for the first ${settings.skipFirstMessages} messages.`);
  }
  const chatConfig = await loadChatConfig(options.userId, chat.id);
  const requestedPresetKey = chatConfig.schemaPresetKey ?? chatConfig.schemaId ?? settings.activeTrackerPresetKey ?? settings.activeSchemaPresetKey;
  if (requestedPresetKey && !settings.schemaPresets[requestedPresetKey]) {
    await addGenerationDiagnosticOnce(options.userId, `missing-preset:${requestedPresetKey}`, `Tracktor preset "${requestedPresetKey}" was missing; generation fell back to an available tracker preset.`);
  }
  const preset = getSchemaPreset(settings, requestedPresetKey);
  const runtime = resolvePresetRuntime(settings, preset);
  await addGenerationDiagnosticOnce(options.userId, `preset:${preset.key}`, `Tracktor generation using tracker preset "${preset.name}" (${preset.key}).`);
  const snapshots = await loadSnapshots(options.userId, chat.id);
  const priorSnapshots = collectPriorSnapshots(messages, snapshots, targetIndex, settings.includeLastTrackers);
  const sequential = options.sequential ?? settings.sequentialGeneration;
  const data = sequential ? await generateTrackerSequential(messages, targetIndex, settings, preset, runtime, priorSnapshots, options.userId, options.job) : await generateTrackerFull(messages, targetIndex, settings, preset, runtime, priorSnapshots, options.userId, options.job?.controller.signal);
  assertSchemaRequired(data, runtime.schema);
  const snapshot = makeTrackerSnapshot(chat.id, target.id, preset, runtime, data, snapshots.find((item) => item.messageId === target.id));
  await assertRuntimeTemplateRenders(options.userId, preset, runtime, snapshot.value, snapshot.renderTemplate, snapshot.templateEngine);
  await persistTrackerSnapshot(options.userId, target, snapshot, settings);
  return snapshot;
}
async function generateTrackerFull(messages, targetIndex, settings, preset, runtime, priorSnapshots, userId, signal) {
  const prompt = buildTrackerPrompt(messages, targetIndex, settings, preset, runtime, priorSnapshots);
  const data = await requestJsonForSchema(prompt, runtime.schema, "tracktor_tracker", settings, runtime, userId, signal);
  if (!isPlainObject(data)) throw new Error("Tracker response was not a JSON object.");
  return data;
}
async function generateTrackerSequential(messages, targetIndex, settings, preset, runtime, priorSnapshots, userId, job) {
  const keys = getTopLevelSchemaKeys(runtime.schema);
  if (keys.length === 0) throw new Error("The active tracker schema has no top-level properties.");
  const tracker = {};
  for (let index = 0; index < keys.length; index += 1) {
    if (job?.controller.signal.aborted) throw new DOMException("Tracker generation cancelled.", "AbortError");
    const key = keys[index];
    updateJob(job, { currentPart: index + 1, totalParts: keys.length, label: `Generating ${key}` });
    const partSchema = buildTopLevelPartSchema(runtime.schema, key);
    const prompt = buildTrackerPrompt(messages, targetIndex, settings, preset, runtime, priorSnapshots, {
      partKey: key,
      trackerSoFar: tracker
    });
    const part = await requestJsonForSchema(prompt, partSchema, `tracktor_${key}`, settings, runtime, userId, job?.controller.signal);
    if (!part || typeof part !== "object" || !(key in part)) {
      throw new Error(`Part response did not include "${key}".`);
    }
    tracker[key] = part[key];
  }
  return tracker;
}
async function requestJsonForSchema(promptMessages, schema, schemaName, settings, runtime, userId, signal) {
  const parameters = {
    max_tokens: settings.maxResponseTokens
  };
  const messages = [...promptMessages];
  if (runtime.structuredOutputMode === "native_json_schema") {
    parameters.response_format = {
      type: "json_schema",
      json_schema: {
        name: schemaName.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 48),
        strict: true,
        schema
      }
    };
  } else {
    messages.push({
      role: "user",
      content: buildFormatInstruction(runtime, schema)
    });
  }
  if (settings.trackerConnectionId) {
    await addGenerationDiagnosticOnce(userId, `connection:${settings.trackerConnectionId}`, `Tracktor generation using selected Lumiverse connection: ${settings.trackerConnectionId}.`);
  } else {
    await addGenerationDiagnosticOnce(userId, "connection:active", "Tracktor generation using the active Lumiverse connection.");
  }
  const result = await spindle.generate.quiet({
    type: "quiet",
    messages,
    parameters,
    ...settings.trackerConnectionId ? { connection_id: settings.trackerConnectionId } : {},
    userId,
    signal
  });
  if (result?.content && typeof result.content === "object") return result.content;
  const content = typeof result?.content === "string" ? result.content : JSON.stringify(result?.content ?? "");
  const parsed = parseJsonTrackerResponse(content);
  if (settings.debugLogging && parsed.repairSteps.length > 0) {
    spindle.log.info(`Tracktor parser repair steps: ${parsed.repairSteps.join(", ")}`);
  }
  return parsed.data;
}
function buildTrackerPrompt(messages, targetIndex, settings, preset, runtime, priorSnapshots, options = {}) {
  const limit = settings.trackerContextMessageLimit;
  const start = limit <= 0 ? 0 : Math.max(0, targetIndex - limit + 1);
  const recent = messages.slice(start, targetIndex + 1);
  const target = messages[targetIndex];
  const partLine = options.partKey ? `Generate only the top-level "${options.partKey}" property and return it wrapped in a JSON object.` : "Generate the complete tracker object.";
  const prompt = [
    { role: "system", content: runtime.systemPrompt },
    {
      role: "user",
      content: [
        runtime.trackerInstructionPrompt,
        partLine,
        `Active tracker preset: ${preset.name}`,
        `Target message id: ${target.id}`
      ].join("\n")
    }
  ];
  if (priorSnapshots.length > 0) {
    prompt.push({
      role: "user",
      content: `Previous tracker snapshots for continuity:

${priorSnapshots.map((snapshot) => formatTrackerSnapshot(snapshot, snapshot.schemaPresetKey)).join("\n\n")}`
    });
  }
  if (options.trackerSoFar && Object.keys(options.trackerSoFar).length > 0) {
    prompt.push({
      role: "user",
      content: `Tracker fields already generated in this run:
\`\`\`json
${JSON.stringify(options.trackerSoFar, null, 2)}
\`\`\``
    });
  }
  prompt.push({
    role: "user",
    content: `Recent conversation up to the target message:

${formatConversation(recent, settings)}`
  });
  return prompt;
}
function buildFormatInstruction(runtime, schema) {
  const template = runtime.structuredOutputMode === "xml_prompt" ? runtime.xmlPromptTemplate : runtime.structuredOutputMode === "toon_prompt" ? runtime.toonPromptTemplate : runtime.jsonPromptTemplate;
  return template.replaceAll("{{schema}}", JSON.stringify(schema, null, 2)).replaceAll("{{example_response}}", JSON.stringify(schemaToExample(schema), null, 2)).replaceAll("{{format_instructions}}", "Return only valid JSON that matches the schema.").replaceAll("{{current_tracker}}", "").replaceAll("{{target_part}}", "");
}
function formatConversation(messages, settings) {
  if (settings.trackerConversationRoleMode === "plain_transcript") {
    return messages.map((message) => `${message.name || message.role}: ${message.content.trim()}`).join("\n\n");
  }
  return messages.map((message) => {
    const role = settings.trackerConversationRoleMode === "all_assistant" ? "assistant" : message.role;
    return `${role.toUpperCase()} (${message.id}):
${message.content.trim()}`;
  }).join("\n\n");
}
function collectPriorSnapshots(messages, snapshots, targetIndex, limit) {
  if (limit <= 0) return [];
  const messageIndex = new Map(messages.map((message, index) => [message.id, index]));
  return snapshots.filter((snapshot) => {
    const index = messageIndex.get(snapshot.messageId);
    return typeof index === "number" && index <= targetIndex;
  }).sort((a, b) => (messageIndex.get(a.messageId) ?? 0) - (messageIndex.get(b.messageId) ?? 0)).slice(-limit);
}
function makeTrackerSnapshot(chatId, messageId, preset, runtime, data, existing, options = {}) {
  const now = Date.now();
  return {
    id: existing?.id ?? makeSnapshotId(chatId, messageId),
    chatId,
    messageId,
    schemaPresetKey: preset.key,
    value: data,
    renderTemplate: options.renderTemplate ?? runtime.renderTemplate,
    partsOrder: getTopLevelSchemaKeys(runtime.schema),
    partsMeta: existing?.partsMeta ?? {},
    pendingRedactions: existing?.pendingRedactions ?? {},
    templateEngine: existing?.templateEngine ?? runtime.templateEngine,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now
  };
}
async function persistTrackerSnapshot(userId, message, snapshot, settings) {
  await upsertSnapshot(userId, snapshot);
  if (hasPermission("chat_mutation")) {
    const nextMetadata = {
      ...message.metadata ?? {},
      [METADATA_KEY]: { snapshotId: snapshot.id, updatedAt: snapshot.updatedAt }
    };
    await spindle.chat.updateMessage(snapshot.chatId, message.id, { metadata: nextMetadata }, userId).catch((error) => {
      void addDiagnostic(userId, `Tracktor could not mirror snapshot metadata: ${error instanceof Error ? error.message : String(error)}`);
    });
  }
  if (settings.chatVariableExport.enabled) {
    await spindle.variables?.chat?.set?.(snapshot.chatId, settings.chatVariableExport.key, JSON.stringify(snapshot.value)).catch?.(() => {
    });
  }
}
async function updateTrackerData(userId, chatId, messageId, data) {
  if (!isPlainObject(data)) throw new Error("Tracker JSON must be an object.");
  const settings = await loadSettings(userId);
  const messages = await spindle.chat.getMessages(chatId, userId);
  const message = messages.find((item) => item.id === messageId);
  if (!message) throw new Error(`Message not found: ${messageId}`);
  const snapshots = await loadSnapshots(userId, chatId);
  const current = snapshots.find((item) => item.messageId === messageId) ?? legacySnapshotFromMessage(chatId, message);
  const preset = getSchemaPreset(settings, current?.schemaPresetKey);
  const runtime = resolvePresetRuntime(settings, preset);
  const snapshot = makeTrackerSnapshot(chatId, messageId, preset, runtime, data, current, {
    renderTemplate: current?.renderTemplate || runtime.renderTemplate
  });
  await assertRuntimeTemplateRenders(userId, preset, runtime, snapshot.value, snapshot.renderTemplate, snapshot.templateEngine);
  await persistTrackerSnapshot(userId, message, snapshot, settings);
}
async function deleteTracker(userId, chatId, messageId) {
  const messages = await spindle.chat.getMessages(chatId, userId);
  const message = messages.find((item) => item.id === messageId);
  await deleteSnapshot(userId, chatId, messageId);
  if (message && hasPermission("chat_mutation")) {
    const nextMetadata = { ...message.metadata ?? {} };
    delete nextMetadata[METADATA_KEY];
    await spindle.chat.updateMessage(chatId, messageId, { metadata: nextMetadata }, userId);
  }
}
async function regeneratePart(userId, chatId, messageId, partKey) {
  const { settings, messages, targetIndex, preset, runtime, snapshot, message } = await loadSnapshotGenerationContext(userId, chatId, messageId);
  const schema = buildTopLevelPartSchema(runtime.schema, partKey);
  const prompt = buildTrackerPrompt(messages, targetIndex, settings, preset, runtime, [], {
    partKey,
    trackerSoFar: omitKey(snapshot.value, partKey)
  });
  const part = await requestJsonForSchema(prompt, schema, `tracktor_${partKey}`, settings, runtime, userId);
  if (!isPlainObject(part) || !(partKey in part)) throw new Error(`Part response did not include "${partKey}".`);
  const next = { ...snapshot.value, [partKey]: part[partKey] };
  const updated = makeTrackerSnapshot(chatId, messageId, preset, runtime, next, snapshot);
  await assertRuntimeTemplateRenders(userId, preset, runtime, updated.value, updated.renderTemplate, updated.templateEngine);
  await persistTrackerSnapshot(userId, message, updated, settings);
}
async function loadSnapshotGenerationContext(userId, chatId, messageId) {
  const settings = await loadSettings(userId);
  const messages = await spindle.chat.getMessages(chatId, userId);
  const message = messages.find((item) => item.id === messageId);
  if (!message) throw new Error(`Message not found: ${messageId}`);
  const snapshots = await loadSnapshots(userId, chatId);
  const snapshot = snapshots.find((item) => item.messageId === messageId) ?? legacySnapshotFromMessage(chatId, message);
  if (!snapshot) throw new Error("No tracker snapshot is saved for this message.");
  const preset = getSchemaPreset(settings, snapshot.schemaPresetKey);
  const runtime = resolvePresetRuntime(settings, preset);
  const targetIndex = messages.findIndex((item) => item.id === messageId);
  return { settings, messages, message, snapshot, preset, runtime, targetIndex };
}
function omitKey(value, key) {
  const next = { ...value };
  delete next[key];
  return next;
}
function assertSchemaRequired(data, schema) {
  if (!isPlainObject(data)) throw new Error("Tracker response was not a JSON object.");
  const required = Array.isArray(schema.required) ? schema.required : [];
  const missing = required.filter((key) => typeof key === "string" && !(key in data));
  if (missing.length > 0) throw new Error(`Tracker response is missing required fields: ${missing.join(", ")}`);
}
function makeId(prefix) {
  const random = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${random}`;
}
function makeSnapshotId(chatId, messageId) {
  return `snap_${hashText(`${chatId}:${messageId}`)}`;
}
function hashText(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}
function createJob(userId, chatId, messageId, label) {
  const job = {
    userId,
    controller: new AbortController(),
    state: {
      id: makeId("job"),
      chatId,
      messageId,
      label,
      status: "running"
    }
  };
  activeJobs.set(job.state.id, job);
  send(userId, { type: "job_started", job: job.state });
  void saveJobs(userId, chatId);
  return job;
}
function updateJob(job, patch) {
  if (!job) return;
  job.state = { ...job.state, ...patch };
  activeJobs.set(job.state.id, job);
  send(job.userId, { type: "job_progress", job: job.state });
  void saveJobs(job.userId, job.state.chatId);
}
function finishJob(job, status, error) {
  job.state = { ...job.state, status, ...error ? { error } : {} };
  send(job.userId, status === "complete" ? { type: "job_finished", job: job.state } : { type: "job_failed", job: job.state });
  activeJobs.delete(job.state.id);
  void saveJobs(job.userId, job.state.chatId);
}
async function saveJobs(userId, chatId) {
  const jobs = [...activeJobs.values()].filter((job) => job.userId === userId && job.state.chatId === chatId).map((job) => job.state);
  await spindle.userStorage.setJson(jobsPath(chatId), { chatId, jobs, updatedAt: Date.now() }, { indent: 2, userId }).catch(() => {
  });
}
function parsePayloadJson(value) {
  if (typeof value !== "string") return value;
  return parseJsonTrackerResponse(value).data;
}
async function runJob(userId, chatId, messageId, label, work) {
  const resolvedChatId = chatId || (await spindle.chats.getActive(userId))?.id;
  if (!resolvedChatId) throw new Error("No active chat is open.");
  const job = createJob(userId, resolvedChatId, messageId, label);
  lastErrors.delete(userId);
  await sendState(userId, resolvedChatId);
  try {
    await work(job);
    finishJob(job, "complete");
    await sendState(userId, resolvedChatId);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    lastErrors.set(userId, message);
    finishJob(job, "failed", message);
    spindle.toast.error(message, { title: "Tracktor", duration: 1e4 });
    await addDiagnostic(userId, message);
    await sendState(userId, resolvedChatId);
  }
}
spindle.onFrontendMessage(async (payload, rawUserId) => {
  const chatId = typeof payload?.chatId === "string" ? payload.chatId : null;
  setUserFromFrontend(rawUserId, chatId);
  if (!rawUserId) {
    await addDiagnostic(null, "Tracktor received a frontend message without a Lumiverse userId.");
    return;
  }
  const userId = rawUserId;
  try {
    switch (payload?.type) {
      case "ready":
      case "refresh_state":
      case "get_state":
        await sendState(userId, chatId);
        break;
      case "save_settings": {
        const validatePresetKey = typeof payload.validatePresetKey === "string" ? payload.validatePresetKey : void 0;
        await saveSettings(payload.settings, userId, validatePresetKey);
        spindle.toast.success("Settings saved.", { title: "Tracktor" });
        await sendState(userId, chatId);
        break;
      }
      case "set_chat_schema": {
        if (!payload.chatId || !payload.schemaId) throw new Error("chatId and schemaId are required.");
        await saveChatConfig(userId, payload.chatId, { schemaPresetKey: payload.schemaId, schemaId: payload.schemaId });
        spindle.toast.success("Chat schema updated.", { title: "Tracktor" });
        await sendState(userId, payload.chatId);
        break;
      }
      case "generate_tracker":
      case "regenerate_tracker":
        await runJob(userId, payload.chatId, payload.messageId, "Generating tracker", async (job) => {
          await generateTrackerForMessage({
            chatId: payload.chatId,
            messageId: payload.messageId,
            sequential: payload.sequential,
            userId,
            job
          });
          spindle.toast.success("Tracker generated.", { title: "Tracktor" });
        });
        break;
      case "regenerate_part":
        if (!payload.chatId || !payload.messageId || !payload.partKey) throw new Error("chatId, messageId, and partKey are required.");
        await runJob(userId, payload.chatId, payload.messageId, `Regenerating ${payload.partKey}`, async () => {
          await regeneratePart(userId, payload.chatId, payload.messageId, payload.partKey);
          spindle.toast.success("Tracker section regenerated.", { title: "Tracktor" });
        });
        break;
      case "edit_snapshot":
      case "update_tracker":
        await runJob(userId, payload.chatId, payload.messageId, "Saving tracker JSON", async () => {
          await updateTrackerData(userId, payload.chatId, payload.messageId, parsePayloadJson(payload.data));
          spindle.toast.success("Tracker updated.", { title: "Tracktor" });
        });
        break;
      case "delete_snapshot":
      case "delete_tracker":
        await runJob(userId, payload.chatId, payload.messageId, "Deleting tracker", async () => {
          await deleteTracker(userId, payload.chatId, payload.messageId);
          spindle.toast.success("Tracker deleted.", { title: "Tracktor" });
        });
        break;
      case "cancel_job": {
        const job = typeof payload.jobId === "string" ? activeJobs.get(payload.jobId) : void 0;
        if (job && job.userId === userId) job.controller.abort();
        break;
      }
      case "toggle_injection": {
        const settings = await loadSettings(userId);
        settings.injectTrackerSnapshots = !settings.injectTrackerSnapshots;
        await saveSettings(settings, userId);
        await sendState(userId, chatId);
        break;
      }
      default:
        await addDiagnostic(userId, `Unknown frontend message: ${JSON.stringify(payload)}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    lastErrors.set(userId, message);
    spindle.toast.error(message, { title: "Tracktor", duration: 1e4 });
    await addDiagnostic(userId, message);
    await sendState(userId, chatId);
  }
});
function shouldAutoGenerate(settings, kind) {
  return settings.autoMode === kind || settings.autoMode === "both";
}
async function handleAutoGeneration(payload, eventUserId, kind) {
  const chatId = typeof payload?.chatId === "string" ? payload.chatId : null;
  const messageId = typeof payload?.messageId === "string" ? payload.messageId : typeof payload?.message?.id === "string" ? payload.message.id : void 0;
  const userId = resolveUserId(chatId, eventUserId);
  if (!chatId || !messageId || !userId) {
    await addDiagnostic(userId, `Tracktor skipped ${kind} auto-generation because chat/user/message context was incomplete.`);
    return;
  }
  setUserFromFrontend(userId, chatId);
  const settings = await loadSettings(userId);
  if (!shouldAutoGenerate(settings, kind)) return;
  await runJob(userId, chatId, messageId, `Auto tracker (${kind})`, async (job) => {
    await generateTrackerForMessage({ userId, chatId, messageId, job });
  });
}
spindle.on("CHARACTER_MESSAGE_RENDERED", (payload, userId) => {
  void handleAutoGeneration(payload, userId, "responses");
});
spindle.on("USER_MESSAGE_RENDERED", (payload, userId) => {
  void handleAutoGeneration(payload, userId, "inputs");
});
spindle.on("CHAT_CHANGED", (payload, userId) => {
  const chatId = typeof payload?.chatId === "string" ? payload.chatId : null;
  const targetUserId = resolveUserId(chatId, userId);
  if (!targetUserId) return;
  setUserFromFrontend(targetUserId, chatId);
  void sendState(targetUserId, chatId);
});
spindle.on("CHAT_SWITCHED", (payload, userId) => {
  const chatId = typeof payload?.chatId === "string" ? payload.chatId : null;
  const targetUserId = resolveUserId(chatId, userId);
  if (!targetUserId) return;
  setUserFromFrontend(targetUserId, chatId);
  void sendState(targetUserId, chatId);
});
spindle.on("GENERATION_STARTED", (payload, userId) => {
  const chatId = typeof payload?.chatId === "string" ? payload.chatId : null;
  if (chatId && userId) setUserFromFrontend(userId, chatId);
});
function tryRegisterInterceptor() {
  if (interceptorRegistered || !hasPermission("interceptor")) return;
  spindle.registerInterceptor(async (messages, context) => {
    const chatId = typeof context?.chatId === "string" ? context.chatId : null;
    if (!chatId || context?.generationType === "quiet") return messages;
    const userId = resolveUserId(chatId, typeof context?.userId === "string" ? context.userId : null);
    if (!userId) {
      await addDiagnostic(null, "Tracktor skipped prompt injection because no userId was known for the chat.");
      return messages;
    }
    const settings = await loadSettings(userId);
    if (!settings.injectTrackerSnapshots || settings.trackerSnapshotCount <= 0) return messages;
    const snapshots = (await loadSnapshots(userId, chatId)).slice(-settings.trackerSnapshotCount);
    if (snapshots.length === 0) return messages;
    const transform = settings.snapshotTransformPresets[settings.snapshotTransformPresetKey] ?? settings.snapshotTransformPresets.default_json;
    const injected = snapshots.map((snapshot) => ({
      role: settings.snapshotRole,
      ...settings.injectAsVirtualCharacter ? { name: "Tracker" } : {},
      content: formatTrackerSnapshot(snapshot, settings.snapshotHeader || snapshot.schemaPresetKey, transform)
    }));
    return {
      messages: [...injected, ...messages],
      breakdown: injected.map((_message, index) => ({
        messageIndex: index,
        name: "Tracktor Snapshot"
      }))
    };
  }, 80);
  interceptorRegistered = true;
  spindle.log.info("Tracktor interceptor registered.");
}
spindle.permissions?.onChanged?.(({ permission, granted }) => {
  if (permission === "interceptor" && granted) tryRegisterInterceptor();
});
void (async () => {
  tryRegisterInterceptor();
  spindle.log.info("Tracktor backend loaded.");
})();
