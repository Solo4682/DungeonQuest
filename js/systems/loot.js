import { ITEMS, addItem } from "./inventory.js";

const LOOT_TABLES = {

    "hollow-sentinel" : {
        guaranteed : [
            {
                item : "healingPotion",
                quantity : 1
            }
        ],

        equipmentDrops : [
            {
                item : "sentinelHelmet",
                chance : 40
            },
            {
                item : "sentinelChestplate",
                chance : 30
            },
            {
                item : "sentinelPants",
                chance : 35
            },
            {
                item : "sentinelBoots",
                chance : 45
            },
            {
                item : "sentinelSword",
                chance : 25
            }
        ]
    }
};

export function generateLoot(enemyId) {
    const lootTable = LOOT_TABLES[enemyId];

    if (!lootTable) {
        return {
            success : false,
            message : "No loot exists for this enemy.",
            rewards : []
        };
    }

    const rewards = [];

    for (const entry of lootTable.guaranteed) {
        const item = ITEMS[entry.item];

        if(!item) continue;

        addItem({
            ...item,
            quantity : entry.quantity
        });

        rewards.push({
            name : item.name,
            quantity : entry.quantity,
            guaranteed : true
        });
    }

    for (const entry of lootTable.equipmentDrops) {
        const roll = Math.random() * 100;

        if(roll < entry.chance) {
            const item = ITEMS[entry.item];

            if(!item) continue;
            addItem({
                ...item,
                quantity : 1
            });
            rewards.push({
                name : item.name,
                quantity : 1,
                guaranteed : false
            });
        }
    }

    return {
        success : true,
        message : "Loot generated successfully.",
        rewards
    };
}