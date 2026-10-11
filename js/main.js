import { showDunmereScene } from "./scenes/dunmereScene.js";
import { useHealingPotion } from "./system/inventory.js";
import { gameState} from "./gameState.js";

const game = document.getElementById ("game");
const startButton = document.getElementById ("start-button");

startButton.addEventListener ("click", function () {
    showDunmereScene(game);

});

//temp test code

gameState.stats.health = 60;

console.log("Before:",gameState.stats.health);

const result = useHealingPotion ();

console.log(result.message);
console.log("After:", gameState.stats.health);
console.log("Inventory:", gameState.inventory);
