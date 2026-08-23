"""
Precompute one "paint-blended" color per country for the Flags app's Blend
map mode.

For each country, rasterizes its assets/real_flags/<code>.svg, then mixes
every pixel's color together using pigment-style (Kubelka-Munk, via the
`mixbox` library) mixing rather than a naive RGB average — so e.g. a
blue+yellow flag blends toward green the way real paint would, not toward
the muddy gray a straight digital RGB average gives.

Usage:
    python3 -m venv /tmp/blendenv
    /tmp/blendenv/bin/pip install pymixbox cairosvg Pillow
    /tmp/blendenv/bin/python tools/blend_colors.py

Writes tools/flags_blend_colors.json ({code: {"color": "#rrggbb", "ratio":
width/height}}). Copy that data into index.html's BLEND_COLORS/FLAG_ASPECT
constants by hand after reviewing it (this script is a dev-time tool, not
run at deploy time).
"""
import io
import json
import os

import cairosvg
import mixbox
from PIL import Image

REAL_FLAGS_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets', 'real_flags')
INDEX_HTML = os.path.join(os.path.dirname(__file__), '..', 'index.html')
OUTPUT_JSON = os.path.join(os.path.dirname(__file__), 'flags_blend_colors.json')

RASTER_WIDTH = 120
# Round each channel to a multiple of this before counting distinct colors —
# collapses antialiasing noise so a detailed flag (e.g. Brazil's globe) has a
# few hundred, not tens of thousands, of "distinct" colors to latent-convert.
QUANTIZE_STEP = 4


def get_map_country_codes():
    """The 2-letter codes the app actually tracks a country for — read from
    index.html's `countries_colors` object (the same data every other
    per-country feature, e.g. the Same-color legend, keys off of). Bigger
    countries are `<path class="landxx ...">`, but many small island nations
    only get a `<circle class="circlexx ...">` marker, so parsing map SVG
    classes directly (an earlier version of this script did that) silently
    drops those — `countries_colors` is the reliable superset."""
    with open(INDEX_HTML, encoding='utf-8') as f:
        html = f.read()
    start = html.index('const countries_colors = {')
    end = html.index('function getSimilar')
    block = html[start + len('const countries_colors = '):end]
    block = block.rsplit('}', 1)[0] + '}'
    return sorted(json.loads(block).keys())


def quantize(channel_value):
    return min(255, (channel_value // QUANTIZE_STEP) * QUANTIZE_STEP)


def blend_flag(svg_path):
    png_bytes = cairosvg.svg2png(url=svg_path, output_width=RASTER_WIDTH, background_color='white')
    img = Image.open(io.BytesIO(png_bytes)).convert('RGB')

    counts = {}
    for r, g, b in img.getdata():
        key = (quantize(r), quantize(g), quantize(b))
        counts[key] = counts.get(key, 0) + 1

    total = sum(counts.values())
    latent_mix = [0.0] * mixbox.LATENT_SIZE
    for rgb, count in counts.items():
        weight = count / total
        latent = mixbox.rgb_to_latent(rgb)
        for i in range(mixbox.LATENT_SIZE):
            latent_mix[i] += weight * latent[i]

    r, g, b = mixbox.latent_to_rgb(latent_mix)
    color = '#{:02x}{:02x}{:02x}'.format(r, g, b)
    ratio = round(img.width / img.height, 3)
    return color, ratio


def main():
    codes = get_map_country_codes()
    result = {}
    missing = []
    for code in codes:
        svg_path = os.path.join(REAL_FLAGS_DIR, f'{code}.svg')
        if not os.path.isfile(svg_path):
            missing.append(code)
            continue
        color, ratio = blend_flag(svg_path)
        result[code] = {'color': color, 'ratio': ratio}
        print(code, color, ratio)

    if missing:
        print('No real_flags asset for:', ', '.join(missing))

    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(result, f, sort_keys=True, indent=None, separators=(',', ':'))
    print(f'\nWrote {len(result)} colors to {OUTPUT_JSON}')


if __name__ == '__main__':
    main()
