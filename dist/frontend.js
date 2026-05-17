// src/shared.ts
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
        ${renderSettings(state.settings, state)}
        ${renderSchemaEditor(state.settings, state)}
      </div>
    `;
  }
}
function renderHeader() {
  return `
    <header class="tracktor-header">
      <div>
        <strong>Tracktor</strong>
        <span>Tracker presets and snapshots for Lumiverse chats</span>
      </div>
      <div class="tracktor-tabs" aria-label="Tracktor sections">
        <span>Current</span>
        <span>Settings</span>
        <span>Preset</span>
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
        <div class="tracktor-actions tracktor-icon-actions">
          ${renderIconButton("regenerate", ICON_REGENERATE, "Regenerate tracker", { chatId: item.chatId, messageId: item.messageId })}
          ${renderIconButton("edit", ICON_EDIT, "Edit tracker JSON", { chatId: item.chatId, messageId: item.messageId })}
          ${renderIconButton("delete", ICON_DELETE, "Delete tracker", { chatId: item.chatId, messageId: item.messageId })}
        </div>
      </div>
      ${partButtons ? `<details class="tracktor-parts"><summary>Regenerate section</summary><div class="tracktor-actions">${partButtons}</div></details>` : ""}
      <div class="tracktor-rendered">${stripDangerousHtml(item.tracker.renderedHtml)}</div>
    </article>
  `;
}
function renderIconButton(action, iconSvg, label, dataAttrs) {
  const attrs = Object.entries(dataAttrs).map(([key, value]) => `data-${toKebabCase(key)}="${escapeHtml(value)}"`).join(" ");
  return `<button type="button" class="tracktor-icon-button" data-action="${escapeHtml(action)}" ${attrs} title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">${iconSvg}</button>`;
}
function toKebabCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
function renderSettings(settings, current) {
  const chat = current?.activeChat;
  return `
    <section class="tracktor-section">
      <h2>Controls</h2>
      <div class="tracktor-form-grid tracktor-common-controls">
        ${renderConnectionControl(settings, current?.availableConnections ?? [])}
        ${renderTrackerPresetSelect(settings)}
        <label>Output Mode
          <select data-setting="structuredOutputMode" data-autosave="settings">
            ${renderStructuredOutputOptions(settings.structuredOutputMode)}
          </select>
        </label>
        <label>Auto Mode
          <select data-setting="autoMode">
            <option value="none" ${settings.autoMode === "none" ? "selected" : ""}>None</option>
            <option value="responses" ${settings.autoMode === "responses" ? "selected" : ""}>Responses</option>
            <option value="inputs" ${settings.autoMode === "inputs" ? "selected" : ""}>Inputs</option>
            <option value="both" ${settings.autoMode === "both" ? "selected" : ""}>Both</option>
          </select>
        </label>
        <label class="tracktor-check tracktor-common-check">
          <input data-setting="injectTrackerSnapshots" type="checkbox" ${settings.injectTrackerSnapshots ? "checked" : ""}>
          Inject snapshots
        </label>
      </div>
      <div class="tracktor-actions tracktor-primary-actions">
        <button type="button" data-action="generate-latest" ${chat && !current?.busy ? "" : "disabled"}>Generate Tracker</button>
        <button type="button" data-action="generate-latest-sequential" ${chat && !current?.busy ? "" : "disabled"}>Generate Sequential</button>
        <button type="button" data-action="save-settings">Save Settings</button>
      </div>
      <details class="tracktor-details">
        <summary>Generation</summary>
        <div class="tracktor-form-grid">
          <label>Lumiverse generation preset
            <input data-setting="trackerPresetId" value="${escapeHtml(settings.trackerPresetId ?? "")}" placeholder="Optional id">
          </label>
        <label>Template engine
          <select data-setting="templateEngine">
            ${renderTemplateEngineOptions(settings.templateEngine)}
          </select>
        </label>
        <label>Tracker placement
          <select data-setting="trackerPlacement">
            ${renderTrackerPlacementOptions(settings.trackerPlacement)}
          </select>
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
          <input data-setting="includeCharacterCardInTrackerPrompt" type="checkbox" ${settings.includeCharacterCardInTrackerPrompt ? "checked" : ""}>
          Include character card
        </label>
        <label>Conversation roles
          <select data-setting="trackerConversationRoleMode">
            <option value="preserve" ${settings.trackerConversationRoleMode === "preserve" ? "selected" : ""}>Preserve</option>
            <option value="all_assistant" ${settings.trackerConversationRoleMode === "all_assistant" ? "selected" : ""}>All assistant</option>
            <option value="plain_transcript" ${settings.trackerConversationRoleMode === "plain_transcript" ? "selected" : ""}>Plain transcript</option>
          </select>
        </label>
        </div>
      </details>
      <details class="tracktor-details">
        <summary>Injection</summary>
        <div class="tracktor-form-grid">
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
        <label>Snapshot header
          <input data-setting="snapshotHeader" value="${escapeHtml(settings.snapshotHeader)}">
        </label>
        <label class="tracktor-check">
          <input data-setting="injectAsVirtualCharacter" type="checkbox" ${settings.injectAsVirtualCharacter ? "checked" : ""}>
          Virtual Tracker speaker
        </label>
        <label class="tracktor-check">
          <input data-setting="chatVariableExport.enabled" type="checkbox" ${settings.chatVariableExport.enabled ? "checked" : ""}>
          Export chat variable
        </label>
        </div>
      </details>
      <details class="tracktor-details">
        <summary>Diagnostics</summary>
        <label class="tracktor-check">
          <input data-setting="debugLogging" type="checkbox" ${settings.debugLogging ? "checked" : ""}>
          Debug logging
        </label>
        ${(current?.diagnostics?.length ?? 0) > 0 ? current.diagnostics.map((item) => `<p class="tracktor-diagnostic-line">${escapeHtml(item)}</p>`).join("") : '<p class="tracktor-muted">No diagnostics yet.</p>'}
      </details>
    </section>
  `;
}
function renderConnectionControl(settings, connections) {
  const selectedId = settings.trackerConnectionId ?? "";
  const selectedMissing = !!selectedId && connections.length > 0 && !connections.some((connection) => connection.id === selectedId);
  const options = [
    `<option value="" ${selectedId ? "" : "selected"}>Use active connection</option>`,
    selectedMissing ? `<option value="${escapeHtml(selectedId)}" selected>Saved: ${escapeHtml(selectedId)}</option>` : "",
    ...connections.map((connection) => `<option value="${escapeHtml(connection.id)}" ${connection.id === selectedId ? "selected" : ""}>${escapeHtml(formatConnectionLabel(connection))}</option>`)
  ].join("");
  const warning = connections.length === 0 ? '<div class="tracktor-warning tracktor-compact-warning">Connection profiles are not available yet. Active connection fallback still works.</div>' : selectedMissing ? '<div class="tracktor-warning tracktor-compact-warning">Saved connection id was not found. You can keep it manually or choose another profile.</div>' : "";
  return `
    <label>Connection
      <select data-setting="trackerConnectionId" data-autosave="settings">
        ${options}
      </select>
    </label>
    <div class="tracktor-field-note">
      ${warning}
      ${connections.length === 0 || selectedMissing ? `
        <details class="tracktor-advanced-inline">
          <summary>Advanced</summary>
          <label>Manual connection id
            <input data-setting="trackerConnectionId" value="${escapeHtml(selectedId)}" placeholder="Use active connection">
          </label>
        </details>
      ` : ""}
    </div>
  `;
}
function renderTrackerPresetSelect(settings) {
  const presets = Object.values(settings.schemaPresets);
  const activeKey = getActiveTrackerPresetKey(settings);
  return `
    <label>Tracker Preset
      <select data-setting="activeTrackerPresetKey" data-autosave="settings">
        ${presets.map((preset) => `<option value="${escapeHtml(preset.key)}" ${preset.key === activeKey ? "selected" : ""}>${escapeHtml(preset.name)}</option>`).join("")}
      </select>
    </label>
  `;
}
function renderStructuredOutputOptions(value, includeEmpty = false) {
  const empty = includeEmpty ? `<option value="" ${value ? "" : "selected"}>Use global output mode</option>` : "";
  return `${empty}
    <option value="json_prompt" ${value === "json_prompt" ? "selected" : ""}>Prompted JSON</option>
    <option value="native_json_schema" ${value === "native_json_schema" ? "selected" : ""}>Native JSON schema</option>
    <option value="xml_prompt" ${value === "xml_prompt" ? "selected" : ""}>XML prompt fallback</option>
    <option value="toon_prompt" ${value === "toon_prompt" ? "selected" : ""}>TOON prompt fallback</option>
  `;
}
function renderTemplateEngineOptions(value, includeEmpty = false) {
  const empty = includeEmpty ? `<option value="" ${value ? "" : "selected"}>Use global template engine</option>` : "";
  return `${empty}
    <option value="handlebars" ${value === "handlebars" ? "selected" : ""}>Handlebars</option>
    <option value="simple" ${value === "simple" ? "selected" : ""}>Simple fallback</option>
  `;
}
function renderTrackerPlacementOptions(value) {
  return `
    <option value="message_bottom" ${value === "message_bottom" || !value ? "selected" : ""}>Message bottom</option>
    <option value="message_top" ${value === "message_top" ? "selected" : ""}>Message top</option>
    <option value="chat_top_pinned" ${value === "chat_top_pinned" ? "selected" : ""}>Chat top (pinned)</option>
  `;
}
function formatConnectionLabel(connection) {
  const detail = [connection.provider, connection.model].filter(Boolean).join(" / ");
  return detail ? `${connection.name} (${detail})` : connection.name;
}
function getActiveTrackerPresetKey(settings) {
  return settings.activeTrackerPresetKey || settings.activeSchemaPresetKey || settings.activeSchemaId || "scene";
}
function getActiveTrackerPreset(settings) {
  const key = getActiveTrackerPresetKey(settings);
  return settings.schemaPresets[key] ?? settings.schemaPresets[Object.keys(settings.schemaPresets)[0]];
}
function renderSchemaEditor(settings, current) {
  const presets = Object.values(settings.schemaPresets);
  const active = getActiveTrackerPreset(settings) ?? presets[0];
  if (!active) return "";
  return `
    <section class="tracktor-section">
      <details class="tracktor-details" data-preset-editor>
        <summary>Preset Editor</summary>
        <div class="tracktor-form-grid">
          <label>Preset id
            <input data-preset-field="id" value="${escapeHtml(active.id)}" ${active.key === "scene" ? "readonly" : ""}>
          </label>
          <label>Name
            <input data-preset-field="name" value="${escapeHtml(active.name)}">
          </label>
          <label>Description
            <input data-preset-field="description" value="${escapeHtml(active.description ?? "")}">
          </label>
          <label>Preset output override
            <select data-preset-field="structuredOutputMode">
              ${renderStructuredOutputOptions(active.structuredOutputMode, true)}
            </select>
          </label>
          <label>Template engine
            <select data-preset-field="templateEngine">
              ${renderTemplateEngineOptions(active.templateEngine, true)}
            </select>
          </label>
        </div>
        <label>JSON schema
          <textarea data-preset-field="schema" rows="12" spellcheck="false">${escapeHtml(JSON.stringify(active.schema, null, 2))}</textarea>
        </label>
        <label>HTML template
          <textarea data-preset-field="templateHtml" rows="8" spellcheck="false">${escapeHtml(active.templateHtml)}</textarea>
        </label>
        <label>System prompt
          <textarea data-preset-field="systemPrompt" rows="5">${escapeHtml(active.systemPrompt || settings.systemPrompt)}</textarea>
        </label>
        <label>Extraction prompt
          <textarea data-preset-field="trackerInstructionPrompt" rows="4">${escapeHtml(active.trackerInstructionPrompt || active.extractionPrompt || settings.trackerInstructionPrompt)}</textarea>
        </label>
        <label>JSON prompt template
          <textarea data-preset-field="jsonPromptTemplate" rows="5">${escapeHtml(active.jsonPromptTemplate || settings.jsonPromptTemplate)}</textarea>
        </label>
        <label>XML prompt template
          <textarea data-preset-field="xmlPromptTemplate" rows="4">${escapeHtml(active.xmlPromptTemplate || settings.xmlPromptTemplate)}</textarea>
        </label>
        <label>TOON prompt template
          <textarea data-preset-field="toonPromptTemplate" rows="4">${escapeHtml(active.toonPromptTemplate || settings.toonPromptTemplate)}</textarea>
        </label>
        <div class="tracktor-actions">
          <button type="button" data-action="new-preset">New Preset</button>
          <button type="button" data-action="duplicate-preset">Duplicate Preset</button>
          <button type="button" data-action="save-preset">Save Preset</button>
          <button type="button" data-action="delete-preset" ${active.key === "scene" ? "disabled" : ""}>Delete Preset</button>
          <button type="button" data-action="restore-built-in-preset">Restore Built-in Preset</button>
          <button type="button" data-action="use-schema-for-chat" ${current?.activeChat ? "" : "disabled"}>Use For This Chat</button>
        </div>
      </details>
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
  } else if (action === "save-schema" || action === "save-preset") {
    savePresetFromDom(getPresetEditorForAction(button));
  } else if (action === "new-preset") {
    createNewPreset();
  } else if (action === "duplicate-preset") {
    duplicateActivePreset();
  } else if (action === "delete-preset") {
    void deleteActivePreset();
  } else if (action === "restore-built-in-preset") {
    restoreBuiltInPreset();
  } else if (action === "use-schema-for-chat") {
    sendBackend({
      type: "set_chat_schema",
      chatId: state.activeChat?.id,
      schemaId: getActiveTrackerPresetKey(state.settings)
    });
  }
}
function handleChange(event) {
  const target = event.target;
  if (!target?.dataset.setting || !state) return;
  applySettingValue(target);
  render();
  if (target.dataset.autosave === "settings") saveSettingsFromDom();
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
  if (key === "activeTrackerPresetKey" || key === "activeSchemaPresetKey" || key === "activeSchemaId") {
    const activeKey = String(owner[key] ?? "");
    settings.activeTrackerPresetKey = activeKey;
    settings.activeSchemaPresetKey = activeKey;
    settings.activeSchemaId = activeKey;
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
function savePresetFromDom(editor) {
  if (!state) return;
  try {
    const settings = structuredClone(state.settings);
    const previousKey = getActiveTrackerPresetKey(settings);
    const previous = settings.schemaPresets[previousKey];
    const preset = readPresetFromDom(editor, previous);
    if (preset.key !== previousKey && settings.schemaPresets[preset.key]) {
      throw new Error(`A tracker preset already exists with id "${preset.key}".`);
    }
    if (preset.key !== previousKey && previousKey !== "scene") {
      delete settings.schemaPresets[previousKey];
    }
    settings.schemaPresets[preset.key] = preset;
    setActivePreset(settings, preset.key);
    persistSettings(settings, preset.key);
  } catch (error) {
    showErrorModal(error instanceof Error ? error.message : String(error));
  }
}
function readPresetFromDom(editor, previous) {
  const id = sanitizeId(readPresetField(editor, "id")) || previous?.key || "tracker";
  const schemaText = readPresetField(editor, "schema") || JSON.stringify(previous?.schema ?? defaultSettings.schemaPresets.scene.schema, null, 2);
  const schema = JSON.parse(schemaText);
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
    throw new Error("Tracker preset JSON schema must be an object.");
  }
  const templateHtml = readPresetField(editor, "templateHtml") || previous?.templateHtml || defaultSettings.schemaPresets.scene.templateHtml;
  const mode = readPresetField(editor, "structuredOutputMode");
  const templateEngine = readPresetField(editor, "templateEngine");
  const preset = {
    id,
    key: id,
    name: readPresetField(editor, "name") || previous?.name || id,
    description: readPresetField(editor, "description") || void 0,
    schema,
    jsonSchema: schema,
    templateHtml,
    renderTemplate: templateHtml,
    systemPrompt: readPresetField(editor, "systemPrompt") || previous?.systemPrompt || DEFAULT_SYSTEM_PROMPT,
    extractionPrompt: readPresetField(editor, "trackerInstructionPrompt") || previous?.extractionPrompt || DEFAULT_EXTRACTION_PROMPT,
    trackerInstructionPrompt: readPresetField(editor, "trackerInstructionPrompt") || previous?.trackerInstructionPrompt || DEFAULT_EXTRACTION_PROMPT,
    jsonPromptTemplate: readPresetField(editor, "jsonPromptTemplate") || previous?.jsonPromptTemplate || DEFAULT_JSON_PROMPT_TEMPLATE,
    xmlPromptTemplate: readPresetField(editor, "xmlPromptTemplate") || previous?.xmlPromptTemplate || DEFAULT_XML_PROMPT_TEMPLATE,
    toonPromptTemplate: readPresetField(editor, "toonPromptTemplate") || previous?.toonPromptTemplate || DEFAULT_TOON_PROMPT_TEMPLATE,
    ...mode ? { structuredOutputMode: mode } : {},
    ...templateEngine ? { templateEngine } : {},
    createdAt: previous?.createdAt ?? Date.now(),
    updatedAt: Date.now()
  };
  const engine = preset.templateEngine ?? state?.settings.templateEngine ?? "handlebars";
  assertTrackerTemplateRenders(preset.renderTemplate, schemaToExample(preset.schema), {
    templateEngine: engine,
    label: `Tracker preset "${preset.name}" (${preset.key})`
  });
  const warnings = getTemplateCompatibilityWarnings(preset.renderTemplate);
  if (warnings.length > 0) console.warn(`Tracktor preset "${preset.name}" (${preset.key}) warnings: ${warnings.join(" ")}`);
  return preset;
}
function readPresetField(editor, field) {
  const input = editor.querySelector(`[data-preset-field="${field}"]`);
  if (!input) return "";
  return input instanceof HTMLTextAreaElement ? input.value : input.value.trim();
}
function getPresetEditorForAction(button) {
  return button.closest("[data-preset-editor]") ?? getRootForAction(button);
}
function createNewPreset() {
  if (!state) return;
  const settings = structuredClone(state.settings);
  const base = defaultSettings.schemaPresets.scene;
  const key = makeUniquePresetKey(settings, "tracker_preset");
  settings.schemaPresets[key] = {
    ...structuredClone(base),
    id: key,
    key,
    name: "New Tracker Preset",
    description: "Custom tracker preset.",
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  setActivePreset(settings, key);
  persistSettings(settings, key);
}
function duplicateActivePreset() {
  if (!state) return;
  const settings = structuredClone(state.settings);
  const active = getActiveTrackerPreset(settings);
  if (!active) return;
  const key = makeUniquePresetKey(settings, `${active.key}_copy`);
  settings.schemaPresets[key] = {
    ...structuredClone(active),
    id: key,
    key,
    name: `${active.name} Copy`,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  setActivePreset(settings, key);
  persistSettings(settings, key);
}
async function deleteActivePreset() {
  if (!state) return;
  const settings = structuredClone(state.settings);
  const key = getActiveTrackerPresetKey(settings);
  if (key === "scene") return;
  const confirmed = typeof ctxRef.ui?.showConfirm === "function" ? (await ctxRef.ui.showConfirm({
    title: "Delete Tracker Preset",
    message: `Delete tracker preset "${settings.schemaPresets[key]?.name ?? key}"?`,
    variant: "danger",
    confirmLabel: "Delete"
  })).confirmed : window.confirm(`Delete tracker preset "${settings.schemaPresets[key]?.name ?? key}"?`);
  if (!confirmed) return;
  delete settings.schemaPresets[key];
  setActivePreset(settings, settings.schemaPresets.scene ? "scene" : Object.keys(settings.schemaPresets)[0] ?? "scene");
  persistSettings(settings);
}
function restoreBuiltInPreset() {
  if (!state) return;
  const settings = structuredClone(state.settings);
  settings.schemaPresets.scene = structuredClone(defaultSettings.schemaPresets.scene);
  setActivePreset(settings, "scene");
  persistSettings(settings, "scene");
}
function makeUniquePresetKey(settings, base) {
  const sanitizedBase = sanitizeId(base) || "tracker_preset";
  let key = sanitizedBase;
  let index = 2;
  while (settings.schemaPresets[key]) {
    key = `${sanitizedBase}_${index}`;
    index += 1;
  }
  return key;
}
function setActivePreset(settings, key) {
  settings.activeTrackerPresetKey = key;
  settings.activeSchemaPresetKey = key;
  settings.activeSchemaId = key;
}
function persistSettings(settings, validatePresetKey) {
  if (!state) return;
  state.settings = deepMergeSettings(settings, settings.schemaPresets);
  ctxRef.sendToBackend({ type: "save_settings", settings: state.settings, ...validatePresetKey ? { validatePresetKey } : {} });
  render();
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
      button { border: 1px solid var(--lumiverse-border, #444); background: var(--lumiverse-fill, #111); color: inherit; border-radius: 7px; cursor: pointer; }
      button:hover, button:focus-visible { border-color: var(--lumiverse-border-hover, #777); outline: none; }
      .actions { display: flex; gap: 5px; flex-wrap: nowrap; align-items: center; }
      .icon-button { width: 30px; height: 30px; padding: 0; display: inline-grid; place-items: center; flex: 0 0 auto; }
      .icon-button svg { width: 15px; height: 15px; display: block; }
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
          <button class="icon-button" data-action="regenerate" title="Regenerate tracker" aria-label="Regenerate tracker">${ICON_REGENERATE}</button>
          <button class="icon-button" data-action="edit" title="Edit tracker JSON" aria-label="Edit tracker JSON">${ICON_EDIT}</button>
          <button class="icon-button" data-action="delete" title="Delete tracker" aria-label="Delete tracker">${ICON_DELETE}</button>
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
var ICON_REGENERATE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.7 6.3A8 8 0 1 0 20 12h-2a6 6 0 1 1-1.76-4.24L13 11h8V3l-3.3 3.3Z"/></svg>';
var ICON_EDIT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 17.25V20h2.75L17.8 8.95 15.05 6.2 4 17.25Zm15.7-10.1a1 1 0 0 0 0-1.42l-1.43-1.43a1 1 0 0 0-1.42 0l-1.1 1.1 2.75 2.75 1.2-1Z"/></svg>';
var ICON_DELETE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 21a2 2 0 0 1-2-2V7h14v12a2 2 0 0 1-2 2H7ZM9 4h6l1 1h4v2H4V5h4l1-1Zm0 6v8h2v-8H9Zm4 0v8h2v-8h-2Z"/></svg>';
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
  .tracktor-primary-actions { margin-top: 8px; }
  .tracktor-icon-actions { flex-wrap: nowrap; }
  .tracktor-icon-button {
    width: 30px;
    height: 30px;
    padding: 0 !important;
    display: inline-grid;
    place-items: center;
    flex: 0 0 auto;
    border-radius: 7px !important;
  }
  .tracktor-icon-button svg { width: 15px; height: 15px; display: block; }
  .tracktor-icon-button:focus-visible { outline: 2px solid var(--lumiverse-accent); outline-offset: 2px; }
  .tracktor-form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .tracktor-common-controls { align-items: end; }
  .tracktor-field-note { display: flex; flex-direction: column; gap: 4px; }
  .tracktor-compact-warning { margin-bottom: 4px; padding: 6px; }
  .tracktor-details {
    border: 1px solid var(--lumiverse-border);
    background: var(--lumiverse-fill-subtle);
    border-radius: 8px;
    padding: 8px;
    margin-top: 8px;
  }
  .tracktor-details > summary {
    cursor: pointer;
    font-size: 12px;
    font-weight: 650;
    color: var(--lumiverse-text);
  }
  .tracktor-details[open] > summary { margin-bottom: 8px; }
  .tracktor-advanced-inline { font-size: 11px; color: var(--lumiverse-text-muted); }
  .tracktor-diagnostic-line, .tracktor-muted { margin: 6px 0 0; color: var(--lumiverse-text-muted); font-size: 12px; }
  .tracktor-section label { display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--lumiverse-text-muted); margin-bottom: 8px; }
  .tracktor-check { flex-direction: row !important; align-items: center; color: var(--lumiverse-text) !important; }
  .tracktor-common-check { min-height: 30px; margin-bottom: 0 !important; }
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
    .tracktor-item-head .tracktor-icon-actions { align-self: flex-start; }
    .tracktor-form-grid, .tracktor-grid { grid-template-columns: 1fr; }
  }
`;
export {
  setup
};
