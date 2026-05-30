let score=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
};
updatescore();

let isAutoPlaying=false;
let intervalId;

function Autoplay(){
    if(!isAutoPlaying){
        intervalId = setInterval(() => {
            const playerchoice = getcomputerchoice();
            play(playerchoice);
        }, 1000);
        isAutoPlaying=true;
    }else{
        clearInterval(intervalId);
        isAutoPlaying=false;
    }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    play('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    play('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    play('scissors');
});

document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'r'){
        play('rock');
    }else if(event.key === 'p'){
        play('paper');
    }else if(event.key === 's'){
        play('scissors');
    }
});

function play(playerchoice){
    const computerchoice = getcomputerchoice();
    let res='';
    if(playerchoice==='rock'){
        if(computerchoice ==='rock'){
            res='tie';
        }else if(computerchoice==='paper'){
            res='you lose';
        }else if(computerchoice==='scissors'){
            res='you win';
        }
    }else if(playerchoice==='paper'){
        if(computerchoice ==='rock'){  
            res='you win';
        }else if(computerchoice==='paper'){
            res='tie';
        }else if(computerchoice==='scissors'){
            res='you lose';
        }
    }else if (playerchoice==='scissors'){
        if(computerchoice ==='rock'){  
            res='you lose';
        }else if(computerchoice==='paper'){
            res='you win';
        }else if (computerchoice==='scissors'){
            res='tie';
        }
    }

    if(res==='you win'){
        score.wins++;
    }else if(res==='you lose'){
        score.losses++;
    }else if(res==='tie'){
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updatescore();
    
    document.querySelector('.js-result').innerHTML=res;
    document.querySelector('.js-moves').innerHTML=`you 
    <img src="images/${playerchoice}-emoji.png" class="move-icon">
    <img src="images/${computerchoice}-emoji.png" class="move-icon">
    computer`;
}

function updatescore(){
    document.querySelector('.js-score').innerHTML=
    `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}

function getcomputerchoice(){
    const randomchoice = Math.random();
    let computerMove = '';
        if (randomchoice >= 0 && randomchoice < 1 / 3) {
        computerMove = 'rock';
        } else if (randomchoice >= 1 / 3 && randomchoice < 2 / 3) {
        computerMove = 'paper';
        } else if (randomchoice >= 2 / 3 && randomchoice < 1) {
        computerMove = 'scissors';
        }
    return computerMove;
}