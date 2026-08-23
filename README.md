# Flags — A touch of color

Go to **[https://dirdam.squadro.app/flags/](https://dirdam.squadro.app/flags/)** to access the app.

An interactive world map with two modes:

- **Same color flags** — hover a country to highlight every other country sharing its
  exact flag-color palette, or click legend colors to filter by them.
- **Flag blender** — every country is filled with a paint-mixed (not digitally averaged)
  blend of its real flag's colors; hover or click a country to see its actual flag next
  to that blend.

Click a country to pin its info panel while you explore. Use the +/- buttons to zoom
the map, and click-and-drag to pan around once zoomed in. Available in English,
Spanish, and Japanese.

Fully static (no backend, no build step, no external CDN dependencies) — `index.html`
plus the `assets/` it references. `tools/` holds dev-time-only scripts: a notebook that
derives the simplified same-color palette data, and `blend_colors.py`, which derives the
Flag blender's per-country blend colors — both baked into `index.html`; neither is
needed at runtime.
