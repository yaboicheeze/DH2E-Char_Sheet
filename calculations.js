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
        '<td><button onclick="openDescBox(\'descInv' + count + '\')">Open Description</button></td>' +
        '<div id="descInv' + count + '" class="descBox">' +
        '<h1>Item ' + count + '</h1>' +
        '<div class="descContent">' +
        '<textarea id="' + count + 'InvDesc"></textarea>' +
        '<button onclick="closeDescBox(\'descInv' + count + '\')">Close</button>' +
        '</div>' +
        '</div>' +
        
        '<td><input type="number" id="' + count +'Weigh" value="0" onchange="currentCarryWeight()"></td>';;
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
        '<td><button onclick="openDescBox(\'descPsyker' + count + '\')">Open Description</button></td>' +
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
        '<td><textarea type="number" id="' + count + 'Inv"></textarea></td>' +

        '<td><button onclick="openDescBox(\'descWeap1' + count + '\')">Open Description</button></td>' +
        '<div id="descWeap1' + count + '" class="descBox">' +
        '<h1>Weapon ' + count + '</h1>' +
        '<div class="descContent">' +
        '<textarea id="' + count + 'WeapDesc"></textarea>' +
        '<button onclick="closeDescBox(\'descWeap1' + count + '\')">Close</button>' +
        '</div>' +
        '</div>' +

        '<td><input type="number" id="' + count +'WeapWeigh" value="0" onchange="currentCarryWeight()"></td>';
}



function removeWeaponSlot() {
    var table = document.getElementById("weaponTable");
    if (table.rows.length > 2) {
        table.deleteRow(table.rows.length - 1);
    }
}

/* Open and Close Description Boxes */

function openDescBox(descBoxID) {
    document.getElementById(descBoxID).style.display = "block";
}

function closeDescBox(descBoxID) {
    document.getElementById(descBoxID).style.display = "none";
}