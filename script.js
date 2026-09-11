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
// CALCULATOR VARIABLES
// ========================================

let firstNumber = "";
let operator = "";
let secondNumber = "";

let shouldResetDisplay = false;


// ========================================
// HTML ELEMENTS
// ========================================

const display = document.querySelector(".display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");


// ========================================
// ROUND LONG DECIMAL RESULTS
// ========================================

function roundResult(number) {
    return Math.round(number * 100000000) / 100000000;
}


// ========================================
// NUMBER BUTTONS
// ========================================

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


// ========================================
// OPERATOR BUTTONS
// ========================================

operatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let selectedOperator = button.textContent;

        // Convert calculator symbols to JavaScript operators
        if (selectedOperator === "÷") {
            selectedOperator = "/";
        } else if (selectedOperator === "×") {
            selectedOperator = "*";
        } else if (selectedOperator === "−") {
            selectedOperator = "-";
        }


        // If there is already a complete operation,
        // calculate it first.
        if (firstNumber !== "" && secondNumber !== "") {

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
            secondNumber = "";
        }


        // Store the selected operator
        if (firstNumber !== "") {
            operator = selectedOperator;
            shouldResetDisplay = false;
        }

    });

});


// ========================================
// EQUALS BUTTON
// ========================================

equalsButton.addEventListener("click", function() {

    // Don't calculate unless we have
    // two numbers and an operator.
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


    // Divide-by-zero protection
    if (!Number.isFinite(result)) {

        display.textContent = "Nice try 😏";

        firstNumber = "";
        operator = "";
        secondNumber = "";

        shouldResetDisplay = true;

        return;
    }


    // Round long decimal answers
    result = roundResult(result);


    // Show result
    display.textContent = result;


    // Store result for the next operation
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

        shouldResetDisplay = false;

        firstNumber = "";
        operator = "";
        secondNumber = "";
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