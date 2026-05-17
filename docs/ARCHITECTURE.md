# Tracktor Architecture

Tracktor ports the useful zTracker ideas into Lumiverse's Spindle model.

## zTracker Behaviors Preserved

- Tracker state lives on the message that owns it.
- A chat can choose a tracker preset without forcing old messages to migrate.
- Tracker generation can include recent messages and previous tracker snapshots.
- Sequential generation can request one top-level schema part at a time.
- Prompt injection can add recent tracker snapshots to ordinary chat generations.
- Users can edit tracker JSON manually when the model gets a field wrong.

## Lumiverse Differences

- Backend work runs in a Spindle worker and uses `spindle.generate`, `spindle.chat`, `spindle.chats`, and `spindle.storage`.
- UI is registered as a Lumiverse drawer tab with `ctx.ui.registerDrawerTab`.
- Inline display uses `ctx.messages.renderWidget`, not SillyTavern message DOM mutation.
- Prompt injection uses `spindle.registerInterceptor`, not a SillyTavern `generate_interceptor` global.
- Tracker data is persisted in `spindle.userStorage`; message metadata stores only a small mirror when chat mutation is available.

## Current First-Pass Limits

- The stable output path is JSON. XML/TOON prompt fallback settings are preserved, but JSON remains the safest Lumiverse-native baseline.
- Auto mode runs after rendered user or assistant messages. It does not pause the host reply pipeline the way zTracker's outgoing SillyTavern auto mode can.
- Template rendering uses real Handlebars by default, with a simple fallback engine kept for compatibility. Rendered HTML is sanitized before display.
- World-book filtering, character auto-mode exclusion, cleanup flows, array item regeneration, and field-level regeneration are preserved as future zTracker-parity work, not active behavior in this build.
