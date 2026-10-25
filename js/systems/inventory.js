import { gameState } from "../gameState.js";

export const ITEMS = {
    healingPotion : {
        id : "healing-potion",
        name : "Healing-potion",
        description : "Restores 30 health when used.",
        type : "consumable",
        quantity : 1,
        healingAmount : 30 
    },

    sentinelHelmet : {
        id : "sentinel-helmet",
        name : "Sentinel's Helmet",
        description : "A battered helmet recovered from the Hollow Sentinel.",
        type : "armour",
        slot : "helmet",
        damageReduction : 2
    },

    sentinelChestplate : {
        id : "sentinel-chestplate",
        name : "Sentinel's Chestplate",
        description : " A heavy chestplate recovered from the Hollow sentinel.",
        type : "armour",
        slot : "chestplate",
        damageReduction : 5
    },

    sentinelSword : {
        id : "sentinel-sword",
        name : "Sentinel's Sword",
        description : "A heavy sword recovered from the Hollow sentinel. It only looks sharp, but it's edge is worn out",
        type : "weapon",
        slot : "weapon",
        damageBonus : 2
    },

    sentinelPants : {
        id : "sentinel-pants",
        name : "Sentinel's Greaves",
        description : "Heavy leg armour recovered from the Hollow Sentinel.",
        type : "armour",
        slot : "pants",
        damageReduction : 3
    },

    sentinelBoots : {
        id : "sentinel-boots",
        name : "Sentinel's Boots",
        description : "Heavy boots recovered from the Hollow Sentinel.",
        type : "armour",
        slot : "boots",
        damageReduction : 1
    },

}

export function addItem(item) {
    const quantity = item.quantity ?? 1;
    const existingItem = gameState.inventory.find(inventoryItem => inventoryItem.id == item.id);
    
    if(existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        gameState.inventory.push({ 
            ...item,
        quantity
        });
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

export function equipItem(itemId) {
    const item = gameState.inventory.find(inventoryItem => inventoryItem.id === itemId);

    if(!item){
        return{
            success : false,
            message : "You don't have that item."
        };
    }

    if(item.type !== "weapon" && item.type !== "armour") {
        return{
            success : false,
            message : "This item cannot be equipped."
        };
    }

    const slot = item.type === "weapon" ? "weapon" : item.slot;

    if(!slot || !(slot in gameState.equipment)) {
        return {
            success : false,
            message : "This item has no valid equipment slot."
        };
    }

    const previousItem = gameState.equipment[slot];

    if(previousItem?.id == item.id) {
        return {
            success : false,
            message : "That item is already equipped."
        };
    }

    if(!removeItem(itemId)) {
        return{
            success: false,
            message : "Could not remove the item from the inventory."
        };
    }

    gameState.equipment[slot] = {
        ...item,
        quantity : undefined
    };

    if(previousItem) {
        addItem (previousItem);
    }

    return {
        success : true,
        message : `You equipped ${item.name}.`
    };
}

export function unequipItem(slot) {
   
    if(!(slot in gameState.equipment)) {
        return {
            success : false,
            message : "Invalid equipment slot."
        };
    }
    const item = gameState.equipment[slot];

    if(!item) {
        return {
            success : false,
            message : "Nothing is equipped in that slot."
        };
    }

    addItem(item);

    gameState.equipment[slot] = null;
       
    return {
        success : true,
        message : `You unequipped ${item.name}.`
    };
}

