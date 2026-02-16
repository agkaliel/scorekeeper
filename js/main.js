// Scorekeeper Application with Swipe Gestures
class ScoreKeeper {
    constructor() {
        // Touch tracking
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.swipeThreshold = 30; // Minimum distance for a swipe

        // Get DOM elements
        this.leftScoreDisplay = document.getElementById('left-score');
        this.rightScoreDisplay = document.getElementById('right-score');
        this.leftPanel = document.getElementById('left-panel');
        this.rightPanel = document.getElementById('right-panel');
        this.resetBtn = document.getElementById('reset-btn');
        this.fullscreenBtn = document.getElementById('fullscreen-btn');
        this.modalOverlay = document.getElementById('modal-overlay');
        this.modalCancel = document.getElementById('modal-cancel');
        this.modalConfirm = document.getElementById('modal-confirm');

        // Load scores from localStorage or initialize to 0
        this.loadScores();

        // Bind event listeners
        this.setupEventListeners();
    }

    loadScores() {
        // Try to load scores from localStorage
        const savedLeftScore = localStorage.getItem('leftScore');
        const savedRightScore = localStorage.getItem('rightScore');

        // Use saved scores if they exist, otherwise default to 0
        this.leftScore = savedLeftScore !== null ? parseInt(savedLeftScore, 10) : 0;
        this.rightScore = savedRightScore !== null ? parseInt(savedRightScore, 10) : 0;

        // Update displays with loaded scores
        this.leftScoreDisplay.textContent = this.leftScore;
        this.rightScoreDisplay.textContent = this.rightScore;
    }

    saveScores() {
        // Save current scores to localStorage
        localStorage.setItem('leftScore', this.leftScore.toString());
        localStorage.setItem('rightScore', this.rightScore.toString());
    }

    setupEventListeners() {
        // Swipe listeners for left panel
        this.leftPanel.addEventListener('touchstart', (e) => this.handleTouchStart(e, 'left'), { passive: true });
        this.leftPanel.addEventListener('touchend', (e) => this.handleTouchEnd(e, 'left'), { passive: true });

        // Swipe listeners for right panel
        this.rightPanel.addEventListener('touchstart', (e) => this.handleTouchStart(e, 'right'), { passive: true });
        this.rightPanel.addEventListener('touchend', (e) => this.handleTouchEnd(e, 'right'), { passive: true });

        // Mouse events for desktop testing
        this.leftPanel.addEventListener('mousedown', (e) => this.handleMouseDown(e, 'left'));
        this.leftPanel.addEventListener('mouseup', (e) => this.handleMouseUp(e, 'left'));

        this.rightPanel.addEventListener('mousedown', (e) => this.handleMouseDown(e, 'right'));
        this.rightPanel.addEventListener('mouseup', (e) => this.handleMouseUp(e, 'right'));

        // Reset button
        this.resetBtn.addEventListener('click', () => this.showResetModal());

        // Fullscreen button
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        // Listen for fullscreen changes to update button icon
        document.addEventListener('fullscreenchange', () => this.updateFullscreenButton());

        // Modal buttons
        this.modalCancel.addEventListener('click', () => this.hideResetModal());
        this.modalConfirm.addEventListener('click', () => this.confirmReset());

        // Click outside modal to close
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.hideResetModal();
            }
        });
    }

    handleTouchStart(e, side) {
        this.touchStartY = e.touches[0].clientY;
        const panel = side === 'left' ? this.leftPanel : this.rightPanel;
        panel.classList.add('swipe-active');
    }

    handleTouchEnd(e, side) {
        this.touchEndY = e.changedTouches[0].clientY;
        const panel = side === 'left' ? this.leftPanel : this.rightPanel;
        panel.classList.remove('swipe-active');
        this.handleSwipe(side);
    }

    handleMouseDown(e, side) {
        this.touchStartY = e.clientY;
        const panel = side === 'left' ? this.leftPanel : this.rightPanel;
        panel.classList.add('swipe-active');
    }

    handleMouseUp(e, side) {
        this.touchEndY = e.clientY;
        const panel = side === 'left' ? this.leftPanel : this.rightPanel;
        panel.classList.remove('swipe-active');
        this.handleSwipe(side);
    }

    handleSwipe(side) {
        const swipeDistance = this.touchStartY - this.touchEndY;

        // Check if swipe distance exceeds threshold
        if (Math.abs(swipeDistance) < this.swipeThreshold) {
            return; // Not a significant swipe
        }

        if (swipeDistance > 0) {
            // Swiped up - increment
            this.increment(side);
        } else {
            // Swiped down - decrement
            this.decrement(side);
        }
    }

    increment(side) {
        if (side === 'left') {
            this.leftScore++;
            this.updateDisplay('left');
        } else {
            this.rightScore++;
            this.updateDisplay('right');
        }
    }

    decrement(side) {
        if (side === 'left') {
            if (this.leftScore > 0) {
                this.leftScore--;
                this.updateDisplay('left');
            }
        } else {
            if (this.rightScore > 0) {
                this.rightScore--;
                this.updateDisplay('right');
            }
        }
    }

    updateDisplay(side) {
        if (side === 'left') {
            this.leftScoreDisplay.textContent = this.leftScore;
            this.animateScore(this.leftScoreDisplay);
        } else {
            this.rightScoreDisplay.textContent = this.rightScore;
            this.animateScore(this.rightScoreDisplay);
        }
        // Save scores to localStorage after each update
        this.saveScores();
    }

    animateScore(element) {
        element.style.transform = 'scale(1.2)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }

    showResetModal() {
        this.modalOverlay.classList.add('active');
    }

    hideResetModal() {
        this.modalOverlay.classList.remove('active');
    }

    confirmReset() {
        this.leftScore = 0;
        this.rightScore = 0;
        this.leftScoreDisplay.textContent = '0';
        this.rightScoreDisplay.textContent = '0';
        // Save reset scores to localStorage
        this.saveScores();
        this.hideResetModal();
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            // Enter fullscreen
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            // Exit fullscreen
            document.exitFullscreen();
        }
    }

    updateFullscreenButton() {
        // Update button icon based on fullscreen state
        if (document.fullscreenElement) {
            this.fullscreenBtn.textContent = '⛶'; // Exit fullscreen icon
        } else {
            this.fullscreenBtn.textContent = '⛶'; // Enter fullscreen icon
        }
    }
}

// Initialize the scorekeeper when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScoreKeeper();
});
