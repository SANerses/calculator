export const Calculator = {

    currentValue: 0,

    add(number) {
        this.currentValue += number;
        return this;
    },

    subtract(number) {
        this.currentValue -= number;
        return this;
    },

    multiply(number) {
        this.currentValue *= number;
        return this;
    },

    divide(number) {
        if (number === 0) {
            console.error("Error: Division by zero is not allowed.");
            return this;
        }
        this.currentValue /= number;
        return this;
    },

    reset() {
        this.currentValue = 0;
        return this;
    },

    display() {
        console.log(`Current Value: ${this.currentValue}`);
        return this;
    },
};
