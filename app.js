/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
init();
var previous;
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        // random number generator from 1 to 6
    var dice1 = Math.ceil(Math.random() * 6) ;
    var dice2 = Math.ceil(Math.random() * 6) ;
    
    //Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' +dice1 +'.png'
    document.getElementById('dice-2').src = 'dice-' +dice2 +'.png'
    // var diceDOM = document.querySelector('.dice')
    // diceDOM.style.display = 'block';
    // diceDOM.src = 'dice-' +dice +'.png';

    //update the round score
    // if(dice === 6 && previous === 6){
    //     scores[activePlayer] = 0;
    //     document.querySelector('#score-' +activePlayer).textContent = 0;
    //     nextplayer();
        
    // }
    // else
     if((dice1 !==1 && dice2 !==1) ){
        //add score
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore; 
    }
    else {
        //nextplayer
       nextplayer();
    }
     previous = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
    //add currentscore to global score
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector('#score-' +activePlayer).textContent = scores[activePlayer];
  
    var input = document.querySelector('.final-score').value;
    var finalScore
    if(input){
        finalScore = input;
    }else{
        finalScore = 100;
    }


    //check if player won game
    if(scores[activePlayer] >= finalScore){
       document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
       document.querySelector('.player-' +activePlayer +'-panel').classList.remove('active');
       document.querySelector('.player-' +activePlayer +'-panel').classList.add('winner');
       
       document.getElementById('dice-1').style.display = 'none';
       document.getElementById('dice-2').style.display = 'none';
        gamePlaying = false;
        // document.querySelector('.btn-roll').style.display = 'none';
        // document.querySelector('.btn-hold').style.display = 'none';

    }else{
        //nextplayer
        nextplayer();
    }
}

});

document.querySelector('.btn-new').addEventListener('click', init);

function nextplayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    roundScore = 0;

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init(){
    scores = [0,0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;


document.getElementById('dice-1').style.display = 'none';
document.getElementById('dice-2').style.display = 'none';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');

document.querySelector('.player-1-panel').classList.remove('active');

document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

document.getElementById('name-0').textContent = 'Player 1' ;
document.getElementById('name-1').textContent = 'Player 2' ;

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';

document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
}