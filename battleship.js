/*  ********************************************************************************************************************************
/
/                       READ ALL COMMENTS AND MAKE CHANGES / ADD FUNCTIONALITY. LEAVE NO UNUSED CODE OR COMMENTS
/
************************************************************************************************************************************/

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
}
class Alien extends Spaceship{
    constructor() {
        super();
        this.name = 'Alien';
        this.hull = this.#determineValue(7, 20);
        this.firepower = this.#determineValue(2, 5);
        this.accuracy = this.#determineValue(.6, .9);
    }

    #determineValue(minInclusive, maxExclusive) { // Private method to determine created values.
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
} //end Alien class

class Gameboard { //this is a class where we can perform the key functionality of the game.
    constructor() {
        this.name = 'Space Battle';
        this.player = new Playership();
        this.alienPlayers = this.#generateAliens();
    }

    #generateAliens() { //later add default for user choice  generateAliens(userChoice = random or whatever)
        let result = [];
        let numberOfAliens = Math.ceil(Math.random() * 5);

        for (let i = 0; i < numberOfAliens; i++) {
            result.push(new Alien());
        }
        return result;
    }

    pickTarget() {
        return this.alienPlayers[this.alienPlayers.length - 1];
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
                this.alienPlayers.pop();
                return winnerOfRound;
            }

            let alienAttackResult = this.alienAttack(alien, player);

            if (this.isTheShipDestroyed(alienAttackResult)) {
                console.log('%c I destroyed the USS Assembly!', 'color: red');
                winnerOfRound = 'alien';
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
            console.log(`current length = ${this.alienPlayers.length}`);
            winnerOfGame = this.playRound();

            if (this.alienPlayers.length == 0) {
                return this.exitGame(winnerOfGame);
            }

            if (winnerOfGame == 'alien') {
                return this.exitGame(winnerOfGame)
            }
            console.log(`players hull = ${this.player.getHull()}`)
            //this.retreat(); uncomment when added to html
        }
    }
} // end Gameboard class


let play = new Gameboard();
play.playGame();

