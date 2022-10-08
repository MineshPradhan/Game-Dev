let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);
const CANVAS_HEIGHT = canvas.height = 600;
const CANVAS_WIDTH = canvas.width = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

// cause our image is 6876px width so 6876/12 = 573; Here 12 is columns of our image. "width/columns = Result"
const spriteWidth = 575;

// cause our image is 5230px width so 5230/10 = 523; Here 10 is rows of our image. "height/rows = Result"
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j=0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log(animationStates);

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // gameFrame/staggerFrames = ??? position=???
    // 0/5 = 0   Math.floor(0) = 0   0%6=0
    // 1/5 = 0.2 Math.floor(0.2) = 0 0%6=0
    // 2/5 = 0.4 Math.floor(0.4) = 0 0%6=0
    // 3/5 = 0.6 Math.floor(0.6) = 0 0%6=0
    // 4/5 = 0.8 Math.floor(0.8) = 0 0%6=0
    // 5/5 = 1.0 Math.floor(1) = 1   1%6=1

    // 0%6=0
    // 1%6=1
    // 2%6=2
    // ...
    // 14%6=2
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    // if(gameFrame % staggerFrames == 0){
    //     if(frameX < 6) frameX++;
    //     else frameX = 0;
    // }
    
    gameFrame++;
    requestAnimationFrame(animate);
};
animate();