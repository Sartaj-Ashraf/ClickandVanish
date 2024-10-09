
const parent = document.getElementById("parent");
const scoreBoard = document.getElementById("scoreBoard");
const timerDisplay = document.getElementById("timer");
const gameOverDisplay = document.getElementById("gameOver");
const finalScoreDisplay = document.getElementById("finalScore");
const winnerDisplay = document.getElementById("winner");
const restartButton = document.getElementById("restartButton");

let score = 0;
let gameDuration = 30;
let totalBoxes = 0;
let interval;
let moveIntervals = [];
// Function to generate a random hex color
const randomColor = () => {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomHex.padStart(6, '0')}`; // Pad to ensure it has 6 characters
};


const randomSize = (min, max) => Math.random() * (max - min) + min;

const randomPosition = (boxSize) => {
    const x = Math.random() * (window.innerWidth + boxSize) - boxSize;
    const y = Math.random() * (window.innerHeight + boxSize) - boxSize;
    return { x, y };
};


function updateTimer() {
    gameDuration--;
    timerDisplay.innerText = `Time: ${gameDuration}`;
    if (gameDuration <= 0) {
        clearInterval(interval);
        endGame();
    } else if (gameDuration <= 10) {

    }
}


function endGame() {
    gameOverDisplay.style.display = 'block';
    finalScoreDisplay.innerText = score;
    parent.style.pointerEvents = 'none';
    restartButton.style.display = 'block';
    winnerDisplay.style.display = 'none';


    moveIntervals.forEach(clearInterval);
    moveIntervals = [];


    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function generateBoxes(numBoxes) {
    totalBoxes = numBoxes;
    for (let i = 0; i < numBoxes; i++) {
        const box = document.createElement('div');
        const innerBox = document.createElement('div');


        const boxSize = randomSize(30, 100);
        box.classList.add('box');
        box.style.width = `${boxSize}px`;
        box.style.height = `${boxSize}px`;
        box.style.animationDuration = `${randomSize(2, 6)}s`;
        box.style.borderRadius = `${randomSize(10, 70)}%`;
        box.style.backgroundColor = randomColor();


        const startPos = randomPosition(boxSize);
        box.style.left = `${startPos.x}px`;
        box.style.top = `${startPos.y}px`;


        box.addEventListener('click', () => {
            score++;
            scoreBoard.innerText = `Score: ${score}`;
            box.style.display = 'none'; // Make box disappear


            if (score === totalBoxes) {
                clearInterval(interval);
                winnerDisplay.style.display = 'block';
                parent.style.pointerEvents = 'none';
                restartButton.innerText = "New Game"
                restartButton.style.display = 'block';
            }
        });


        if (gameDuration > 10) {
            var movementDuration = randomSize(5, 10);
        }
        else if (gameDuration <= 10) {
            var movementDuration = randomSize(2, 5);

        }
        const moveBox = () => {
            const newPos = randomPosition(boxSize);
            box.animate([{
                left: `${startPos.x}px`,
                top: `${startPos.y}px`
            },
            {
                left: `${newPos.x}px`,
                top: `${newPos.y}px`
            }
            ], {
                duration: movementDuration * 1000,
                easing: 'ease-in-out',
                fill: 'forwards'
            });

            startPos.x = newPos.x;
            startPos.y = newPos.y;
        };

        moveBox();
        const moveInterval = setInterval(moveBox, movementDuration * 1000);
        moveIntervals.push(moveInterval);

        box.appendChild(innerBox);
        innerBox.classList.add('inner-box');
        innerBox.style.width = `${boxSize / 2}px`;
        innerBox.style.height = `${boxSize / 2}px`;

        parent.appendChild(box);
    }
}

function startGame() {
    score = 0;
    gameDuration = 20;
    scoreBoard.innerText = `Score: ${score}`;
    timerDisplay.innerText = `Time: ${gameDuration}`;
    gameOverDisplay.style.display = 'none';
    winnerDisplay.style.display = 'none';
    restartButton.style.display = 'none';
    parent.style.pointerEvents = 'auto';
    generateBoxes(15);
    interval = setInterval(updateTimer, 1000);
}

restartButton.addEventListener('click', () => {
    startGame();
});

startGame();