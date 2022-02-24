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

  // const printContent = (content) => {
  //   content === ""
  //     ? (valueElement.innerText = content)
  //     : (valueElement.innerText += formatNumber(content));
  // };
  // const reverseFormattedNumber = (formattedNumber) => {
  //   return Number(formattedNumber.replace(/,/g, ""));
  // };

  // OPERATOR BUTTONS
  const operators = [...document.querySelectorAll(".calculator__body-button-operator")];
  operators.map((element) => {
    element.addEventListener("click", (e) => {
      console.log(`clicked:  ${e.target.id}`);
    });
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
  const clear = document.getElementById("clear");
  clear.addEventListener("click", () => {
    valueElement.textContent = "0";
  });

  // BACK
  const back = document.getElementById("back");
  back.addEventListener("click", function () {
    let output = reverseFormattedNumber(getScreenContent().toString());
    if (output) {
      output = output.substr(0, output.length - 1);
      printContent(output);
    }
  });
};

document.addEventListener("DOMContentLoaded", documentReady);
