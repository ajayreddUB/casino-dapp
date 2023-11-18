// Function to generate a random number between 1 and six
const getRandomNumber = () => {
    return Math.floor(Math.random() * 6) + 1;
};

// Function to create the image path for the dice images
const generateImgPath = (imgNum) => {
    return `images/dice${imgNum}.png`
};

// Play button handler for the game logic
$("#play").click(function() {
    const betValue = parseInt($('#bet').val());
    const desiredOutcome = parseInt($('#desiredOutcome').val());

    // Bet value validation
    if (betValue <= 0) {
        alert('Please enter a valid amount for the bet.');
        return;
    }

    // Desired outcome validation
    if (desiredOutcome < 1 || desiredOutcome > 6) {
        alert('Please enter a valid desired outcome (1-6).');
        return;
    }

    // Roll the dice and set the image
    const rolledNumber = getRandomNumber();
    const diceImg = generateImgPath(rolledNumber);
    document.querySelector(".img1").setAttribute("src", diceImg);

    // Check the outcome
    let resultText = '';
    if (rolledNumber === desiredOutcome) {
        resultText = 'Congratulations! You guessed correctly!';
    } else {
        resultText = 'Sorry, try again!';
    }

    $("h1").text(resultText);
});

