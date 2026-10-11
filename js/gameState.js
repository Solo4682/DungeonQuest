// Stores information about the player along the journey//

export const gameState = {

    character : {
        name : ""
    },

    health : 100,

    decisions : {
        approachedGuardCalmly : false,
        drewWeapon : false,

        explorationChoice : ""
    },

    discoveries: {
        heardUndergroundBell : false,
        learnedAboutCovenantRecords : false
    },

    worldFlags : {
        covenantSuspicion : 0
    }
};