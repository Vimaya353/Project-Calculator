# Calculator

A simple calculator built with **HTML, CSS, and JavaScript** as part of [The Odin Project](https://www.theodinproject.com/) Foundations course.

The calculator performs basic arithmetic operations and includes additional features such as decimal numbers, backspace, chained calculations, and division-by-zero handling.

## Live Demo

[View the Calculator](https://vimaya353.github.io/Project-Calculator/)

## Features

- Addition
- Subtraction
- Multiplication
- Division
- Decimal number support
- Clear button
- Backspace button
- Chained calculations
- Operator replacement
- Division-by-zero handling
- Results are rounded to avoid long decimal values
- Responsive and clean calculator interface

## Technologies Used

- **HTML5** – Structure of the calculator
- **CSS3** – Styling and layout
- **JavaScript** – Calculator logic and user interaction

## How It Works

The calculator stores three main pieces of information:

1. The first number
2. The selected operator
3. The second number

JavaScript then passes these values to the `operate()` function, which performs the selected calculation.

For example:

```text
7 + 3 = 10
