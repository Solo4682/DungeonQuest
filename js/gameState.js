// Stores information about the player along the journey//

export const gameState = {

    character : {
        name : "",
        level : 1,
        experience : 0,
        experienceToNextLevel : 100,
    },

    stats : {
        health : 100,
        maxHealth : 100,

        stamina : 100,
        maxStamina : 100,

        attack : 10,
        defence : 5
    },

    inventory : [{
        id: "healing-potion",
        name : "Healing Potion",
        description : "Restore 30 health.",
        quantity : 2,
        type : "consumable"
        }
    ],

    equipment : {
        weapon : {
            id : "rusty-sword",
            name : "Rusty Sword",
            attackBonus : 2
        },

        helmet : null,
        chestplate : null,
        pants : null,
        boots : null,
        shield : null,
        accessory : null,

    },

    decisions : {
        approachedGuardCalmly : false,
        drewWeapon : false,
        explorationChoice : "",
        settlementChoice : "",
        kingdomRoadChoice : "",
        foresttrailChoice : "",
        buriedThresholdChoice : ""
    },

    discoveries: {
        heardUndergroundBell : false,
        learnedAboutCovenantRecords : false,
        discoveredThirteenthDawn : false,
        forestSymbolExamined : false,
        foundHiddenArchway : false,
        settlementGateSymbolFound : false,
        buriedEntranceExamined : false,
        enteredBuriedStructure : false
    },

    checkpointClues : {
        cartWasStruck : false,
        someoneLeftTheRoad : false,
        recentForestMovement : false
    },

    combat : {
        isDefending : false,
        enemyObserved : false
    },

    worldFlags : {
        covenantSuspicion : 0,
        hollowSentinelRewardClaimed : false
    }


};