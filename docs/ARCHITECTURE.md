# Tracktor Architecture

Tracktor ports the useful zTracker ideas into Lumiverse's Spindle model.

## zTracker Behaviors Preserved

- Tracker state lives on the message that owns it.
- A chat can choose a schema preset without forcing old messages to migrate.
- Tracker generation can include recent messages and previous tracker snapshots.
- Sequential generation can request one top-level schema part at a time.
- Prompt injection can add recent tracker snapshots to ordinary chat generations.
- Users can edit tracker JSON manually when the model gets a field wrong.

## Lumiverse Differences

- Backend work runs in a Spindle worker and uses `spindle.generate`, `spindle.chat`, `spindle.chats`, and `spindle.storage`.
- UI is registered as a Lumiverse drawer tab with `ctx.ui.registerDrawerTab`.
- Inline display uses `ctx.messages.renderWidget`, not SillyTavern message DOM mutation.
- Prompt injection uses `spindle.registerInterceptor`, not a SillyTavern `generate_interceptor` global.
- Tracker data is persisted through `spindle.chat.updateMessage(..., { metadata })`.

## Current First-Pass Limits

- The stable output path is JSON. XML/TOON can be added later, but JSON is the safest Lumiverse-native baseline.
- Auto mode runs after rendered user or assistant messages. It does not pause the host reply pipeline the way zTracker's outgoing SillyTavern auto mode can.
- The HTML template renderer is intentionally small. It supports `{{data.path}}`, `{{this}}`, `{{#each data.list}}...{{/each}}`, `{{join data.list ', '}}`, and `{{json data.path}}`.
