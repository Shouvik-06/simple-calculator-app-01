const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-op]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');

let previousOperand = '';
let currentOperand = '';
let operation = null;

let errorFlag = false;


function updateDisplay() {
    if (operation) {
        display.innerText = `${previousOperand} ${operation} ${currentOperand}`;
    }
    else {
        display.innerText = `${currentOperand}`;
    }
    display.scrollTo(display.scrollWidth,0);
}

function displayError() {
    display.innerText = "Math Error";
    errorFlag = false;
}

function clear() {
    previousOperand = '';
    currentOperand = '';
    operation = null;
    updateDisplay();
}

function del() {
    if (operation) {
        if (currentOperand === '') {
            operation = null;
            currentOperand = previousOperand;
            previousOperand = '';
            updateDisplay();
            return;
        }
    }
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
}

function equals() {
    if (operation === null || currentOperand === '') {
        return;
    }
    else {
        calculateOutput();
        if (errorFlag) {
            displayError();
            return;
        }
        updateDisplay();
    }
}

// input should be numbers 0-9
function inputNumber(input) {
    currentOperand += input;
    updateDisplay();
}

// input should be one of '+','-','*','/'
function inputOperation(input) {
    if (currentOperand === '') {return;}
    else if (operation) {
        calculateOutput();
        if (errorFlag) {
            displayError();
            return;
        }
    }
    if (input === '*') {operation = '×';}
    else if (input === '/') {operation = '÷';}
    else {
        operation = input;
    }
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function calculateOutput() {
    let output;
    let num_prev = parseInt(previousOperand);
    let num_current = parseInt(currentOperand);
    switch (operation) {
        case '+':
            output = num_prev + num_current;
            break;
        case '-':
            output = num_prev - num_current;
            break;
        case '×':
            output = num_prev * num_current;
            break;
        case '÷':
            output = num_prev / num_current;
            break;
    }
    output = Math.floor(output);
    if(isNaN(output) || output === Infinity) {
        errorFlag = true;
        previousOperand = '';
        currentOperand = '';
        operation = null;
    }
    else {
        currentOperand = output.toString();
        previousOperand = '';
        operation = null;
    }
}

function init() {
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            inputNumber(button.textContent);
        });
    })

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            inputOperation(button.dataset.op);
        });
    })

    clearButton.addEventListener('click', clear);
    deleteButton.addEventListener('click', del);
    equalsButton.addEventListener('click', equals);
}

init();
