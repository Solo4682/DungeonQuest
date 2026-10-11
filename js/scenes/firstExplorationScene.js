import { gameState } from "../gameState.js";
import { showAfterDunmereScene } from "./afterDunmereScene.js";

export function showFirstExplorationScene(game) {

    game.innerHTML = `
    
    <h1> DUNMERE </h1>
    <p class = "subtitle"> THE SILENCE AFTER THE BELL </p>

    <p> The rain continues to fall over Dunmere. </p>
    <p> You are ${gameState.character.name}. </p>
    <p> Your death has been recorded, yet you are still here. </p>
    <p> The village seems to be afraid of you. </p>
    <p> Somewhere beneath the church, something is listening. </p>
    <p> </p>
    <p><strong> (Choose your next move carefully, as from here you can only move forward) </strong></p>

    <div class = "choices">

        <button id = "investigate-button">
            Investigate the strange bell
        </button>

        <button id = "question-button">
            Question the guard
        </button>

        <button id = "church-button">
            Approach the church
        </button> 

    </div>

    <div id = "scene-result"></div>

    `;

const investigateButton = 
    document.getElementById("investigate-button");
const questionButton = 
    document.getElementById ("question-button");
const churchButton = 
    document.getElementById ("church-button");
const sceneResult = 
    document.getElementById ("scene-result");

function lockChoices() {
    investigateButton.disabled = true;
    questionButton.disabled = true;
    churchButton.disabled = true;
}

    investigateButton.addEventListener ("click", function () {

        lockChoices();
         
        gameState.decisions.explorationChoice = "bell";
        gameState.discoveries.heardUndergroundBell = true;

        sceneResult.innerHTML = `
        
        <p> 
            You listen carefully.
            Beneath the fading echoes of the bell,
            you hear something moving underground
        </p>
        <p> Whatever rang that bell was not in the tower.
        </p>
        
        <p><em> Clue discovered : The bell came from below. </em></p>

        <button id = "continue-button">
            Continue
        </button>
        `;
        document
            .getElementById("continue-button")
            .addEventListener("click",function () {
                showAfterDunmereScene(game);
            });

});

questionButton.addEventListener ( "click", function () {

    lockChoices();

    gameState.decisions.explorationChoice = "guard";
    gameState.discoveries.learnedAboutCovenantRecords = true;
    sceneResult.innerHTML = `
    
    <p> You turn towards the guard. </p>
    <p> "The Covenant keeps record of everyone who dies", he whispers </p>
    <p> "If your name is in their books, they will come looking for you." </p>
    
    <p><em> Information discouvered : The Covenant's death record </em></p>

    <button id = "continue-button">
        Continue
    </button>
    
    `;
    
    document   
        .getElementById("continue-button")
        .addEventListener("click", function() {
            showAfterDunmereScene(game);
        });
});

churchButton.addEventListener ("click", function() {

    lockChoices();

    gameState.decisions.explorationChoice = "church";
    gameState.worldFlags.covenantSuspicion += 1;

    sceneResult.innerHTML = `
    
    <p> You begin walking towards the church </p>
    <p>
        The villagers watch from behind their shutters.
        A hooded figure stands motionless near the entrance.
    </p>
    <p> You cannot tell whether they are waiting for you or watching someone else </p>
    <p><em> Somewhere, a record of your action is being written </em></p>

    <button id = "continue-button">
        Continue
    </button>
    `
    document
        .getElementById("continue-button")
        .addEventListener("click", function () {
            showAfterDunmereScene(game)
        });
});

}