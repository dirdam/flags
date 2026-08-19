# Flags — A touch of color

Go to **[https://dirdam.squadro.app/flags/](https://dirdam.squadro.app/flags/)** to access the app.

An interactive world map: hover a country to highlight every other country sharing its
exact flag-color palette, or click legend colors to filter by them. Click a country to
pin its info panel while you explore. Available in English, Spanish, and Japanese.

Fully static (no backend, no build step, no external CDN dependencies) — `index.html`
plus the `assets/` it references. `tools/` holds the dev-time notebook used to derive
the color data baked into `index.html`; it isn't needed at runtime.
