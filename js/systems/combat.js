export function createEnemy() {
    return {
        id : "hollow-sentinel",
        name : "Holloe Sentinel",

        health : 80,
        maxHealth : 80,

        attacks : 12,
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
        defeated : enemy.health == 0
    };
}