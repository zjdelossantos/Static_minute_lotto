function logout() {
    window.location.href = '../login/login.html';
}

function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

function processCashIn() {
    const amount = document.getElementById('cash-in-amount').value;
    if (amount >= 50) {
        alert(`Cash in of ₱${amount} is being processed!`);
        closePopup('cash-in-popup');
        // Here you would typically update the wallet balance
    } else {
        alert('Minimum cash in amount is ₱50');
    }
}

function processCashOut() {
    const amount = document.getElementById('cash-out-amount').value;
    const currentBalance = 200; // This would usually be fetched from your backend
    
    if (amount <= 0) {
        alert('Please enter a valid amount');
    } else if (amount > currentBalance) {
        alert('Insufficient balance');
    } else {
        alert(`Cash out of ₱${amount} is being processed!`);
        closePopup('cash-out-popup');
        // Here you would typically update the wallet balance
    }
}