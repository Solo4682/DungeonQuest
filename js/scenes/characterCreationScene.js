import {gameState } from "../gameState.js";
import { showFirstExplorationScene } from "./firstExplorationScene.js";

export function showCharacterCreationScene(game) {

    game.innerHTML = `

    <h1> WHO REMAINS </h1>
    <p class= "subtitle"> THE NAME BENEATH THE GRAVE </p>

    <p> The guard's questions linger in your mind. </p>
    <p> Your death was recorded. Your grave was sealed. </p>
    <p> Yet here you stand, beneath a sky that remembers nothing. </p>
    <p> </p>
    <p> Before the world decides who you are, 
        there is one question you must answer.
    </p>

    <label for = "character-name"> What is your name? </label>
    
    <br><br>

    <input 
        type = "text"
        id = "character-name"
        placeholder = "Enter your name..."
        maxlength = "24"
    >
    
    <br><br>
    
    <button id = "continue-button">
        Continue
    </button>

    <p id= "name-error" role="alert"> </p>

    `;

const nameInput = document.getElementById("character-name");
const continueButton = document.getElementById("continue-button");
const nameError = document.getElementById("name-error");

continueButton.addEventListener("click", function () {

    const characterName = nameInput.value.trim();

    if (characterName.length == 0) {
        nameError.textContent = "Even the dead must have a name.";
        return;
    }

    gameState.character.name = characterName;

    game.innerHTML = `

    <h1>${escapeHTML(characterName)}</h1>
    <p class = "subtitle"> A NAME REMEMBERED </p>

    <p> The name leaves your lips. </p>
    <p> For a moment, you almost recognise it. </p>
    <p> Somewhere beneath Dunmere, a bell begins to ring. </p>
    <p> </p>
    <p><em> Your past remains buried. For now. </em></p>
    <br>
    <button id = "begin-exploration-button">
        Continue into Dunmere
    </button>

    `;

document.getElementById("begin-exploration-button")
    .addEventListener("click", function () {
        showFirstExplorationScene(game)
    });
});

}

function escapeHTML(text) {
    return text.replace(/[&<>"`]/g, function (character) {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "`": "&#96;"
        };

        return replacements[character];
    });
}
