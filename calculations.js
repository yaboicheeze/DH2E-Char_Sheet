const ARMOR_VALUE_MAP = {
    "headAV": "totHeadAV",
    "bodyAV": "totBodAV",
    "laAV": "totLAAV",
    "raAV": "totRAAV",
    "llAV": "totLLAV",
    "rlAV": "totRLAV"
}
const STAT_MAP = {
    "wsScore": "wsMod",
    "bsScore": "bsMod",
    "strScore": "strMod",
    "tScore": "tMod",
    "agScore": "agMod",
    "intScore": "intMod",
    "perScore": "perMod",
    "wpScore": "wpMod",
    "felScore": "felMod",
    "iflScore": "iflMod"
}
const WEIGHT_MAP = {
    0: 0.9,
    1: 2.25,
    2: 4.5,
    3: 9,
    4: 18,
    5: 27,
    6: 36,
    7: 45,
    8: 56,
    9: 67,
    10: 78,
    11: 90,
    12: 112,
    13: 225,
    14: 337,
    15: 450,
    16: 675,
    17: 900,
    18: 1350,
    19: 1800,
    20: 2250
}

/**
 * Refreshes armor value based on toughness and equipped armor
 */
function setArmorValues() {
    let tmod = parseInt(document.getElementById("tMod").value);
    for (let key in ARMOR_VALUE_MAP) {
        document.getElementById(ARMOR_VALUE_MAP[key]).value = tmod + parseInt(document.getElementById(key).value);
    }
}

/**
 * Updates character weight limits based on strength and toughness
 */
function setWeights() {
    let toughBonus = parseInt(document.getElementById("tMod").value);
    let strengthBonus = parseInt(document.getElementById("strMod").value);
    let baseWeight = WEIGHT_MAP[toughBonus + strengthBonus];
    document.getElementById("totalWeight").value = baseWeight;
    document.getElementById("liftWeight").value = baseWeight * 2;
    document.getElementById("pushWeight").value = baseWeight * 4;
}

/**
 * Refreshes character modifiers using base stats
 */
function updateModifiers() {
    for (let key in STAT_MAP) {
        document.getElementById(STAT_MAP[key]).value = Math.floor(document.getElementById(key).value / 10)
    }
}

function currentCarryWeight() {
    var table = document.getElementById("inventoryTable");
    var table2 = document.getElementById("weaponTable");
    var sum = 0;

    for (var i = 1; i < table.rows.length - 1; i++) {
        let weightId = i + "Weigh";
        /* console.log(weightId); */
        var addWeightCheck = document.getElementById(weightId); /**Helps in checking to see if the next element exists */

        if (addWeightCheck) {
            /**If that value exists */
            sum += parseFloat(document.getElementById(weightId).value);
            /* console.log("Sum is: " + sum) */
        }
    }
    for (var i = 1; i < table2.rows.length - 1; i++) {
        let weightIdWeapons = i + "WeapWeigh";
        /* console.log(weightId); */
        var addWeightCheck = document.getElementById(weightIdWeapons); /**Helps in checking to see if the next element exists */

        if (addWeightCheck) {
            /**If that value exists */
            sum += parseFloat(document.getElementById(weightIdWeapons).value);
            /* console.log("Sum is: " + sum) */
        }
    }

    document.getElementById("curWeight").value = sum;
}


function updateMoveValues() {
    var moveMod = parseInt(document.getElementById("agMod").value);
    document.getElementById("halfSpeed").value = moveMod;
    document.getElementById("fullSpeed").value = moveMod * 2;
    document.getElementById("chargeSpeed").value = moveMod * 3;
    document.getElementById("runSpeed").value = moveMod * 6;
}

function updateFatigueThresh() {
    document.getElementById("fatigueThresh").value = parseInt(document.getElementById("tMod").value) + parseInt(document.getElementById("wpMod").value)
}

function updateModACcarryWeight() { /* onchange for strength and tough sections */
    updateModifiers();
    setArmorValues();
    setWeights();
    updateFatigueThresh();
}

function updateModAndMovement() { /* onchange for agility section */
    updateModifiers();
    updateMoveValues();
}

function updateModAndFatigue() { /* onchange for willpower section */
    updateModifiers();
    updateFatigueThresh();
}

/* Inventory Slots */


