let newDisplay = true;
let currentValue = 0;
const display = document.querySelector(".display .content");
display.textContent = currentValue;

const buttons = document.querySelectorAll("button");
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    if (button.classList.contains("number")) {
      if (newDisplay) {
        display.textContent = button.value;
        newDisplay = false;
      } else {
        display.textContent += button.value;
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
  return null;
}
