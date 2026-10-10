import { gameState } from "../gameState.js";

export function showFirstExplorationScene(game) {

    game.innerHTML = `
    
    <h1> DUNMERE </h1>
    <p class = "subtitle"> THE SILENCE AFTER THE BELL </p>

    <p> The rain continues to fall over Dunmere. </p>
    <p> You are ${gameState.character.name}. </p>
    <p> Your death has been recorded, yet you are still here. </p>
    <p> The village seems to be afraid of you. </p>
    <p> Somewhere beneath the church, something is listening. </p>

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

    investigateButton.addEventListener ("click", function () {

        sceneResult.innerHTML = `
        
        <p> 
            You listen carefully.
            Beneath the fading echoes othe bell,
            you hear something movinf underground
        </p>
        <p> Whatever rang that bell was not in the tower.
        </p>
        
        <p><em> Clue discovered : The bell came from the below. </em></p>

        `;

});

questionButton.addEventListener ( "click", function () {

    sceneResult.innerHTML = `
    
    <p> You turn towards the guard. </p>
    <p> "The covenant keeps record of everyone who dies", he whispers <p/>
    <p> "If your name is in their books, they will come looking for you." </p>
    
    <p><em> Information discouvered : The Covenant's Government's record </em></p?
    
    `;
});

churchButton.addEventListener ("click", function() {

    gameState.worldFlags.convenantSuspicion += 1;

    screenResult.innerHTML = `
    
    <p> You begin walking towards the church </p>
    <p>
        The villagers watch from frhind their shutters.
        A hooded figur stands motionless near the entrance.
    </p>
    <p> You cannot tell hether they are writing for you or scooter is goin b

    <p><em> Somewhere, a record of your action is being written </em></p>

    `;
});

}