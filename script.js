// Tab functionality
function openTab(evt, tabName) {
    var i, tabcontent, tabbtns;
    
    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    
    // Remove active class from all tab buttons
    tabbtns = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabbtns.length; i++) {
        tabbtns[i].classList.remove("active");
    }
    
    // Show the selected tab and mark button as active
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Utility functions for date/time calculations
function calculateAccurateDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    
    // Adjust if days is negative
    if (days < 0) {
        months--;
        // Get the last day of the previous month
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
    }
    
    // Adjust if months is negative
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}

function formatMultipleUnits(totalDays, totalHours, totalMinutes, totalSeconds, startDate = null, endDate = null) {
    const results = [];
    
    if (totalDays > 0) {
        // If we have start and end dates, calculate accurate difference
        if (startDate && endDate) {
            const { years, months, days } = calculateAccurateDateDifference(startDate, endDate);
            
            if (years > 0) results.push(`${years} year${years !== 1 ? 's' : ''}`);
            if (months > 0) results.push(`${months} month${months !== 1 ? 's' : ''}`);
            if (days > 0) results.push(`${days} day${days !== 1 ? 's' : ''}`);
        } else {
            // Fallback to simple calculation if dates not provided (legacy behavior)
            const years = Math.floor(totalDays / 365);
            const months = Math.floor((totalDays % 365) / 30);
            const days = totalDays % 30;
            
            if (years > 0) results.push(`${years} year${years !== 1 ? 's' : ''}`);
            if (months > 0) results.push(`${months} month${months !== 1 ? 's' : ''}`);
            if (days > 0) results.push(`${days} day${days !== 1 ? 's' : ''}`);
        }
        
        // Also show in other units
        results.push(`Total: ${totalDays} days`);
        
        // Calculate accurate months and days representation
        if (startDate && endDate && totalDays <= 365) {
            const { years, months, days } = calculateAccurateDateDifference(startDate, endDate);
            const totalMonths = years * 12 + months;
            results.push(`Total: ${totalMonths} month${totalMonths !== 1 ? 's' : ''} and ${days} day${days !== 1 ? 's' : ''}`);
        }
        
        if (totalDays <= 8 * 7) {
            results.push(`Total: ${Math.floor(totalDays / 7)} weeks and ${totalDays % 7} days`);
        }
    }
    
    return results;
}

function formatTimeUnits(totalSeconds) {
    const results = [];
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) results.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) results.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (seconds > 0) results.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
    
    // Also show in different formats
    results.push(`Total: ${Math.floor(totalSeconds / 3600)}:${String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`);
    results.push(`Total: ${totalSeconds} seconds`);
    results.push(`Total: ${Math.floor(totalSeconds / 60)} minutes`);
    
    return results;
}

function displayResults(resultElement, results, isError = false) {
    resultElement.classList.remove('has-content', 'error');
    
    if (isError) {
        resultElement.classList.add('error');
        resultElement.innerHTML = results;
        return;
    }
    
    if (results.length > 0) {
        resultElement.classList.add('has-content');
        resultElement.innerHTML = `
            <div class="multiple-results">
                ${results.map(result => `<div class="result-item">${result}</div>`).join('')}
            </div>
        `;
    } else {
        resultElement.innerHTML = 'No results to display';
    }
}

// Date Calculator Functions
function calculateDateDifference() {
    const startDate = document.getElementById('date-start').value;
    const endDate = document.getElementById('date-end').value;
    const resultElement = document.getElementById('date-difference-result');
    
    if (!startDate || !endDate) {
        displayResults(resultElement, 'Please select both start and end dates', true);
        return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
        displayResults(resultElement, 'Start date cannot be after end date', true);
        return;
    }
    
    const timeDifference = end.getTime() - start.getTime();
    const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    
    const results = formatMultipleUnits(dayDifference, 0, 0, 0, start, end);
    displayResults(resultElement, results);
}

function calculateDateAddSubtract() {
    const baseDate = document.getElementById('date-base').value;
    const operation = document.getElementById('date-operation').value;
    const value = parseInt(document.getElementById('date-value').value);
    const unit = document.getElementById('date-unit').value;
    const resultElement = document.getElementById('date-addsub-result');
    
    if (!baseDate || !value) {
        displayResults(resultElement, 'Please fill in all fields', true);
        return;
    }
    
    const base = new Date(baseDate);
    let result = new Date(base);
    
    const multiplier = operation === 'add' ? 1 : -1;
    const adjustedValue = value * multiplier;
    
    switch (unit) {
        case 'days':
            result.setDate(result.getDate() + adjustedValue);
            break;
        case 'weeks':
            result.setDate(result.getDate() + (adjustedValue * 7));
            break;
        case 'months':
            result.setMonth(result.getMonth() + adjustedValue);
            break;
        case 'years':
            result.setFullYear(result.getFullYear() + adjustedValue);
            break;
    }
    
    const resultText = `Result: ${result.toDateString()}`;
    const operationText = `${operation === 'add' ? 'Added' : 'Subtracted'} ${value} ${unit}`;
    
    displayResults(resultElement, [operationText, resultText]);
}

