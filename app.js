let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newbtn = document.querySelector("#newbtn");
let msg = document.querySelector("#msg");
let msgcont = document.querySelector(".msg-cont");
let oSocoreDisplay = document.querySelector("#oScoreDisplay");
let xSocoreDisplay = document.querySelector("#xScoreDisplay");


let oScore = 0 ;
let xScore = 0; 
let turnO = true ;

const winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
let resetgame = () => {
    turnO = true;
    count = 0 ;
    enablebox();
    
}


let enablebox = ()=>{
    boxes.forEach((box) => {
            box.disabled = false
            box.innerText = "";
            box.classList.remove("win");
        });
    
    msgcont.classList.add("hide");

}

let disablebox = () => {
    boxes.forEach((box) => box.disabled = true);
}

let showWinner = (winner)=>{
        msg.innerText = `Congratulation , The Winner is ${winner}`;
        msgcont.classList.remove("hide");

        if (winner === "O"){
            oScore++;
            oSocoreDisplay.innerText = `O: ${oScore}`

        }else if (winner === "X"){
            xScore++;
            xSocoreDisplay.innerText = `x: ${xScore}`

        }
        

        disablebox();

}

let showDraw = ()=>{
        msg.innerText = `Match is Draw`;
        msgcont.classList.remove("hide");
        disablebox();
}

const checkWinner = () => {
    for ( let pattern of winPattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if ( pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val===pos2val && pos2val===pos3val ){
                boxes[pattern[0]].classList.add("win");
                boxes[pattern[1]].classList.add("win");
                boxes[pattern[2]].classList.add("win");

                
                showWinner(pos1val);
                return true ;
                
            }
        }
       

    } return false ;
}

let count = 0 ;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        
        if (turnO){
            box.innerText = "O";
            turnO = false ;
        }else{
            box.innerText = "X";
            turnO = true ;
        }
        box.disabled = true ;
        count++ ;
        let winnerfound = checkWinner()

        if (!winnerfound && count==9){
            showDraw();
        }
         

    });
});

newbtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);