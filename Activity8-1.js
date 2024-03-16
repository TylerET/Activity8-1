"use strict";

let prevCalc = 0;
var calc = "";

document.addEventListener("DOMContentLoaded", function () {
  const getCalcVal = () => {
    return document.frmCalc.txtNumber;
  };

  function showNum(value) {
    return () => {
      getCalcVal().value += value;
    };
  }

  const operation = (operation) => {
    return () => {
      let num = parseFloat(getCalcVal().value);
      if (!isNaN(num)) {
        prevCalc = num;
        getCalcVal().value = "";
        calc = operation;
      }
    };
  };

  const setButtonListeners = () => {
    const buttons = document.querySelectorAll('input[type="button"]');
    buttons.forEach((btn) => {
      if (!isNaN(btn.value) || btn.value === ".") {
        btn.addEventListener("click", showNum(btn.value));
      } else if (btn.value === "Calculate") {
        btn.addEventListener("click", calculate);
      } else if (btn.value === "Clear") {
        btn.addEventListener("click", clear);
      } else {
        btn.addEventListener("click", operation(btn.value));
      }
    });
  };

  function calculate() {
    var num = parseFloat(getCalcVal().value);
    if (!isNaN(num)) {
      let total = buttonMap[calc](prevCalc, num);
      getCalcVal().value = total;
    }
  }

  function clear() {
    getCalcVal().value = "";
    prevCalc = 0;
    calc = "";
  }

  const buttonMap = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "^": (a, b) => Math.pow(a, b),
    "^2": (a) => Math.pow(a, 2),
    "/": (a, b) => a / b,
    "++": (a) => a + 1,
    "--": (a) => a - 1,
    "sqrt()": (a) => Math.sqrt(a),
    Floor: (a) => Math.floor(a),
    Round: (a) => Math.round(a),
    Calculate: calculate,
    Clear: clear,
  };

  setButtonListeners();
});
