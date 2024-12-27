'use strict'
// Game variables
const SNAKE_STEP = 7;
const AUTOMATIC_INTERVAL = 300;

let timer = 0;
let cellCount;


// SnakeCell class setup
class SnakeCell extends HTMLElement {
    constructor({partName='body', xPos=0, yPos=0, backgroundColor='white', moveDirection='R'}) {
        super();
        this.classList.add("snake");

        // Custom class Properties
        this.xPos = xPos;
        this.yPos = yPos;
        this.moveDirection = moveDirection;
        this.backgroundColor = backgroundColor;

        //Styles
        this.style.left = this.xPos + 'px';
        this.style.top = this.yPos + 'px';
        this.style.backgroundColor = this.backgroundColor;

        //Linked List Property
        this.next = null;
        this.prev = null;
    }

    move(direction) {
        this.moveDirection = direction;
        switch(direction) {
            case 'U':
                this.yPos -= SNAKE_STEP;
                this.style.top = this.yPos + 'px';
                break;
            case 'D':
                this.yPos += SNAKE_STEP;
                this.style.top = this.yPos + 'px';
                break;
            case 'L':
                this.xPos -= SNAKE_STEP;
                this.style.left = this.xPos + 'px';
                break;
            case 'R':
                this.xPos += SNAKE_STEP;
                this.style.left = this.xPos + 'px';
                break;
            default: alert('There are some issues with this game.\nPlease contact the Game Developer.');
        }
    }

    setCellPosition(xPos, yPos) {
        this.style.left = xPos + 'px';
        this.style.top = yPos + 'px';
    }
};

// Register the custom element with the browser
customElements.define('snake-cell', SnakeCell);

/************************* Snake Functionalities **************************/

// Add Tail
let tailCell;
function addTail() {
    tailCell = new SnakeCell({...tail});
    document.getElementById("container").appendChild( tailCell );
}

// Run before head movement
function setSnakePosition() {
    if(tailCell) {
        tail.next = tailCell;
        tailCell.prev = tail;
        tail = tail.next;
        
        tailCell = null;
    }

    let snakeCursor = tail;
    while(snakeCursor.prev !== null) {
        snakeCursor.xPos = snakeCursor.prev.xPos;
        snakeCursor.yPos = snakeCursor.prev.yPos;
        snakeCursor.moveDirection = snakeCursor.prev.moveDirection;

        snakeCursor.setCellPosition(snakeCursor.prev.xPos, snakeCursor.prev.yPos);

        snakeCursor = snakeCursor.prev;
    }
}

// Movement
function snakeMovement( direction ) {
    setSnakePosition();
    head.move(direction);

    // Check food eaten
    hasFoodEaten();

    // Check game over
    handleGameOver();
}

/************************* Snake Movement **************************/

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
    // let foodXPosition = Math.round(Math.random()*96/7)*7;
    // let foodYPosition = Math.round(Math.random()*30/7)*7;

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
/******************************** Snake food functionalities *********************************/


/********************************** Functionality when snake eat food *********************************/
function hasFoodEaten() {
    // console.log(foodPosition.xCor, foodPosition.yCor);
    // console.log(`Snake position: (${snakeXPos}, ${snakeYPos}) \nFood Position: (${foodPosition.xCor},${foodPosition.yCor})`);
    if(head.xPos === foodPosition.xCor && head.yPos === foodPosition.yCor) {
        console.log('Food eaten');
        noOfFoodEaten += 1;
        addTail();
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


/********************* Gameover functionalities ***********************/
function isGameOver() {
    // Check if snake touch itself, check circular linked list
    let temp = head.next;
    while(temp) {
        if(temp.xPos === head.xPos && temp.yPos === head.yPos) {
            console.log(temp, head);
            return true;
        }
        temp = temp.next;
    }

    return head.xPos < 0 || head.xPos > 896 || head.yPos < 0 || head.yPos > 630;
}

function resetGame() {
    timer = 0;
    head = new SnakeCell({partName: 'head', backgroundColor: 'orange'});
}

function handleGameOver() {
    if(isGameOver()) {
        clearInterval(timeInterval);
        alert("Game Over!");
        resetGame();
    }
}
/********************* Gameover functionalities ***********************/











/**************************************** Business logics based on events ****************************************/

/********************* Snake Head ********************/
let head = new SnakeCell({partName: 'head', backgroundColor: 'orange'});
document.getElementById("container").appendChild(head);
let tail = head;

// Variables when snake eat food
let noOfFoodEaten = 0;

// Give food to snake
giveFood();

/********************* Manual event using addEventListener in keyPress ***********************/
document.addEventListener("keydown", (event) => {
    switch(event.key) {
        case 'ArrowUp': snakeMovement('U');
            break;
        case 'ArrowDown': snakeMovement('D');
            break;
        case 'ArrowLeft': snakeMovement('L');
            break;
        case 'ArrowRight': snakeMovement('R');
            break;
        default: console.log("Invalid Key Press...");
    }
});
/********************* Manual event using addEventListener in keyPress ***********************/

/********************* Automatic event using setInterval ***********************/
let timeInterval = setInterval(() => {
    timer += 1;
    snakeMovement(head.moveDirection);
}, AUTOMATIC_INTERVAL);
/********************* Automatic event using setInterval ***********************/

/**************************************** Business logics based on events ****************************************/