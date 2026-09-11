function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    } else if (operator === "-") {
        return subtract(a, b);
    } else if (operator === "*") {
        return multiply(a, b);
    } else if (operator === "/") {
        return divide(a, b);
    }
}

let firstNumber = "";
let operator = "";
let secondNumber = "";

let shouldResetDisplay = false;

const display = document.querySelector(".display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");

numberButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        if (shouldResetDisplay) {
            display.textContent = "";
            shouldResetDisplay = false;
            firstNumber = "";
            operator = "";
            secondNumber = "";
        }

        if (display.textContent === "0") {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }

        if (operator === "") {
            firstNumber = display.textContent;
        } else {
            secondNumber = display.textContent;
        }

    });
});

operatorButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        let selectedOperator = button.textContent;

        if (selectedOperator === "÷") {
            selectedOperator = "/";
        } else if (selectedOperator === "×") {
            selectedOperator = "*";
        } else if (selectedOperator === "−") {
            selectedOperator = "-";
        }

        if (firstNumber !== "" && secondNumber !== "") {
            const result = operate(
                operator,
                Number(firstNumber),
                Number(secondNumber)
            );

            display.textContent = result;
            firstNumber = result;
            secondNumber = "";
        }

        if (firstNumber !== "") {
            operator = selectedOperator;
            shouldResetDisplay = false;
        }

    });
});

function roundResult(number) {
    return Math.round(number * 100000000) / 100000000;
}

equalsButton.addEventListener("click", function() {

    if (firstNumber === "" || operator === "" || secondNumber === "") {
        return;
    }

    let result = operate(
        operator,
        Number(firstNumber),
        Number(secondNumber)
    );

    if (!Number.isFinite(result)) {
        display.textContent = "Nice try 😏";
        firstNumber = "";
        operator = "";
        secondNumber = "";
        shouldResetDisplay = true;
        return;
    }

    result = roundResult(result);

    display.textContent = result;

    firstNumber = result;
    operator = "";
    secondNumber = "";

    shouldResetDisplay = true;
});

clearButton.addEventListener("click", function() {

    firstNumber = "";
    operator = "";
    secondNumber = "";

    display.textContent = "0";

    shouldResetDisplay = false;

});

decimalButton.addEventListener("click", function() {

    if (shouldResetDisplay) {
        display.textContent = "0";
        shouldResetDisplay = false;
        firstNumber = "";
        operator = "";
        secondNumber = "";
    }

    if (!display.textContent.includes(".")) {
        display.textContent += ".";

        if (operator === "") {
            firstNumber = display.textContent;
        } else {
            secondNumber = display.textContent;
        }
    }

});

backspaceButton.addEventListener("click", function() {

    if (shouldResetDisplay) {
        return;
    }

    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = "0";
    }

    if (operator === "") {
        firstNumber = display.textContent;
    } else {
        secondNumber = display.textContent;
    }

});