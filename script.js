// Global elements that are called upon various functions, most functions reset global if required. 
let endPos = '';
let startPos = '';
const strArr = ['a','b','c','d','e','f','g','h'];
const numArr = ['1','2','3','4','5','6','7','8'];
let jumpedPos = '';
let moveOption1 = '';
let moveOption2 = '';
let moveOption3 = '';
let moveOption4 = '';
let currentPlayer = 'player1Pieces';
let p1count = 12;
let p2count = 12;

// Creates game pieces for each player with unique IDs and classes, adding dragging attributes.
// Player 1 pieces placed in squares with the 'starter1' class, and player 2 on 'starter2' class.

function startGame() {
    let i = 0;
    let starter1 = document.querySelectorAll('.starter1');
    let starter2 = document.querySelectorAll('.starter2');
    document.querySelector('.whiteTurn').style.visibility = 'hidden';
    document.querySelector('.blackTurn').style.visibility = 'visible';


    starter1.forEach((tile) => {
        
        const playerOnePiece = document.createElement('div');
        playerOnePiece.id = `player1${i}`;
        playerOnePiece.className = 'player1Pieces'
        playerOnePiece.setAttribute("draggable","true");
        playerOnePiece.setAttribute("ondragstart",'dragStart(event)');
        // playerOnePiece.className += ' king';
        tile.appendChild(playerOnePiece);
        i++;
        }); 
    i = 0;
    starter2.forEach((tile) => {
        const playerTwoPiece = document.createElement('div');
        playerTwoPiece.id = `player2${i}`;
        playerTwoPiece.className = 'player2Pieces';
        playerTwoPiece.setAttribute("draggable","true");
        playerTwoPiece.setAttribute("ondragstart",'dragStart(event)');
        tile.appendChild(playerTwoPiece);   
        i++;
    }); 
}

// Removes all player pieces from the board
function resetGame() {
    const playerPieces = document.querySelectorAll('.player1Pieces,.player2Pieces');
    playerPieces.forEach(piece => {
        piece.setAttribute('draggable','true');
        piece.remove();

        i = 0;
    });
    currentPlayer = 'player1Pieces';
    p1count = 12;
    p2count = 12;
    document.getElementById('p1count').innerText = 12;
    document.getElementById('p2count').innerText = 12;
    if (document.getElementById('winner') !== null) {
        document.getElementById('winner').innerText = '';
    }
    const brightnessClear = document.querySelectorAll('.black');
    brightnessClear.forEach(tile => {
        tile.style.filter = "brightness(100%)";
    })
}

// Grabs the starting location of the player piece upon 'picking up' a piece. ie; A5 or C7. 
function dragStart(event) {
    let kingStr = '';
    event.dataTransfer.setData("text",event.target.id);
    startPos = event.path[1].id;
    let playerSelection = event.srcElement.className;

    if (playerSelection.includes('king')) {
        kingStr = 'king';

    } 

    availableMove(startPos,kingStr);
}

// ondragover is a built in method that executes JavaScript when element is being dragged over a drop target. Setting preventDefault, to avoid unintended actions
function onDragOver(event) {
    event.preventDefault();
}

// Grabs the ending location of the player piece upon 'dropping'. ie; B4 or H1
// Initiates logic functions
function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    endPos = event.path[0].id;

    if (document.getElementById(data).className === 'player1Pieces') {
        if (endPos[1] === '8'){
            const kingPiece = document.getElementById(data);
            kingPiece.className += ' king';
        }
    }
    if (document.getElementById(data).className === 'player2Pieces') {
        if (endPos[1] === '1'){
            const kingPiece = document.getElementById(data);
            kingPiece.className += ' king';
        }
    }


    if (endPos === moveOption1 || endPos === moveOption2 || endPos === moveOption3 || endPos === moveOption4){
        event.target.appendChild(document.getElementById(data));
        if(jumpCheck(startPos, endPos)){
            findAndRemove(startPos, endPos);
        };

    const brightnessClear = document.querySelectorAll('.black');
    brightnessClear.forEach(tile => {
        tile.style.filter = "brightness(100%)";
    });
        
    turnToggle();

    }
}

