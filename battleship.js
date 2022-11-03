class Spaceship {
    constructor() {
        this.name = 'USS Assembly';
        this.hull = 20; //hitpoints, when this drops to or below 0, the ship is destroyed.
        this.firepower = 5; //The amount of damage done per attack.
        this.accuracy = .7; //chances of hitting a target;
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

class Alien {
    constructor() {
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
        this.player = new Spaceship();
        this.alienPlayers = this.#generateAliens();
    }

    #generateAliens() {
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
        
        while (true) {
            let playerAttackResult = this.playerAttack(player, alien);
            if (this.isTheShipDestroyed(playerAttackResult)) {
                console.log('%c I destroyed an alien ship!', 'color: green');
                return 'player';
            }

            let alienAttackResult = this.alienAttack(alien, player);

            if (this.isTheShipDestroyed(alienAttackResult)) {
                console.log('%c I destroyed the USS Assembly!', 'color: red');
                return 'alien';
            }
        }
    }



} // end Gameboard class


let game = new Gameboard();
game.playRound();
