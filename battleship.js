class Spaceship {
    constructor() {
        this.name = 'Spaceship';
        this.hull = 20; 
        this.firepower = 5; 
        this.accuracy = .7; 
    }

    getHull() {
        return this.hull;
    }

    getFirepower() {
        return this.firepower;
    }

    getAccuracy() {
        return this.accuracy;
    }

    setHull(value) {
        this.hull = value;
    }
} // end Spaceship class

class Playership extends Spaceship {
    constructor() {
        super();
        this.name = 'USS Assembly';
    }
} //end Playership class

class Alien extends Spaceship{
    constructor() {
        super();
        this.name = 'Alien';
        this.hull = this.#determineValue(7, 20);
        this.firepower = this.#determineValue(2, 5);
        this.accuracy = this.#determineValue(.6, .9);
        
    }
    #determineValue(minInclusive, maxExclusive) { 
        let min;
        let max;

        if (minInclusive < 1 && maxExclusive < 1) {
            min = Math.ceil((minInclusive * 10));
            max = Math.floor((maxExclusive * 10));
            return (Math.floor(Math.random() * (max - min) + min) / 10);
        } else {
            let min = Math.ceil(minInclusive);
            let max = Math.floor(maxExclusive);
            return Math.floor(Math.random() * (max - min) + min);
        }
    }

} //end Alien class

class Gameboard { 
    constructor() {
        this.name = 'Space Battle';
        this.player = new Playership();
        this.alienPlayers = this.#generateAliens();
    }

    #generateAliens() { 
        let result = [];
        let numberOfAliens = Math.ceil(Math.random() * 6) // <=== add helper function here to ask for a value
        for (let i = 0; i < numberOfAliens; i++) {
            result.push(new Alien());
            result[i].aliensOnHtml = this.#addAlienImage(numberOfAliens);
        }
        return result;
    }

    #addAlienImage(numberOfAliens) {
        
        let squareOfAlienCountForGrid = Math.ceil(Math.sqrt(numberOfAliens));
        let alienContainer = document.querySelector('.enemyStage');
        alienContainer.style.gridTemplateColumns = (`repeat(${squareOfAlienCountForGrid}, 1fr`);
        alienContainer.style.gridTemplateRows = (`repeat(${squareOfAlienCountForGrid}, 1fr`);
        
        let alienImg = document.createElement('div');
        alienImg.classList = 'enemyImage';
        let alienHTML = alienImg;
        alienContainer.appendChild(alienImg); 
    
        return alienHTML;
    }

    #shipIsDestoyedGif(winnerOfRound) {
        if(winnerOfRound == 'USS Assembly') {
            let alienTarget = this.alienPlayers.length;
           
            let alienInArray = document.querySelector(`.enemyStage :nth-child(${alienTarget})`);
            alienInArray.classList.add('fire');
            
        } else if(winnerOfRound == 'Alien') {
            let playerImg = document.querySelector('.playerImage');
            playerImg.classList.add('fire');
        }

    }

    pickTarget() {
        return this.alienPlayers[this.alienPlayers.length - 1];
    }
    
    hitOrMiss(accuracy) {
        return Math.random() < accuracy ? true : false;
    }

    playerAttack(playerObj, targetObj) {
        let currentEnemyHullStrength = targetObj.getHull();

        if(this.hitOrMiss(playerObj.getAccuracy())) {
            // this sets a new value for targets hull after attack;
            targetObj.setHull(targetObj.getHull() - playerObj.getFirepower()); 
            currentEnemyHullStrength = targetObj.getHull();
            this.updateAlienStats(targetObj);
            console.log('%c Take that alien scum!', 'color: green');
        } else {
            console.log('%c Miss!', 'color: green');
        }
        return currentEnemyHullStrength;
    }

    alienAttack(alienObj, targetObj) {
        let enemyHullStrength = targetObj.getHull();

        if (this.hitOrMiss(alienObj.getAccuracy())) {
            // this sets a new value for targets hull after attack;
            targetObj.setHull(targetObj.getHull() - alienObj.getFirepower()); 
            enemyHullStrength = targetObj.getHull();
            this.updatePlayerStats();
            console.log('%c I hit the USS Assembly!', 'color: red');
        } else {
            console.log('%c Miss!', 'color: red');
        }
        return enemyHullStrength;
    }

    isTheShipDestroyed(targetHull) {
        return targetHull <= 0 ? true : false;
    }

    updatePlayerStats() {
        let playerHull = document.querySelector('.pHull');
        playerHull.textContent = `Hull : ${this.player.getHull()}`;
        let playerFirepower = document.querySelector('.pFirepower');
        playerFirepower.textContent = `Firepower : ${this.player.getFirepower()}`;
        let playerAccuracy = document.querySelector('.pAcc');
        playerAccuracy.textContent = `Accuracy : ${this.player.getAccuracy()}`;
    }

    updateAlienStats(alien) {
        let alienHull = document.querySelector('.aHull');
        alienHull.textContent = `Hull: ${alien.getHull()}`;
        let alienFirepower = document.querySelector('.aFirepower');
        alienFirepower.textContent = `Firepower: ${alien.getFirepower()}`;
        let alienAccuracy = document.querySelector('.aAcc');
        alienAccuracy.textContent = `Accuracy: ${alien.getAccuracy()}`;
    }

    playRound() {
        let player = this.player;
        let alien = this.pickTarget();
        this.updateAlienStats(alien);
        this.updatePlayerStats();
        let winnerOfRound;
      
        
        while (true) {
            let playerAttackResult = this.playerAttack(player, alien);
            if (this.isTheShipDestroyed(playerAttackResult)) {
                console.log('%c I destroyed an alien ship!', 'color: green');
                winnerOfRound = 'USS Assembly';
                this.#shipIsDestoyedGif(winnerOfRound);
                this.alienPlayers.pop();
                return winnerOfRound;
            }

            let alienAttackResult = this.alienAttack(alien, player);

            if (this.isTheShipDestroyed(alienAttackResult)) {
                console.log('%c I destroyed the USS Assembly!', 'color: red');
                winnerOfRound = 'Alien';
                this.#shipIsDestoyedGif(winnerOfRound);
                return winnerOfRound;
            }
        }
    }

    retreat() {  
        let retreatModal = document.querySelector('#modal');
        retreatModal.classList = 'retreatModal';
    }

    exitGame(result) {
        let endGameModal = document.getElementById('screen');
        endGameModal.classList = 'winnerScreen';
        document.querySelector('#screen > p').textContent = `The Winner is the ${result}`;
        console.log(`The ${result} won!`);
    }

    
} // end Gameboard class

