const calculator = {
  displayValue: "0",
  firstOpearnd: null,
  waitingForSecondOperand: false,
  operator: null
};

const inputDigit = digit => {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
  // console.log("Input digit", calculator);
};

const inputDecimal = dot => {
  if (calculator.waitingForSecondOperand === true) return;

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
};

const handleOperator = nextOperator => {
  const { firstOpearnd, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOpearnd == null) {
    calculator.firstOpearnd = inputValue;
  } else if (operator) {
    const currentValue = firstOpearnd || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    //console.log(inputValue);
    calculator.displayValue = String(result);
    calculator.firstOpearnd = result;
  }
  //console.log(calculator.firstOpearnd);

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log("Handle operator", calculator);
};

const performCalculation = {
  "/": (firstOpearnd, secondOperand) => firstOpearnd / secondOperand,

  "*": (firstOpearnd, secondOperand) => firstOpearnd * secondOperand,

  "+": (firstOpearnd, secondOperand) => firstOpearnd + secondOperand,

  "-": (firstOpearnd, secondOperand) => firstOpearnd - secondOperand,

  "%": (firstOpearnd, secondOperand) => (firstOpearnd / 100) * secondOperand,

  "=": (firstOpearnd, secondOperand) => secondOperand
};

const updateDisplay = () => {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
};

const resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstOpearnd = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
};

updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", event => {
  const { target } = event;
  //console.log(target);
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    //console.log("operator", target.value);
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    //console.log("decimal", target.value);
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("all-clear")) {
    //console.log("clear", target.value);
    resetCalculator();
    updateDisplay();
    return;
  }

  //console.log("digit", target.value);
  inputDigit(target.value);
  updateDisplay();
});
