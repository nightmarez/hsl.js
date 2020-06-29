const { HSLToRGB, RGBToHSL } = require('../hsl.js');
 
it("should convert colors", function() {
    const expectedResult = [127, 0, 0];
    const result = HSLToRGB(RGBToHSL(expectedResult));

    if (expectedResult.length !== result.length || !expectedResult.every((value, index) => value === result[index])) {
        throw new Error(`Expected ${expectedResult}, but got ${result}`);
    }
});