class Spaceship {
    constructor() {
        this.name = 'USS Assembly';
        this.hull = 20; //hitpoints, when this drops to or below 0, the ship is destroyed.
        this.firepower = 5; //The amount of damage done per attack.
        this.accuracy = .7; //chances of hitting a target;
    }

    attack() {
        return this.firepower;
    }
} // end Spaceship class

class Alien {
    constructor() {
        this.name = 'Alien';
        this.hull = this.#determineValue(3, 7);
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
        
        attack() {
            return this.firepower;
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
            let numberOfAliens = Math.ceil(Math.random() * 6);
            
            for(let i = 0; i < numberOfAliens; i++) {
                result.push(new Alien());
            }
            return result;
        }

        pickTarget() {
            return this.alienPlayers[Math.floor(Math.random() * this.alienPlayers.length)];
        }
        playRound(player, pickTarget) {
            while(player.hull > 0 && pickTarget.hull > 0) {
                return 0;
            }

        }


    } // end Gameboard class

    let game = new Gameboard();
    console.log(game)
    console.log(game.pickTarget())