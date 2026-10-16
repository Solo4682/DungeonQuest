import { gameState } from "../gameState.js";
import {
    createEnemy,
    playerAttack,
    enemyAttack,
    defend,
    observerEnemy
} from "../systems/combat.js" ;
import { useHealingPotion } from "..system/inventory.js";

const sentinel = createEnemy();
export function showHollowSentineScene(game) {

    game.innerHTML = `
    
    <h1> THE HOLLOW SENTINEL </h1>
    <p class="subtitle"> THE ROAD THAT REMEMBERS </p>
    <p> The road narrows between two walls of ancient stone. </p>
    <p> A figure stands beneath the archway ahead. Its armour is blackened with age. </p>
    <p> There is no face beneath its helmet. Only a faint, pale light. </p>
    <p> The Sentinel raises its weapon. </p>

    <hr>
    <h2> YOUR STATUS </h2>
    <p id = "player-health"> </p>
    <p id = "player-stamina"> </p>

    <h2> YOUR ENEMY </h2>
    <p id = "enemy-health"> </p>
    <p id = "enemy-behaviour"> </p>

    <div class = "choices">

        <button id = "attack-button">
            Attack
        </button>

        <button id = "defend-button">
            Defend
        </button>

        <button id = "observe-button">
            Observe
        </button>

        <button id = "flee-button">
            Flee
        </button>

        <button id = "potion-button"
            Use Healing Potion
        </button>

    </div>

    <div id = "combat-log" aria-live = "polite">
        The Sentinel watches your every movement.
    </div>

    `;

    updateCombatDisplay();
}