//Checks to see if a move was 1 diagonal length, or 2. The latter yielding a jump condition
function jumpCheck(startPos, endPos) {
    let difference = Math.abs(endPos[1] - startPos[1]);
    if(difference > 1) {
        return true;
    } else {
        return false;
    }
}
// Finds the tile between starting/ending position, then removes child if one exists.
function findAndRemove(startPos, endPos) {
    jumpedPos = "";
    let startCharIndex = strArr.indexOf(startPos[0]);
    let endCharIndex = strArr.indexOf(endPos[0]);
    let whichPlayerToReduce = '';
// up-right WORKING!
    if (endCharIndex > startCharIndex && endPos[1] > startPos[1]) {
        jumpedPos += strArr[endCharIndex - 1];
        jumpedPos += (endPos[1]-1);
        let unknownpiece = document.getElementById(`${jumpedPos}`);

        if (unknownpiece.lastChild.className === 'player1Pieces'){

            p1count--;

        } else {
            p2count--;
        }
        if(unknownpiece.lastElementChild !== null) {
            unknownpiece.removeChild(unknownpiece.lastElementChild);
        }
// down-right WORKING!
    } else if (endCharIndex > startCharIndex && endPos[1] < startPos[1]) {
        jumpedPos += strArr[endCharIndex - 1];
        jumpedPos += (parseInt(endPos[1],10) + 1);
        let unknownpiece = document.getElementById(`${jumpedPos}`);
        if (unknownpiece.lastChild.className === 'player1Pieces'){
            p1count--;
        } else {
            p2count--;
        }
        if (unknownpiece.lastElementChild !== null) {
            unknownpiece.removeChild(unknownpiece.lastElementChild);
        }
// up-left WORKING!
    } else if (endCharIndex < startCharIndex && endPos[1] > startPos[1]) {
        jumpedPos += strArr[endCharIndex + 1];
        jumpedPos += (endPos[1] - 1);
        let unknownpiece = document.getElementById(`${jumpedPos}`);
        if (unknownpiece.lastChild.className === 'player1Pieces'){
            p1count--;
        } else {
            p2count--;
        }
        if(unknownpiece.lastElementChild !== null) {
            unknownpiece.removeChild(unknownpiece.lastElementChild);
        }
// down-left WORKING!
    } else if (endCharIndex < startCharIndex && endPos[1] < startPos[1]) {
        jumpedPos += strArr[endCharIndex + 1];
        jumpedPos += (parseInt(endPos[1],10) + 1);
        let unknownpiece = document.getElementById(`${jumpedPos}`);
        if (unknownpiece.lastChild.className === 'player1Pieces'){
            p1count--;
        } else {
            p2count--;
        }
        if (unknownpiece.lastElementChild !== null) {
            unknownpiece.removeChild(unknownpiece.lastElementChild);
        }
    }
    document.getElementById('p1count').innerText = p1count;
    document.getElementById('p2count').innerText = p2count;
    if (p1count === 0) {
        const newPara = document.createElement('p');
        newPara.id = 'winner';
        const textNode = document.createTextNode('Player 2 Wins!');
        newPara.appendChild(textNode);
        document.body.appendChild(newPara);
    } else if(p2count === 0) {
        const newPara = document.createElement('p');
        newPara.id = 'winner';
        const textNode = document.createTextNode('Player 1 Wins!');
        newPara.appendChild(textNode);
        document.body.appendChild(newPara);
    }
}

