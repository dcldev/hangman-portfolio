// Pseudocode of what I need
// Grab reference to my DOM elements - named with $ signs to know that it is a dom element (one of the easier ways to refer and find dom elements)

var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeHolders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');
 
// Create variables for hangman game (wordBank, wins, losses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect lettor bank)

var wordBank = ['Bump', 'Set', 'Spike', 'Sideout', 'Beach Volleyball', 'AVP', 'Jump Serve', 'Shoot Set', 'Float Serve', 'Ace', 'Jumbo Shrimp', 'Cutty'];
var wins = 0;
var losses = 0;
var guessesLeft = 12;
var gameRunning = false;
var pickedWord = ''; // based on the same concept as the array below.
var pickedWordPlaceHolderArr = []; //set to an array because we are pushing values to it. If it's not an array the "method" push wouldn't know what to do.
var guessedLetterBank = [];
var incorrectLetterBank = [];

// Functions needed to run the game:

// *newGame function to reset all stats, pick new word and create placehodlers.

function newGame() {
    //Reset all game info
    gameRunning = true;
    guessesLeft = 12;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceHolderArr = [];

    // Pick a new word
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // Create placeholders out of new pickedWord
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === ' ') {
            pickedWordPlaceHolderArr.push(' ');
        } else {
            pickedWordPlaceHolderArr.push('_');
        }
    }
    // Write all new game info to DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceHolderArr.join(''); // using Join to remove all commas
    $guessedLetters.textContent = incorrectLetterBank;
}

// *letterGuess function, takes in the lette ryou pressed and checks if it's in the selected word from the wordBank variable.

function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) { // If the game is running and we haven't guessed letter - if it returns -1 it means we having guessed the letter yet. This also can be denoted as just gameRunning (as it is interpreted as true.)
        // Run Game Logic
        guessedLetterBank.push(letter);

        // Check if guessed letter is in my picked word
        for (var i = 0; i < pickedWord.length; i++) {
            // Converts both values to lower case to compare them correctly
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                // If matched, swap out that character with placeholder with the actual letter as depicted in the wordBank
                pickedWordPlaceHolderArr[i] = pickedWord[i];
            }
        }

        $placeholders.textContent = pickedWordPlaceHolderArr.join('');
    }
    else {
        if (gameRunning === false) { //this can be denoted as !gameRunning
            alert("Click to New Game Button to start over.");
        } else {
            alert("You've already guessed this letter, guess again!");
        }
    }
}

// *checkIncorrect(letter)
function checkIncorrect(letter) {
    // Check to see if letter DIDN'T make it into our pickedWordPlaceHolder (therefore, incorrect guess)
    if (pickedWordPlaceHolderArr.indexOf(letter.toLowerCase()) === -1 && 
    pickedWordPlaceHolderArr.indexOf(letter.toUpperCase()) === -1)  {
    // Decrement guesses (Takes away from guesses left)
    guessesLeft--;
    // Add incorrect to incorrectLetterBank
    incorrectLetterBank.push(letter);
    // Write new bank of incorrect letters guessed to DOM
    $guessedLetters.textContent = incorrectLetterBank.join(' ');
    // Write new amount of guesses left to DOM
    $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

// checkLose
function checkLoss() {
    if (guessesLeft = 0) {
        losses++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
    }
    checkWin();
}

// checkWin
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceHolderArr.join('').toLowerCase())
    {
        wins++;
        gameRunning = false;
        $wins.textContent = wins;
    }
}
 
// Add event listener for new game button

$newGameButton.addEventListener('click', newGame);

// Add onKeyup event to trigger letterGuess

document.onkeyup = function(event) { //event is needed to capture the key
    if (event.keyCode >=65 && event.keyCode <= 90) { //each key on the keyboard has a keyCode and A-Z happens to fall between 65 and 90.
        letterGuess(event.key); //event.key is the actual letter
    }
}