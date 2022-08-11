# Checkers - Project 1 - by Nick Duitsman

## Game Link: https://nduitsman.github.io/Checkers-Project1/

## Description
This is the classic game of Checkers. Players win by removing the opponents pieces. Pieces may only move diagonally, and can only make a jump if the piece they are jumping an opposing piece, NOT their own. Each player's piece may only move foward from their starting position until reaching their respective ends of the board; at this point the individual piece that reached the end becomes a king. King pieces may move forward or backward. So prioritize making those kings! 

In order to assist users, for those whom are unfamiliar with the rules, tiles will be highlighted indicating valid move locations. 

## Ingame Images
Here we have the start of the game.
<img width="1200" alt="Screen Shot 2022-08-11 at 10 15 07 AM" src="https://user-images.githubusercontent.com/109879521/184163229-8cc84c60-2bcd-454c-8918-b942622188dc.png">

This image shows pieces placed on the board. Notice the left side, the black/white box indicates which player's turn it currently is. Also notice the highlighted tiles, showing the valid moves of the selected piece (king in this case).
<img width="1200" alt="Screen Shot 2022-08-11 at 10 17 15 AM" src="https://user-images.githubusercontent.com/109879521/184163773-156be19c-fcf4-4237-a207-910042891f2f.png">

Once all the piece from one player are removed, a message displays over top of the board showing who the winner is.
<img width="1200" alt="Screen Shot 2022-08-11 at 10 18 54 AM" src="https://user-images.githubusercontent.com/109879521/184163803-985ba939-673a-4892-acaa-0f0168729b16.png">

## Technologies Used
HTML, CSS, and JavaScript

HTML provides the content for the graphical user interface (GUI); CSS provides the styling, and JavaScript provides the game logic and document manipulation throughout gameplay. Examples of document maniuplation would be hightlighting valid moves, dragging and dropping pieces, updating the player piece counter, displaying winner message, and more!

## Most Complex Game Logic Section
The code snippet below displays one fourth of the next valid move function. This section was especially difficult as it had to check if the next space exists on the board, if an obstacle (player piece) occurs, if the next space beyond an obstacle exists, and again if there is an obstacle at this new spot. Additionally, it needs to account for both standard pieces while allowing "king'd" pieces to move as expected. 
<img width="1200" alt="Screen Shot 2022-08-11 at 11 05 53 AM" src="https://user-images.githubusercontent.com/109879521/184166108-4a0a84d5-7f0a-4fa6-908b-17c018c6f79a.png">

## Future Goals
The main next step I wish to add in, is the ability to double jump. Double jumping is a core mechanic in Checkers, where if possible, a player may continue their turn to jump multiple pieces as long as it does not break the game rules. Adding additional logic for possible jump anticipation may be required. 

