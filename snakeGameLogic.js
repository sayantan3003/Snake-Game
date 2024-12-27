'use strict'

// Game variables
const SNAKE_STEP = 7;
const AUTOMATIC_INTERVAL = 1000;

let timer = 0;

// Snake Head variables setup
let snakeHead;
let snakeXPos = 0;
let snakeYPos = 0;
let snakeDirection = 'R';

// Create snake head
snakeHead = document.createElement("div");
snakeHead.classList.add("snake");
snakeHead.style.backgroundColor = 'green';
// document.getElementById("container").appendChild(snakeHead);

/******************************** Snake behaviour functionalities *********************************/
function moveUp() {
    snakeYPos -= SNAKE_STEP;
    snakeHead.style.top = snakeYPos + 'px';
}

function moveDown() {
    snakeYPos += SNAKE_STEP;
    snakeHead.style.top = snakeYPos + 'px';
}

function moveLeft() {
    snakeXPos -= SNAKE_STEP;
    snakeHead.style.left = snakeXPos + 'px';
}

function moveRight() {
    snakeXPos += SNAKE_STEP;
    snakeHead.style.left = snakeXPos + 'px';
}
/******************************** Snake behaviour functionalities *********************************/

// Snake food variables
let isFoodAvailable = false;
let foodPosition;
let food;

/******************************** Snake food functionalities *********************************/
function giveFood() {
    food = document.createElement("div");
    food.classList.add("snake");
    food.style.backgroundColor = 'red';
    document.getElementById("container").appendChild(food);

    // Store food position in a global variable
    foodPosition = setFoodPosition(food);
    // console.log(foodPosition.xCor, foodPosition.yCor);

    // Food is available now
    isFoodAvailable = true;
}

function setFoodPosition( food ) {  
    // Find a random place inside container to set the food
    let foodXPosition = Math.round(Math.random()*896/7)*7;
    let foodYPosition = Math.round(Math.random()*630/7)*7;

    // Place food inside container
    food.style.left = foodXPosition  + 'px';
    food.style.top = foodYPosition  + 'px';

    // Return food position to the caller
    // console.log('Set Food Pos ' + foodXPosition + ', ' + foodYPosition);
    return {
        xCor: foodXPosition,
        yCor: foodYPosition
    }
}

// Give food to snake
giveFood();

/******************************** Snake food functionalities *********************************/

// Variables when snake eat food
let noOfFoodEaten = 0;

/********************************** Functionality when snake eat food *********************************/
function hasFoodEaten() {
    // console.log(foodPosition.xCor, foodPosition.yCor);
    // console.log(`Snake position: (${snakeXPos}, ${snakeYPos}) \nFood Position: (${foodPosition.xCor},${foodPosition.yCor})`);
    if(snakeXPos === foodPosition.xCor && snakeYPos === foodPosition.yCor) {
        console.log('Food eaten');
        noOfFoodEaten += 1;
        resetFood();
        return true;
    }

    return false;
}

function resetFood() {
    console.log('Food is removed');
    food.remove();
    giveFood();
}
/********************************** Functionality when snake eat food *********************************/



/**************************************** Business logics based on events ****************************************/

/********************* Automatic event using setInterval ***********************/
// let timeInterval = setInterval(() => {
//     timer += 1;
//     console.log(timer);
//     runAfterEachEvent();
//     // console.log(foodPosition.xCor, foodPosition.yCor);
//     switch(snakeDirection) {
//         case 'R': moveRight();
//             break;
//         case 'L': moveLeft();
//             break;
//         case 'U': moveUp();
//             break;
//         case 'D': moveDown();
//             break;
//         default: alert('There are some issues with this game.\nPlease contact the Game Developer.');
//     }
// }, AUTOMATIC_INTERVAL);
/********************* Automatic event using setInterval ***********************/

/********************* Manual event using addEventListener in keyPress ***********************/
document.addEventListener("keydown", (event) => {
    runAfterEachEvent();
    switch(event.key) {
        case 'ArrowUp': moveUp();
            snakeDirection = 'U';
            break;
        case 'ArrowDown': moveDown();
            snakeDirection = 'D';
            break;
        case 'ArrowLeft': moveLeft();
            snakeDirection = 'L';
            break;
        case 'ArrowRight': moveRight();
            snakeDirection = 'R';
            break;
        default: console.log("Invalid Key Press...");
    }
});
/********************* Manual event using addEventListener in keyPress ***********************/

function runAfterEachEvent() {
    handleGameOver();
    hasFoodEaten();
}

/**************************************** Business logics based on events ****************************************/

/********************* Gameover functionalities ***********************/
function isGameOver() {
    return snakeXPos < 0 || snakeXPos > 896 || snakeYPos < 0 || snakeYPos > 630;
}

function resetGame() {
    timer = 0;
    snakeXPos = 0;
    snakeYPos = 0;
    snakeDirection = 'R';

    snakeHead.style.left = snakeXPos + 'px';
    snakeHead.style.top = snakeYPos + 'px';
}

function handleGameOver() {
    if(isGameOver()) {
        clearInterval(timeInterval);
        alert("Game Over!");
        resetGame();
    }
}
/********************* Gameover functionalities ***********************/