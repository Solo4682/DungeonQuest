import { gameState } from "../gameState.js";
import { navigateTo } from "../router.js";

export function showCheckpointScene(game) {

    game.innerHTML = `
    
    <h1> THE ABANDONED CART </h1>
    <p class = "subtitle"> A ROAD WITH SECRETS </p>

    <p> The road narrows as the forest thickens arround you. </p>
    <p> Rainwater runs between the roots of ancient trees. </p>
    <p> Ahead, a wooden cart lies across the road. One wheel is broken, and its cargo is scattered across the mud. </p>
    <p> No driver is in sight. The surrounding forest is strangely quiet. </p>

    <p><strong> What will you do? </strong></p>
    <div class = "choices">

        <button id = "inspect-cart-button">
            Examine the cart
        </button>

        <button id = "inspect-tracks-button">
            Examine the tracks
        </button>

        <button id = "inspect-surroundings-button">
            Examine the surroundings
        </button>

    </div>

    <div id = "checkpoint-result"> </div>

    `;

const inspectCartButton = document.getElementById("inspect-cart-button");
const inspectTracksButton = document.getElementById("inspect-tracks-button");
const inspectSurroundingsButton = document.getElementById("inspect-surroundings-button");
const checkpointResult = document.getElementById("checkpoint-result");

function showContinueButton() {
    const continueButton = document.createElement("button");
    continueButton.textContent = "Continue along the road";

    continueButton.addEventListener("click", function () {
        navigateTo("combat");
    });

    checkpointResult.appendChild(continueButton);
}

function lockChoices() {
    inspectCartButton.disabled = true;
    inspectTracksButton.disabled = true;
    inspectSurroundingsButton.disabled = true;
}

inspectCartButton.addEventListener("click" ,function () {

    lockChoices();

    gameState.checkpointClues.cartWasStruck = true;
    checkpointResult.innerHTML = `
    
    <p> You examine the broken cart. One of its wooden panels has been forced inward. </p>
    <p> The cargo wasn't simply scattered by the rain. Something struck the cart from the outside. </p>

    <p><em> Clue discovered : The cart was struck. </em></p>
    `;

    showContinueButton();
});

inspectTracksButton.addEventListener("click", function () {

    lockChoices(); 

    gameState.checkpointClues.someoneLeftTheRoad = true;
    checkpointResult.innerHTML = `
    
    <p> You crouch beside the buddy road. Several sets of tracks cross one another. </p>
    <p> Most belong to boots, but a narrow trail leads away from the cart and into the trees. </p>

    <p><em> Clue discovered : Someone left the road. </em></p>
   
    `;

    showContinueButton();
});

inspectSurroundingsButton.addEventListener ("click", function () {

    lockChoices(); 

    gameState.checkpointClues.recentForestMovement = true;
    checkpointResult.innerHTML = `
    
    <p> You study the trees surrounding the cart. a low branch has been freshly broken. </p>
    <p> Beyond it, the undergrowth has been disturbed. Something may have passes through here recently. </p>
    <p><em> Clue discovered : Recent movement in the forest. </em></p>
    `;

    showContinueButton();
});
}