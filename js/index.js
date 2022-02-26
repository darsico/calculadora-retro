"use strict";
const documentReady = () => {
  const valueElement = document.getElementById("screen-value");

  const getValueAsStr = () => valueElement.textContent.split(",").join("");

  const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
  };

  const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === ".") {
      valueElement.textContent += ".";
      return;
    }
    const [wholeNumberStr, decimalStr] = valueStr.split(".");
    if (decimalStr) {
      valueElement.textContent = parseFloat(wholeNumberStr).toLocaleString("en") + "." + decimalStr;
    } else {
      valueElement.textContent = parseFloat(wholeNumberStr).toLocaleString("en");
    }
  };

  // VARIABLES IN MEMORY
  let valueStrInMemory = null;
  let operatorInMemory = null;

  // OPERATOR BUTTONS
  const getResultOfOperationAsStr = () => {
    const currentValueNumber = getValueAsNum();
    const valueNumberInMemory = parseFloat(valueStrInMemory);
    let newValueNumber;
    // TODO: Can you refactor this code on a Switch or another alternative?
    if (operatorInMemory === "sum") {
      newValueNumber = valueNumberInMemory + currentValueNumber;
    } else if (operatorInMemory === "subtraction") {
      newValueNumber = valueNumberInMemory - currentValueNumber;
    } else if (operatorInMemory === "division") {
      newValueNumber = valueNumberInMemory / currentValueNumber;
    } else if (operatorInMemory === "multiplication") {
      newValueNumber = valueNumberInMemory * currentValueNumber;
    }
    return newValueNumber.toString();
  };

  const handleOperatorClick = (operator) => {
    operatorSound.play();
    const currentValueStr = getValueAsStr();

    if (!valueStrInMemory) {
      valueStrInMemory = currentValueStr;
      operatorInMemory = operator;
      setStrAsValue("0");
      return;
    }

    valueStrInMemory = getResultOfOperationAsStr();
    operatorInMemory = operator;
    setStrAsValue("0");
  };
  const operatorSound = new Audio();
  operatorSound.src = "../sounds/operator-sound.wav";

  const sum = document.getElementById("sum");
  const subtraction = document.getElementById("subtraction");
  const multiplication = document.getElementById("multiplication");
  const division = document.getElementById("division");

  sum.addEventListener("click", () => handleOperatorClick("sum"));
  subtraction.addEventListener("click", () => handleOperatorClick("subtraction"));
  multiplication.addEventListener("click", () => handleOperatorClick("multiplication"));
  division.addEventListener("click", () => handleOperatorClick("division"));

  //EQUAL
  const handleEqualClick = () => {
    operatorSound.play();
    if (valueStrInMemory) {
      const newValueStr = getResultOfOperationAsStr();
      if (parseFloat(newValueStr) > Math.floor(newValueStr)) {
        const newValueFixed = parseFloat(newValueStr).toFixed(3);
        setStrAsValue(newValueFixed);
        valueStrInMemory = null;
        operatorInMemory = null;
      } else {
        setStrAsValue(newValueStr);
        valueStrInMemory = null;
        operatorInMemory = null;
      }
    }
  };

  const equal = document.getElementById("equal");
  equal.addEventListener("click", () => {
    handleEqualClick();
  });

  // NUMBERS

  const handleNumberClick = (numberStr) => {
    const currentValueStr = getValueAsStr();
    if (currentValueStr === "0") {
      valueElement.textContent = numberStr;
    } else {
      setStrAsValue(currentValueStr + numberStr);
    }
  };

  const numberSound = new Audio();
  numberSound.src = "../sounds/number-sound.wav";
  const numbers = [...document.querySelectorAll(".calculator__body-button-number")];

  numbers.map((element) => {
    element.addEventListener("click", (e) => {
      numberSound.play();
      handleNumberClick(e.target.id.toString());
    });
  });

  //DECIMAL
  const decimal = document.getElementById("decimal");

  decimal.addEventListener("click", () => {
    operatorSound.play();
    const currentValueStr = getValueAsStr();
    if (!currentValueStr.includes(".")) {
      setStrAsValue(currentValueStr + ".");
    }
  });

  // CLEAR
  const handleClearClick = () => {
    setStrAsValue("0");
    valueStrInMemory = null;
    operatorInMemory = null;
  };

  const cSound = new Audio();
  cSound.src = "../sounds/c-sound.wav";

  const clear = document.getElementById("clear");

  clear.addEventListener("click", () => {
    cSound.play();
    handleClearClick();
  });

  // BACK
  const handleBackClick = () => {
    const valueStr = getValueAsStr();
    const newValueBacked = valueStr.substring(0, valueStr.length - 1);
    if (newValueBacked === "") {
      setStrAsValue("0");
    } else {
      setStrAsValue(newValueBacked);
    }
  };
  const backSound = new Audio();
  backSound.src = "../sounds/back-sound.wav";

  const back = document.getElementById("back");
  back.addEventListener("click", () => {
    backSound.play();
    handleBackClick();
  });

  // DRAGGABLE FEATURE
  const calculatorWrapper = document.querySelector("#calculator-wrapper");
  let draggableWrapper = calculatorWrapper.querySelector("#draggable-wrapper");

  const onDrag = ({ movementX, movementY }) => {
    let getStyle = window.getComputedStyle(calculatorWrapper);
    let left = parseInt(getStyle.left);
    let top = parseInt(getStyle.top);
    calculatorWrapper.style.left = `${left + movementX}px`;
    calculatorWrapper.style.top = `${top + movementY}px`;
  };

  draggableWrapper.addEventListener("mousedown", () => {
    draggableWrapper.classList.add("dragged");
    draggableWrapper.addEventListener("mousemove", onDrag);
  });
  document.addEventListener("mouseup", () => {
    draggableWrapper.classList.remove("dragged");
    draggableWrapper.removeEventListener("mousemove", onDrag);
  });
  draggableWrapper.addEventListener("mouseenter", () => {
    draggableWrapper.classList.add("dragged");
  });
};

document.addEventListener("DOMContentLoaded", documentReady);
