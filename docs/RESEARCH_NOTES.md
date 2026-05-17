# Research Notes

## Lumiverse Spindle Docs Used

- Quick Start: Lumiverse extensions use `spindle.json`, optional backend/frontend entries, and `dist/backend.js` plus `dist/frontend.js`.
- Manifest: `spindle.json` requires version, name, identifier, author, GitHub, homepage, permissions, and entry points.
- Permissions: Tracktor maps to `generation`, `chats`, `chat_mutation`, and `interceptor`. Drawer tabs, DOM helpers, storage, variables, toasts, and frontend/backend messages are free tier.
- Backend Events: `MESSAGE_SENT`, `USER_MESSAGE_RENDERED`, `CHARACTER_MESSAGE_RENDERED`, and `CHAT_CHANGED` are the useful lifecycle hooks for tracker refresh and auto mode.
- Generation: `spindle.generate.quiet()` is the safest default because it uses the user's active connection profile and preset parameters.
- Storage: extension storage is used for global settings and per-chat schema selection.
- Variables: latest tracker export can use `spindle.variables.chat.set(chatId, key, value)` so prompts can reference `{{@tracktor}}`.
- Chats and Chat Mutation: `spindle.chats.getActive()` locates the chat; `spindle.chat.getMessages()` reads messages; `spindle.chat.updateMessage()` persists message metadata.
- Interceptors: `spindle.registerInterceptor()` injects recent tracker snapshots into normal generations with Prompt Breakdown attribution.
- Frontend UI Placement: drawer tabs are the persistent home for settings and dashboards; input bar actions provide a quick "generate latest" command.
- DOM Helper and Message Widgets: normal UI renders in host DOM; inline tracker cards use `ctx.messages.renderWidget()`.

## zTracker/WTracker Behaviors Studied

- WTracker established the basic schema-driven tracker pattern: user-editable JSON schema, HTML template, and model-generated structured data.
- zTracker added the pieces that matter for a durable Lumiverse port:
  - schema presets and per-chat schema selection;
  - tracker data persisted on individual messages;
  - parser repair around model JSON output;
  - sequential top-level part generation for large trackers;
  - targeted regeneration/cleanup ideas;
  - prompt injection of recent tracker snapshots;
  - UI feedback around manual and auto tracker generation.

## Porting Decisions

- Tracktor stores full records in user storage and mirrors only `{ snapshotId, updatedAt }` in `message.metadata.tracktor`.
- Tracktor starts with JSON and native JSON-schema modes; XML/TOON can be layered in later.
- Auto mode runs after rendered user or assistant messages. It does not try to pause the host generation pipeline.
- Inline UI is implemented as Lumiverse message widgets so it survives route redraws and does not depend on internal message DOM classes.
- zTracker/WTracker Handlebars templates are supported through real Handlebars plus post-render sanitization. The simple renderer remains available as a fallback mode.
- Prompt injection should select snapshots by chat message order, not snapshot edit time, so edited old trackers do not masquerade as the latest scene state.
