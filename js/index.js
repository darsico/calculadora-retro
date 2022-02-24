"use strict";
const documentReady = () => {
  const displayScreenContent = document.getElementById("screen-content");

  // const formatNumber = (numberToFormat) => {
  //   let number = parseInt(numberToFormat, 10);
  //   let formattedNumber = number.toLocaleString();
  //   return formattedNumber;
  // };

  // const printContent = (content) => {
  //   content === ""
  //     ? (displayScreenContent.innerText = content)
  //     : (displayScreenContent.innerText += formatNumber(content));
  // };
  // const reverseFormattedNumber = (formattedNumber) => {
  //   return Number(formattedNumber.replace(/,/g, ""));
  // };

  // OPERATOR BUTTONS
  const operators = [
    ...document.querySelectorAll(".calculator__body-button-operator"),
  ];
  operators.map((element) => {
    element.addEventListener("click", (e) => {
      console.log(`clicked:  ${e.target.id}`);
    });
  });

  // NUMBER BUTTONS
  const numbers = [
    ...document.querySelectorAll(".calculator__body-button-number"),
  ];
  // TODO: implement formatted numbers
  const handleNumberClick = (numberStr) => {
    const currentNumberStr = displayScreenContent.textContent;
    displayScreenContent.textContent = currentNumberStr + numberStr;
  };

  numbers.map((element) => {
    element.addEventListener("click", (e) => {
      handleNumberClick(e.target.id.toString());
    });
  });

  // CLEAR
  const clear = document.getElementById("clear");
  clear.addEventListener("click", () => {
    displayScreenContent.textContent = "";
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
