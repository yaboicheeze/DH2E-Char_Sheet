
/* 
class Character {
    constructor(name, homeworld, background, weaponskill, strength, toughness) {
        this.name = name;
        this.homeworld = homeworld;
        this.background = background;
        this.weaponskill = weaponskill;
        this.strength = strength;
        this.toughness = toughness;
    }

    static fromDictionary(characterDictionary) {
        const inventory = characterDictionary.inventory.map(itemDict => Item.fromDictionary(itemDict));
        return new Character(
            characterDictionary.name,
            characterDictionary.homeworld,
            characterDictionary.background,
            characterDictionary.weaponskill,
            characterDictionary.strength,
            characterDictionary.toughness
        );
    }
    
    toDictionary() {
        const inventory = this.inventory.map(item => item.toDictionary());
        return {
            "name": this.name,
            "homeworld": this.homeworld,
            "background": this.background,
            "weaponskill": this.weaponskill,
            "strength": this.strength,
            "toughness": this.toughness
        };
    }
}

// Convert Character object to JSON string and save to file
const jsonString = JSON.stringify(myCharacter.toDictionary(), null, 4);
console.log(jsonString);

// Read character from file and recreate Character object
const characterFromJson = Character.fromDictionary(JSON.parse(jsonString));
console.log(characterFromJson);
 */



/* document.addEventListener("DOMContentLoaded", function () {
    character = {
        name: document.getElementById("charName").value,
        weaponskill: parseInt(document.getElementById("wsScore").value),
        strength: parseInt(document.getElementById("strScore").value),
        toughness: parseInt(document.getElementById("tScore").value)
    };
});

function updateCharacterStats() {
    character.name = document.getElementById("charName").value;
    character.weaponskill = parseInt(document.getElementById("wsScore").value);
    character.strength = parseInt(document.getElementById("strScore").value);
    character.toughness = parseInt(document.getElementById("tScore").value);
} */