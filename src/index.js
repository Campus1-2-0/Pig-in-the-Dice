const count = document.querySelector('.user .countBox .count p');
const progressNow = document.querySelector(".user .progressNow .charge");
const progressTotal = document.querySelector(".user .progressTotal .charge");

let userNowCharge = 0;
let userTotalCharge = 0;
let userResultCharge = 0;
let diceNumber = 0;

let winner = ""

function diceRoll(){
    diceNumber = Math.floor(Math.random() * 6) + 1;
    count.innerHTML = diceNumber
    if(diceNumber == 1){
        userNowCharge = 0;
        progressNow.style.width = "0px"
        userTotalCharge = 0;
        ComputerPlay()
    }
    else{
        userNowCharge = userNowCharge + diceNumber;
        userTotalCharge = userTotalCharge + diceNumber;
        progressNow.style.width = userNowCharge + "px"
        document.querySelector(".userValue .now").innerHTML = userTotalCharge + "%"
    }
}

function diceStop(){
    userResultCharge += userTotalCharge;
    userTotalCharge = 0;
    if(userResultCharge >= 100){
        alert(`당신이 이겼습니다.`)
        progressTotal.style.width = "100%"
    }
    else{
        progressTotal.style.width = userResultCharge + "px";
        document.querySelector(".userValue .total").innerHTML = userResultCharge + "%"
        ComputerPlay();
    }
}

// Computer 
const ComputerArr = document.querySelectorAll('.computer');

function ComputerPlay(){
    console.log('----')
    ComputerArr.forEach((computer,index) => {
        let ComputerNowCharge = 0;
        let ComputerTotalCharge = 0;
        let nowValue = computer.children[1].children[1].children[1].children[0].getAttribute('data-dice-value');
        let computerContinue = 0

        const start = () => {
            computerContinue = Math.floor(Math.random()*2);
            ComputerNowCharge = ComputerNowCharge + diceNumber;
            ComputerTotalCharge = ComputerTotalCharge + diceNumber;
            computer.children[1].children[1].children[0].children[0].style.width = ComputerNowCharge + "px";

            if(computerContinue == false){
                // 한 번 더 함
                start();
            }
            else{
                save();
            }
        }

        const save = () => {
            // 저장
            computer.children[1].children[1].children[1].children[0].setAttribute('data-dice-value', nowValue = Number(nowValue) + ComputerTotalCharge)
            ComputerTotalCharge = 0;
            if(Number(nowValue) >= 100){
                alert(`컴퓨터${index+1}이 이겼습니다.`);
                computer.children[1].children[1].children[1].children[0].style.width = "100%";
            }
            else{
                computer.children[1].children[1].children[1].children[0].style.width = nowValue + "px";
                computer.children[1].children[2].innerHTML = nowValue + "%"
            }
        }

        
        diceNumber = Math.floor(Math.random() * 6) + 1

        computer.children[1].children[0].children[0].innerHTML = diceNumber;

        if(diceNumber == 1){
            ComputerNowCharge = 0;
            computer.children[1].children[1].children[0].children[0].style.width = "0px"
            ComputerTotalCharge = 0;
        }
        else{

            start();
        }
    });
}

function resultAlert(){
}