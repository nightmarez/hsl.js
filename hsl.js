// hsl.js v1.0.4
// https://github.com/nightmarez/hsl.js
// Mykhailo Makarov, MIT License
// m.m.makarov@gmail.com

// converts hsl [0..360, 0..100, 0..100] color to rgb [0..255, 0..255, 0..255]
const HSLToRGB = function(...args) {
    const arguments = args.length === 1 ? args[0] : args;

    let h = arguments[0] / 360;
    let s = arguments[1] / 100;
    let l = arguments[2] / 100;

    const hue = (p, q, h) => {
        if (h < 0) h += 1;
        if (h > 1) h -= 1;
        if (h * 6 < 1) return p + (q - p) * h * 6;
        if (h * 2 < 1) return q;
        if (h * 3 < 2) return p + (q - p) * (2 / 3 - h) * 6;
        return p;
    }

    let r, g, b;

    if (s === 0) {
        r = g = b = 0;
    } else {
        let q = l < 0.5
            ? l * (s + 1)
            : l + s - (l * s);

        let p = l * 2 - q;
        r = hue(p, q, h + 1 / 3);
        g = hue(p, q, h);
        b = hue(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
};

// converts hsl [0..360, 0..100, 0..100] color to hsv [0..360, 0..100, 0..100]
const HSLToHSV = function(...args) {
    const arguments = args.length === 1 ? args[0] : args;

    let h = arguments[0] / 360;
    let s = arguments[1] / 100;
    let l = arguments[2] / 100;

    let v = l + s * Math.min(l, 1 - l);

    if (v == 0) {
        s = 0;
    } else {
        s = 2 * (1 - l / v);
    }

    return [h * 360, s * 100, v * 100];
};

// converts hsv [0..360, 0..100, 0..100] color to hsl [0..360, 0..100, 0..100]
const HSVToHSL = function(...args) {
    const arguments = args.length === 1 ? args[0] : args;

    let h = arguments[0] / 360;
    let s = arguments[1] / 100;
    let v = arguments[2] / 100;

    let l = v * (1 - s / 2);

    if (l == 0 || l == 1) {
        s = 0;
    } else {
        s = (v - l) / Math.min(l, 1 - l);
    }

    return [h * 360, s * 100, l * 100];
};

// converts hsv [0..360, 0..100, 0..100] color to rgb [0..255, 0..255, 0..255]
const HSVToRGB = function(...args) {
    const hsl = HSVToHSL(args);
    return HSLToRGB(hsl);
};

// converts rgb [0..255, 0..255, 0..255] color to hsl [0..360, 0..100, 0..100]
const RGBToHSL = function(...args) {
    const arguments = args.length === 1 ? args[0] : args;

    let r = arguments[0] / 255;
    let g = arguments[1] / 255;
    let b = arguments[2] / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max === min) {
        h = s = 0;
    } else {
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

// converts rgb [0..255, 0..255, 0..255] color to hsv [0..360, 0..100, 0..100]
const RGBToHSV = function(...args) {
    const hsl = RGBToHSL(args);
    return HSLToHSV(hsl);
};

if (exports) {
    exports.HSLToRGB = HSLToRGB;
    exports.HSLToHSV = HSLToHSV;
    exports.HSVToHSL = HSVToHSL;
    exports.HSVToRGB = HSVToRGB;
    exports.RGBToHSL = RGBToHSL;
    exports.RGBToHSV = RGBToHSV;
}
