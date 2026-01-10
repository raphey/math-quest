// Game state manager
// Handles game flow, scoring, and question progression

const Game = {
    totalQuestions: 10,
    currentQuestionNum: 0,
    correctCount: 0,
    currentQuestion: null,

    // Initialize the game
    init: function() {
        this.currentQuestionNum = 0;
        this.correctCount = 0;
        this.nextQuestion();
    },

    // Generate and set the next question
    nextQuestion: function() {
        this.currentQuestionNum++;

        if (this.currentQuestionNum > this.totalQuestions) {
            this.endGame();
            return;
        }

        this.currentQuestion = QuestionGenerator.generate();

        // Notify UI to update
        if (typeof UI !== 'undefined') {
            UI.updateQuestion(this.currentQuestion.question);
            UI.updateProgress(this.currentQuestionNum, this.totalQuestions);
            UI.clearAnswer();
            UI.clearFeedback();
        }
    },

    // Check if the provided answer is correct
    checkAnswer: function(userAnswer) {
        const correct = (parseInt(userAnswer) === this.currentQuestion.answer);

        if (correct) {
            this.correctCount++;
            this.onCorrectAnswer();
        } else {
            this.onWrongAnswer();
        }

        return correct;
    },

    // Handle correct answer
    onCorrectAnswer: function() {
        if (typeof Sounds !== 'undefined') {
            Sounds.playCorrect();
        }

        // Wait a moment then move to next question
        setTimeout(() => {
            this.nextQuestion();
        }, 800);
    },

    // Handle wrong answer
    onWrongAnswer: function() {
        if (typeof UI !== 'undefined') {
            UI.showFeedback("Oops! Try the next one! 💪");
        }

        if (typeof Sounds !== 'undefined') {
            Sounds.playWrong();
        }

        // Wait a moment then move to next question
        setTimeout(() => {
            this.nextQuestion();
        }, 1000);
    },

    // End the game and show results
    endGame: function() {
        const score = this.correctCount;
        const total = this.totalQuestions;

        // Determine celebration level
        let level = 'good';
        if (score === total) {
            level = 'perfect';
        } else if (score >= total - 1) {
            level = 'great';
        }

        // Show celebration screen
        if (typeof UI !== 'undefined') {
            UI.showCelebration(score, total, level);
        }

        // Start fireworks and sounds
        if (typeof Celebrations !== 'undefined') {
            Celebrations.start(level);
        }

        if (typeof Sounds !== 'undefined') {
            Sounds.playFireworks();
        }
    },

    // Reset and start a new game
    restart: function() {
        this.init();

        if (typeof UI !== 'undefined') {
            UI.showGameScreen();
        }
    }
};
