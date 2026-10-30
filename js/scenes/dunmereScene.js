//Scene 1
import { gameState } from "../gameState.js";
import { navigateTo } from "../router.js";

export function showDunmereScene(game) {

    game.innerHTML = `

    <h1>DUNMERE</h1>
    <p class = "subtitle"> THE BELL THAT RANG UNDERGROUND </p>
    <p> Rain falls over the village. </p>
    <p>At the entrance stands a woman holding a lantern.\n\nShe looks at you, drops it, and runs away in fear.</p>
    <p> Before you can follow her, the village bell starts ringing. </p>
    <p>
        Once.<br>
        Twice.<br>
        ...Thirteen times.
    </p>
    <p>
        The villagers close their shutters.
        A child begins crying.
        Somewhere beneath the church, something answers the bell.
    </p>
    <p> A village guard approaches you. </p>
    <p> "You're supposed to be dead." he murmurs. </p>
    <p> He looks at your face again just to confirm if he had previously seen wrong. </p>
    <p>
        He slowly whispers to himself,
        "I'm sorry. I mean... I was told you were dead."
    </p>
    <p> He reaches for the sword at his side. </p>
    <p> "Please don't make me find out which version of the story is true." </p>
    <div class = "choices">
        <button id = "calm-choice">
            Lower your weapon. I don't want trouble.
        </button>
        <button id = "aggressive-choice">
            Draw your blade for I shall not be stopped.
        </button>
    </div>
    `;

const calmChoice = document.getElementById("calm-choice");
const aggressiveChoice = document.getElementById("aggressive-choice");

calmChoice.addEventListener ("click", function () {

    gameState.decisions.approachedGuardCalmly = true;

    game.innerHTML = `
        
        <h1> DUNMERE </h1>
        <p class = "subtitle"> A MOMENT OF MERCY </p>
        
        <p> You raise your hands into the air and take a step back .</p>
        <p> "I don't want trouble", you tell the guard. </p>
        <p> The guard looks at you but hesitates. </p>
        <p> He gives in and slowly loosens his grip on the sword. </p>
        <p> "Then tell me your name", he says. </p>
        <p> His voice trembling as if he had already dreaded the answer. </p>
        <p> "And also tell me how a dead person is standing in front of me." </p>
        <p> "Listen carefully to what I'm saying",he whispers. </p>
        <p> "If the Covenant learns you're alive, they'll take you beneath the church." </p>
        <p> The guards eyes moves towards the bell tower. </p>
        <p> "Nobody that has ever gone in has comeback out from there." </p>
        
        <p><em> Your journey has begun. The truth can wait. </em></p>
        <br>
        <button id = "continue-button">Continue</button>
        `;

document.getElementById("continue-button").addEventListener("click", function () {
    navigateTo("character");
})

});

aggressiveChoice.addEventListener("click", function () {

    gameState.decisions.drewWeapon = true;
    gameState.worldFlags.covenantSuspicion += 1;

    game.innerHTML = `
        
        <h1> DUNMERE </h1>
        <p class = "subtitle"> A MOMENT OF DEFIANCE </p>
        
        <p> Your hand moves towards your blade. </p>
        <p> The Guard immediately draws his sword out </p>
        <p> "Don't", he warns. His voice trembles. </p>
        <p> For a moment, neither of you move. </p>
        <p> A sharp, shrill voice suddenly erupts from the darkness behind the Guard. </p> 
        <p> "Stand down now, both of you." </p>
        <p> A hooded stranger steps into the lantern's light. </p>
        <p> "Interesting", the stranger says. </p>
        <p>"The dead usually stay buried." </p>
        <p> The stranger turns towards the guard. </p>
        <p> "I'll deal with this one." </p>
        <p><em> 
                Your journey has begun.
        </em></p>
        <p><em>
                But someone is watcing you.
        </em></p>
        <br>
        <button id = "continue-button"> Continue </button>
    `;

document.getElementById("continue-button").addEventListener("click", function () {
    navigateTo("character");
})
});
}
