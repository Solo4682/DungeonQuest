import {
    createEnemy,
    playerAttack,
    enemyAttack,
    defend,
    observeEnemy,
    attemptFlee,
    recoverStamina
} from "../systems/combat.js";
import { gameState } from "../gameState.js";
import { useHealingPotion } from "../systems/inventory.js";
import { showCheckpointScene } from "./checkpointScene.js";

export function showCombatScene(game) {
    const enemy = createEnemy() ;
    const discoveredCartClue = gameState.checkpointClues.cartWasStruck;
    const discoveredTracksClue = gameState.checkpointClues.someoneLeftTheRoad;
    const discoveredForestClue = gameState.checkpointClues.recentForestMovement;


    let combatOver = false;
    let actionInProgress = false;
    game.innerHTML = `
   
    <h1> COMBAT </h1>
    
    <section id = "enemy-panel">
        <h2> Hollow sentinel </h2>
        <p id = "enemy-health"> Enemy Health : 80/80 </p> 
        <p id = "enemy-intent"> The Sentinel watcches you carefully. </p>
    </section>
    <section id = "player-panel">
        <h2 id = "hero-name"> The Survivor </h2>
        <p id = "player-health"> Health : 100/100 </p>
        <p id = "player-stamina"> Stamina : 100/100 </p>
    </section>

    <section id = "combat-actions">
        <button id = "attack-button"> Attack </button>
        <button id = "defend-button"> Defend </button>
        <button id = "observe-button"> Observe Enemy </button>
        <button id = "flee-button"> Flee </button>
        <button id = "recover-button"> Catch Your breath (+30 Stamina) </button>
    </section>

    <div id = "combat-log">
        The Hollow Sentinel blocks your path.
    </div>
    `;

    const combatLog = document.getElementById("combat-log");

    if(discoveredCartClue) {
        combatLog.textContent = "The Sentinel stands stands before you. Its damaged armour bears marks resembling the damage you found on the abandonded cart.";
    }
    else if (discoveredtracksClue) {
        combatLog.textContent = "The Sentinel emerges from the trees, standing where the tracks dissapeared into the forest.";
    }
    else if (discoveredForestClue) {
        combatLog.textContent = "The Sentinel steps from beneath a freshly broken branch. It seems to have been waiting in the forest.";
    }

const attackButton = document.getElementById("attack-button");
const defendButton = document.getElementById("defend-button");
const observeButton = document.getElementById("observe-button");
const fleeButton = document.getElementById("flee-button");
const recoverButton = document.getElementById("recover-button");

const potionButton = document.createElement("button");
potionButton.id = "potion-button";
potionButton.textContent = "Use Healing Potion" ;
document.getElementById("combat-actions").appendChild(potionButton);

document.getElementById("hero-name").textContent = gameState.character.name || "The survivor";

function updateDisplay() {
    document.getElementById("player-health").textContent = `Health: ${gameState.stats.health}/${gameState.stats.maxHealth}`;   
    document.getElementById("player-stamina").textContent = `Stamina : ${gameState.stats.stamina}/${gameState.stats.maxStamina}`;
    document.getElementById("enemy-health").textContent = `Enemy Health : ${enemy.health}/${enemy.maxHealth}`;
}

function endCombat(message) {

    combatOver = true;

    document.getElementById("combat-log").textContent = message;

    attackButton.disabled = true;
    defendButton.disabled = true;
    observeButton.disabled = true;
    fleeButton.disabled = true;
    potionButton.disabled = true;
    recoverButton.disabled = true;

    attackButton.style.display = "none";
    defendButton.style.display = "none";
    observeButton.style.display = "none";
    fleeButton.style.display = "none";
    potionButton.style.display = "none";
    recoverButton.style.display = "none";
}

function enemyTurn() {
    if(combatOver) return;

    enemy.behaviour = "watching";

    const result = enemyAttack(enemy);

    if (result.defeated) {
        updateDisplay();
        endCombat("You collapse. The enemy has defeated you.");
        return;
    }

    enemy.behaviour = "recovering";   
    
    const enemyIntent = document.getElementById("enemy-intent");

    if(enemy.attacksMade % 3 == 2){
        enemyIntent.textContent = "WARNING : The Sentinet is preparing a heavy attack!";
    }
    else{
        enemyIntent.textContent = "The Sentinel is recovering from its attack.";
    }

    updateDisplay();
    document.getElementById("combat-log").textContent += `\n The ${enemy.name} attacks you for ${result.damage} damage. `;

    if(result.isHeavyAttack) {
        document.getElementById("combat-log").textContent  += `\n The Sentinel unleashes a powerful heavy strike!`;
    }

}
updateDisplay();

attackButton.addEventListener("click", function () {
    if(combatOver || actionInProgress) return;

    actionInProgress = true;
    attackButton.disabled = true;

    const result = playerAttack(enemy);

    if (result.success == false) {
        document.getElementById ("combat-log").textContent = result.message;
        updateDisplay() ;
        actionInProgress = false;
        attackButton.disabled = false;
        return;
    }
    updateDisplay();

    if(result.defeated){
        gameState.worldFlags.hollowSentinelDefeated = true;
        endCombat(` The ${enemy.name} has been defeated!`);

        const continueButton = document.createElement("button");
        continueButton.textContent = "Continue";

        continueButton.addEventListener("click", function () {
            showCheckpointScene(game);
        });

        document.getElementById("combat-actions").appendChild(continueButton);
        
        return;

    }

    document.getElementById("combat-log").textContent = `You deal ${result.damage} damage to the ${enemy.name}.\n`;

    enemyTurn();

    actionInProgress = false;

    if(!combatOver) {
        attackButton.disabled = false;
        defendButton.disabled = false;
        observeButton.disabled = false;
        fleeButton.disabled = false;
        recoverButton.disabled = false;
        potionButton.disabled = false;
    }
});

defendButton.addEventListener("click", function () {
    if(combatOver || actionInProgress) return;

    actionInProgress = true;

    const result = defend();

    document.getElementById("combat-log").textContent = 
        result.message;

    enemyTurn();

    actionInProgress = false;
});

observeButton.addEventListener("click", function () {
    if (combatOver || actionInProgress) return;

    actionInProgress = true;

    const result = observeEnemy(enemy);

    document.getElementById("combat-log").textContent = result.message;

    enemyTurn();

    actionInProgress = false;
});

potionButton.addEventListener("click", function (){
    if(combatOver || actionInProgress) return;
    actionInProgress = true;

    const result = useHealingPotion();

    document.getElementById("combat-log").textContent = result.message;

    if(!result.success){
        actionInProgress = false;
    return;
    }

    updateDisplay();
    enemyTurn();

    actionInProgress = false;

});

fleeButton.addEventListener("click", function () {
    if(combatOver || actionInProgress) return;

    actionInProgress = true;

    const result = attemptFlee(enemy);

    document.getElementById("combat-log").textContent = result.message;

    if(result.success) {
        endCombat (" You have succesfully escaped the encounter.\n" +"The road lies ahead.");

        const continueButton = document.createElement("button");
        continueButton.textContent = "Continue";

        continueButton.addEventListener("click", function () {
            showCheckpointScene(game);
        });

        document.getElementById("combat-actions").appendChild(continueButton);
        return;

    }

    enemyTurn();

    actionInProgress = false;
});

recoverButton.addEventListener("click", function () {
    if (combatOver || actionInProgress) return;
    actionInProgress = true;
    const result = recoverStamina();

    document.getElementById("combat-log").textContent = result.message;
    updateDisplay();

    if (result.success) {
        enemyTurn();
    }

    actionInProgress = false;
});


}