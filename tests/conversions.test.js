const { HSLToRGB, RGBToHSV, HSVToHSL, HSLToHSV, HSVToRGB, RGBToHSL } = require('../hsl.js');
 
it("should convert colors", function() {
    const source = [127, 0, 0];
    let result = source;
    const functions = [RGBToHSV, HSVToHSL, HSLToRGB, RGBToHSL, HSLToHSV, HSVToRGB];
    
    for (let func of functions) {
        result = func(result[0], result[1], result[2]);
        console.log(func);
        console.log(result);
    }

    if (source.length !== result.length || !source.every((value, index) => value === result[index])) {
        throw new Error(`Expected ${source}, but got ${result}`);
    }
});