// Time Calculator Functions
function calculateTimeDifference() {
    const startTime = document.getElementById('time-start').value;
    const endTime = document.getElementById('time-end').value;
    const resultElement = document.getElementById('time-difference-result');
    
    if (!startTime || !endTime) {
        displayResults(resultElement, 'Please select both start and end times', true);
        return;
    }
    
    const today = new Date().toDateString();
    const start = new Date(`${today} ${startTime}`);
    let end = new Date(`${today} ${endTime}`);
    
    // Handle case where end time is next day
    if (end < start) {
        end.setDate(end.getDate() + 1);
    }
    
    const timeDifference = end.getTime() - start.getTime();
    const totalSeconds = Math.floor(timeDifference / 1000);
    
    const results = formatTimeUnits(totalSeconds);
    displayResults(resultElement, results);
}

function calculateTimeAddSubtract() {
    const baseTime = document.getElementById('time-base').value;
    const operation = document.getElementById('time-operation').value;
    const value = parseInt(document.getElementById('time-value').value);
    const unit = document.getElementById('time-unit').value;
    const resultElement = document.getElementById('time-addsub-result');
    
    if (!baseTime || !value) {
        displayResults(resultElement, 'Please fill in all fields', true);
        return;
    }
    
    const today = new Date().toDateString();
    const base = new Date(`${today} ${baseTime}`);
    let result = new Date(base);
    
    const multiplier = operation === 'add' ? 1 : -1;
    const adjustedValue = value * multiplier;
    
    switch (unit) {
        case 'seconds':
            result.setSeconds(result.getSeconds() + adjustedValue);
            break;
        case 'minutes':
            result.setMinutes(result.getMinutes() + adjustedValue);
            break;
        case 'hours':
            result.setHours(result.getHours() + adjustedValue);
            break;
    }
    
    const resultTime = result.toTimeString().split(' ')[0].substr(0, 5);
    const resultText = `Result: ${resultTime}`;
    const operationText = `${operation === 'add' ? 'Added' : 'Subtracted'} ${value} ${unit}`;
    
    displayResults(resultElement, [operationText, resultText]);
}

// DateTime Calculator Functions
function calculateDateTimeDifference() {
    const startDateTime = document.getElementById('datetime-start').value;
    const endDateTime = document.getElementById('datetime-end').value;
    const resultElement = document.getElementById('datetime-difference-result');
    
    if (!startDateTime || !endDateTime) {
        displayResults(resultElement, 'Please select both start and end date-times', true);
        return;
    }
    
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    
    if (start > end) {
        displayResults(resultElement, 'Start date-time cannot be after end date-time', true);
        return;
    }
    
    const timeDifference = end.getTime() - start.getTime();
    const totalSeconds = Math.floor(timeDifference / 1000);
    const totalDays = Math.floor(totalSeconds / (24 * 3600));
    
    let results = [];
    
    if (totalDays > 0) {
        results = results.concat(formatMultipleUnits(totalDays, 0, 0, 0, start, end));
    }
    
    // Add time-specific results
    results = results.concat(formatTimeUnits(totalSeconds));
    
    displayResults(resultElement, results);
}

function calculateDateTimeAddSubtract() {
    const baseDateTime = document.getElementById('datetime-base').value;
    const operation = document.getElementById('datetime-operation').value;
    const value = parseInt(document.getElementById('datetime-value').value);
    const unit = document.getElementById('datetime-unit').value;
    const resultElement = document.getElementById('datetime-addsub-result');
    
    if (!baseDateTime || !value) {
        displayResults(resultElement, 'Please fill in all fields', true);
        return;
    }
    
    const base = new Date(baseDateTime);
    let result = new Date(base);
    
    const multiplier = operation === 'add' ? 1 : -1;
    const adjustedValue = value * multiplier;
    
    switch (unit) {
        case 'seconds':
            result.setSeconds(result.getSeconds() + adjustedValue);
            break;
        case 'minutes':
            result.setMinutes(result.getMinutes() + adjustedValue);
            break;
        case 'hours':
            result.setHours(result.getHours() + adjustedValue);
            break;
        case 'days':
            result.setDate(result.getDate() + adjustedValue);
            break;
        case 'weeks':
            result.setDate(result.getDate() + (adjustedValue * 7));
            break;
        case 'months':
            result.setMonth(result.getMonth() + adjustedValue);
            break;
        case 'years':
            result.setFullYear(result.getFullYear() + adjustedValue);
            break;
    }
    
    const resultText = `Result: ${result.toLocaleString()}`;
    const operationText = `${operation === 'add' ? 'Added' : 'Subtracted'} ${value} ${unit}`;
    
    displayResults(resultElement, [operationText, resultText]);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Set default values to today/current time for better UX
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const currentTime = today.toTimeString().split(' ')[0].substr(0, 5);
    const currentDateTime = today.toISOString().slice(0, 16);
    
    // Set default dates
    document.getElementById('date-start').value = todayString;
    document.getElementById('date-end').value = todayString;
    document.getElementById('date-base').value = todayString;
    
    // Set default times
    document.getElementById('time-start').value = currentTime;
    document.getElementById('time-end').value = currentTime;
    document.getElementById('time-base').value = currentTime;
    
    // Set default datetimes
    document.getElementById('datetime-start').value = currentDateTime;
    document.getElementById('datetime-end').value = currentDateTime;
    document.getElementById('datetime-base').value = currentDateTime;
});