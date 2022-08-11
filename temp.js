// Takes the starting position of player piece and highlights next valid move location to the right or left positions. *** NEED TO ADD IN IF PLAYER PIECE IN THE WAY, MOVE HIGHLIGHTED SQUARE TO NEXT POSITION. FIRST NEED TO CHECK WHICH PLAYER PIECE IS IN THE WAY TO DETERMINE IF A JUMP IS ALLOWED. CANNOT JUMP OWN PIECE
function availableMove(startPos,kingStr) {
    moveOption1 = '';
    moveOption2 = '';
    moveOption3 = '';
    moveOption4 = '';
    let startChar = startPos[0];

        if (player1Turn) {
            let nextLetter = String.fromCharCode(startChar.charCodeAt(0)+1);
            let prevLetter = String.fromCharCode(startChar.charCodeAt(0)-1);
            nextNumIdx = parseInt(startPos[1],10)+1;
            moveOption1 = nextLetter + nextNumIdx;
            if(!strArr.includes(moveOption1[0]) || !numArr.includes(moveOption1[1])) {
                moveOption1 = '';
            }
            if(strArr.includes(moveOption1[0]) && numArr.includes(moveOption1[1])) {
                if (strArr.includes(moveOption1[0]) && obstructionCheck(moveOption1)) {
                    if (document.getElementById(moveOption1).lastChild.className === 'player1Pieces') {
                        moveOption1 = '';
                    } else {
                        let move1nextLetter = String.fromCharCode(moveOption1.charCodeAt(0)+1);
                        let move1nextNumIdx = parseInt(moveOption1[1],10)+1;
                        moveOption1 = move1nextLetter + move1nextNumIdx;
                    }

                    if(strArr.includes(moveOption1[0]) && obstructionCheck(moveOption1)) {
                        moveOption1 = '';
                    }
                }
            } 
            
            moveOption2 = prevLetter + nextNumIdx;
            if(!strArr.includes(moveOption2[0]) || !numArr.includes(moveOption2[1])) {
                moveOption2 = '';
            }
            if(strArr.includes(moveOption2[0]) && numArr.includes(moveOption2[1])) {
                if (strArr.includes(moveOption2[0]) && obstructionCheck(moveOption2)) {
                    if (document.getElementById(moveOption2).lastChild.className === 'player1Pieces') {
                        moveOption2 = '';
                    }
                    let move2prevLetter = String.fromCharCode(moveOption2.charCodeAt(0)-1);
                    let move2nextNumIdx = parseInt(moveOption2[1],10)+1;

                    moveOption2 = move2prevLetter + move2nextNumIdx;

                    console.log(`moveOption2: ${moveOption2}`);
                    if(!strArr.includes(moveOption2[0]) || !numArr.includes(moveOption2[1])) {
                        moveOption2 = '';
                    }
                    if(strArr.includes(moveOption2[0]) && obstructionCheck(moveOption2)) {
                        moveOption2 = '';
                    }
                }
            }
        if (strArr.includes(moveOption1[0])) {
            document.getElementById(moveOption1).style.filter = "brightness(400%)";
        } 
        if (strArr.includes(moveOption2[0])) {
            document.getElementById(moveOption2).style.filter = "brightness(400%)";
        } 
    }        

    if (player2Turn || kingStr === 'king') {

        let nextLetter = String.fromCharCode(startChar.charCodeAt(0)+1);
        let prevLetter = String.fromCharCode(startChar.charCodeAt(0)-1);
        nextNumIdx = parseInt(startPos[1],10)-1;
        moveOption3 = nextLetter + nextNumIdx;

        if(!strArr.includes(moveOption3[0]) || !numArr.includes(moveOption3[1])) {
            moveOption3 = '';
        }
        if (strArr.includes(moveOption3[0]) && obstructionCheck(moveOption3)) {
            if (document.getElementById(moveOption3).lastChild.className === 'player2Pieces') {
                moveOption3 = '';
            }
            let move3nextLetter = String.fromCharCode(moveOption3.charCodeAt(0)+1);
            let move3nextNumIdx = parseInt(moveOption3[1],10)-1;
            moveOption3 = move3nextLetter + move3nextNumIdx;
            if(strArr.includes(moveOption3[0]) && obstructionCheck(moveOption3)) {
                moveOption3 = '';
            }
        }

        moveOption4 = prevLetter + nextNumIdx;
        console.log(`moveOption4: ${moveOption4}`);
        if(!strArr.includes(moveOption4[0]) || !numArr.includes(moveOption4[1])) {
            moveOption4 = '';
        }
        if (strArr.includes(moveOption4[0]) && obstructionCheck(moveOption4)) {
            if (document.getElementById(moveOption4).lastChild.className === 'player2Pieces') {
                moveOption4 = '';
            }
            let move4prevLetter = String.fromCharCode(moveOption4.charCodeAt(0)-1);
            let move4nextNumIdx = parseInt(moveOption4[1],10)-1;
            moveOption4 = move4prevLetter + move4nextNumIdx;
            if(strArr.includes(moveOption4[0]) && obstructionCheck(moveOption4)) {
                moveOption4 = '';
            }
        }

        if (strArr.includes(moveOption3[0])) {
            document.getElementById(moveOption3).style.filter = "brightness(400%)";

        }
        if (strArr.includes(moveOption4[0])) {
            document.getElementById(moveOption4).style.filter = "brightness(400%)";

        }
    }
    console.log(`MO1: ${moveOption1}, MO2: ${moveOption2}, MO3: ${moveOption3}, MO4: ${moveOption4}`);
}
