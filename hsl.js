// hsl.js v1.0.1
// https://github.com/NightmareZ/hsl.js
// Mykhailo Makarov, MIT License
// m.m.makarov@gmail.com

// converts hsl [0..360, 0..100, 0..100] color to rgb [0..255, 0..255, 0..255]
const HSLToRGB = function(...args) {
    const arguments = args.length === 1 ? args[0] : args;

    h = arguments[0] / 360;
    s = arguments[1] / 100;
    l = arguments[2] / 100;

    const hue = (p, q, h) => {
        if (h < 0) h += 1;
        if (h > 1) h -= 1;
        if (h * 6 < 1) return p + (q - p) * h * 6;
        if (h * 2 < 1) return q;
        if (h * 3 < 2) return p + (q - p) * (2 / 3 - h) * 6;
        return p;
    }

    let r, g, b;
    let q, p;

    if (s === 0) {
        r = g = b = 0;
    }
    else {
        q = l < 0.5
            ? l * (s + 1)
            : l + s - (l * s);

        p = l * 2 - q;
        r = hue(p, q, h + 1 / 3);
        g = hue(p, q, h);
        b = hue(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
};

// converts rgb [0..255, 0..255, 0..255] color to hsl [0..360, 0..100, 0..100]
const RGBToHSL = function (...args) {
    const arguments = args.length === 1 ? args[0] : args;

    r = arguments[0] / 255;
    g = arguments[1] / 255;
    b = arguments[2] / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max === min) {
        h = s = 0;
    }
    else {
        const d = max - min;

        s = l < 0.5
            ? d / (max + min)
            : d / (2 - max - min);

        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
};

if (exports) {
    exports.HSLToRGB = HSLToRGB;
    exports.RGBToHSL = RGBToHSL;
}