import { gameState } from "../gameState.js";

export function addItem(item) {
    const existingItem = gameState.inventory.find(inventoryItem=>inventoryItem.id==item.id);
    
    if(existingItem) {
        existingItem.quantity += item.quantity;
    }
    else {
        gameState.inventory.push({ ...item});
    }
}

export function removeItem(itemId,quantity = 1) {
    const item = gameState.inventory.find(inventoryItem => inventoryItem.id===itemId);

    if(!item || quantity <= 0 || item.quantity < quantity){
        return false;
    }

    item.quantity -= quantity;

    if (item.quantity == 0) {
        gameState.inventory = gameState.inventory.filter(inventoryItem=>inventoryItem.id!==itemId);
    }

return true;
}

export function useHealingPotion() {
    const potion = gameState.inventory.find(item=>item.id==="healing-potion");

    if(!potion || potion.quantity <= 0) {
        return{
            success : false,
            message : "you have no Healing Potions remaining."
        };
    }

    if(gameState.stats.health >= gameState.stats.maxHealth) {
        return{
            success : false,
            message : "Your health is already full."
        };
    }

    const healingAmount = 30;

    gameState.stats.health = Math.min(
        gameState.stats.health + healingAmount,
        gameState.stats.maxHealth
    );
    removeItem("healing-potion");

    return{
        success : true,
        message : `You recovered your health. You now have ${gameState.stats.health}/${gameState.stats.maxHealth} health.`
    };
}
