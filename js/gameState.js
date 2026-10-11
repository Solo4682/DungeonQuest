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

        armour : {
            id : "worn-clothes",
            name : "Worn Clothes",
            defenceBonus : 0
        }
    },

    decisions : {
        approachedGuardCalmly : false,
        drewWeapon : false,
        explorationChoice : ""
    },

    discoveries: {
        heardUndergroundBell : false,
        learnedAboutCovenantRecords : false
    },

    checkpointClues : {
        cartWasStruck : false,
        someoneLeftTheRoad : false,
        recentForestMovement : false
    },

    combat : {
        isDefending : false
    },

    worldFlags : {
        covenantSuspicion : 0
    }
};