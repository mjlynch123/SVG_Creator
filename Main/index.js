const inquirer = require("inquirer");
const fs = require("fs");

class LogoGen {
  constructor() {
    this.text = "";
    this.textColor = "";
    this.shape = "";
    this.shapeColor = "";
  }

  async getUserInput() {
    const textInput = await inquirer.prompt({
      name: "text",
      message: "Enter up to 3 characters:",
      validate: (input) => input.length <= 3,
    });
    this.logoText = textInput.text;

    const textColorInput = await inquirer.prompt({
      name: "color",
      message: "Enter the text color:",
      default: "#000000",
    });
    this.textColor = textColorInput.color;

    const shapeInput = await inquirer.prompt({
      type: "list",
      name: "shape",
      message: "Choose a shape:",
      choices: ["Circle", "Triangle", "Square"],
    });
    this.shape = shapeInput.shape.toLowerCase();

    const shapeColorInput = await inquirer.prompt({
      name: "color",
      message: `Enter the ${this.shape} color:`,
      default: "#ffffff",
    });
    this.shapeColor = shapeColorInput.color;
  }

  generateSVG() {
    let shapeContent;
    switch (this.shape) {
      case "circle":
        shapeContent = `<circle cx="25" cy="25" r="25" fill="${this.shapeColor}"/>`;
        break;
      case "triangle":
        shapeContent = `<polygon points="25,5 45,45 5,45" fill="${this.shapeColor}"/>`;
        break;
      case "square":
        shapeContent = `<rect width="40" height="40" x="5" y="5" fill="${this.shapeColor}"/>`;
        break;
      default:
        shapeContent = "";
        break;
    }

    const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" viewBox="0 0 50 50">
        ${shapeContent}
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="18" fill="${this.textColor}">${this.logoText}</text>
    </svg>`;
    fs.writeFileSync("logo.svg", svgContent);
    console.log("Generated logo.svg");
  }
}

async function run() {
  const logoGenerator = new LogoGen();
  await logoGenerator.getUserInput();
  logoGenerator.generateSVG();
}

run();
module.exports = LogoGen;