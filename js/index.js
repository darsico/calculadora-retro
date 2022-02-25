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

  const numbers = [...document.querySelectorAll(".calculator__body-button-number")];

  numbers.map((element) => {
    element.addEventListener("click", (e) => {
      handleNumberClick(e.target.id.toString());
    });
  });

  //DECIMAL
  const decimal = document.getElementById("decimal");

  decimal.addEventListener("click", () => {
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

  const clear = document.getElementById("clear");
  clear.addEventListener("click", handleClearClick);

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

  const back = document.getElementById("back");
  back.addEventListener("click", handleBackClick);
};

document.addEventListener("DOMContentLoaded", documentReady);
