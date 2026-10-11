import { gameState } from "../gameState.js";
import { showCheckpointScene } from "./checkpointScene.js";

export function showAfterDunmereScene(game) {

    let openingText = "";

    if (gameState.decisions.explorationChoice == "bell") {

        openingText = `
        
        <p> You leave the church square with a troubling thought. </p>
        <p> 
            The bell rang thirteen times, but each time the sound came from beneath the earth.
        </p>
        <p> If something lies beneath Dunmere, you need to discover it.
        </p>

        `;
    }

    else if (gameState.decisions.explorationChoice == "guard") {

        openingText = `
        <p> You step away from the guard, remembering his warning. </p>
        <p> The Covenant records every death. Your death is recorded, too </p>
        <p> If the records say you are dead, why are you still here? </p>

        `;
    }

    else if (gameState.decisions.explorationChoice == "church") {

        openingText = `
        
        <p> You leave the church entrance behind. </p>
        <p> The hooded figure does not stop you. Somehow, that worries you more. </p>
        <p> Your approach may have attracted the Covenant's attention. </p>
        <p> Suspicion : ${gameState.worldFlags.covenantSuspicion}. </p>

        `;
    }

    else {

        openingText = `
        
        <p> You stand in the rain, uncertain where to go. </p>
        `;
    }

    game.innerHTML = `
    
    <h1> BEYOND DUNMERE </h1>
    <p class = "subtitle"> THE ROAD THAT REMEMBERS </p>
    
    ${openingText}
    
    <p> The rain begins to ease. Beyond the village, a narrow road disapears into the dark. </p>
    
    <button id = "continue-journey-button">
        Follow the road
    </button>
    
    `;

document
    .getElementById("continue-journey-button")
    .addEventListener("click", function () {

        showCheckpointScene(game);
    });

}