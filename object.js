// Grab reference to DOM Elements
var $newGameButton = document.getElementById('new-game-button');
var $placeholders = document.getElementById('placeHolders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getAnimations('losses');


// Creating an object for all the game logic

var game = {
    wordBank = ['Bump', 'Set', 'Spike', 'Sideout', 'Beach Volleyball', 'AVP', 'Jump Serve', 'Shoot Set', 'Float Serve', 'Ace', 'Jumbo Shrimp', 'Cutty'],
    wins = 0,
    losses = 0,
    guessesLeft = 12,
    gameRunning = false,
    pickedWord = '', // based on the same concept as the array below.
    pickedWordPlaceHolderArr = [], //set to an array because we are pushing values to it. If it's not an array the "method" push wouldn't know what to do.
    guessedLetterBank = [],
    incorrectLetterBank = [],
    newGame: function() {
        //Reset all game info
        this.gameRunning = true;
        this.guessesLeft = 12;
        this.guessedLetterBank = [];
        this.incorrectLetterBank = [];
        this.pickedWordPlaceHolderArr = [];

        // Pick a new word
        this.pickedWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];

        // Create placeholders out of new pickedWord
        for (var i = 0; i < this.pickedWord.length; i++) {
            if (this.pickedWord[i] === ' ') {
                this.pickedWordPlaceHolderArr.push(' ');
            } else {
                this.pickedWordPlaceHolderArr.push('_');
            }
        }
        // Write all new game info to DOM
        $guessesLeft.textContent = this.guessesLeft;
        $placeholders.textContent = this.pickedWordPlaceHolderArr.join(''); // using Join to remove all commas
        $guessedLetters.textContent = this.incorrectLetterBank;
        }
    };

// Add event listener for new game button

$newGameButton.addEventListener('click', function() {
    game.newGame();
});

// Add onKeyup event to trigger letterGuess

document.onkeyup = function(event) { //event is needed to capture the key
    if (event.keyCode >=65 && event.keyCode <= 90) { //each key on the keyboard has a keyCode and A-Z happens to fall between 65 and 90.
        letterGuess(event.key); //event.key is the actual letter
    }
}