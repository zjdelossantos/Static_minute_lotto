const countdownContainer = document.querySelector(".countdown-container");
const countdownText = document.querySelector(".countdown-text");
let countdown = 60; // 1-minute countdown

function updateCountdown() {
    countdownText.textContent = `Next Draw: ${countdown}s`;

    if (countdown === 0) {
        countdownContainer.style.background = "radial-gradient(circle, #ff4d4d, #b30000)"; // Red when 0
        setTimeout(() => {
            countdownContainer.style.background = "radial-gradient(circle, #57ff57, #00b300)"; // Back to green
        }, 500); // Quickly revert to green after 500ms

        generateWinningNumbers(); // Change winning numbers
        countdown = 60; // Reset countdown
    } else {
        countdown--;
    }
}

// Function to generate new winning numbers
function generateWinningNumbers() {
    const numbersContainer = document.getElementById("winningNumbers");
    numbersContainer.innerHTML = ""; // Clear previous numbers
    let winningNumbers = new Set();

    while (winningNumbers.size < 6) {
        winningNumbers.add(Math.floor(Math.random() * 49) + 1);
    }

    winningNumbers.forEach(num => {
        let numberBall = document.createElement("div");
        numberBall.classList.add("number");
        numberBall.textContent = num;
        numbersContainer.appendChild(numberBall);
    });
}

// Start the countdown and update every second
setInterval(updateCountdown, 1000);

// Generate initial numbers
generateWinningNumbers();

//bet-input

document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".bet-input");

    inputs.forEach(input => {
        input.addEventListener("input", function () {
            let value = this.value.trim();

            // Ensure the input is a valid number within range
            if (!/^\d{1,2}$/.test(value) || value < 1 || value > 49) {
                this.value = "";
                return;
            }

            // Check for duplicate numbers
            let values = Array.from(inputs).map(inp => inp.value).filter(v => v !== "");
            let uniqueValues = new Set(values);

            if (uniqueValues.size !== values.length) {
                this.value = "";
            }
        });

        // Prevent entering non-numeric values and limit input length to 2
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") return;
            if (!/^\d$/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                e.preventDefault();
            }
        });
    });
});

// Add this function to your existing lottongpinoy.js file

// Store for winning numbers
let currentWinningNumbers = [];

// Modified generateWinningNumbers function to store the current winning numbers
function generateWinningNumbers() {
    const numbersContainer = document.getElementById("winningNumbers");
    numbersContainer.innerHTML = ""; // Clear previous numbers
    let winningNumbers = new Set();

    while (winningNumbers.size < 6) {
        winningNumbers.add(Math.floor(Math.random() * 49) + 1);
    }

    currentWinningNumbers = Array.from(winningNumbers); // Store winning numbers

    winningNumbers.forEach(num => {
        let numberBall = document.createElement("div");
        numberBall.classList.add("number");
        numberBall.textContent = num;
        numbersContainer.appendChild(numberBall);
    });
}

// Function to check if player won
function checkWin() {
    const inputs = document.querySelectorAll(".bet-input");
    let playerNumbers = [];
    
    // Collect player numbers
    inputs.forEach(input => {
        if (input.value) {
            playerNumbers.push(parseInt(input.value));
        }
    });
    
    // If player hasn't entered all 6 numbers, can't win
    if (playerNumbers.length !== 6) {
        return false;
    }
    
    // Check if numbers match (for testing, we'll allow partial matches)
    // In a real game, you might require all 6 numbers to match
    let matchCount = 0;
    playerNumbers.forEach(num => {
        if (currentWinningNumbers.includes(num)) {
            matchCount++;
        }
    });
    
    // For testing purposes - win if 3 or more numbers match
    // For a real game, you'd likely require all 6 to match
    return matchCount >= 3;
}

