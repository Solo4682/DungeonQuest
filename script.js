const startButton = document.getElementById("start-button");
const game = document.getElementById("game");


startButton.addEventListener("click", function () {

    game.innerHTML = `

    <h1> DUNMERE </h1>

    <p class= "subtitle"> THE BELL THAT RANG UNDERGROUND </p>

    <p> Rain falls over the village. </p>

    <p>
        At the entrance stand  woman holding a lantern.
        She looks at you, drops it, and runs away.
    </p>

    <p> Before you can follow her, the village bell rings. </p>

    <p>
        Once.
        Twice.
        Thirteen times.
    </p>

    <p>
        The villagers close their shutters.
        A child begins cryings.
        Somewhere beneath th church, something answers the bell.
    </p>

    <p> A village guard approaches you. </p>

    <p> "You're supposed to be dead" </p>

    <p> He looks at you face again. </p>

    <p> He looks at your face again. </p> 

    <p> He slowly whispers to himself " I'm sorry. I mean... I was told you were dead". </p>

    <p> He reaches for the sword at his side. </p>

    <p> "Please don't make me find out which version of that story is true". </p>

    <div class = "choices">
        <button id = "calm-choice">
            Lower you weapon. I don't want trouble.
        </button>

        <button id = "aggressive-choice">
            Draw your blade. I will not be stopped.
        </button>
    </div>


    `;

 const calmChoice = document.getElementById("calm-choice");
 const aggressiveChoice = document.getElementById ("aggressive-choice");

calmChoice.addEventListener("click",function() {
    game.innerHTML = `
    
    </h1> DUNMERE </h1>
    
    <p class= "subtitle"> A MOMENT OF MERCY </p>

    <p> You lower your weapon and take a setp back. </p>

    <p> "I don't want trouble", you tell the guard. </p>

    <p> The guard looks at you but hesitates. His grip on the sword slowly loosens. </p>

    <p> 
    "Then tell me your name", he says. 
    "And also tell me how a dead person is standing in front of me."
    </p>

    <p><em> Your journey has begun. The truth can wait. </em></p>

    `;
}
);

aggressiveChoice.addEventListener("click", function() {
    game.innerHTML = `

    <h1> DUNMERE </h1>
    <p class = "subtitle"> A MOMENT OF DEFIANCE </p>

    <p> Your hand moves towards your blade. </p>

    <p> The guard immediately draws his sword. </p>

    <p> "Don't", he warns. His voice trembles. </p>
    
    <p> For a moment neither of you move. </p>

    <p> A sharp, shrill voice suddenly calls from the darkness behind him. </p>

    <p>"Stand down, both of you." </p>

    <p> A hooded stranger steps into the lantern light. </p>

    <p><em> Your journey has just begun. But someone is watching. </em></p>

    `;
}
);

});