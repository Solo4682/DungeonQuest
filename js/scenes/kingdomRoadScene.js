import { gameState } from "../gameState.js";
import { showBuriedThresholdScene } from "./buriedThresholdScene.js";

export function showKingdomRoadScene(game) {

    let roadActionInProgress = false;

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

      const roadButtons = [
        document.getElementById("settlement-path"),
        document.getElementById("forest-path")
    ];
    
    document.getElementById("settlement-path").addEventListener("click", function () {
        
        if(roadActionInProgress) return;
        roadActionInProgress = true;

        gameState.decisions.kingdomRoadChoice = "settlement";

        document.getElementById("road-result").innerHTML = `
            <div class = "story-text">
                <p> You descend towards the settlement. Smoke rises from its chimneys, but no lights burn in the window facing the road. </p>
                <p> A wooden sign hangs beside the entrance. Someone has scratched the name away. </p>
                <p> As you approach, a voice speaks from behind the gate. </p>
                <p><strong> "State your name. The dead aren't permitted inside." </strong></p>
                <p> The guard behind the gate has somehow heard of you-or someone who looks like you.</p>
                <p><em> You have choosen to seek answers among the living. </em></p>
            </div>
        `;

        document.querySelector(".choices").remove();

        const continueButton = document.createElement("button");
        continueButton.textContent = "Approach the gate";

        continueButton.addEventListener("click", function () {
            
            let settlementActionInProgress = false;

            game.innerHTML = `
                <h1> THE NAMELESS SETTLEMENT </h1>
                <p class = "subtitle"> NO PLACE FOR THE DEAD </p>
                
                <div class = "story-text">
                    <p> The gate open just wide enough for you to see the guard. His hand rests on a crossbow. </p>
                    
                    ${
                        gameState.discoveries.discoveredThirteenthDawn
                            ? `<p> you mention the Thirteenth Dawn. the guard's expression changes immediately. </p>
                                <p> "Where did you hear that name ?" he demands. "Nobody is supposed to remember it." </p>
                                <p> You have found someone who recognises the name-but whether he fears it or know its truth remain unclear. </p>`

                            : `<p>The guard studies you in silence. </p>
                                <p> "If you're looking for answers, start by telling me why the Covenant believes you're dead." </p>
                                <p> You have a chance to question him, but you still lack a clear lead. </p>`
                    }
                    
                </div>

                <div class = "choices">
                    <button id = "question-guard"> Question the guard </button>
                    <button id = "inspect-gate"> Inspect the gate </button>
                </div>

                <div id = "settlement-result"> </div>
                
                `; 

            document.getElementById("question-guard").addEventListener("click", function () {

                if(settlementActionInProgress) return;
                settlementActionInProgress = true;
               
                gameState.decisions.settlementChoice = "question-guard";

                document.getElementById("settlement-result").innerHTML = `
                    <div class = "story-text">
                        <p> "You waant answers ?" The guard keeps his crossbow raised. </p>
                        <p> "Then answer one question first. Where were you when the thirteenth bell rang ?" </p>
                        <p> You realise the guard isn't merely keeping strangers out. He's looking for someone. </p>
                        <p><em> Something about your arrival has frightened the settlement. </em></p>
                    </div>
                `;
                document.querySelector(".choices").remove();

                const continueButton = document.createElementNS("button");
                continueButton.textContent = "Leave the settlement gate";

                continueButton.addEventListener ("click", function () {
                    showKingdomRoadScene(game);
                });

                document.getElementById("settlement-result").appendChild(continueButton);
            });

            document.getElementById("inspect-gate").addEventListener("click", function () {

                if(settlementActionInProgress) return;
                settlementActionInProgress = true;
                
                gameState.decisions.settlementChoice = "inspect-gate";
                gameState.discoveries.settlementGateSymbolFound = true;

                document.getElementById("settlement-result").innerHTML = `
                    <div class = "story-text">
                        <p> You examine the gate while the guard watches you carefully. </p>
                        <p> Among the scratches in the wod you notice a symbol : a circle split by a vertical line. </p>
                        
                        ${
                            gameState.discoveries.discoveredThirteenthDawn
                                ? `<p> you recognise it as the symbol connected to the Thirteenth Dawn. </p>`
                                : `<p> You don't know what the symbol means, but someone has deliberately carved it into the gate. </p>`
                        }
                    </div>
                `;

                document.querySelector(".choices").remove();

                const continueButton = document.createElement("button");
                continueButton.textContent = "Leave the settlement gate";

                continueButton.addEventListener("click", function () {
                    showKingdomRoadScene(game);
                });

                document.getElementById("settlemenet-result").appensChild(continueButton)
            });
        }); 

        document.getElementById("road-result").appendChild(continueButton);
    })
    
    document.getElementById("forest-path").addEventListener("click", function () {
        
        if(roadActionInProgress) return;
        roadActionInProgress = true;
        
        gameState.decisions.kingdomRoadChoice = "forest";

        document.querySelector(".choices").remove();
        
        document.getElementById("road-result").innerHTML = `
      
            <p> You step onto the old forest path. the markings on the stones grow more frequent as you travel deeper between the trees. </p>
            <p> One symbol catches your eye : a circle split by a single vertical line. </p>
            
            ${ 
                gameState.discoveries.discoveredThirteenthDawn  
                    ? `<p> You recognise the symbol from the monument. This path may lead to something connected with the forgotten Thirteenth Dawn. </p>`
                    : `<p> The symbol means nothing to you yet, but its deliberate placement suggests that someone marked this route for some specific reason. </p>`
            }
            
            <p><em> You have choosen to follow the traces of the forgotten past. </em></p>
            
            <div class = "choices">
                <button id = "inspect-symbol"> Examine the symbol </button>
                <button id = "follow-trail"> Follow the trail deeper </button>
            </div>

            <div id = "forest-result"> </div>
            `;
            
            const forestChoices = document.querySelector("#road-result .choices");

            let forestActionInProgress = false;
        
        document.getElementById("inspect-symbol").addEventListener("click", function () {

            if(forestActionInProgress) return;
            forestActionInProgress = true;

            gameState.discoveries.forestSymbolExamined = true;

            document.getElementById("forest-result").innerHTML = `
                <div class = "story-text">
                    <p> You kneel beside the marked stone and brush away the dirt. </p>
                    <p> the circle is not a drawing. It is a seal, carved deep enough to survive years of rain. </p>
                    
                    ${
                        gameState.discoveries.discoveredThirteenthDawn
                            ? `<p> The shape matches the symbol you found near the monument. The connection is no coincidence. </p>
                                <p> whatever the Thirteenth Dawn was, someone went to great lengths to erase its traces. </p>`
                            : `<p> You cannot identify the symbol, but you notice a narrow grove running from its centre towards the north. </p>
                                <p> You have found a clue, but not yet its meaning. </p>`
                    }
                </div>
            `;

            forestChoices.remove();
        });

        document.getElementById("follow-trail").addEventListener("click", function () {

            if(forestActionInProgress) return;
            forestActionInProgress = true;
            
            gameState.decisions.forestTrailChoice = "deeper";
            gameState.discoveries.foundHiddenArchway = true;


            document.getElementById("forest-result").innerHTML = `
                <div class = "story-text">
                    <p> You follow the markings deeper into the firest. </p>
                    <p> the trees grow so close together that the road behind you dissapears from sight. </p>
                    <p> Ahead, you discover a stone archway half-buried beneath roots. </p>
                    <p> Beyond it, something metallic glints in the darkness. </p>
                    <p><em> you have found a place that does not appear on any map. </em></p>
                </div>
            `;

            forestChoices.remove();

            const continueButton = document.createElement("button");
            continueButton.textContent = "Approach the archway";
            continueButton.addEventListener("click", function () {
                if (gameState.worldFlags.hollowSentinelDefeated) {
                    showBuriedThresholdScene(game);
                }
                else {
                    document.getElementById("forest-result").innerHTML += `
                        <div class = "story-test">
                            <p> A metallic scrape echoes from somewhere behind the trees. </p>
                            <p> The Sentinel is still alive. Whatever lies beyond the archway, it has not abandoned its watch. </p>
                        </div>
                    `;
                }
            });

            document.getElementById("forest-result").appendChild(continueButton);
        });
    });
}