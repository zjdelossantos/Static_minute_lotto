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
