// Game state manager
// Handles game flow, scoring, and question progression

const Game = {
    totalQuestions: 10,
    currentQuestionNum: 0,
    correctCount: 0,
    currentQuestion: null,
    operation: null,
    difficulty: null,

    // Initialize the game with operation and difficulty
    init: function(operation, difficulty) {
        this.operation = operation;
        this.difficulty = difficulty;
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

        this.currentQuestion = QuestionGenerator.generate(this.operation, this.difficulty);

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
        let level = 'keep_trying';
        if (score === total) {
            level = 'perfect';
        } else if (score >= 9) {
            level = 'great';
        } else if (score >= 8) {
            level = 'good';
        } else if (score >= 7) {
            level = 'okay';
        }

        // Show celebration screen
        if (typeof UI !== 'undefined') {
            UI.showCelebration(score, total, level);
        }

        // Start fireworks and sounds only for top 3 levels
        if (level === 'perfect' || level === 'great' || level === 'good') {
            if (typeof Celebrations !== 'undefined') {
                Celebrations.start(level);
            }

            if (typeof Sounds !== 'undefined') {
                Sounds.playFireworks();
            }
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
