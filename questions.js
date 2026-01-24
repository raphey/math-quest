// Question generator for math operations
// Easy to swap out for other types of questions (ear training, etc.)

const QuestionGenerator = {
    // Generate addition question based on difficulty
    generateAddition: function(difficulty) {
        let num1, num2;

        if (difficulty === 1) {
            // Level 1: Single-digit (1-9)
            num1 = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * 9) + 1;
        } else if (difficulty === 2) {
            // Level 2: Two-digit (10-99)
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * 90) + 10;
        } else {
            // Default to level 1
            num1 = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * 9) + 1;
        }

        return {
            question: `${num1} + ${num2} = ?`,
            answer: num1 + num2,
            num1: num1,
            num2: num2
        };
    },

    // Generate subtraction question based on difficulty
    generateSubtraction: function(difficulty) {
        let num1, num2;

        if (difficulty === 1) {
            // Level 1: Single-digit (1-9)
            num1 = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * num1) + 1; // Ensure positive result
        } else if (difficulty === 2) {
            // Level 2: Two-digit (10-99)
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * (num1 - 10)) + 10; // Ensure positive result
        } else {
            // Default to level 1
            num1 = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * num1) + 1;
        }

        return {
            question: `${num1} - ${num2} = ?`,
            answer: num1 - num2,
            num1: num1,
            num2: num2
        };
    },

    // Generate multiplication question based on difficulty
    generateMultiplication: function(difficulty) {
        let num1, num2;

        if (difficulty === 1) {
            // Level 1: Numbers 1-5
            num1 = Math.floor(Math.random() * 5) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
        } else if (difficulty === 2) {
            // Level 2: Numbers 1-10
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
        } else if (difficulty === 3) {
            // Level 3: Two-digit × one-digit (10-99 × 1-9)
            num1 = Math.floor(Math.random() * 90) + 10;
            num2 = Math.floor(Math.random() * 9) + 1;
        } else {
            // Default to level 1
            num1 = Math.floor(Math.random() * 5) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
        }

        return {
            question: `${num1} × ${num2} = ?`,
            answer: num1 * num2,
            num1: num1,
            num2: num2
        };
    },

    // Generate division question based on difficulty
    generateDivision: function(difficulty) {
        let divisor, quotient, dividend;

        if (difficulty === 1) {
            // Level 1: Numbers 1-5
            divisor = Math.floor(Math.random() * 5) + 1;
            quotient = Math.floor(Math.random() * 5) + 1;
        } else if (difficulty === 2) {
            // Level 2: Numbers 1-10
            divisor = Math.floor(Math.random() * 10) + 1;
            quotient = Math.floor(Math.random() * 10) + 1;
        } else {
            // Default to level 1
            divisor = Math.floor(Math.random() * 5) + 1;
            quotient = Math.floor(Math.random() * 5) + 1;
        }

        // Calculate dividend (ensures whole number result)
        dividend = divisor * quotient;

        return {
            question: `${dividend} ÷ ${divisor} = ?`,
            answer: quotient,
            num1: dividend,
            num2: divisor
        };
    },

    // Main generate function - routes to correct operation
    generate: function(operation, difficulty) {
        if (operation === 'addition') {
            return this.generateAddition(difficulty);
        } else if (operation === 'subtraction') {
            return this.generateSubtraction(difficulty);
        } else if (operation === 'multiplication') {
            return this.generateMultiplication(difficulty);
        } else if (operation === 'division') {
            return this.generateDivision(difficulty);
        }
        // Default to addition
        return this.generateAddition(difficulty);
    }
};
