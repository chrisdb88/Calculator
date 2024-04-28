
const charLimit = 16;

const infoPromptText = [
    "Enter an operand, then select an operator.", 
    "Enter the second operand, then equal for result.",
    "Result",
    "Backspaced the current operand",
    "Nothing to delete.",
    "You've reached the character limit.",
    "That will crash my calculator!"
]

const opCheck = [
    "+",
    "-",
    "*",
    "/",
]


// -----------------


let resultContainer = document.querySelector(".resultContainer")
let inputContainer = document.querySelector(".inputContainer")
let infoPromptContainer = document.querySelector(".infoPrompt")
let characterLimitContainer = document.querySelector(".characterLimit")

infoPromptContainer.textContent = infoPromptText[0]

const buttons = document.querySelectorAll("button")

let totalInput = ""
let currentOperand = ""
let resultString = ""

let primaryNumber = 0
let secondaryNumber = 0
let currentOperator = ""

let operate = function (numberOne, numberTwo, operator) {
    if (operator === "+") {
        return numberOne + numberTwo
    } else if (operator === "-") { 
        return numberOne - numberTwo
    } else if (operator === "*") { 
        return numberOne * numberTwo
    } else if (operator === "/") { 
        return numberOne / numberTwo
    }
}

buttons.forEach(function (button) {
    button.addEventListener('click', function(e) {

        if (e.target.className === "numberButton" & e.target.id !== "decimalButton" & currentOperand.length < charLimit) {
            currentOperand = currentOperand.concat(e.target.textContent)
            inputContainer.textContent = currentOperand
            characterLimitContainer.textContent = `${currentOperand.length} / ${charLimit}`
        } else if (e.target.className === "numberButton" & currentOperand.length >= charLimit) {
            infoPromptContainer.textContent = infoPromptText[5]
        } else if (e.target.className === "operatorButton" & currentOperand !== "" & currentOperator === "") {
            currentOperator = e.target.textContent
            totalInput = totalInput.concat(`${currentOperand} ${currentOperator} `)
            resultContainer.textContent = totalInput
            currentOperand = ""
            inputContainer.textContent = ""
        } else if (currentOperator !== "" & currentOperand !== "") {
            resultContainer.textContent = Number(totalInput.concat(currentOperand))
        }

        // console.log(e.target.className)
        // console.log(e.target.textContent)
    })
})


// e.target.className
// e.target.id
// e.target.textContent


