let boxes = document.querySelectorAll(".box") as NodeListOf<HTMLButtonElement>;
let resetBtn = document.querySelector("#reset-btn") as HTMLButtonElement;
let newGameBtn = document.querySelector("#new-btn") as HTMLButtonElement;
let msgContainer = document.querySelector(".msg-container") as HTMLElement;
let msg = document.querySelector("#msg") as HTMLElement;
let turn0 = true;
let gameOver = false;

const winPatterns = [
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
const displayMessage = (message: string) => {
    msgContainer.style.display = "block";
    msg.innerText = message;
};

// Function to reset the game board (New Game logic)
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = ""; // Clear all boxes
        box.disabled = false; // Re-enable the boxes
    });
    gameOver = false;
    turn0 = true;
    msgContainer.style.display = "none"; // Hide the message
};

// Function to check for the winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            displayMessage(`Player ${boxes[a].innerText} wins!`);
            gameOver = true;
            boxes.forEach((box) => box.disabled = true); // Disable further moves
            return true;
        }
    }
    return false;
};

// Add event listeners to the boxes for player moves
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "" && !gameOver) {
            if (turn0) {
                box.innerText = "0";
                turn0 = false;
            } else {
                box.innerText = "X";
                turn0 = true;
            }

            if (!checkWinner()) {
                if (Array.from(boxes).every((b) => b.innerText !== "")) {
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
