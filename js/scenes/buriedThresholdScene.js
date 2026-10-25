import { gameState } from "../gameState.js";

export function showBuriedThresholdScene(game) {
    game.innerHTML = `
    <h1> THE BURIED THRESHOLD </h1>
    <p class = "subtitle"> WHAT WAS BURIED WAS NEVER FORGOTTEN </p>
    <div class = "story-text">
        <p> The Hollow Sentinel lies motionless behind you. Its damaged armour is scattered across the forest floor. </p>
        <p> Beyond where it stood, you discover a flight of some steps descending beneath the earth. </p>
        <p> The entrance was concealed beneath roots and fallen branches. The Sentinel wasn't guarding a road. </p>
        <p> It was guarding this place. </p>
        <p> A circle split by a vertical line has been carved into the stone above the entrance. </p>
        
        ${
            gameState.discoveries.discoveredThirteenthDawn
                ? `<p> You recognise the symbol from the monument. The Thirteenth Dawn was connected to something beneath the forest. </p>`
                : `<p> You recognise the symbol from the marked stones, but its meaning remains unknown. </p>`
        }
        
        <p> Cold air rises from the darkness below. Somewhere in the depths, metal scrapes against stone. </p>
        <p><em> The Sentinel is dead. Whatever lies beneath it may not be. </em></p>
        <p> What will you do ? </p>
        </div>
        
        <div class = "choices">
            <button id = "examine-entrance"> Examine the entrance </button>
            <button id = "descend-steps"> Descend into the darkness </button>
        </div>
        
        <div id = "threshold-result"></div>
    
    `;

    const choices = document.querySelector(".choices");
    const result = document.getElementById("threshold-result");

    document.getElementById("examine-entrance").addEventListener("click", function () {
        gameState.decisions.buriedThresholdChoice = "examine";

        gameState.discoveries.buriedEntranceExamined = true;
        result.innerHTML = `
            <div class = "story-text">
                <p> You examine the stonework surrounding the entrance. </p>
                <p> The symbol has been carved over an older inscription. Most of the writing has been deliberately destroyed. </p>
                <p> Three words remain legible : <strong> RECORD. REMEMBER. RETURN. </strong></p>
                <p> Fresh scratches mark the edge of the stone steps. Someone-or-something has passed through here recently. </p>
                <p> You have learned something about this place, but examing the entrance has cost you time. </p>
                <p><em> You step away from the entrance, corrying the words with you. </em></p>
            </div>
            
            `;

            choices.remove();
    });

    document.getElementById("descend-steps").addEventListener("click", function () {
        gameState.decisions.buriedThresholdChoice = "descend";
        gameState.worldFlags.enteredBuriedStructure = true;

        result.innerHTML = `
            <div class = "story-text">
                <p> You descend without investigating the inscription. </p>
                <p> The steps are older than the forest above them. The air grows colder with every step. </p>
                <p> Behind you, the entrance gradually dissapears into the darkness. </p>
                <p> A narrow passage open ahead. Something metallic drags across the stone, then falls silent. </p>
                <p><em> You have entered a place the world tried to bury. </em></p>
            </div>
            
        `;

        choices.remove ();
    });
}