//***************************************************************************************************/
//       The below functions are for instantiating the gameboard and provide interaction with        /
//        the web-game.                                                                              /
//***************************************************************************************************/

const startGame = () => {
    let startButton = document.querySelector('.animate > button');
    startButton.addEventListener('click', function(e) {
        let introText = document.querySelector('.animate');
        introText.remove();
        playGame(new Gameboard());
    });
}


const playGame = (gameBoard) => {
    gameBoard.updateAlienStats(gameBoard.alienPlayers[gameBoard.alienPlayers.length -1]);
    retreatButton(gameBoard);
    continueButton(gameBoard);
    clickAlienToAttack(gameBoard);
    playAgain(gameBoard);
}

const retreatButton = (gameBoard) => {
    let retreatButton = document.querySelector('.retreat');
    retreatButton.addEventListener('click', function(e) {
        gameBoard.player.setHull(20);
        gameBoard.updatePlayerStats(gameBoard.player);
        gameBoard.updateAlienStats(gameBoard.alienPlayers[gameBoard.alienPlayers.length -1]);
        let retreatModal = document.querySelector('#modal');
        retreatModal.classList = 'removeModal';
        retreatButton.style.display = 'none';
        document.querySelector('.continue').style.marginLeft = '45%';
        document.querySelector('#modal > p').textContent = 'Please click continue.';
    });
}

const continueButton = (gameBoard) => {
    let continueButton = document.querySelector('.continue');
    continueButton.addEventListener('click', function(e) {
        let retreatModal = document.querySelector('#modal');
        retreatModal.classList = 'removeModal';
        gameBoard.updatePlayerStats(gameBoard.player);
        gameBoard.updateAlienStats(gameBoard.alienPlayers[gameBoard.alienPlayers.length -1]);
    });
}

const clickAlienToAttack = (gameBoard) => {
    let winnerOfGame;

    let attackAlien = document.querySelector('.enemyStage');
    attackAlien.addEventListener('click', function(e) {
       winnerOfGame = gameBoard.playRound();
       if (gameBoard.alienPlayers.length == 0) {
            return gameBoard.exitGame(winnerOfGame);
        }
    
        if (winnerOfGame == 'Alien') {
            return gameBoard.exitGame(winnerOfGame)  
        }
        gameBoard.retreat();
    });
}

const playAgain = (gameBoard) => {
    let playAgainButton = document.querySelector('.playAgain');
    playAgainButton.addEventListener('click', function(e) {
        let endGameModal = document.getElementById('screen');
        endGameModal.classList = 'hiddenWinnerScreen';
        window.location.reload(false);
    });
}

startGame();

