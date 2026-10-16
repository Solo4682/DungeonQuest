import {gameState} from "../gameState.js";

export function createEnemy() {
    return {
        id : "hollow-sentinel",
        name : "Hollow Sentinel",

        health : 80,
        maxHealth : 80,

        attack : 12,
        defence : 4,

        stamina : 100,

        behaviour : "watching"
    };
}

export function playerAttack(enemy) {

    const weaponBonus = gameState.equipment.weapon.attackBonus;
    const totalAttack = gameState.stats.attack + weaponBonus;
    const damage = Math.max(1, totalAttack - enemy.defence);

    enemy.health = Math.max(0, enemy.health - damage);

    return {
        damage : damage,
        enemyHealth : enemy.health,
        defeated : enemy.health === 0
    };
}

export function enemyAttack(enemy) {

    const playerDefence = gameState.stats.defence + gameState.equipment.armour.defenceBonus;
    
    let damage = Math.max(1, enemy.attack - playerDefence);
    if (gameState.combat.isDefending) { damage = Math.ceil(damage/2);}
    
    gameState.stats.health = Math.max(0, gameState.stats.health - damage);
    gameState.combat.isDefending = false;

    return {
        damage : damage,
        playerHealth : gameState.stats.health,
        defeated : gameState.stats.health == 0
    };
}

export function defend() {
    gameState.combat.isDefending = true;

    return {
        success : true,
        message : "You brace yourself for the incoming attack."
    };
}

export function observeEnemy(enemy) {
    let message;

    if (enemy.behaviour === "watching"){
        message = `${enemy.name} watches you carefully. It may be waiting for you to make a move.`;
    }
    else {
        message = `${enemy.name} is behaving unpredictably. Watch its movement carefully.`;
    }

    return {
        success : true,
        message : message,
        enemyBehaviour : enemy.behaviour
    };
}

export function attemptFlee(enemy) {
    if (enemy.health <= 0) {
        return {
            success : false,
            message : "You cannot flee from a defeated enemy."
        };
    }
    if (enemy.behaviour == "recovering") {
        return {
            success : true,
            message : "You escape while the enemy recovers."
        };
    }
    return {
        success : false,
        message : "The enemy prevents you escape."
    };
}

