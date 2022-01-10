let newDisplay = true;
let operatorInput = false;
let currentValue = 0;
let beforeOperator = 0;
let afterOperator = 0;
let operator = "";
let currentOperator = "";

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
        display.textContent += button.value;
        currentValue = +display.textContent;
      }
    }
    if (button.classList.contains("operator")) {
      values.push(currentValue);
      if (values.length === 2) {
        let output = operate(operators[0], values[0], values[1]);
        values = [output];
        operators = [button.value];
        display.textContent = output;
        newDisplay = true;
        return;
      }
      operators.push(button.value);
      newDisplay = true;
      console.log(values, operators);
    }
    if (button.classList.contains("equals")) {
      values.push(currentValue);
      let output = operate(operators[0], values[0], values[1]);
      values = [output];
      display.textContent = output;
      newDisplay = true;
      console.log(values, operators);
    }
    if (button.classList.contains("clear")) {
      values = [];
      operators = [];
      display.textContent = 0;
      newDisplay = true;
    }
    if (button.classList.contains("plusminus")) {
      display.textContent = -display.textContent;
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
      currentValue = display.textContent;
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

// const buttons = document.querySelectorAll("button");
// buttons.forEach((button) =>
//   button.addEventListener("click", () => {
//     if (button.classList.contains("number")) {
//       if (newDisplay) {
//         display.textContent = button.value;
//         currentValue = +display.textContent;
//         newDisplay = false;
//       } else {
//         display.textContent += button.value;
//         currentValue = +display.textContent;
//       }
//     }
//     if (button.classList.contains("operator")) {
//       console.log(input);
//       console.log(input.length);
//       if (input.length >= 4) {
//         console.log(input);
//         output = operate(input[1], input[0], input[2]);
//         display.textContent = output;
//         input.push(+output);
//         input.push(button.value);
//       } else {
//         newDisplay = true;
//         display.textContent = 0;
//         input.push(+currentValue);
//         input.push(button.value);
//       }
//     }
//     if (button.classList.contains("equals")) {
//       input.push(+currentValue);
//       console.log(input);
//       let output = 0;
//       for (let i = 0; i < input.length; i += 3) {
//         output = operate(input[i + 1], input[i], input[i + 2]);
//       }
//       console.log(output);
//       display.textContent = output;
//       input = [output];
//       console.log(input);
//     }
//   })
// );
