class Spaceship {
    constructor() {
        this.name = 'USS Assembly';
        this.hull = 20; //hitpoints, when this drops to or below 0, the ship is destroyed.
        this.firepower = 5; //The amount of damage done per attack.
        this.accuracy = .7; //chances of hitting a target;
    }
}

class Alien {
    constructor() {
        this.name = 'Alien';
        this.hull = this.determineValue(3, 7);
        this.firepower = this.determineValue(2, 5);
        this.accuracy = this.determineValue(.6, .9);
    }

        determineValue(minInclusive, maxExclusive) {
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

let testObj = [];
for (let i = 0; i < 20; i++) {
    testObj.push(new Alien());
}
console.log(testObj);