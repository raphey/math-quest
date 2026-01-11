// UI Controller
// Handles all user interface updates and interactions

const UI = {
    currentAnswer: '',
    selectedOperation: null,
    selectedDifficulty: null,

    // Initialize UI and set up event listeners
    init: function() {
        this.setupEventListeners();
        this.currentAnswer = '';
        this.showOperationScreen();
    },

    // Set up all button click handlers
    setupEventListeners: function() {
        // Operation buttons
        const operationButtons = document.querySelectorAll('.menu-btn[data-operation]');
        operationButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('disabled')) return;

                const operation = btn.getAttribute('data-operation');
                this.selectedOperation = operation;

                if (typeof Sounds !== 'undefined') {
                    Sounds.playClick();
                }

                this.showDifficultyScreen();
            });
        });

        // Difficulty buttons
        const difficultyButtons = document.querySelectorAll('.menu-btn[data-difficulty]');
        difficultyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('disabled')) return;

                const difficulty = parseInt(btn.getAttribute('data-difficulty'));
                this.selectedDifficulty = difficulty;

                if (typeof Sounds !== 'undefined') {
                    Sounds.playClick();
                }

                this.startGame();
            });
        });
        // Number buttons
        const numButtons = document.querySelectorAll('.num-btn[data-num]');
        numButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const num = btn.getAttribute('data-num');
                this.addDigit(num);
                if (typeof Sounds !== 'undefined') {
                    Sounds.playClick();
                }
            });
        });

        // Clear button
        const clearBtn = document.getElementById('clear-btn');
        clearBtn.addEventListener('click', () => {
            this.clearAnswer();
            if (typeof Sounds !== 'undefined') {
                Sounds.playClick();
            }
        });

        // Enter button
        const enterBtn = document.getElementById('enter-btn');
        enterBtn.addEventListener('click', () => {
            this.submitAnswer();
        });

        // Play again button
        const playAgainBtn = document.getElementById('play-again-btn');
        playAgainBtn.addEventListener('click', () => {
            if (typeof Sounds !== 'undefined') {
                Sounds.playClick();
            }
            this.showOperationScreen();
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                this.addDigit(e.key);
                if (typeof Sounds !== 'undefined') {
                    Sounds.playClick();
                }
            } else if (e.key === 'Enter') {
                this.submitAnswer();
            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                this.clearAnswer();
            }
        });
    },

    // Add a digit to the current answer
    addDigit: function(digit) {
        // Limit to 3 digits (max answer for two-digit addition is 198)
        if (this.currentAnswer.length < 3) {
            this.currentAnswer += digit;
            this.updateAnswerDisplay();
        }
    },

    // Clear the current answer
    clearAnswer: function() {
        this.currentAnswer = '';
        this.updateAnswerDisplay();
    },

    // Update the answer display
    updateAnswerDisplay: function() {
        const display = document.getElementById('answer-display');
        display.textContent = this.currentAnswer || '';
    },

    // Submit the current answer
    submitAnswer: function() {
        if (this.currentAnswer === '') {
            return; // No answer to submit
        }

        const isCorrect = Game.checkAnswer(this.currentAnswer);

        // Clear answer immediately for next question
        this.clearAnswer();
    },

    // Update the question display
    updateQuestion: function(questionText) {
        const questionDisplay = document.getElementById('question-text');
        questionDisplay.textContent = questionText;
    },

    // Update the progress bar
    updateProgress: function(current, total) {
        const counter = document.getElementById('question-counter');
        counter.textContent = `Question ${current} of ${total}`;

        const progressFill = document.getElementById('progress-fill');
        const percentage = (current / total) * 100;
        progressFill.style.width = `${percentage}%`;
    },

    // Show feedback message
    showFeedback: function(message) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
    },

    // Clear feedback message
    clearFeedback: function() {
        const feedback = document.getElementById('feedback');
        feedback.textContent = '';
    },

    // Show the celebration screen
    showCelebration: function(score, total, level) {
        const gameScreen = document.getElementById('game-screen');
        const celebrationScreen = document.getElementById('celebration-screen');
        const progressContainer = document.getElementById('progress-container');

        gameScreen.classList.add('hidden');
        celebrationScreen.classList.remove('hidden');
        progressContainer.classList.add('hidden');

        // Update celebration text
        const title = document.getElementById('celebration-title');
        const scoreText = document.getElementById('celebration-score');

        if (level === 'perfect') {
            title.textContent = 'PERFECT! 🌟🦄🦕';
            scoreText.textContent = `You got ${score} out of ${total}.\nLet's play again!`;
        } else if (level === 'great') {
            title.textContent = 'Amazing! ✨🦖';
            scoreText.textContent = `You got ${score} out of ${total}.\nLet's play again!`;
        } else if (level === 'good') {
            title.textContent = 'Great Job! 🎉';
            scoreText.textContent = `You got ${score} out of ${total}.\nLet's play again!`;
        } else if (level === 'okay') {
            title.textContent = 'Good Job! 🎉';
            scoreText.textContent = `You got ${score} out of ${total}.\nLet's play again!`;
        } else {
            title.textContent = 'Keep Trying!';
            scoreText.textContent = `You got ${score} out of ${total}.\nLet's play again!`;
        }
    },

    // Show operation selection screen
    showOperationScreen: function() {
        const operationScreen = document.getElementById('operation-screen');
        const difficultyScreen = document.getElementById('difficulty-screen');
        const gameScreen = document.getElementById('game-screen');
        const celebrationScreen = document.getElementById('celebration-screen');
        const progressContainer = document.getElementById('progress-container');

        operationScreen.classList.remove('hidden');
        difficultyScreen.classList.add('hidden');
        gameScreen.classList.add('hidden');
        celebrationScreen.classList.add('hidden');
        progressContainer.classList.add('hidden');
    },

    // Show difficulty selection screen
    showDifficultyScreen: function() {
        const operationScreen = document.getElementById('operation-screen');
        const difficultyScreen = document.getElementById('difficulty-screen');
        const progressContainer = document.getElementById('progress-container');

        operationScreen.classList.add('hidden');
        difficultyScreen.classList.remove('hidden');
        progressContainer.classList.add('hidden');
    },

    // Start the game
    startGame: function() {
        const difficultyScreen = document.getElementById('difficulty-screen');
        const gameScreen = document.getElementById('game-screen');
        const progressContainer = document.getElementById('progress-container');

        difficultyScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        progressContainer.classList.remove('hidden');

        // Initialize the game with selected settings
        Game.init(this.selectedOperation, this.selectedDifficulty);
    }
};

// Initialize everything when the page loads
window.addEventListener('DOMContentLoaded', () => {
    UI.init();
});
