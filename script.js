score=0;
Rose = 0;
let roseSound=new Audio("rose_sound.mp3")
let birdCollected = false; 
cross=true;
 audio = new Audio('music.mp3');
 audiogo = new Audio('gameover.mp3');
let gameActive = true; 

setTimeout(() => {
    audio.play()
}, 1000);

document.onkeydown = function(e) {
    if(!gameActive){
        return;
    }
    
    console.log("key pressed is:", e.key);
    if (e.key === "ArrowUp") {
        const dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 700);
    }

    if (e.key === "ArrowLeft") {
    const dino = document.querySelector('.dino');
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    if (dinoX > 0) { 
        dino.style.left = (dinoX - 112) + "px";
    }
}

if (e.key === "ArrowRight") {
    const dino = document.querySelector('.dino');
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let screenWidth = window.innerWidth;  
    let dinoWidth = dino.offsetWidth;    

    if (dinoX + dinoWidth < screenWidth) {  
        dino.style.left = (dinoX + 112) + "px";
    }
} 
}


let bgImgs = ["background.png","images/lhtc.png","central_mess.png"];
let currImg = 0;

function changeBg(){
    if(!gameActive||!gameRunning)return;
    currImg = (currImg+1)%bgImgs.length;
    document.querySelector(".gameContainer").style.backgroundImage = `url(${bgImgs[currImg]})`;
}


setInterval(changeBg,5000);


let gameRunning = true;


setInterval(()=>
{
   
    if (!gameRunning) return; 
    if(!gameActive)return;
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');
    let bird = document.querySelector('.bird');

    
    let dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    let dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
    let ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    let oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
    let bx=parseInt(window.getComputedStyle(bird,null).getPropertyValue('left'));
    let by=parseInt(window.getComputedStyle(bird,null).getPropertyValue('top'));
   
    let offsetX=Math.abs(dx-ox);
    let offsetY=Math.abs(dy-oy);
    let offsetYbird = Math.abs(dy-by);
    let offsetXbird = Math.abs(dx-bx);
   
    if(offsetX<73 && offsetY<200)
    {
        endGame(gameOver,obstacle);

    }   
    else if (offsetXbird < 73 && offsetYbird < 200 && !birdCollected) {
    Rose += 1;
    updateRose(Rose);
    collectRose(bird);
    roseSound.play();
    }
    else if (offsetX < 100 && cross) {
        score += 1;
        updateScore(score);
        if(score===5){
            Final(gameOver);
        }
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);
    }

    

}, 10);

function collectRose(birdElement) {
    birdElement.classList.add('hidden');
    birdCollected = true;

    if (gameActive) {
        setTimeout(() => {
            if (gameActive) {
                birdElement.classList.remove('hidden');
                birdElement.style.right = '-200px';
                birdElement.classList.add('birdAni');
                birdCollected = false;
            }
        }, 4000); 
    }
}


function endGame(gameOver, collider) {
    
    gameOver.innerHTML = "Skill Issue - Reload or Press R to restart";
    collider.classList.remove('obstacleAni');
    collider.classList.remove('birdAni');
    gameRunning = false;
    gameActive = false;
    score = 0;
    updateScore(score);
    document.querySelector('.gameContainer').classList.add('paused');
    audiogo.currentTime = 0;
    audiogo.play();
    setTimeout(() => {
        audiogo.pause();
        audio.pause();
    }, 1000);
    setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/game_over_page.html";
    }, 10);
}

function Final(gameOver) {
    setTimeout(() => {
        window.location.href = "http://127.0.0.1:5500/end_game.html";
    }, 30);
}



function updateScore(score) {
    scoreCont.innerHTML = "Your Score:"+score;
}

function updateRose(Rose) {
    RoseCont.innerHTML = "Rose:"+Rose;
}

function restartGame() {
    score = 0;
    Rose = 0;
    cross = true;
    gameOver.innerHTML = "";
    let obstacle = document.querySelector('.obstacle');
    obstacle.classList.add('obstacleAni'); 
    
   
    obstacle.style.left = (Math.random() * 70 + 20) + "vw";
    document.querySelector('.gameContainer').classList.remove('paused');
    audio.play();
    gameRunning = true;

}