const charLimit = 24;

const infoPromptText = [
    "Enter an operand, then select an operator.", 
    "Enter the second operand, then equal for result.",
    "Result is displayed top-right",
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
let currentOperand = "0"

characterLimitContainer.textContent = `${currentOperand.length} / ${charLimit}`

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
        if (numberTwo === 0) {
            return "ERR"
        } else {
            return numberOne / numberTwo
        }
    }
}

let resetEnvironment = function () {
   
}

buttons.forEach(function (button) {
    button.addEventListener('click', function(e) {
        if (e.target.className === "numberButton" & currentOperand.length < charLimit) {
            if (e.target.id === "decimalButton") {
                if (currentOperand.includes(".")) {
                    return
                }
            }
            if (currentOperand === "0") {
                currentOperand = e.target.textContent
                inputContainer.textContent = currentOperand
                characterLimitContainer.textContent = `${currentOperand.length} / ${charLimit}`
            } else {
                currentOperand = currentOperand.concat(e.target.textContent)
                inputContainer.textContent = currentOperand
                characterLimitContainer.textContent = `${currentOperand.length} / ${charLimit}`
            }
            if (currentOperator === "") {
                primaryNumber = Number(currentOperand)
            } else {
                secondaryNumber = Number(currentOperand)
            }
        } else if (e.target.className === "numberButton" & currentOperand.length >= charLimit) {
            infoPromptContainer.textContent = infoPromptText[5]
        } else if (e.target.className === "operatorButton" & currentOperand !== "" & currentOperator === "") {
            currentOperator = e.target.textContent
            totalInput = totalInput.concat(`${currentOperand} ${currentOperator} `)
            resultContainer.textContent = totalInput
            currentOperand = "0"
            inputContainer.textContent = currentOperand
            infoPromptContainer.textContent = infoPromptText[1]
            characterLimitContainer.textContent = `${currentOperand.length} / ${charLimit}`
        } else if (e.target.className === "operatorButton" & currentOperand !== "" & currentOperator !== "") {
            let result = operate(primaryNumber, secondaryNumber, currentOperator)
            if (result === "ERR") {
                resultContainer.textContent = "ERR: Cannot divide by 0"
                primaryNumber = 0
            } else {
                totalInput = result.toString().concat(` ${e.target.textContent} `)
                resultContainer.textContent = totalInput
                primaryNumber = result
            }    
            secondaryNumber = 0
            currentOperator = e.target.textContent
            currentOperand = "0"
            inputContainer.textContent = currentOperand
            characterLimitContainer.textContent = `${currentOperand.length} / ${charLimit}`
            if (result === "ERR") {
                infoPromptContainer.textContent = infoPromptText[6]
            } else {
                infoPromptContainer.textContent = infoPromptText[2]
            }
        } else if (e.target.className === "operatorButton" & currentOperand === "" & currentOperator !== "") {
            currentOperator = e.target.textContent
            totalInput = primaryNumber.toString().concat(` ${currentOperator} `)
            resultContainer.textContent = totalInput
        } else if (e.target.className === "stateButton") {     
            if (e.target.id === "clearButton") {
                totalInput = ""
                currentOperand = "0"
                primaryNumber = 0
                secondaryNumber = 0
                currentOperator = ""
                infoPromptContainer.textContent = infoPromptText[0]
                characterLimitContainer.textContent = `${currentOperand.length} / ${charLimit}`
                inputContainer.textContent = currentOperand
                resultContainer.textContent = ""
            } else if (e.target.id ==="backButton") {
                if (currentOperator !== "" & currentOperand !== "") {
                    currentOperand = currentOperand.substring(0, currentOperand.length - 1)
                    if (currentOperand === "") {
                        currentOperand = "0"
                        secondaryNumber = 0
                    } else {
                        secondaryNumber = Number(currentOperand)
                    }
                    inputContainer.textContent = currentOperand
                    characterLimitContainer.textContent = `${currentOperand.length} / ${charLimit}`
                } else if (currentOperand !== "0") { 
                    currentOperand = currentOperand.substring(0, currentOperand.length - 1)
                    if (currentOperand === "") {
                        currentOperand = "0"
                        primaryNumber = 0
                    } else {
                        primaryNumber = Number(currentOperand)
                    }
                    inputContainer.textContent = currentOperand
                    characterLimitContainer.textContent = `${currentOperand.length} / ${charLimit}`
                }
            } else if (e.target.id === "equalButton") {    
                if (primaryNumber.toString().length > 0 & secondaryNumber.toString().length > 0 & currentOperator !== "") {
                    console.log(e.target.id)
                    let result = operate(primaryNumber, secondaryNumber, currentOperator)
                    if (result === "ERR") {
                        resultContainer.textContent = "ERR: Cannot divide by 0"
                        primaryNumber = 0
                    } else {
                        totalInput = result.toString()
                        resultContainer.textContent = totalInput
                    }       
                    primaryNumber = 0
                    secondaryNumber = 0
                    currentOperator = ""
                    currentOperand = "0"
                    inputContainer.textContent = currentOperand
                    characterLimitContainer.textContent = `${currentOperand.length} / ${charLimit}`
                    totalInput = ""
                    if (result === "ERR") {
                        infoPromptContainer.textContent = infoPromptText[6]
                    } else {
                        infoPromptContainer.textContent = infoPromptText[2]
                    }
                }
            }
        }
    })
})




