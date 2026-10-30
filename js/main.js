import { showDunmereScene } from "./scenes/dunmereScene.js";
import { navigateTo } from "./router.js";
import { showCharacterCreationScene } from "./scenes/characterCreationScene.js";
import { showFirstExplorationScene } from "./scenes/firstExplorationScene.js";
import { showAfterDunmereScene } from "./scenes/afterDunmereScene.js";
import { showCheckpointScene } from "./scenes/checkpointScene.js";
import { showCombatScene } from "./scenes/combatScene.js";
import { showBuriedThresholdScene } from "./scenes/buriedThresholdScene.js";
import { showEscapeScene } from "./scenes/escapeScene.js" ;
import { showKingdomRoadScene } from "./scenes/kingdomRoadScene.js";


const game = document.getElementById ("game");
const startButton = document.getElementById ("start-button");


function handleRoute () {
    const scene = window.location.hash.slice(2);

    if (scene == "dunmere") {
        showDunmereScene(game);
    }
    else if (scene == "character") {
        showCharacterCreationScene(game);
    }
    else if ( scene == "first-exploration") {
        showFirstExplorationScene(game)
    }
    else if ( scene == "after-dunmere") {
        showAfterDunmereScene(game);
    }
    else if ( scene == "checkpoint") {
        showCheckpointScene(game);
    }
    else if ( scene == "combat"){
        showCombatScene(game);
    }
    else if (scene == "buried-threshold") {
        showBuriedThresholdScene(game);
    }
    else if ( scene == "escape") {
        showEscapeScene(game);
    }
    else if ( scene == "kingdom-road") {
        showKingdomRoadScene(game);
    } 
}

startButton.addEventListener ("click", function () {
    navigateTo("dunmere");

});

window.addEventListener("hashchange", handleRoute);

handleRoute();

