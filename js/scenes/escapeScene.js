import { showKingdomRoadScene } from "./kingdomRoadScene.js";
import { navigateTo } from "../router.js";

export function showEscapeScene(game) {
    game.innerHTML = `
    <h1> THE ROAD BEYOND </h1>
    
    <div class = "story-text">
        <p> You retreat through the trees as the hollow Sentinel's footsteps fade behind you. </p>
        <p> You have escaped, but the encounter has left you with more questions than answers. </p>
        <p> The road stretches into the darkness beyond Dunmere. Somewhere ahead lies the truth behind the bell, the Covenant, and the things buried beneath the earth. </p>
        
        <p><em> Your journey continues... </em></p>
    </div>
    
    <section id = "escape-status"></section>
    <button id = "continue-journey"> Continue Journey </button>
    
    `;

    document.getElementById("continue-journey").addEventListener("click", function (){
        game.innerHTML = `
        <h1> BEYOND DUNMERE </h1>
        
        <div class = "story-text">
            <p> The road winds into the darkness, far beyond the village. </p>
            <p> Behind you lies Dunmere, its unanswered questions burried beneath the rain-soaked surface. </p>
            <p> A weatherd milestone stands beside the road.Three words have been carved into its surface : </p>
            <p><strong> THE KINGDOM REMEMBERS. </strong></p>
            <p> You have no idea what they mean. Not yet. </p>
            <p><em> Your journey continues... </em></p>
        </div>
        
        <button id = "continue-beyond-dunmere"> Continue along the Kingdom Road </button>
        `;
        document.getElementById("continue-beyond-dunmere").addEventListener("click", function () {
            showKingdomRoadScene(game);
        });
    });
}