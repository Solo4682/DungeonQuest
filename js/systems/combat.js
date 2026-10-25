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
        behaviour : "watching",
        attacksMade : 0
    };
}

export function playerAttack(enemy) {
     const attackCost = 15;

    if(gameState.stats.stamina < attackCost) {
        return {
            success : false,
            message : "You are too exhausted to attack.",
            damage : 0,
            enemyHealth : enemy.health,
            defeated : false
        };
    }
    gameState.stats.stamina -= attackCost;

    const weaponBonus = gameState.equipment.weapon?.attackBonus ??
                        gameState.equipment.weapon?.damageBonus ??
                        0;

    const totalAttack = gameState.stats.attack + weaponBonus;
  
    let damage = Math.max(1, totalAttack - enemy.defence);

    if (gameState.combat.enemyObserved){
        damage += 8;
        gameState.combat.enemyObserved = false;
    }

    enemy.health = Math.max(0, enemy.health - damage);

    return {
        damage : damage,
        enemyHealth : enemy.health,
        defeated : enemy.health === 0
    };
}

export function enemyAttack(enemy) {

    const helmetDefence = gameState.equipment.helmet?.damageReduction ?? 0;
    const chestplateDefence = gameState.equipment.chestplate?.damageReduction ?? 0;
    const pantsDefence = gameState.equipment.pants?.damageReduction ?? 0;
    const bootsDefence = gameState.equipment.boots?.damageReduction ?? 0;
    const shieldDefence = gameState.equipment.shield?.damageReduction ?? 0;

    const playerDefence = gameState.stats.defence + helmetDefence + chestplateDefence + pantsDefence + bootsDefence + shieldDefence;

    enemy.attacksMade++;

    const isHeavyAttack = enemy.attacksMade % 3 == 0;
    
    let damage = enemy.attack;
    if (isHeavyAttack) {
        damage = Math.floor(damage * 1.5);
    }
    
    damage = Math.max(1, damage - playerDefence);
    if (gameState.combat.isDefending) { damage = Math.ceil(damage/2);}
    
    gameState.stats.health = Math.max(0, gameState.stats.health - damage);
    gameState.combat.isDefending = false;

    return {
        damage : damage,
        playerHealth : gameState.stats.health,
        defeated : gameState.stats.health == 0,
        isHeavyAttack : isHeavyAttack
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
    gameState.combat.enemyObserved = true;

    let message;

    if (enemy.behaviour === "watching"){
        message = `${enemy.name} watches you carefully. It may be waiting for you to make a move.`;
    }
    else if (enemy.behaviour == "recovering"){
        message = `${enemy.name} is recovering after its attack. This may be your oppurtunity to escape.`;
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

export function recoverStamina(){
    const recoveryAmount = 30;

    const previousStamina = gameState.stats.stamina;
    gameState.stats.stamina = Math.min (gameState.stats.maxStamina, gameState.stats.stamina+recoveryAmount);

    const recovered = gameState.stats.stamina - previousStamina;

    return {
        success : recovered > 0,
        recovered : recovered,
        message : recovered > 0
            ?`You catch your breath and recover ${recovered} stamina.`
            : "Your stamina is already full."
    };
}


