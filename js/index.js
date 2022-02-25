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

  // const reverseFormattedNumber = (formattedNumber) => {
  //   return Number(formattedNumber.replace(/,/g, ""));
  // };
  // Variables
  let valueStrInMemory = null;
  let operatorInMemory = null;

  // OPERATOR BUTTONS
  const handleOperatorClick = (operator) => {
    const currentValueStr = getValueAsStr();
    const currentValueNumber = getValueAsNum();

    if (!valueStrInMemory) {
      valueStrInMemory = currentValueStr;
      operatorInMemory = operator;
      setStrAsValue("0");
      return;
    }
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
    valueStrInMemory = newValueNumber.toString();
    operatorInMemory = operator;
    setStrAsValue("0");
    console.log(valueStrInMemory);
    console.log(operatorInMemory);
  };

  const sum = document.getElementById("sum");
  const subtraction = document.getElementById("subtraction");
  const multiplication = document.getElementById("multiplication");
  const division = document.getElementById("division");

  sum.addEventListener("click", () => handleOperatorClick("sum"));

  subtraction.addEventListener("click", () => handleOperatorClick("subtraction"));

  multiplication.addEventListener("click", () => handleOperatorClick("multiplication"));

  division.addEventListener("click", () => handleOperatorClick("division"));

  const equal = document.getElementById("equal");
  equal.addEventListener("click", () => {
    if (!valueStrInMemory) {
      valueStrInMemory = null;
      operatorInMemory = null;
    }
  });

  // NUMBERS
  const numbers = [...document.querySelectorAll(".calculator__body-button-number")];

  const handleNumberClick = (numberStr) => {
    const currentValueStr = getValueAsStr();
    if (currentValueStr === "0") {
      valueElement.textContent = numberStr;
    } else {
      setStrAsValue(currentValueStr + numberStr);
    }
  };

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
  const back = document.getElementById("back");

  back.addEventListener("click", () => {
    const valueStr = getValueAsStr();

    const valueArr = valueStr.split("");

    valueArr.shift();

    const valueArrBacked = valueArr.join("");
    if (valueArr.length === 0) {
      return setStrAsValue("0");
    }
    valueElement.textContent = valueArrBacked;
  });
  console.log(valueStrInMemory);
};

document.addEventListener("DOMContentLoaded", documentReady);
