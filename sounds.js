// Sound system using Web Audio API
// Generates simple sound effects for game interactions

const Sounds = {
    audioContext: null,

    // Initialize audio context
    init: function() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    // Play a button click sound
    playClick: function() {
        this.init();

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    },

    // Play a correct answer sound (Mario coin-style)
    playCorrect: function() {
        this.init();

        const notes = [987.77, 1318.51]; // B5, E6 (perfect fourth)
        const durations = [0.08, 0.2]; // Second note has longer decay

        notes.forEach((freq, i) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = freq;
            oscillator.type = 'square';

            const startTime = this.audioContext.currentTime + (i * 0.08);
            const duration = durations[i];

            gainNode.gain.setValueAtTime(0.2, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });
    },

    // Play a wrong answer sound (gentle descending note)
    playWrong: function() {
        this.init();

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.3);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    },

    // Play fireworks sounds (multiple whooshes and pops)
    playFireworks: function() {
        this.init();

        // Create multiple firework sounds
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.playFireworkExplosion();
            }, i * 400);
        }
    },

    // Play a single firework explosion
    playFireworkExplosion: function() {
        // Whoosh up
        const whoosh = this.audioContext.createOscillator();
        const whooshGain = this.audioContext.createGain();

        whoosh.connect(whooshGain);
        whooshGain.connect(this.audioContext.destination);

        whoosh.frequency.setValueAtTime(100, this.audioContext.currentTime);
        whoosh.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
        whoosh.type = 'sawtooth';

        whooshGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        whooshGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        whoosh.start(this.audioContext.currentTime);
        whoosh.stop(this.audioContext.currentTime + 0.3);

        // Explosion pop
        setTimeout(() => {
            const explosion = this.audioContext.createBufferSource();
            const explosionGain = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();

            // Create noise for explosion
            const bufferSize = this.audioContext.sampleRate * 0.5;
            const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            explosion.buffer = buffer;

            filter.type = 'lowpass';
            filter.frequency.value = 2000;

            explosion.connect(filter);
            filter.connect(explosionGain);
            explosionGain.connect(this.audioContext.destination);

            explosionGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            explosionGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

            explosion.start(this.audioContext.currentTime);
        }, 300);

        // Sparkle sounds
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const sparkle = this.audioContext.createOscillator();
                const sparkleGain = this.audioContext.createGain();

                sparkle.connect(sparkleGain);
                sparkleGain.connect(this.audioContext.destination);

                sparkle.frequency.value = 1000 + Math.random() * 2000;
                sparkle.type = 'sine';

                sparkleGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                sparkleGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

                sparkle.start(this.audioContext.currentTime);
                sparkle.stop(this.audioContext.currentTime + 0.2);
            }, 300 + i * 50);
        }
    }
};