// Function to show the win animation
function showWinAnimation() {
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.id = 'win-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    
    // Get amount won from bet amount
    const betAmount = document.getElementById('amount').value;
    const prizeMoney = parseInt(betAmount) * 25; // Example: 25x multiplier for winnings
    
    // Get player numbers
    const inputs = document.querySelectorAll(".bet-input");
    let playerNumbers = [];
    inputs.forEach(input => {
        if (input.value) {
            playerNumbers.push(input.value);
        }
    });
    
    // Winner signboard content
    overlay.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');
            
            .winner-signboard {
                position: relative;
                width: 80%;
                max-width: 700px;
                background: linear-gradient(135deg, #ff00ff, #6600cc, #3300ff);
                border-radius: 20px;
                border: 6px solid gold;
                box-shadow: 0 0 50px rgba(255, 215, 0, 0.8), 
                            0 0 100px rgba(255, 215, 0, 0.5),
                            inset 0 0 30px rgba(255, 255, 255, 0.3);
                text-align: center;
                padding: 40px 20px;
                z-index: 100;
                transform: scale(0);
                animation: popIn 0.5s ease-out forwards;
                font-family: 'Dela Gothic One', sans-serif;
            }
            
            @keyframes popIn {
                0% { transform: scale(0); }
                70% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .winner-title {
                font-size: 50px;
                color: #ffffff;
                text-shadow: 2px 2px 0 gold, -2px -2px 0 gold, 2px -2px 0 gold, -2px 2px 0 gold,
                             0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.5);
                margin-bottom: 20px;
                animation: pulse 1.5s infinite alternate;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                100% { transform: scale(1.05); }
            }
            
            .prize-amount {
                font-size: 70px;
                font-weight: bold;
                color: gold;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
                margin: 20px 0;
                animation: shimmer 2s infinite;
            }
            
            @keyframes shimmer {
                0% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); }
                50% { text-shadow: 0 0 20px gold, 0 0 40px gold; }
                100% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); }
            }
            
            .matching-numbers {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin: 30px 0;
                flex-wrap: wrap;
            }
            
            .number-ball {
                width: 60px;
                height: 60px;
                background: linear-gradient(to bottom, #fef2a0, #d4a900);
                color: black;
                font-size: 24px;
                font-weight: bold;
                border-radius: 50%;
                border: 2px solid black;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
                animation: bounce 0.5s ease-out;
            }
            
            @keyframes bounce {
                0% { transform: translateY(-200px); }
                70% { transform: translateY(20px); }
                90% { transform: translateY(-10px); }
                100% { transform: translateY(0); }
            }
            
            .continue-btn {
                padding: 15px 30px;
                font-size: 20px;
                background: linear-gradient(to bottom, #57ff57, #008f00);
                color: white;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-weight: bold;
                margin-top: 20px;
                box-shadow: 0 4px 0 #006600;
                transition: all 0.2s;
            }
            
            .continue-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 0 #006600;
            }
            
            .continue-btn:active {
                transform: translateY(2px);
                box-shadow: 0 2px 0 #006600;
            }
            
            .confetti {
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: #f00;
                z-index: 1;
            }
            
            .star {
                position: absolute;
                background-color: gold;
                clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                animation: spin 2s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .firework {
                position: absolute;
                width: 4px;
                height: 4px;
                border-radius: 50%;
                z-index: 2;
            }
            
            @keyframes explode {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(30); opacity: 0; }
            }
            
            @keyframes fall {
                0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                75% { opacity: 1; }
                100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
            }
        </style>
        <div class="winner-signboard">
            <div class="winner-title">CONGRATULATIONS!</div>
            <div>YOU WON</div>
            <div class="prize-amount">₱ ${prizeMoney.toFixed(2)}</div>
            <div>YOUR NUMBERS:</div>
            <div class="matching-numbers">
                ${playerNumbers.map(num => `<div class="number-ball">${num}</div>`).join('')}
            </div>
            <button class="continue-btn">CONTINUE</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add click event to continue button
    overlay.querySelector('.continue-btn').addEventListener('click', () => {
        overlay.remove();
    });
    
    // Create confetti effect
    createConfetti();
    createStars();
    createFireworks();
}

// Function to create confetti effect
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#ff69b4'];
    const confettiCount = 200;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random position, color, and shape
        const left = Math.random() * 100;
        const width = Math.random() * 12 + 5;
        const height = Math.random() * 12 + 5;
        const colorIndex = Math.floor(Math.random() * colors.length);
        const shape = Math.random() > 0.5 ? 'square' : 'rectangle';
        
        confetti.style.left = `${left}%`;
        confetti.style.width = `${width}px`;
        confetti.style.height = shape === 'square' ? `${width}px` : `${height}px`;
        confetti.style.backgroundColor = colors[colorIndex];
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.position = 'absolute';
        
        // Animation
        const duration = Math.random() * 3 + 2;
        const delay = Math.random();
        
        confetti.style.animation = `fall ${duration}s ease-in ${delay}s infinite`;
        confetti.style.top = '-20px';
        
        document.getElementById('win-overlay').appendChild(confetti);
    }
}

// Function to create star effects
function createStars() {
    const starCount = 30;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.position = 'absolute';
        
        document.getElementById('win-overlay').appendChild(star);
    }
}

// Function to create firework effects
function createFireworks() {
    const fireworkCount = 8;
    const colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#ffa500'];
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            firework.style.left = `${left}%`;
            firework.style.top = `${top}%`;
            firework.style.backgroundColor = color;
            firework.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
            firework.style.position = 'absolute';
            
            document.getElementById('win-overlay').appendChild(firework);
            
            firework.style.animation = 'explode 1s ease-out forwards';
            
            // Remove after animation is complete
            setTimeout(() => {
                firework.remove();
            }, 1000);
            
        }, i * 500);
    }
}

// Add event listener to the bet button
document.addEventListener("DOMContentLoaded", function() {
    const betButton = document.querySelector(".bet-btn");
    
    betButton.addEventListener("click", function() {
        // Check if all inputs have valid numbers
        const inputs = document.querySelectorAll(".bet-input");
        let allFilled = true;
        
        inputs.forEach(input => {
            if (!input.value) {
                allFilled = false;
            }
        });
        
        if (!allFilled) {
            alert("Please enter all 6 numbers before placing your bet!");
            return;
        }
        
        // For testing purposes, use a simulated win check
        // In a real game, you'd check against the actual winning numbers
        const didWin = checkWin();
        
        if (didWin) {
            showWinAnimation();
        } else {
            alert("Better luck next time!");
        }
    });
    
    // Also add reset button functionality
    const resetButton = document.querySelector(".reset-btn");
    resetButton.addEventListener("click", function() {
        const inputs = document.querySelectorAll(".bet-input");
        inputs.forEach(input => {
            input.value = "";
        });
        
        document.getElementById("amount").value = "20";
    });
});