function addInventorySlot() {
    var table = document.getElementById("inventoryTable")
    var count = table.rows.length - 3;

    var newRow = table.insertRow(-1);
    newRow.innerHTML =
        '<td><textarea type="number" id="' + count + 'Inv"></textarea></td>' +
        '<td><button onclick="openDescBox(\'descInv' + count + '\', \'' + count + 'Inv\')">Open Description</button></td>' +
        '<div id="descInv' + count + '" class="descBox">' +
        '<h1>Item ' + count + '</h1>' +
        '<div class="descContent">' +
        '<textarea id="' + count + 'InvDesc"></textarea>' +
        '<button onclick="closeDescBox(\'descInv' + count + '\')">Close</button>' +
        '</div>' +
        '</div>' +

        '<td><input type="number" id="' + count + 'Weigh" value="0" onchange="currentCarryWeight()"></td>';;
}

function removeInventorySlot() {
    var table = document.getElementById("inventoryTable");
    if (table.rows.length > 4) {
        table.deleteRow(table.rows.length - 1);
    }
}


/* Psyker Slots */


function addPsykerSlot() {
    var table = document.getElementById("psyTable");
    var count = table.rows.length - 2;

    var newRow = table.insertRow(-1);
    newRow.innerHTML =
        '<td><textarea type="number" id="' + count + 'PsyPower"></textarea></td>' +
        '<td><button onclick="openDescBox(\'descPsyker' + count + '\', \'' + count + 'PsyPower\')">Open Description</button></td>' +
        '<div id="descPsyker' + count + '" class="descBox">' +
        '<h1>Psyker Power' + count + '</h1>' +
        '<div class="descContent">' +
        '<textarea id="' + count + 'PsyDesc"></textarea>' +
        '<button onclick="closeDescBox(\'descPsyker' + count + '\')">Close</button>' +
        '</div>' +
        '</div>';
}

function removePsykerSlot() {
    var table = document.getElementById("psyTable");
    if (table.rows.length > 3) {
        table.deleteRow(table.rows.length - 1);
    }
}



/* Weapon Slots */


function addWeaponSlot() {
    var table = document.getElementById("weaponTable")
    var count = table.rows.length - 1;
    var newRow = table.insertRow(-1);
    newRow.innerHTML =
        '<td><textarea type="text" id="' + count + 'WeapName"></textarea></td>' +

        '<td><button onclick="openDescBox(\'descWeap' + count + '\', \'' + count + 'WeapName\')">Open Description</button></td>' +
        '<div id="descWeap' + count + '" class="descBox">' +
        '<h1>Weapon ' + count + '</h1>' +
        '<div class="descContent">' +
        '<textarea id="' + count + 'WeapDesc"></textarea>' +
        '<button onclick="closeDescBox(\'descWeap' + count + '\')">Close</button>' +
        '</div>' +
        '</div>' +

        '<td><input type="number" id="' + count + 'WeapWeigh" value="0" onchange="currentCarryWeight()"></td>';
    }



function removeWeaponSlot() {
    var table = document.getElementById("weaponTable");
    if (table.rows.length > 2) {
        table.deleteRow(table.rows.length - 1);
    }
}

/* Open and Close Description Boxes */

function openDescBox(descBoxId, textareaNameID) {
    var fieldName = document.getElementById(textareaNameID).value; /* Take the text in the textarea in the inventory slot */
    var descBox = document.getElementById(descBoxId); /* Find the corresponding box for the item */
    var h1Element = descBox.querySelector("h1"); /* Find the header element inside the popup description box */
    if (h1Element) {
        h1Element.textContent = fieldName; /* Replace the header text with the name of the item found in fieldName */
    }
    descBox.style.display = "block"; /* Display the item and description */
}

function closeDescBox(descBoxID) {
    document.getElementById(descBoxID).style.display = "none";
}



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
var character;


document.addEventListener("DOMContentLoaded", function () {
    character = createCharacterObject();
});

