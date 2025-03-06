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
//error (tinatanggap nya pa din ung 00 dapat di pede)
document.addEventListener("DOMContentLoaded", function () { 
    const inputs = document.querySelectorAll(".bet-input");

    inputs.forEach((input, index) => {
        input.addEventListener("input", function (e) {
            let value = this.value.replace(/\D/g, ""); // Remove non-numeric characters

            if (value.length > 2) {
                value = value.slice(0, 2); // Limit to 2 digits
            }

            if (value !== "") {
                let num = parseInt(value, 10);

                if (value.length === 2) {
                    if (num > 49) {
                        this.value = ""; // Clear if out of range
                    } else {
                        this.value = value; // Keep valid input
                        if (index < inputs.length - 1) {
                            inputs[index + 1].focus(); // Move to next input
                        }
                    }
                } else {
                    this.value = value; // Allow typing one digit
                }
            } else {
                this.value = ""; // Clear if input is empty
            }
        });

        input.addEventListener("keydown", function (e) {
            if (e.key === "Backspace" && this.value === "" && index > 0) {
                inputs[index - 1].focus(); // Move back on delete
            }
        });

        input.addEventListener("paste", function (e) {
            e.preventDefault(); // Prevent pasting
        });
    });
});


document.getElementById("amount").addEventListener("input", function () {
    let value = parseInt(this.value, 10);
    if (value % 20 !== 0) {
        this.value = value - (value % 20); // Round down to the nearest multiple of 20
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".bet-input");
    
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            let value = parseInt(this.value, 10);
            if (isNaN(value) || value < 1 || value > 49) {
                this.value = "";
                return;
            }
            
            // Ensure uniqueness
            let values = Array.from(inputs).map(inp => inp.value);
            let duplicates = values.filter(v => v !== "" && values.indexOf(v) !== values.lastIndexOf(v));
            
            if (duplicates.length > 0) {
                alert("Number already entered! Please enter a unique number.");
                this.value = "";
            }
        });
    });
});
