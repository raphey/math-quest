// Question generator for single-digit addition
// Easy to swap out for other types of questions (multiplication, ear training, etc.)

const QuestionGenerator = {
    // Generate a random single-digit addition question
    generateAddition: function() {
        const num1 = Math.floor(Math.random() * 9) + 1; // 1-9
        const num2 = Math.floor(Math.random() * 9) + 1; // 1-9

        return {
            question: `${num1} + ${num2} = ?`,
            answer: num1 + num2,
            num1: num1,
            num2: num2
        };
    },

    // Main generate function - currently uses addition
    // Change this to switch question types
    generate: function() {
        return this.generateAddition();
    }
};
