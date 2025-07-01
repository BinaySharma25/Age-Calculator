let dayInput = document.getElementById("day");
let monthInput = document.getElementById("month");
let yearInput = document.getElementById("year");

// Set max year to current year
yearInput.max = new Date().getFullYear();

function calculateAge(){
    // Show loading animation
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.classList.add('loading');
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        // Get input values
        let day = parseInt(dayInput.value);
        let month = parseInt(monthInput.value);
        let year = parseInt(yearInput.value);
        
        // Validate inputs
        if (!day || !month || !year) {
            alert("Please enter a valid date");
            calculateBtn.classList.remove('loading');
            return;
        }
        
        // Validate date
        let birthDate = new Date(year, month - 1, day);
        if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
            alert("Please enter a valid date");
            calculateBtn.classList.remove('loading');
            return;
        }
        
        // Check if date is in the future
        if (birthDate > new Date()) {
            alert("Birth date cannot be in the future");
            calculateBtn.classList.remove('loading');
            return;
        }
    let d1 = birthDate.getDate();
    let m1 = birthDate.getMonth() + 1;
    let y1 = birthDate.getFullYear();

    let today = new Date();

    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    let d3,m3,y3;
    y3 = y2 - y1;

    if(m2 >= m1){
        m3 = m2 - m1;
    }else{
        y3--;
        m3 = 12 + m2 - m1;
    }

    if(d2 >= d1){
        d3 = d2 - d1;
    }else{
        m3--;
        d3 = getDaysInMonth(y1,m1) + d2 - d1;
    }
    if(m3 <0){
        m3 = 11;
        y3--; 
    }
    
    // Display the result
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `<h2>Your age is: <span>${y3}</span> years, <span>${m3}</span> months, <span>${d3}</span> days</h2>`;
    resultElement.classList.add("show");
    
    // Hide loading animation
    calculateBtn.classList.remove('loading');
    }, 800); // 800ms delay for loading animation
}

function getDaysInMonth(year,month){
    return new Date(year, month , 0).getDate();
}

function resetCalculator() {
    // Clear all input fields
    dayInput.value = '';
    monthInput.value = '';
    yearInput.value = '';
    
    // Hide result
    const resultElement = document.getElementById("result");
    resultElement.classList.remove("show");
    
    // Reset button state if loading
    const calculateBtn = document.getElementById('calculateBtn');
    calculateBtn.classList.remove('loading');
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.documentElement;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
});

