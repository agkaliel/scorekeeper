# Scorekeeper

A mobile-first swipe-based scorekeeper web application with a split-screen design for tracking two scores simultaneously.

## Features

- **Split-Screen Design**: Red panel (left) and blue panel (right)
- **Swipe Controls**: Intuitive swipe gestures to change scores
  - Swipe up to increment
  - Swipe down to decrement
- **Score Persistence**: Scores are saved to localStorage and persist across page refreshes
- **Reset Functionality**: Reset button with confirmation modal to prevent accidental resets
- **Responsive Layout**: Works in both landscape and portrait orientations
- **Touch & Mouse Support**: Works on mobile devices and desktop browsers
- **Zero Protection**: Scores cannot go below 0

## How to Use

### On Mobile
- Swipe up on either panel to increase that score
- Swipe down on either panel to decrease that score
- Tap the reset button (↻) in the bottom-right to reset both scores

### On Desktop
- Click and drag up to increase a score
- Click and drag down to decrease a score
- Click the reset button to reset both scores

## Running Locally

Use a local development server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

## Project Structure

```
scorekeeper/
├── index.html          # Main HTML page
├── css/
│   └── style.css      # All styles and responsive design
├── js/
│   └── main.js        # Score logic and swipe gesture handling
├── images/            # Images directory (currently unused)
├── PROJECT_PLAN.md    # Development planning document
└── README.md          # This file
```

## Technical Details

- **Pure JavaScript**: No frameworks or dependencies
- **localStorage API**: For score persistence
- **Touch Events**: Native swipe gesture detection
- **CSS Flexbox**: For responsive layout
- **CSS Animations**: Smooth score updates and modal transitions

## Browser Support

Works on all modern browsers with support for:
- ES6 JavaScript
- localStorage API
- Touch Events / Mouse Events
- CSS Flexbox

## License

MIT
