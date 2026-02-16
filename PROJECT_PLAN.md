# Scorekeeping Website - Project Plan

## Overview
A simple, visual scorekeeping web application with a split-screen design for tracking two scores.

## Design Requirements

### Layout
- **Split Screen**: Two equal halves (50% width each)
- **Left Side**: Red background
- **Right Side**: Blue background
- **Responsive**: Should work on various screen sizes

### Visual Elements (Per Side)
1. **Score Display**: Large, centered number showing current score
2. **Increment Button**: Up arrow (↑) positioned above the score
3. **Decrement Button**: Down arrow (↓) positioned below the score

### Functionality
- Click up arrow → increase score by 1
- Click down arrow → decrease score by 1
- Scores start at 0
- **Scores cannot go negative** (minimum value: 0)
- No upper limit on scores

## Implementation Plan

### Phase 1: HTML Structure
**File**: `index.html`

- [ ] Update existing HTML structure
- [ ] Create two main containers (left-panel, right-panel)
- [ ] Add score display elements
- [ ] Add increment/decrement buttons with arrow symbols
- [ ] Ensure semantic HTML (use appropriate button elements)

### Phase 2: CSS Styling
**File**: `css/style.css`

- [ ] Reset default styles
- [ ] Create split-screen layout (flexbox or grid)
- [ ] Style left panel with red background
- [ ] Style right panel with blue background
- [ ] Make score numbers very large and readable
- [ ] Style buttons (up/down arrows)
  - Make them clickable and visible
  - Add hover states for better UX
  - Consider size for mobile/touch devices
- [ ] Center all elements vertically and horizontally
- [ ] Add responsive design (mobile-friendly)
- [ ] Ensure sufficient color contrast for accessibility

### Phase 3: JavaScript Functionality
**File**: `js/main.js`

- [ ] Initialize score variables (leftScore = 0, rightScore = 0)
- [ ] Select DOM elements (buttons, score displays)
- [ ] Add event listeners for all buttons
  - Left increment button
  - Left decrement button
  - Right increment button
  - Right decrement button
- [ ] Implement increment/decrement functions
- [ ] Update display when scores change
- [ ] Optional: Add localStorage to persist scores across page refreshes

### Phase 4: Enhancements (Optional)
- [ ] Add keyboard controls (arrow keys, WASD, etc.)
- [ ] Add reset button to set both scores to 0
- [ ] Add sound effects on score change
- [ ] Add animations for score updates
- [ ] Add ability to customize team names
- [ ] Add history/undo functionality

## File Structure
```
scorekeeper/
├── index.html          # Main HTML structure
├── css/
│   └── style.css       # All styling
├── js/
│   └── main.js         # Score logic and interactivity
└── images/             # (unused for now)
```

## Technical Decisions

### Color Scheme
- **Left Side**: Red (#e74c3c or similar vibrant red)
- **Right Side**: Blue (#3498db or similar vibrant blue)
- **Text Color**: White for maximum contrast
- **Buttons**: Slightly lighter/darker shade with hover effects

### Typography
- Use large, bold, monospace font for scores (120px - 200px)
- Simple sans-serif font for any labels
- Ensure readability on both red and blue backgrounds

### Button Design
- Arrow symbols: Unicode arrows (↑ ↓) or HTML entities (&uarr; &darr;)
- Alternative: SVG icons or emoji arrows
- Size: Large enough for easy clicking/tapping (min 44px x 44px)

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 JavaScript features are acceptable
- CSS Grid or Flexbox for layout

## Success Criteria
- [x] Visual design matches specification (red/blue split)
- [x] Scores display clearly and update in real-time
- [x] All buttons function correctly
- [x] Interface is intuitive and easy to use
- [x] Works on both desktop and mobile devices
- [x] Clean, maintainable code

## Timeline
1. **HTML Structure**: 5-10 minutes
2. **CSS Styling**: 15-20 minutes
3. **JavaScript Logic**: 10-15 minutes
4. **Testing & Refinement**: 10 minutes

**Total Estimated Time**: ~45 minutes

## Next Steps
1. Review and approve this plan
2. Implement Phase 1 (HTML)
3. Implement Phase 2 (CSS)
4. Implement Phase 3 (JavaScript)
5. Test in browser
6. Iterate based on feedback
