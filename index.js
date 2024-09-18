var boxes = document.querySelectorAll(".box");
var resetBtn = document.querySelector("#reset-btn");
var newGameBtn = document.querySelector("#new-btn");
var msgContainer = document.querySelector(".msg-container");
var msg = document.querySelector("#msg");
var turn0 = true;
var gameOver = false;
var winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
// Function to display messages
var displayMessage = function (message) {
    msgContainer.style.display = "block";
    msg.innerText = message;
};
// Function to reset the game board (New Game logic)
var resetGame = function () {
    boxes.forEach(function (box) {
        box.innerText = ""; // Clear all boxes
        box.disabled = false; // Re-enable the boxes
    });
    gameOver = false;
    turn0 = true;
    msgContainer.style.display = "none"; // Hide the message
};
// Function to check for the winner
var checkWinner = function () {
    for (var _i = 0, winPatterns_1 = winPatterns; _i < winPatterns_1.length; _i++) {
        var pattern = winPatterns_1[_i];
        var a = pattern[0], b = pattern[1], c = pattern[2];
        if (boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText) {
            displayMessage("Player ".concat(boxes[a].innerText, " wins!"));
            gameOver = true;
            boxes.forEach(function (box) { return box.disabled = true; }); // Disable further moves
            return true;
        }
    }
    return false;
};
// Add event listeners to the boxes for player moves
boxes.forEach(function (box) {
    box.addEventListener("click", function () {
        if (box.innerText === "" && !gameOver) {
            if (turn0) {
                box.innerText = "0";
                turn0 = false;
            }
            else {
                box.innerText = "X";
                turn0 = true;
            }
            if (!checkWinner()) {
                if (Array.from(boxes).every(function (b) { return b.innerText !== ""; })) {
                    displayMessage("It's a draw!");
                    gameOver = true;
                }
            }
        }
    });
});
// Add event listener to the reset button (Reset Game logic)
resetBtn.addEventListener("click", resetGame);
// Add event listener to the New Game button (New Game logic)
newGameBtn.addEventListener("click", resetGame);
