document.getElementById('rollButton').addEventListener('click', function() {
    let bet = parseInt(document.getElementById('bet').value);
    let balanceElement = document.getElementById('balance');
    let balance = parseInt(balanceElement.textContent.replace('Balance: $', ''));

    if (!bet || bet < 0 || bet > balance) {
        alert('Please enter a valid bet amount.');
        return;
    }

    let diceResult = Math.ceil(Math.random() * 6);
    document.getElementById('dice').textContent = `Dice: ${diceResult}`;
    let win = diceResult > 3; // Example win condition

    if (win) {
        balance += bet;
        document.getElementById('result').textContent = 'You win!';
    } else {
        balance -= bet;
        document.getElementById('result').textContent = 'You lose!';
    }

    balanceElement.textContent = `Balance: $${balance}`;
});

