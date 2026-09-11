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
    }

    if (operator === "-") {
        return subtract(a, b);
    }

    if (operator === "*") {
        return multiply(a, b);
    }

    if (operator === "/") {
        return divide(a, b);
    }
}


// ========================================
// CALCULATOR STATE
// ========================================

let firstNumber = "";
let operator = "";
let secondNumber = "";

let waitingForSecondNumber = false;
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

        // If we just got a result,
        // start a completely new calculation.
        if (shouldResetDisplay) {
            display.textContent = "0";

            firstNumber = "";
            operator = "";
            secondNumber = "";

            shouldResetDisplay = false;
        }


        // If an operator was just pressed,
        // start entering the second number.
        if (waitingForSecondNumber) {
            display.textContent = "0";
            waitingForSecondNumber = false;
        }


        // Replace the initial 0.
        if (display.textContent === "0") {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }


        // Store the number.
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

        // Convert calculator symbols to
        // JavaScript operators.
        let selectedOperator = button.textContent;

        if (selectedOperator === "÷") {
            selectedOperator = "/";
        }

        if (selectedOperator === "×") {
            selectedOperator = "*";
        }

        if (selectedOperator === "−") {
            selectedOperator = "-";
        }


        // If we already have:
        // first number + operator + second number
        // calculate before using the new operator.
        if (
            firstNumber !== "" &&
            operator !== "" &&
            secondNumber !== ""
        ) {

            let result = operate(
                operator,
                Number(firstNumber),
                Number(secondNumber)
            );


            // Division by zero.
            if (!Number.isFinite(result)) {

                display.textContent = "Nice try 😏";

                firstNumber = "";
                operator = "";
                secondNumber = "";

                shouldResetDisplay = true;
                waitingForSecondNumber = false;

                return;
            }


            result = roundResult(result);

            display.textContent = result;

            firstNumber = String(result);
            secondNumber = "";
        }


        // If the user presses another operator
        // without entering a second number,
        // simply replace the old operator.
        operator = selectedOperator;

        waitingForSecondNumber = true;
        shouldResetDisplay = false;

    });

});


// ========================================
// EQUALS BUTTON
// ========================================

equalsButton.addEventListener("click", function() {

    // Don't calculate if we don't have
    // all three required parts.
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


    // Division by zero.
    if (!Number.isFinite(result)) {

        display.textContent = "Nice try 😏";

        firstNumber = "";
        operator = "";
        secondNumber = "";

        shouldResetDisplay = true;
        waitingForSecondNumber = false;

        return;
    }


    result = roundResult(result);

    display.textContent = result;


    // The result becomes the first number.
    firstNumber = String(result);

    operator = "";
    secondNumber = "";

    shouldResetDisplay = true;
    waitingForSecondNumber = false;

});


// ========================================
// CLEAR BUTTON
// ========================================

clearButton.addEventListener("click", function() {

    firstNumber = "";
    operator = "";
    secondNumber = "";

    display.textContent = "0";

    waitingForSecondNumber = false;
    shouldResetDisplay = false;

});


// ========================================
// DECIMAL BUTTON
// ========================================

decimalButton.addEventListener("click", function() {

    // After a result, start fresh.
    if (shouldResetDisplay) {

        display.textContent = "0";

        firstNumber = "";
        operator = "";
        secondNumber = "";

        shouldResetDisplay = false;
    }


    // If an operator was just pressed,
    // start the second number with 0.
    if (waitingForSecondNumber) {

        display.textContent = "0";

        waitingForSecondNumber = false;
    }


    // Only allow one decimal point.
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

    // Don't change the result.
    if (shouldResetDisplay || waitingForSecondNumber) {
        return;
    }


    if (display.textContent.length > 1) {

        display.textContent =
            display.textContent.slice(0, -1);

    } else {

        display.textContent = "0";

    }


    // Update stored number.
    if (operator === "") {
        firstNumber = display.textContent;
    } else {
        secondNumber = display.textContent;
    }

});