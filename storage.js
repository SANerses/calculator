const Storage = {
    saveHistory(history) {
        if (Array.isArray(history)) {
            localStorage.setItem('calculatorHistory', JSON.stringify(history));
        } else {
            console.error('Invalid history format. Expected an array.');
        }
    },

    getHistory() {
        const history = localStorage.getItem('calculatorHistory');
        return history ? JSON.parse(history) : [];
    },

    addHistoryEntry(entry) {
        const history = this.getHistory();
        history.push(entry);
        this.saveHistory(history);
    },

    clearHistory() {
        localStorage.removeItem('calculatorHistory');
    },

    resetHistory() {
        Storage.clearHistory();
        historyContent.innerHTML = "<p>No history available</p>";
    },
};

export default Storage;
