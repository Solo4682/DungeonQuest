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

    let monumentEnding;

    if (gameState.decisions.drewWeapon){
        monumentEnding = "Yet someone had recently scratched a symbol into the stone beneath the inscription: the same mark worn by the hooded stranger who appeared in the village. <br><br> Whatever happened here, someone does not want it remembered.";
    }
    else {
        monumentEnding = "Yet someone had recently scratched a symbol into the stone beneath the inscription: a circle split by a single vertical line.<br><br> You have no way of knowing who placed it there, but its deliberate placement suggests that someone wante it to be found-or feared it would be forgotten." ;
    }

    game.innerHTML = `
    
    <h1> BEYOND DUNMERE </h1>
    <p class = "subtitle"> THE ROAD THAT REMEMBERS </p>
    
    ${openingText}
    
    <p> The rain begins to ease. Beyond the village, a narrow road disapears into the dark. </p>
    <p> As you leave Dunmere behind, something catches your eye beside the road </p>
    <p> A weatheres stone monument stands half-burried in the mud.</p>
    <p> Its surface is cracked, moss covers most of its inscriptions. </p>
    <p> Someone had carved a bell into the stone. Beneath it are thirteen short vertical marks. </p>
    <p> You wipe away some of the mud and uncover a line of writing: \n </p>
    
    <blockquote> "Let the names remain buried. Let the bells remain silent. Let no living soul remember the Thirtenth Dawn." </blockquote>

    <p> The inscription is old. Older than Dunmere, perhaps. </p>
    <p> ${monumentEnding} </p>

    <div id = "monument-result"> </div>
    <div class = "choices">
        <button id = "examine-monument-button"> Examine the inscription </button>
        <button id = "leave-monument-button"> Leave the monument </button>
    </div>
    
    `;

    const examineButton = document.getElementById("examine-monument-button");
    const leaveButton = document.getElementById("leave-monument-button");
    const monumentResult = document.getElementById("monument-result");

    function continueJourney() {
        const continueButton = document.createElement("button");
        continueButton.textContent = "Follow the road";

        continueButton.addEventListener("click", function () {
            gameState.worldFlags.discoveredThirteenthDawn = gameState.discoveries.discoveredThirteenthDawn;

            showCheckpointScene(game);
        });

        monumentResult.appendChild(continueButton);

    }


examineButton.addEventListener("click", function () {
    gameState.discoveries.discoveredThirteenthDawn = true;

    monumentResult.innerHTML = `
    <p> You study the inscription carefully. </p>
    <p> The Thirteenth Dawn was important enough for someone to erase it from history. </p>
    <p><em> Discovery recorded : The Thirteenth Dawn. </em></p>
    
    `;

    examineButton.remove();
    leaveButton.remove();

    continueJourney();
});

leaveButton.addEventListener("click", function () {
    gameState.discoveries.discoveredThirteenthDawn = false;

    monumentResult.innerHTML = `
    
    <p> You leave the monument behind. Its inscription remains unexplained. </p>
    `;

    examineButton.remove();
    leaveButton.remove();

    continueJourney();
    
});

}