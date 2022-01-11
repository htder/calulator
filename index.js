let newDisplay = true;
let currentValue = 0;

let values = [];
let operators = [];
const display = document.querySelector(".display .content");
display.textContent = currentValue;

const buttons = document.querySelectorAll("button");
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      if (newDisplay) {
        display.textContent = button.value;
        currentValue = +display.textContent;
        newDisplay = false;
      } else {
        if (display.textContent.length === 17) return;
        display.textContent += button.value;
        currentValue = +display.textContent;
      }
    }
    if (button.classList.contains("operator")) {
      values.push(currentValue);
      if (values.length === 2) {
        let output = operate(operators[0], values[0], values[1]);
        if (output === "ERROR" || output === "Infinity") {
          values = [];
          operators = [];
          error();
          return;
        }
        values = [output];
        operators = [button.value];
        display.textContent = output;
        let stringOutput = display.textContent + "";
        if (stringOutput.length > 17) {
          display.textContent = numberLength(display.textContent);
          values = [+display.textContent];
        }
        newDisplay = true;
        return;
      }
      operators.push(button.value);
      newDisplay = true;
    }
    if (button.classList.contains("equals")) {
      values.push(currentValue);
      let output = operate(operators[0], values[0], values[1]);
      if (output === "ERROR" || output === "Infinity") {
        values = [];
        operators = [];
        error();
        return;
      }
      values = [output];
      display.textContent = output;
      let stringOutput = display.textContent + "";
      if (stringOutput.length > 17) {
        display.textContent = numberLength(display.textContent);
        values = [+display.textContent];
      }
      newDisplay = true;
    }
    if (button.classList.contains("clear")) {
      values = [];
      operators = [];
      display.textContent = 0;
      newDisplay = true;
    }
    if (button.classList.contains("plusminus")) {
      display.textContent = -display.textContent;
      currentValue = +display.textContent;
    }
    if (button.classList.contains("percent")) {
      if (values.length === 0) return;
      if (operators[0] === "+") {
        display.textContent = (values[0] * (1 + currentValue / 100)).toFixed(2);
        currentValue = +display.textContent;
        values = [];
        operators = [];
      }
      if (operators[0] === "-") {
        display.textContent = (values[0] * (1 - currentValue / 100)).toFixed(2);
        currentValue = +display.textContent;
        values = [];
        operators = [];
      }
      if (operators[0] === "/" || operators[0] === "*") {
        values = [];
        operators = [];
        error();
        return;
      }
    }
    if (button.classList.contains("decimal")) {
      if (newDisplay) {
        display.textContent = `0${button.value}`;
        newDisplay = false;
      } else {
        if (/^\d+\./.test(display.textContent)) {
          return;
        }
        display.textContent += button.value;
        currentValue = +display.textContent;
      }
    }
    if (button.classList.contains("delete")) {
      if (display.textContent === "0") return;
      display.textContent = display.textContent.slice(
        0,
        display.textContent.length - 1
      );
      currentValue = +display.textContent;
      if (display.textContent === "") {
        display.textContent = "0";
        return;
      }
    }
  })
);

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x, y) {
  if (operator === "+") return add(x, y);
  if (operator === "-") return subtract(x, y);
  if (operator === "*") return multiply(x, y);
  if (operator === "/") return divide(x, y);
  return "ERROR";
}

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

function error() {
  async function slowLoop() {
    display.textContent = "ERROR";

    await wait(1200);
    display.textContent = "0";
  }
  slowLoop();
}

function numberLength(value) {
  let stringValue = "" + value;
  if (stringValue.length > 17) {
    return +stringValue.substring(0, 17);
  }
  return value;
}
