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

    // Main generate function - routes to correct operation
    generate: function(operation, difficulty) {
        if (operation === 'addition') {
            return this.generateAddition(difficulty);
        }
        // Future: add subtraction, multiplication, division
        // Default to addition
        return this.generateAddition(difficulty);
    }
};
