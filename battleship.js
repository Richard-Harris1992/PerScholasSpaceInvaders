/*  ********************************************************************************************************************************
/
/                       READ ALL COMMENTS AND MAKE CHANGES / ADD FUNCTIONALITY. LEAVE NO UNUSED CODE OR COMMENTS
/
************************************************************************************************************************************/

//Initial thoughts, add functionality in the methods when available. If I cannot directly use the method to do something I will need to create a
//function and add it to the other methods. example = generate aliens vs a method to popup and choose enemy amounts.
//CSS for style JS for functionality i.e add classes in css and use JS to modify classes to style accordingly.

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

    // Private method to determine randomized property values.
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

//this is the class where we can perform the key functionality of the game.
class Gameboard { 
    constructor() {
        this.name = 'Space Battle';
        this.player = new Playership();
        this.alienPlayers = this.#generateAliens();
    }

    #addAlienImage(squareOfNumberOfAliens) {
        let alienContainer = document.querySelector('.enemyStage');
        alienContainer.style.gridTemplateColumns = (`repeat(${squareOfNumberOfAliens}, 1fr`);
        alienContainer.style.gridTemplateRows = (`repeat(${squareOfNumberOfAliens}, 1fr`);
        let alienImg = document.createElement('div');
        alienImg.classList = 'enemyImage';
        alienContainer.appendChild(alienImg);
    }
    
    #generateAliens() { 
        let result = [];
        let numberOfAliens = Math.ceil(Math.random() * 6) // <=== add helper function here to ask for a value
        let squareOfAliensForGrid = Math.ceil(Math.sqrt(numberOfAliens));
        for (let i = 0; i < numberOfAliens; i++) {
            result.push(new Alien());
            this.#addAlienImage(squareOfAliensForGrid);
        }
        return result;
    }

    #shipIsDestoyedGif(winnerOfRound) {
        //if this target is destroyed add fire gif.
        //at first ill add it to the last enemy image, later capture the div in a variable when clicked to attack.
        if(winnerOfRound == 'player') {
            let divCounter = this.alienPlayers.length;
           
            let alienInArray = document.querySelector(`.enemyStage :nth-child(${divCounter})`);
            alienInArray.classList.add('fire');
            
        } else if(winnerOfRound == 'alien') {
            let playerImg = document.querySelector('.playerImage');
            playerImg.classList.add('fire');
        }

    }

    pickTarget() {
        return this.alienPlayers[this.alienPlayers.length - 1];

        //add click event listener to choose who to destory;
    }

    hitOrMiss(accuracy) {
        return Math.random() < accuracy ? true : false;
    }

    playerAttack(playerObj, targetObj) {
        targetObj.setHull(targetObj.getHull() - playerObj.getFirepower()); // this sets a new value for targets hull after attack;
        let enemyHullStrength = targetObj.getHull();
        console.log('%c Take that alien scum!', 'color: green');
        return enemyHullStrength;
    }

    alienAttack(alienObj, targetObj) {
        let enemyHullStrength = targetObj.getHull();

        if (this.hitOrMiss(alienObj.getAccuracy())) {
            targetObj.setHull(targetObj.getHull() - alienObj.getFirepower()); // this sets a new value for targets hull after attack;
            enemyHullStrength = targetObj.getHull();
            console.log('%c I hit the USS Assembly!', 'color: red');
        } else {
            console.log('%c Miss!', 'color: red');
        }
        return enemyHullStrength;
    }

    isTheShipDestroyed(targetHull) {
        return targetHull <= 0 ? true : false;
    }

    playRound() {
        let player = this.player;
        let alien = this.pickTarget();
        let winnerOfRound;

        while (true) {
            let playerAttackResult = this.playerAttack(player, alien);
            if (this.isTheShipDestroyed(playerAttackResult)) {
                console.log('%c I destroyed an alien ship!', 'color: green');
                winnerOfRound = 'player';
                this.#shipIsDestoyedGif(winnerOfRound);
                this.alienPlayers.pop();
                return winnerOfRound;
            }

            let alienAttackResult = this.alienAttack(alien, player);

            if (this.isTheShipDestroyed(alienAttackResult)) {
                console.log('%c I destroyed the USS Assembly!', 'color: red');
                winnerOfRound = 'alien';
                this.#shipIsDestoyedGif(winnerOfRound);
                return winnerOfRound;
            }
        }
    }

    // retreat() {  I will need to add functionality to this when applying to html

    // }

    exitGame(result) {
        console.log(`The ${result} won!`);
        //add replay feature
    }

    playGame() {
        let winnerOfGame;

        while (winnerOfGame != 'alien' || this.alienPlayers.length != 0) {
            winnerOfGame = this.playRound();

            if (this.alienPlayers.length == 0) {
                return this.exitGame(winnerOfGame);
            }

            if (winnerOfGame == 'alien') {
                return this.exitGame(winnerOfGame)
            }
            //this.retreat(); uncomment when added to html
        }
    }
} // end Gameboard class



let game = new Gameboard();
console.log(game.alienPlayers.length)
game.playGame()

