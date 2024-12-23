const Logic = {
    
    isValidExpression(expression) {

        if (/[\+\-\*\/%]{2,}/.test(expression)) return false;

        const tokens = expression.split(/[\+\-\*\/%]/);
        for (const token of tokens) {
            if ((token.match(/\./g) || []).length > 1) return false;
        }

        return true;
    },

    isInvalidSequence(currentValue, newValue) {
        const operators = ["+", "-", "*", "/", "%"];
        const lastChar = currentValue.slice(-1);

        return operators.includes(lastChar) && operators.includes(newValue);
    },

    isInvalidDecimal(currentValue, newValue) {
        if (newValue !== ".") return false;

        const tokens = currentValue.split(/[\+\-\*\/%]/);
        const currentToken = tokens[tokens.length - 1];

        return currentToken.includes(".");
    },

    calculate(expression) {
        try {
            if (!this.isValidExpression(expression)) {
                return "Error";
            }

            if (/\/0(?!\d)/.test(expression)) {
                return "Cannot divide by zero";
            }

            return eval(expression);
        } catch (error) {
            return "Error";
        }
    }
};

export default Logic;
