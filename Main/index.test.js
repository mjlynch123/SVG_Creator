const LogoGen = require("./index");
const fs = require("fs");

describe("LogoGen", () => {
  describe("generateSVG", () => {
    it("should generate an SVG file with the correct content", () => {
      const logoGenerator = new LogoGen();
      logoGenerator.logoText = "ABC";
      logoGenerator.textColor = "#123456";
      logoGenerator.shape = "circle";
      logoGenerator.shapeColor = "#abcdef";
      logoGenerator.generateSVG();

      const expectedSVGContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="25" fill="#abcdef"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="18" fill="#123456">ABC</text>
    </svg>`;
    
      const svgContent = fs.readFileSync("logo.svg", "utf-8");
      expect(svgContent).toEqual(expectedSVGContent);
    });
  });
});