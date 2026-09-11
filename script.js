```javascript
// ========================================
// BASIC MATH FUNCTIONS
// ========================================

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


// ========================================
// OPERATE FUNCTION
// ========================================

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


// ========================================
// CALCULATOR STATE
// ========================================

let firstNumber = "";
let operator = "";
let secondNumber = "";

let shouldResetDisplay = false;


// ========================================
// GET HTML ELEMENTS
// ========================================

const display = document.querySelector(".display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");


// ========================================
// ROUND RESULTS
// ========================================

function roundResult(number) {
    return Math.round(number * 100000000) / 100000000;
}


// ========================================
// NUMBER BUTTONS
// ========================================

numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // If a result was already displayed,
        // start a completely new calculation.
        if (shouldResetDisplay) {
            display.textContent = "0";

            firstNumber = "";
            operator = "";
            secondNumber = "";

            shouldResetDisplay = false;
        }


        // Replace the initial 0
        if (display.textContent === "0") {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }


        // Store the number
        if (operator === "") {
            firstNumber = display.textContent;
        } else {
            secondNumber = display.textContent;
        }

    });

});


// ========================================
// OPERATOR BUTTONS
// ========================================

operatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Convert the calculator symbols
        // into JavaScript operators.
        let selectedOperator = button.textContent;

        if (selectedOperator === "÷") {
            selectedOperator = "/";
        } else if (selectedOperator === "×") {
            selectedOperator = "*";
        } else if (selectedOperator === "−") {
            selectedOperator = "-";
        }


        // If we already have two numbers,
        // calculate them first.
        if (firstNumber !== "" && secondNumber !== "") {

            let result = operate(
                operator,
                Number(firstNumber),
                Number(secondNumber)
            );


            // Prevent division by zero
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
            secondNumber = "";
        }


        // Store the selected operator.
        // This also means pressing another operator
        // replaces the previous operator.
        if (firstNumber !== "") {
            operator = selectedOperator;
        }


        // The next number should replace
        // the current display.
        shouldResetDisplay = false;

        // Clear the display so the second number
        // can be entered.
        display.textContent = "0";

    });

});


// ========================================
// EQUALS BUTTON
// ========================================

equalsButton.addEventListener("click", function() {

    // Do nothing if we don't have:
    // first number + operator + second number
    if (
        firstNumber === "" ||
        operator === "" ||
        secondNumber === ""
    ) {
        return;
    }


    let result = operate(
        operator,
        Number(firstNumber),
        Number(secondNumber)
    );


    // Division by zero
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


    // The result becomes the first number
    // for a possible next calculation.
    firstNumber = result;

    operator = "";
    secondNumber = "";

    shouldResetDisplay = true;

});


// ========================================
// CLEAR BUTTON
// ========================================

clearButton.addEventListener("click", function() {

    firstNumber = "";
    operator = "";
    secondNumber = "";

    display.textContent = "0";

    shouldResetDisplay = false;

});


// ========================================
// DECIMAL BUTTON
// ========================================

decimalButton.addEventListener("click", function() {

    if (shouldResetDisplay) {

        display.textContent = "0";

        firstNumber = "";
        operator = "";
        secondNumber = "";

        shouldResetDisplay = false;
    }


    // Don't allow more than one decimal point
    if (!display.textContent.includes(".")) {

        display.textContent += ".";


        if (operator === "") {
            firstNumber = display.textContent;
        } else {
            secondNumber = display.textContent;
        }

    }

});


// ========================================
// BACKSPACE BUTTON
// ========================================

backspaceButton.addEventListener("click", function() {

    if (shouldResetDisplay) {
        return;
    }


    if (display.textContent.length > 1) {

        display.textContent =
            display.textContent.slice(0, -1);

    } else {

        display.textContent = "0";

    }


    if (operator === "") {
        firstNumber = display.textContent;
    } else {
        secondNumber = display.textContent;
    }

});
```
