import Logic from "./logic.js";
import { Calculator } from "./modules.js";
import Storage from "./storage.js";

let inputBox, historyBtn, historyModal, closeModal, historyContent, resetHistoryBtn;

export function init() {
    inputBox = document.getElementById("inputBox");
    historyBtn = document.getElementById("historyBtn");
    historyModal = document.getElementById("historyModal");
    closeModal = document.getElementById("closeModal");
    historyContent = document.getElementById("historyContent");
    resetHistoryBtn = document.getElementById("resetHistoryBtn");
}

export function setupListeners() {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach(button => {
        button.addEventListener("click", () => handleButtonClick(button.innerText));
    });

    historyBtn.addEventListener("click", openHistoryModal);
    closeModal.addEventListener("click", closeHistoryModal);
    resetHistoryBtn.addEventListener("click", Storage.resetHistory);

    window.addEventListener("keydown", handleKeyboardInput);
}

function handleKeyboardInput(event) {
    const key = event.key;

    if (!isNaN(key) || "+-*/%.".includes(key) || key === "Enter" || key === "Backspace") {
        event.preventDefault();
    }

    if (!isNaN(key) || "+-*/%.".includes(key)) {
        handleButtonClick(key);
    } else if (key === "Enter") {
        event.preventDefault();
        handleButtonClick("=");
    } else if (key === "Backspace") {
        handleButtonClick("DEL");
    } else if (key.toUpperCase() === "C") {
        handleButtonClick("AC");
    } else if (key === "h" || key === "H") {
        openHistoryModal();
    } else if (key === "Escape") {
        closeHistoryModal();
    }
}

function handleButtonClick(value) {
    if (value === "AC") {
        Calculator.reset();
        inputBox.value = "0";
    } else if (value === "DEL") {
        inputBox.value = inputBox.value.slice(0, -1) || "0";
    } else if (value === "=") {
        const expression = inputBox.value;
        const result = Logic.calculate(expression);

        inputBox.value = result;

        if (result !== "Error" && result !== "Cannot divide by zero") {
            const entry = `${expression} = ${result}`;
            Storage.addHistoryEntry(entry);
        }
    } else {
    
        if (Logic.isInvalidSequence(inputBox.value, value)) {
            return;
        }

        if (Logic.isInvalidDecimal(inputBox.value, value)) {
            return;
        }

        if (inputBox.value === "0") {
            inputBox.value = value;
        } else {
            inputBox.value += value;
        }
    }
}

function openHistoryModal() {
    const history = Storage.getHistory();

    historyContent.innerHTML = "";

    history.forEach(entry => {
        const historyItem = document.createElement("p");
        historyItem.textContent = entry;
        historyContent.appendChild(historyItem);
    });

    historyModal.style.display = "block";
}

function closeHistoryModal() {
    historyModal.style.display = "none";
    Calculator.reset();
    inputBox.value = "0";
}
