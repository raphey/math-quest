// UI Controller
// Handles all user interface updates and interactions

const UI = {
    currentAnswer: '',

    // Initialize UI and set up event listeners
    init: function() {
        this.setupEventListeners();
        this.currentAnswer = '';
    },

    // Set up all button click handlers
    setupEventListeners: function() {
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
            Game.restart();
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
        // Limit to 2 digits for single-digit addition (max answer is 18)
        if (this.currentAnswer.length < 2) {
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

        gameScreen.classList.add('hidden');
        celebrationScreen.classList.remove('hidden');

        // Update celebration text
        const title = document.getElementById('celebration-title');
        const scoreText = document.getElementById('celebration-score');

        if (level === 'perfect') {
            title.textContent = 'PERFECT! 🌟🦄🦕';
        } else if (level === 'great') {
            title.textContent = 'Amazing! ✨🦖';
        } else {
            title.textContent = 'Great Job! 🎉';
        }

        scoreText.textContent = `You got ${score} out of ${total}!`;
    },

    // Show the game screen (hide celebration)
    showGameScreen: function() {
        const gameScreen = document.getElementById('game-screen');
        const celebrationScreen = document.getElementById('celebration-screen');

        gameScreen.classList.remove('hidden');
        celebrationScreen.classList.add('hidden');
    }
};

// Initialize everything when the page loads
window.addEventListener('DOMContentLoaded', () => {
    UI.init();
    Game.init();
});
