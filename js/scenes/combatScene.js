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
    game.innerHTML = `
    <h1> COMBAT </h1>
    
    <section id = "enemy-panel">
        <h2> Hollow sentinel </h2>
        <p id = "enemy-health"> Enemy Health : 80/80 </p> 
    </section>
    
    <section id = "player-panel"
        <h2 id = "hero-name"> The Survivor </h2>
        <p id = "player-health"> Health : 100/100 </p>
        <p id - "player-stamina"> Stamina : 100/100 </p>
    </section>

    <section id = "combat-actions">
        <button id = "attack-button"> Attack </button>
        <button id = "defend-button"> Defend </button>
        <button id = "observe-button"> Observe Enemy </button>
        <button in = "flee-button"> Flee </button>

        <div id = "combat-log">
            The Hollow Sentinel blocks your path.
        </div>
    `;
}