# Scorekeeper - Project Overview

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [File Structure](#file-structure)
- [Implementation Details](#implementation-details)
- [Browser Compatibility](#browser-compatibility)
- [Deployment](#deployment)

## Introduction

Scorekeeper is a mobile-first web application designed for tracking two scores simultaneously using intuitive swipe gestures. The app features a split-screen design optimized for landscape orientation on mobile devices, with large, easy-to-read numbers ideal for scorekeeping during games or sports.

**Live Demo:** https://agkaliel.github.io/scorekeeper/

## Features

### Core Functionality
1. **Split-Screen Design**
   - Left panel (red): Displays and controls left score
   - Right panel (blue): Displays and controls right score
   - Each panel occupies exactly 50% of the screen width

2. **Swipe-Based Controls**
   - Swipe up to increment score (+1)
   - Swipe down to decrement score (-1)
   - Works with both touch (mobile) and mouse (desktop)
   - Minimum swipe threshold of 30px prevents accidental changes
   - Visual feedback during active swipe (score scales to 1.1x)

3. **Score Persistence**
   - Automatic saving to localStorage after each score change
   - Scores persist across page refreshes
   - Separate storage for left and right scores

4. **Reset Functionality**
   - Dedicated reset button in bottom-left corner
   - Confirmation modal prevents accidental resets
   - Resets both scores to 0 simultaneously
   - Updates localStorage after reset

5. **Fullscreen Mode** (Non-iOS)
   - Toggle button in bottom-right corner
   - Works on Android and desktop browsers
   - Automatically hidden on iOS devices (API not supported)
   - Vendor-prefixed for broad browser compatibility

6. **Landscape Mode Enforcement**
   - Fullscreen overlay prompts rotation in portrait orientation
   - Animated rotating phone icon
   - Automatically disappears in landscape mode
   - Ensures optimal viewing experience

### Visual Features
- **Large, Responsive Numbers**: Scale from 100px to 600px based on screen size
- **Scoreboard Font**: Tahoma/Trebuchet MS for clear, blocky appearance
- **Score Animation**: Smooth scale animation (1.0x → 1.2x → 1.0x) on changes
- **Swipe Hints**: Subtle pulsing hints ("Swipe up or down") on mobile devices
- **Zero Protection**: Scores cannot go below 0

## Technical Architecture

### Technologies Used
- **HTML5**: Semantic markup, ARIA labels for accessibility
- **CSS3**: Flexbox layout, media queries, animations, clamp() for responsive sizing
- **Vanilla JavaScript (ES6)**: Class-based architecture, no frameworks
- **Web APIs**:
  - localStorage API for data persistence
  - Fullscreen API (with vendor prefixes)
  - Touch Events API
  - Mouse Events API

### Design Patterns
- **Object-Oriented**: Single `ScoreKeeper` class manages all functionality
- **Event-Driven**: Event listeners for touch, mouse, and UI interactions
- **Responsive**: Mobile-first approach with progressive enhancement
- **Progressive Enhancement**: Works on devices without fullscreen support

## File Structure

```
scorekeeper/
├── index.html              # Main HTML structure
├── css/
│   └── style.css          # All styles, animations, and responsive design
├── js/
│   └── main.js            # ScoreKeeper class and application logic
├── images/                # Image assets (currently unused)
├── README.md              # User-facing documentation
├── OVERVIEW.md            # This file - technical documentation
├── PROJECT_PLAN.md        # Original project planning document
└── .gitignore             # Git ignore rules
```

## Implementation Details

### HTML Structure

The app uses a straightforward DOM structure:
- `.scorekeeper` container with two `.panel` divs (left and right)
- Each panel contains a `.score` display and `.swipe-hint`
- Landscape rotation prompt overlay (shown only in portrait)
- Reset and fullscreen buttons (fixed position)
- Modal overlay for reset confirmation

### CSS Architecture

**Layout System:**
- Flexbox for split-screen layout
- `flex: 1` on panels for equal distribution
- `max-width: 50%` ensures strict 50/50 split
- `overflow: hidden` prevents content overflow

**Responsive Sizing:**
- Uses `clamp(min, preferred, max)` for fluid typography
- Main: `clamp(100px, 35vw, 600px)` - scales with viewport width
- Mobile landscape: `clamp(80px, 40vh, 400px)` - scales with viewport height
- Portrait: `clamp(100px, 30vh, 500px)` - optimized for vertical layout

**Media Queries:**
1. Mobile landscape (`max-width: 768px` + `orientation: landscape`)
   - Smaller font sizes (viewport height-based)
   - Reduced button sizes
   - Adjusted hint positioning

2. Portrait orientation (`orientation: portrait`)
   - Shows landscape prompt overlay
   - Stacks panels vertically
   - Adjusts max-width/max-height constraints

3. Desktop detection (`hover: hover` + `pointer: fine`)
   - Hides swipe hints (not relevant for mouse users)

### JavaScript Architecture

**ScoreKeeper Class:**

```javascript
class ScoreKeeper {
    constructor() {
        // Initialize properties
        // Get DOM elements
        // Load saved scores
        // Check iOS and hide fullscreen if needed
        // Setup event listeners
    }
}
```

**Key Methods:**

1. **Score Management:**
   - `loadScores()`: Retrieves scores from localStorage on initialization
   - `saveScores()`: Persists current scores to localStorage
   - `increment(side)`: Increases score by 1
   - `decrement(side)`: Decreases score by 1 (min: 0)
   - `updateDisplay(side)`: Updates DOM and triggers animation

2. **Gesture Detection:**
   - `handleTouchStart(e, side)`: Records initial touch Y-coordinate
   - `handleTouchEnd(e, side)`: Calculates swipe distance and direction
   - `handleMouseDown(e, side)`: Mouse equivalent for desktop testing
   - `handleMouseUp(e, side)`: Mouse equivalent for desktop testing
   - `handleSwipe(side)`: Determines if swipe exceeds threshold and direction

3. **UI Interactions:**
   - `showResetModal()`: Displays confirmation modal
   - `hideResetModal()`: Closes modal
   - `confirmReset()`: Resets both scores and saves to localStorage
   - `animateScore(element)`: Triggers scale animation

4. **Fullscreen Management:**
   - `checkiOSAndHideFullscreen()`: Detects iOS and hides button
   - `toggleFullscreen()`: Enters/exits fullscreen with vendor prefixes
   - `updateFullscreenButton()`: Updates button icon based on state

### Event Listeners

**Touch Events:**
- `touchstart` (passive): Records touch start position
- `touchend` (passive): Calculates swipe and updates score

**Mouse Events:**
- `mousedown`: Desktop equivalent of touchstart
- `mouseup`: Desktop equivalent of touchend

**Fullscreen Events:**
- `fullscreenchange` (with vendor prefixes): Updates button state

**UI Events:**
- Click handlers for reset and fullscreen buttons
- Click handlers for modal buttons
- Click outside modal to close

### Swipe Detection Algorithm

```javascript
handleSwipe(side) {
    const swipeDistance = this.touchStartY - this.touchEndY;

    if (Math.abs(swipeDistance) < this.swipeThreshold) {
        return; // Ignore small movements
    }

    if (swipeDistance > 0) {
        this.increment(side); // Swiped up
    } else {
        this.decrement(side); // Swiped down
    }
}
```

### localStorage Schema

```javascript
// Keys and values
"leftScore": "15"    // String representation of integer
"rightScore": "23"   // String representation of integer
```

### iOS Detection

Uses user agent string detection with fallback check:
```javascript
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
```

The `!window.MSStream` check excludes Windows Phone devices.

### Fullscreen API Compatibility

Implements vendor-prefixed methods for broad compatibility:
- Standard: `requestFullscreen()`, `exitFullscreen()`
- WebKit (Safari/Chrome): `webkitRequestFullscreen()`, `webkitExitFullscreen()`
- Mozilla (Firefox): `mozRequestFullScreen()`, `mozCancelFullScreen()`
- Microsoft (IE/Edge): `msRequestFullscreen()`, `msExitFullscreen()`

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge (Desktop & Android)
- ✅ Firefox (Desktop & Android)
- ✅ Safari (Desktop & iOS)
- ✅ Samsung Internet (Android)

### Feature Support
| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Swipe Gestures | ✅ | ✅ | ✅ | ✅ |
| localStorage | ✅ | ✅ | ✅ | ✅ |
| Fullscreen | ✅ | ✅ | ❌ iOS | ✅ |
| Touch Events | ✅ | ✅ | ✅ | ✅ |

**Note:** iOS Safari does not support the Fullscreen API for web pages. The fullscreen button is automatically hidden on iOS devices.

### iOS Fullscreen Workaround

For fullscreen experience on iOS:
1. Open website in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Launch from home screen icon (runs in standalone mode)

## Deployment

### GitHub Pages

The app is deployed using GitHub Pages:
- **Source Branch:** `master`
- **Source Path:** `/` (root)
- **Build Type:** Legacy (static site)
- **URL:** https://agkaliel.github.io/scorekeeper/

### Deployment Process

1. Commit changes to local repository
2. Push to `master` branch on GitHub
3. GitHub Pages automatically rebuilds and deploys
4. Site updates within 1-3 minutes

### Local Development

Run a local development server:

```bash
python3 -m http.server 8000
```

Then visit: http://localhost:8000

## Performance Optimizations

1. **Passive Event Listeners**: Touch events use `{ passive: true }` to improve scroll performance
2. **CSS Animations**: Hardware-accelerated transforms for smooth animations
3. **Minimal Dependencies**: Zero external libraries reduces load time
4. **localStorage**: Efficient data persistence without server requests

## Accessibility

- ARIA labels on interactive buttons
- High contrast colors (red/blue on white text)
- Large touch targets (50px buttons on desktop, 40px on mobile)
- Clear visual feedback for interactions
- Keyboard-free mobile operation

## Future Enhancements

Potential improvements:
- Customizable colors per side
- Adjustable increment values (e.g., +2, +5)
- Score history/undo functionality
- Sound effects on score changes
- Multiple score tracking (more than 2 teams)
- Timer integration
- Score sharing/export

## License

MIT License - See project repository for details

## Development

**Built with:** Claude Code (AI-assisted development)

**Repository:** https://github.com/agkaliel/scorekeeper

**Developer:** agkaliel
