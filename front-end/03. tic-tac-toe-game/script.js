
let boxes = document.querySelectorAll('.box')
let reset_btn = document.querySelector('#reset-btn')
// let new_btn = document.querySelector('#new-btn')
let msg = document.querySelector(".msg")

let turn0 = true;
let count = 0;

let win_patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let show_winning_msg = (winner)=> {
    msg.style.display = 'block'
    msg.innerText = `Congratulations, ${winner}  Win's`;
    boxes.forEach((box)=>{
        box.disabled = true;
    })  
}

let check_Winner = ()=>{
    for (let pattern of win_patterns){
        let pos1 = boxes[pattern[0]].innerText; 
        let pos2 = boxes[pattern[1]].innerText; 
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                show_winning_msg(pos1)
                return true
            }
        }
    }
};

let game_draw = ()=>{
    msg.style.display = 'block'
    msg.innerText = `It is a Draw`
    boxes.forEach((box)=>{
        box.disabled = true;
    }) 
}

// New Game
// new_btn.addEventListener('click', ()=>{
//     location.reload();
// })

// Reset Game
reset_btn.addEventListener('click', ()=>{
    // location.reload();

    count = 0;
    msg.style.display = 'none'
    boxes.forEach((box)=>{
        box.innerText = ""
        box.disabled = false;
    })
})

// Play Game
boxes.forEach((box)=>{
    box.addEventListener('click', ()=>{
        if (turn0){
        box.innerText = 'X'
        box.style.color = 'red'
        turn0 = false
        }else {
            box.innerText = 'O'
            box.style.color = 'blue'
            turn0 = true
        }
    box.disabled = true;
    count++
    // check_Winner()

    let is_winner = check_Winner();

    if (count == 9 && !is_winner){
        game_draw()
    }     
})});