import { showDunmereScene } from "./scenes/dunmereScene.js";
import { gameState} from "./gameState.js";

const game = document.getElementById ("game");
const startButton = document.getElementById ("start-button");

startButton.addEventListener ("click", function () {
    showDunmereScene(game);

});


