// Simulated winning numbers
const winningNumbers = [9, 50, 21, 14, 20, 28];
const winningNumbersDiv = document.getElementById("winning-numbers");

// Display winning numbers
winningNumbers.forEach(num => {
    const numDiv = document.createElement("div");
    numDiv.textContent = num;
    winningNumbersDiv.appendChild(numDiv);
});

// Countdown Timer
let timeLeft = 60;
const timerElement = document.getElementById("timer");
const countdown = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(countdown);
        timerElement.textContent = "00";
    }
}, 1000);

// Betting System
let balance = 90;
const balanceElement = document.getElementById("balance");
const betInput = document.getElementById("bet-input");
const totalWinningsElement = document.getElementById("total-winnings");
let totalWinnings = 100;

document.querySelectorAll(".bet-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        betInput.value = btn.dataset.value;
    });
});

document.querySelector(".lock-in").addEventListener("click", () => {
    let betAmount = parseInt(betInput.value);
    
    if (betAmount > balance || betAmount <= 0 || isNaN(betAmount)) {
        alert("Invalid bet amount!");
        return;
    }

    balance -= betAmount;
    balanceElement.textContent = `$${balance}`;

    // Simulate win/loss
    if (Math.random() < 0.5) {
        totalWinnings += betAmount * 2;
        totalWinningsElement.textContent = `$${totalWinnings}`;
        alert("You won!");
    } else {
        alert("Better luck next time!");
    }
});

// Withdraw Winnings
document.querySelector(".withdraw").addEventListener("click", () => {
    alert(`You have withdrawn $${totalWinnings}`);
    totalWinnings = 0;
    totalWinningsElement.textContent = "$0";
});
