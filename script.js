var GameState = "INTRO";
const popupContent =
document.querySelector(".popup-content");

let score = 0;

let currentHole = -1;

let spawnTimer;

const holes = [

{x:370,y:160},

{x:435,y:190},

{x:503,y:220},

{x:310,y:195},

{x:378,y:225},

{x:447,y:250},

{x:255,y:228},

{x:322,y:255},

{x:388,y:282}
];

function loadState(){

    if (GameState == "INTRO"){
        loadIntro();
    }

    else if (GameState == "WHACK"){
        loadWhack();
    }

    else if (GameState == "SORRY"){
        loadSorry();
    }

    else if (GameState == "YAY"){
        loadYay();
    }

}

function loadIntro(){

    popupContent.innerHTML = `<div class="left">

                <img src="assets/amu_idle.gif" class="sprite">

            </div>

            <div class="right">

                <div class="question">
                    are u mad at nalin today?
                </div>

                <div class="buttons">

                    <button id="yesBtn">
                        <img src="assets/button_yes.png" alt="Yes">
                    </button>

                    <button id="noBtn">
                        <img src="assets/button_no.png" alt="No">
                    </button>
                </div>
`

const yes = document.getElementById("yesBtn");
const no = document.getElementById("noBtn");

yes.onclick = () => {

    GameState = "WHACK";
    loadState();

}

no.onclick = () => {

    GameState = "YAY";
    loadState();

};

}

function loadWhack(){

    popupContent.innerHTML = `

    <div class="gameArea">

        <img src="assets/whack_background.png" class="board">

        <div id="holeContainer"></div>

        <button id="nalinButton">

            <img src="assets/nalin.png" id="nalin">

        </button>

        <img src="assets/kaboom.png" id="kaboom">

    </div>

    <div class="topBar">

        <img src="assets/nalin_idle.gif" class="topNalin">

        <div class="score">
            x <span id="scoreNumber">0</span>
        </div>

    </div>

    `

    const nalinButton = document.getElementById("nalinButton");
    const kaboom = document.getElementById("kaboom");

    score = 0;

    document.getElementById("scoreNumber").textContent = score;

    spawnNalin();
    clearInterval(spawnTimer);
    spawnTimer = setInterval(spawnNalin,3000);

    nalinButton.onclick = hitNalin;

}

function loadYay(){
    popupContent.innerHTML = ` <div class="yayScreen">

    <div class="characters">

        <img src="assets/amu_idle.gif" class="yayAmu">

        <img src="assets/nalin_happy.gif" class="yayNalin">

    </div>

    <div class="textContainer">

        <div class="yayText">
            YAYYYYY!!!
        </div>

        <div class="yaySub">
            thank youuu<br>
            babyamuu<br>
            i love you<br>
            soo muchhh :)
        </div>

    </div>

</div>`
}


function hitNalin(){

    score++
    document.getElementById("scoreNumber").textContent = score;
    const nalinButton = document.getElementById("nalinButton");
    const kaboom = document.getElementById("kaboom");

    nalinButton.style.display = "none";

    kaboom.style.display = "block";

    kaboom.style.left = holes[currentHole].x + "px";

    kaboom.style.top = holes[currentHole].y + "px";
    setTimeout(()=>{

        kaboom.style.display="none";
        nalinButton.style.display = "block";
        spawnNalin();

    },250);
    clearInterval(spawnTimer);

    spawnTimer = setInterval(spawnNalin,3000);

    if(score>=10){

    clearInterval(spawnTimer);

    GameState = "SORRY";
    loadState();
    return;

}

}

function loadSorry(){

    popupContent.innerHTML = `

    <div class="sorryScreen">

        <h1>YOU WIN!</h1>

        <p>
            i'm sorry amuu :(
        </p>

        <div class="buttons">

            <button id="againBtn">
                <img src="assets/button_again.png">
            </button>

            <button id="forgiveBtn">
                <img src="assets/button_forgive.png">
            </button>

        </div>

    </div>

    `;

    document.getElementById("againBtn").onclick = function(){

        GameState = "WHACK";
        loadState();

    };

    document.getElementById("forgiveBtn").onclick = function(){

        GameState = "YAY";
        loadState();

    };

}

function spawnNalin(){

    const randomHole = Math.floor(Math.random() * 9);

    currentHole = randomHole;

    const nalinButton = document.getElementById("nalinButton");
    const kaboom = document.getElementById("kaboom");

    nalinButton.style.left = holes[randomHole].x + "px";
    nalinButton.style.top = holes[randomHole].y + "px";

    kaboom.style.left = holes[randomHole].x + "px";
    kaboom.style.top = holes[randomHole].y + "px";

}

function changeState(state){

    GameState = state
    loadState()

    }

const music = document.getElementById("bgm");

loadState();

document.body.addEventListener("click", () => {
    music.play();
}, { once:true });