import {
    createEnemy,
    playerAttack,
    enemyAttack,
    defend,
    observeEnemy
} from "../systems/combat.js";
import { gameState } from "../gameState.js";



export function showCombatScene(game){
    const enemy = createEnemy() ;
    let combatOver = false;
    game.innerHTML = `
    <h1> COMBAT </h1>
    
    <section id = "enemy-panel">
        <h2> Hollow sentinel </h2>
        <p id = "enemy-health"> Enemy Health : 80/80 </p> 
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

        <div id = "combat-log">
            The Hollow Sentinel blocks your path.
        </div>
    `;
const attackButton = document.getElementById("attack-button");

attackButton.addEventListener("click", function() {
    
    if (combatOver) return;
    
    const result = playerAttack(enemy);

    if (result.defeated) {
        combatOver = true;

        document.getElementById("enemy-health").textContent = `
            Enemy Health : 0 / ${enemy.maxHealth}`;
        document.getElementById("combat-log").textContent = 
            "The Hollow Sentinel collapses. You have won the battle!";

        return;
    }
    document.getElementById("enemy-health").textContent = `
        Enemy Health : ${enemy.health}/${enemy.maxHealth}`;
    document.getElementById("combat-log").textContent = `
        You attack the Hollow Sentinel and deal ${result.damage} damage!`;


    const enemyResult = enemyAttack(enemy);
    if (enemyResult.defeated) {

    combatOver = true;

    document.getElementById("player-health").textContent = `
        Health : 0 / ${gameState.stats.maxHealth}`;
    document.getElementById("combat-log").textContent = 
        "You collapse. The Hollow Sentiel has defeated you."

    return;
    }
    
    document.getElementById("player-health").textContent = `
        Health ${enemyResult.playerHealth} / ${gameState.stats.maxHealth}`;
    document.getElementById("combat-log").textContent += `
        The Hollow Sentinel attacks you for ${enemyResult.damage} damage!`;
    });
}