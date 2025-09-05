score=0;
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
    if (dinoX > 0) {   // keep inside left boundary
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

    
    let dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    let dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
    let ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    let oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
   
    let offsetX=Math.abs(dx-ox);
    let offsetY=Math.abs(dy-oy);

   
    if(offsetX<73 && offsetY<200)
    {
        gameOver.innerHTML = "Skill Issue - Reload to start over";
        obstacle.classList.remove('obstacleAni');
        gameRunning = false;
        gameActive=false;
        score = 0;
        updateScore(score);
        document.querySelector('.gameContainer').classList.add('paused');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);

    }
    else if (offsetX < 100 && cross) {
        score += 1;
        updateScore(score);
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





function updateScore(score) {
    scoreCont.innerHTML = "Your Score:"+score
}

function restartGame() {
    score = 0;
    cross = true;
    gameOver.innerHTML = "";
    let obstacle = document.querySelector('.obstacle');
    obstacle.classList.add('obstacleAni'); 
    
   
    obstacle.style.left = (Math.random() * 70 + 20) + "vw";
    document.querySelector('.gameContainer').classList.remove('paused');
    audio.play();
    gameRunning = true;

}