function availableMove(startPos, kingStr) {
    moveOption1 = '';
    moveOption2 = '';
    moveOption3 = '';
    moveOption4 = '';
    let startChar = startPos[0];
    
    let nextLetter = String.fromCharCode(startChar.charCodeAt(0)+1);
    let prevLetter = String.fromCharCode(startChar.charCodeAt(0)-1);
    let nextNum = parseInt(startPos[1],10)+1;
    let prevNum = parseInt(startPos[1],10)-1;

    if(currentPlayer === 'player1Pieces' || kingStr === 'king'){
        moveOption1 = nextLetter + nextNum;
        if(strArr.includes(moveOption1[0]) && numArr.includes(moveOption1[1])){
            if(obstructionCheck(moveOption1)){
                if(document.getElementById(moveOption1).lastChild.className === currentPlayer){
                    moveOption1 = '';
                } else {
                    let nextLetter = String.fromCharCode(moveOption1.charCodeAt(0)+1);
                    let nextNum = parseInt(moveOption1[1],10)+1;
                    moveOption1 = nextLetter + nextNum;
                    if(strArr.includes(moveOption1[0]) && numArr.includes(moveOption1[1])){
                        if (obstructionCheck(moveOption1)){
                            moveOption1 = '';
                        }
                    }
                }
            }
        } else {
            moveOption1 = '';
        }
    }

    if(currentPlayer === 'player1Pieces' || kingStr === 'king'){
        moveOption2 = prevLetter + nextNum;
        console.log(moveOption2);
        if(strArr.includes(moveOption2[0]) && numArr.includes(moveOption2[1])){
            if(obstructionCheck(moveOption2)){
                if(document.getElementById(moveOption2).lastChild.className === currentPlayer){
                    moveOption2 = '';
                } else {
                    let prevLetter = String.fromCharCode(moveOption2.charCodeAt(0)-1);
                    let nextNum = parseInt(moveOption2[1],10)+1;
                    moveOption2 = prevLetter + nextNum;
                    if(strArr.includes(moveOption2[0]) && numArr.includes(moveOption2[1])){
                        if (obstructionCheck(moveOption2)){
                            moveOption2 = '';
                        }
                    }
                }
            }
        } else {
            moveOption2 = '';
        }
    }

    if(currentPlayer === 'player2Pieces' || kingStr === 'king'){
        moveOption3 = nextLetter + prevNum;
        console.log('move3: '+moveOption3+'initial');
        if(strArr.includes(moveOption3[0]) && numArr.includes(moveOption3[1])){
            if(obstructionCheck(moveOption3)){
                console.log('move3 obst occured');
                if(document.getElementById(moveOption3).lastChild.className === currentPlayer){
                    console.log('im in move3 post player check')
                    moveOption3 = '';
                    console.log('MO3 after player check '+moveOption3);
                } else {
                    let nextLetter = String.fromCharCode(moveOption3.charCodeAt(0)+1);
                    let prevNum = parseInt(moveOption3[1],10)-1;
                    moveOption3 = nextLetter + prevNum;
                    if(strArr.includes(moveOption3[0]) && numArr.includes(moveOption3[1])){
                        if (obstructionCheck(moveOption3)){
                            moveOption3 = '';
                        }
                    }
                }
            }
        } else {
            moveOption3 = '';
        }
    }

    if(currentPlayer === 'player2Pieces' || kingStr === 'king'){
        moveOption4 = prevLetter + prevNum;
        if(strArr.includes(moveOption4[0]) && numArr.includes(moveOption4[1])){
            if(obstructionCheck(moveOption4)){
                if(document.getElementById(moveOption4).lastChild.className === currentPlayer){
                    moveOption4 = '';
                } else {
                    let prevLetter = String.fromCharCode(moveOption4.charCodeAt(0)-1);
                    let prevNum = parseInt(moveOption4[1],10)-1;
                    moveOption4 = prevLetter + prevNum;
                    if(strArr.includes(moveOption4[0]) && numArr.includes(moveOption4[1])){
                        if (obstructionCheck(moveOption4)){
                            moveOption4 = '';
                        }
                    }
                }
            }
        } else {
            moveOption4 = '';
        }
    }
    console.log(`MO1: ${moveOption1} MO2: ${moveOption2} MO3: ${moveOption3} MO4: ${moveOption4}`);
    if(strArr.includes(moveOption1[0])){
        document.getElementById(moveOption1).style.filter = "brightness(400%)";
    }
    if(strArr.includes(moveOption2[0])){
        document.getElementById(moveOption2).style.filter = "brightness(400%)";
    }
    if(strArr.includes(moveOption3[0])){
        document.getElementById(moveOption3).style.filter = "brightness(400%)";
    }
    if(strArr.includes(moveOption4[0])){
        document.getElementById(moveOption4).style.filter = "brightness(400%)";
    }

}

function obstructionCheck(moveOption) {
    let obstruction = document.getElementById(moveOption).lastChild;
    if (obstruction !== null) {
        return true;
    } else {
        return false;
    }
}

function turnToggle() {
    if(currentPlayer === 'player1Pieces') {
        currentPlayer = 'player2Pieces';
        

        const playerOnePieces = document.querySelectorAll('.player1Pieces');
        playerOnePieces.forEach((piece) => {
            piece.setAttribute('draggable','false');
        }); 
        const playerTwoPieces = document.querySelectorAll('.player2Pieces');
        playerTwoPieces.forEach((piece) => {
            piece.setAttribute('draggable','true');
        });
        
        document.querySelector('.whiteTurn').style.visibility = 'visible';
        document.querySelector('.blackTurn').style.visibility = 'hidden';

    } else if (currentPlayer === 'player2Pieces') {
        currentPlayer = 'player1Pieces';


        const playerTwoPieces = document.querySelectorAll('.player2Pieces');
        playerTwoPieces.forEach((piece) => {
            piece.setAttribute('draggable','false');
        }); 
        const playerOnePieces = document.querySelectorAll('.player1Pieces');
        playerOnePieces.forEach((piece) => {
            piece.setAttribute('draggable','true');
        });        

        document.querySelector('.whiteTurn').style.visibility = 'hidden';
        document.querySelector('.blackTurn').style.visibility = 'visible';
    }
}

// function kingCondition() {

// }
// ******** STRETCH GOALS *********************//
// King condition
// double/triple jumping
