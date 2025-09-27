# Date Time Calculator

A comprehensive web-based calculator for performing various date and time calculations with support for multiple output formats.

## 🚀 Live Demo

**[Try it now!](https://rutvik24.github.io/date-time-calculator/)**

![Date Time Calculator](https://github.com/user-attachments/assets/8182ab4b-0f1e-4fe3-a062-6adfd78c0e2f)

## Features

### Three Calculation Modes
- **Date Calculator**: Work with dates only
- **Time Calculator**: Work with times only  
- **DateTime Calculator**: Work with combined date and time

### Supported Operations
- **Difference Calculations**: Calculate the difference between two dates, times, or datetimes
- **Addition/Subtraction**: Add or subtract time units from a base date/time

### Multiple Output Formats
The calculator provides results in multiple units for comprehensive understanding:

#### Date Differences
- Years, months, and days breakdown (e.g., "3 months 19 days")
- Total days
- Months and days combination
- Weeks and days combination

#### Time Differences  
- Hours, minutes, and seconds breakdown
- 24-hour format (HH:MM:SS)
- Total seconds
- Total minutes

#### DateTime Differences
Combines both date and time formats showing:
- Complete breakdown with months, days, hours, minutes
- Multiple total formats (days, hours, minutes, seconds)

![DateTime Calculator Results](https://github.com/user-attachments/assets/98b4e2a8-90ba-428e-98f7-b8572f40dfd7)

### Supported Time Units
- **Seconds** - For precise time calculations
- **Minutes** - For everyday time calculations  
- **Hours** - For hourly calculations
- **Days** - For daily calculations
- **Weeks** - For weekly calculations
- **Months** - For monthly calculations
- **Years** - For yearly calculations

## Usage

### Date Calculator
1. **Date Difference**: 
   - Select start and end dates
   - Click "Calculate Difference" to see results in multiple formats
   
2. **Date Addition/Subtraction**:
   - Choose a base date
   - Select operation (Add/Subtract)
   - Enter value and unit (Days, Weeks, Months, Years)
   - Get the resulting date

### Time Calculator
1. **Time Difference**:
   - Set start and end times
   - View results in hours/minutes/seconds and total formats
   
2. **Time Addition/Subtraction**:
   - Choose a base time
   - Select operation and unit (Seconds, Minutes, Hours)
   - Get the resulting time

### DateTime Calculator  
1. **DateTime Difference**:
   - Set start and end datetimes
   - View comprehensive results in both date and time formats
   
2. **DateTime Addition/Subtraction**:
   - Choose a base datetime
   - Select from all available units
   - Get the resulting datetime

## Technical Details

- **Frontend**: Pure HTML, CSS, and JavaScript
- **Responsive Design**: Works on desktop and mobile devices
- **No Dependencies**: Runs entirely in the browser
- **Modern UI**: Clean, intuitive interface with gradient styling
- **Deployment**: Automatically deployed to GitHub Pages via GitHub Actions

## Getting Started

### Option 1: Use the Live Demo
Simply visit **[https://rutvik24.github.io/date-time-calculator/](https://rutvik24.github.io/date-time-calculator/)** to use the calculator immediately.

### Option 2: Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/rutvik24/date-time-calculator.git
   ```

2. Open `index.html` in your web browser, or serve it using a local HTTP server:
   ```bash
   python3 -m http.server 8000
   ```

3. Navigate to `http://localhost:8000` in your browser

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:
- Triggers on pushes to the `main` branch
- Uses the latest GitHub Actions for Pages deployment
- Serves the static files directly from the repository root

## Browser Compatibility

Works with all modern browsers that support:
- HTML5 date/time input types
- CSS3 flexbox and gradients  
- ES6 JavaScript features

## Examples

### Date Difference Example
- Start Date: September 27, 2025
- End Date: October 15, 2025
- **Results**: 
  - 18 days
  - Total: 18 days
  - Total: 0 months and 18 days
  - Total: 2 weeks and 4 days

### DateTime Difference Example  
- Start: September 27, 2025, 4:41 PM
- End: January 15, 2026, 10:30 AM
- **Results**:
  - 3 months 19 days
  - 2633 hours 49 minutes  
  - Total: 109 days
  - Total: 9,481,740 seconds
  - And more formats...

## License

MIT License - feel free to use and modify as needed.