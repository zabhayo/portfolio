// Selecting all boxes on the game board
let boxes = document.querySelectorAll('.box');

// Selecting the reset button
let reset_btn = document.querySelector('#reset-btn');

// Selecting the message element
let msg = document.querySelector(".msg");

// Boolean variable to keep track of whose turn it is
let turn0 = true;

// Variable to count the number of moves
let count = 0;

// Array containing winning patterns
let win_patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to display the winning message
let show_winning_msg = (winner)=> {
    msg.style.display = 'block';
    msg.innerText = `Congratulations, ${winner} Wins`;
    // Disable all boxes after a player wins
    boxes.forEach((box)=>{
        box.disabled = true;
    });  
};

// Function to check for a winner
let check_Winner = ()=>{
    for (let pattern of win_patterns){
        let pos1 = boxes[pattern[0]].innerText; 
        let pos2 = boxes[pattern[1]].innerText; 
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                show_winning_msg(pos1);
                return true;
            }
        }
    }
};

// Function to handle a draw
let game_draw = ()=>{
    msg.style.display = 'block';
    msg.innerText = `It is a Draw`;
    // Disable all boxes when the game ends in a draw
    boxes.forEach((box)=>{
        box.disabled = true;
    });
};

// Event listener for the reset button
reset_btn.addEventListener('click', ()=>{
    count = 0;
    msg.style.display = 'none';
    // Resetting the board by clearing text and enabling boxes
    boxes.forEach((box)=>{
        box.innerText = "";
        box.disabled = false;
    });
});

// Event listener for each box on the game board
boxes.forEach((box)=>{
    box.addEventListener('click', ()=>{
        if (turn0){
            box.innerText = 'X';
            box.style.color = 'red';
            turn0 = false;
        } else {
            box.innerText = 'O';
            box.style.color = 'blue';
            turn0 = true;
        }
        // Disable the clicked box and increment move count
        box.disabled = true;
        count++;
        // Check for a winner after each move
        let is_winner = check_Winner();
        // If all moves are made and there's no winner, it's a draw
        if (count == 9 && !is_winner){
            game_draw();
        }     
    });
});
