import { gameState } from "../gameState.js";

export function showKingdomRoadScene(game) {

    game.innerHTML = `
    <h1> THE DIVIDING ROAD </h1>
    <p class = "subtitle"> TWO PATHS. TWO KINDS OF TRUTHS. </p>
    <div class = "story-text">
        <p> The milestone stands behind you. Ahead, the road divides beneath the dark canopy of the forest. </p>
        <p> To the east, a trail descends towards a distant settlement. A faint column of smoke raises beyond its rooftops. </p>
        <p> to the west, an older path dissapears between the trees. Strange markings cover the stone along its edge. </p>
        
        ${
            gameState.discoveries.discoveredThirteenthDawn
                ? `<p> The words on the monument return to your mind: <em> The Thirteenth Dawn. </em> those markings might belong to the same forgotten history. </p>`
                : `<p> You have no evidence connecting either path to the monument. You must choose where to begin. </p>`
        }
        <p> Neither path looks safe. You must decide what matters more : finding people who might know the truth, or investigating something others have abandoned. </p>
        </div>
        
        <div class = "choices">
            <button id = "settlement-path"> Follow the trail to the settlement </button>
            <button id = "forest-path"> Investigate the old forest path </button>
        </div>
        
        <div id = "road-result"> </div>
        
        `;
    
    document.getElementById("forest-path").addEventListener("click", function () {
        gameState.decisions.kingdomRoadScene = "forest";
        
        document.getElementById("road-result").innerHTML = `
            <p> You step onto the old forest path. the markings on the stones grow more frequent as you travel deeper between the trees. </p>
            <p> One symbol catches your eye : a circle split by a single vertical line. </p>
            
            ${ 
                gameState.discoveries.discoveredThirteenthDawn  
                    ? `<p> you recognise the symbol from the monument. This path may lead to something connected with the forgotten Thirteenth Dawn. </p>`
                    : `</p> the symbol means nothing to you yet, but its deliberate placement suggests that someone marked this route for some specific reason. </p>`
            }
            
            <p><em> You have choosen to follow the traces of the forgotten past. </em></p>
            
            `;
        
        document.querySelector(".choices").remove();
    });
}