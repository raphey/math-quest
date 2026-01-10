# Math Quest Game

A fun, interactive math game for kids to practice single-digit addition. Built with vanilla JavaScript, HTML5 Canvas, and Web Audio API.

## Features

- 10 random single-digit addition questions per game
- "Keep trying" feedback on wrong answers
- Progressive celebration animations (fireworks) based on score
- Sound effects using Web Audio API
- Kid-friendly design with unicorns and dinosaurs
- Fully responsive layout
- Keyboard and touch support

## File Structure

```
math-game/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── game.js             # Game state management and flow
├── questions.js        # Question generation logic
├── ui.js               # UI updates and user interactions
├── celebrations.js     # Canvas-based fireworks animations
├── sounds.js           # Web Audio API sound effects
└── README.md           # This file
```

## Quick Start

1. Open `index.html` in a web browser
2. That's it! The game will start automatically

## Deployment via FTP

To deploy to your website:

1. Upload all files to your web server via FTP
2. Make sure all files are in the same directory
3. Navigate to `index.html` in your browser

Example FTP structure:
```
public_html/
└── math-game/
    ├── index.html
    ├── styles.css
    ├── game.js
    ├── questions.js
    ├── ui.js
    ├── celebrations.js
    └── sounds.js
```

Access at: `https://yourdomain.com/math-game/`

## Customization Guide

### Changing Question Difficulty

Edit `questions.js`:

```javascript
// Current: single-digit addition (1-9 + 1-9)
const num1 = Math.floor(Math.random() * 9) + 1;
const num2 = Math.floor(Math.random() * 9) + 1;

// Easy: smaller numbers (1-5 + 1-5)
const num1 = Math.floor(Math.random() * 5) + 1;
const num2 = Math.floor(Math.random() * 5) + 1;

// Harder: double-digit (10-20 + 10-20)
const num1 = Math.floor(Math.random() * 11) + 10;
const num2 = Math.floor(Math.random() * 11) + 10;
```

### Adding Subtraction or Multiplication

Edit `questions.js`:

```javascript
// Subtraction
generateSubtraction: function() {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * num1) + 1; // Ensure positive result
    return {
        question: `${num1} - ${num2} = ?`,
        answer: num1 - num2,
        num1: num1,
        num2: num2
    };
},

// Then update the generate function:
generate: function() {
    return this.generateSubtraction(); // or generateMultiplication()
}
```

### Changing Number of Questions

Edit `game.js`:

```javascript
const Game = {
    totalQuestions: 10,  // Change this number
    // ...
}
```

### Adjusting Celebration Thresholds

Edit `game.js` in the `endGame` function:

```javascript
// Current: 8+ = good, 9+ = great, 10 = perfect
let level = 'good';
if (score === total) {
    level = 'perfect';
} else if (score >= total - 1) {
    level = 'great';
}

// More lenient: 7+ = good, 8+ = great, 10 = perfect
let level = 'good';
if (score === total) {
    level = 'perfect';
} else if (score >= total - 2) {
    level = 'great';
} else if (score >= total - 3) {
    level = 'good';
}
```

### Customizing Colors and Theme

Edit `styles.css`:

```css
/* Change background gradient */
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Change button colors */
.num-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Change header colors */
.game-header {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

### Changing Emojis/Theme

Edit `index.html` header:

```html
<h1>Math Quest! <span class="deco">🦄 🦕 🦖</span></h1>
```

Edit `celebrations.js`:

```javascript
emojis: ['🦄', '🦕', '🦖', '⭐', '✨', '🌟', '💫'],
// Change to whatever theme you want:
// Space: ['🚀', '🌙', '⭐', '🪐', '👽']
// Ocean: ['🐠', '🐙', '🦈', '🐚', '🌊']
// Food: ['🍕', '🍦', '🍩', '🍪', '🎂']
```

### Disabling Sound

Edit `game.js`, `ui.js` - comment out or remove all `Sounds.play*()` calls:

```javascript
// if (typeof Sounds !== 'undefined') {
//     Sounds.playClick();
// }
```

## Creating Variations

### Ear Training Game

Create a new repo or folder and modify `questions.js`:

```javascript
const QuestionGenerator = {
    generateEarTraining: function() {
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00]; // C, D, E, F, G
        const note1Index = Math.floor(Math.random() * notes.length);
        const note2Index = Math.floor(Math.random() * notes.length);

        // Play the notes using Web Audio API
        this.playNote(notes[note1Index]);
        setTimeout(() => this.playNote(notes[note2Index]), 500);

        const relationship = note2Index > note1Index ? 'higher' :
                           note2Index < note1Index ? 'lower' : 'same';

        return {
            question: "Is the second note higher or lower?",
            answer: relationship,
            // Modify UI to show buttons: "Higher", "Lower", "Same"
        };
    },

    playNote: function(frequency) {
        // Use Sounds system to play a tone at the given frequency
    }
}
```

## Keyboard Controls

- **0-9**: Enter numbers
- **Enter**: Submit answer
- **Backspace/Delete**: Clear answer

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari (iOS/macOS)

## Troubleshooting

**Sounds not playing:**
- Some browsers require user interaction before playing audio
- Click anywhere on the page to activate audio context

**Fireworks not showing:**
- Check browser console for errors
- Ensure canvas element is rendering properly

**Wrong answer gives immediate next question:**
- Check that `game.js` `onWrongAnswer` function shows feedback and doesn't call `nextQuestion()`

## License

Free to use and modify for personal and educational purposes.