function createCharacterObject() {
    const charInfoBlock = document.querySelectorAll(".char-info-block textarea");
    const weapItemPsyNames = document.querySelectorAll(".weapon-table-style textarea");
    const weapItemPsyInfo = document.querySelectorAll(".descContent textarea");
    const weightsAndPsyRate = document.querySelectorAll(".weapon-table-style input");
    const abilityNums = document.querySelectorAll(".ability-table input");
    const armorNums = document.querySelectorAll(".armor-table input");
    const skillChecks = document.querySelectorAll(".checkbox-cell input");
    const trackerValues = document.querySelectorAll(".tracker-values input");

    const characterObject = {};

    /* Collects all the typed character indo like background, name, homeworld, traits, etc. */
    charInfoBlock.forEach(function (textarea) {
        const id = textarea.id;
        const value = textarea.value;
        characterObject[id] = value;
    });

    /* Collects names for all items, weapons, and psyker powers */
    weapItemPsyNames.forEach(function (textarea) {
        const id = textarea.id;
        const value = textarea.value;
        characterObject[id] = value;
    });

    /* Collects the psy rating of the character and the weight for all items/weapons*/
    weightsAndPsyRate.forEach(function (input) {
        const id = input.id;
        const value = parseFloat(input.value);
        characterObject[id] = value;
    });

    /* Displays the info for items, weapons, and psyker powers */
    weapItemPsyInfo.forEach(function (textarea) {
        const id = textarea.id;
        const value = parseFloat(textarea.value);
        characterObject[id] = value;
    });

    /* Collects the ability numbers and modifiers for the character's main stats */
    abilityNums.forEach(function (input) {
        const id = input.id;
        const value = input.value;
        characterObject[id] = value;
    });

    /* Collects the armor value of the character */
    armorNums.forEach(function (input) {
        const id = input.id;
        const value = input.value;
        characterObject[id] = value;
    });

    /* Collects the true/false value of the character skill checkboxes */
    skillChecks.forEach(function (input) {
        const id = input.id;
        const value = input.checked;
        characterObject[id] = value;
    });

    /* Collects the values of the character's crit. health, wounds, insanity, corruption, exp, fate, and fatigue */
    trackerValues.forEach(function (input) {
        const id = input.id;
        const value = input.value;
        characterObject[id] = value;
    });

    return characterObject;
}

function updateCharacterStats() {
    character = createCharacterObject();
}

function saveCharacter() {
    updateCharacterStats();
    const jsonData = JSON.stringify(character, null, 4);
    const jsonBlob = new Blob([jsonData], { type: 'application/json' });

    const filename = document.getElementById("charName").value + 'CharSheet.json';
    const newLink = document.createElement("a");
    newLink.download = filename;
    newLink.href = window.URL.createObjectURL(jsonBlob);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
    newLink.click();
    document.body.removeChild(newLink);
}

/* document.getElementById('loadedFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    loadCharacter(file);
});


function loadCharacter(file) {
    console.log("checkpoint 1")
        const reader = new FileReader();
    
        reader.onload = function(event) {
            const importedJSON = JSON.parse(event.target.result);
            document.getElementById("wsScore").value = importedJSON .weaponskill;
            // You can now use weaponskill variable in your code
        };
    
        reader.readAsText(file);
        console.log("checkpoint 2")
    
    console.log("checkpoint 3")
} */



function loadCharacter() {
    var fileInput = document.getElementById("loadedFile");
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function(event) {
            var jsonData = event.target.result;
            
            try {
                const loadedFile = JSON.parse(jsonData);

                /* var testVariable = loadedFile.xpToSpend;
                document.getElementById("xpToSpend").value = testVariable; */

                /* Find way to comb through every variable on the JSON and then assign them to the variables on the html */
                /* Must iterate through and create weapon, inventory, and psyker slots */

                for (var id in loadedFile){

                    var charDetail = document.getElementById(id);
                    console.log(charDetail);
                    charDetail.value = loadedFile[id];

                    if (charDetail){
                        if (id.includes("Inv") && !id.includes("Desc")){
                            addInventorySlot();
                        }
                        else if(id.includes("PsyPower") && !id.includes("Desc")){
                            addPsykerSlot();
                        }
                        else if(id.includes("WeapName") && !id.includes("Desc")){
                            addWeaponSlot();
                        }
                        else if(id.startsWith("checkbox")){
                            charDetail.checked = loadedFile[id];
                        }
                        else{
                            charDetail.value = loadedFile[id];
                        }
                    }
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };
        reader.readAsText(file);
    } else {
        console.error("No file selected.");
    }
}
