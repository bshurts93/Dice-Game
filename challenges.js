/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, winningScore;


init();


var lastDice;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

var x = document.querySelector('#score-0').textContent;
console.log(x);


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random Number Generator
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice_2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        var dice_2DOM = document.querySelector('.dice_2');
        dice_2DOM.style.display = 'block';
        dice_2DOM.src = 'dice-' + dice_2 + '.png';
        
        // 3. If two 6s are rolled, player loses entire score
        if (dice === 6 && dice_2 === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';  
            nextPlayer();
        // 4. Update the round score IF the rolled number was NOT a 1    
        } else if (dice !== 1 && dice_2 !== 1 ) {
            //Add score
            //document.getElementById('current-' + activePlayer).textContent = roundScore;
            roundScore = roundScore + (dice + dice_2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer(); 
        }
// The OR operator seems to not be working, but the game still runs. Check again.
        lastDice = dice;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Add current score to the global score
        scores[activePlayer] += roundScore;
        //Long version  
        //scores[activePlayer] = scores[activePlayer] + roundScore;
        
        //Input field integration
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        if (input) {
            var winningScore = input;
        } else {
            var winningScore = 100;
        }
        // 2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        // 3. Check if player has won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('.player-' + activePlayer + '-win').style.display = 'block';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice_2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');   
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');   

            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice_2').style.display = 'none';
};


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;


   

    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice_2').style.display = 'none';
    //reset scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('current-1').textContent = '0';
    
    //takes die off display
    document.querySelector('.dice').style.display = 'none';
    
    //remove any and all active and winner classes
    document.querySelector('.player-0-panel').classList.remove('active'); 
    document.querySelector('.player-1-panel').classList.remove('active'); 
    document.querySelector('.player-0-panel').classList.remove('winner'); 
    document.querySelector('.player-1-panel').classList.remove('winner'); 
    //set player 0 as active
    document.querySelector('.player-0-panel').classList.add('active');  
    //take away winner cards
    document.querySelector('.player-0-win').style.display = 'none';
    document.querySelector('.player-1-win').style.display = 'none';
};
 
document.querySelector('.btn-submit').addEventListener('click', setScore);


/* Used for Ver 1.0 scoring system
function setScore() {
        winningScore = document.getElementById("myText").value;
        document.getElementById("set-score").textContent = winningScore;     
};
*/











