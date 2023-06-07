// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);
let gameover = false;
let won = false;
let counter = 0;

let chessBoard = [
	['x','x','x','x','x','x','x','x','x'],
	['x','x','x','x','x','x','x','x','x'],
	['x','x','x','x','x','x','x','x','x'],
	['x','x','x','x','x','x','x','x','x'],
	['x','x','x','x','x','x','x','x','x'],
	['x','x','x','x','x','x','x','x','x'],
	['x','x','x','x','x','x','x','x','x'],
	['x','x','x','x','x','x','x','x','x'],
	['x','x','x','x','x','x','x','x','x'],
	];
	

// load images ========================================================
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.jpg";


// side image
var sideReady = false;
var sideImage = new Image();
sideImage.onload = function () {
    sideReady = true;
};
sideImage.src = "images/BorderLeft.jpg";


// top image
var topReady = false;
var topImage = new Image();
topImage.onload = function () {
    topReady = true;
};
topImage.src = "images/BorderTop.jpg";


// bh image
var bhReady = false;
var bhImage = new Image();
bhImage.onload = function () {
    bhReady = true;
};
bhImage.src = "images/BlackHole.png";



// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/shipSpriteSheet.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

// done with load images ========================================================


// load sound objects  ===================================================
var soundGameOver = "sounds/bonus-reached.wav"; //Game Over sound efx
var soundHitBlackHole = "sounds/explosion.wav"; //Game Over sound efx
var soundRecharge = "sounds/recharging.wav"; //Game Over sound efx


var soundEfx = document.getElementById("soundEfx");


// ====================================================

// define objects and variables we need =========================================

// Game objects
var hero = {
    speed: 100, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var monster = {
// for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};
var bh1 = {
        x: 100,
        y: 100
    };
var bh2 = {
        x: 450,
        y: 700
    };
var bh3 = {
        x: 700,
        y: 300
    };
var monstersCaught = 0;


// animation variables
//  I have 8 rows and 3 cols in my space ship sprite sheet
var rows = 8;
var cols = 3;

//second row for the right movement (counting the index from 0)
var trackRight = 2;
//third row for the left movement (counting the index from 0)
var trackLeft = 5;
var trackUp = 0;   // not using up and down in this version, see next version
var trackDown = 7;

var spriteSheetWidth = 192; // also  spriteWidth/cols; 
var spriteSheetHeight = 512;  // also spriteHeight/rows; 
var width = spriteSheetWidth / cols; 
var height = spriteSheetHeight / rows; 

var curXFrame = 0; // start on left side
var frameCount = 3;  // 3 frames per row
//x and y coordinates of the overall sprite image to get the single frame  we want
var srcX = 0;  // our image has no borders or other stuff
var srcY = 0;

//Assuming that at start the character will move right side 
var left = false;
var right = false;
var up = false;
var down = false;





// end define objects and variables we need =========================================

// keyboard control =============================================
// Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
   
    delete keysDown[e.keyCode];
}, false);

// end keyboard control =============================================






// define functions ==============================================



// Update game objects
var update = function (modifier) {

    //ctx.clearRect(hero.x, hero.y, width, height);
    left = false;
    right = false;
    up = false;
    down = false;
   
   //  adjust based on keys
    if (38 in keysDown && hero.y > 32 + 0) { //  holding up key
    hero.y -= hero.speed * modifier;
    up = true;
    }
    if (40 in keysDown && hero.y < canvas.height - (78 + 0)) { //  holding down key
        hero.y += hero.speed * modifier;
        down = true;
    }
    if (37 in keysDown && hero.x > (32 + 0)) { // holding left key
        hero.x -= hero.speed * modifier;
        left = true;
    }
    if (39 in keysDown && hero.x < canvas.width - (74 + 0)) { // holding right key
        hero.x += hero.speed * modifier;
        right = true;
    }


    if (
        hero.x <= (bh1.x + 40)
        && bh1.x <= (hero.x + 40)
        && hero.y <= (bh1.y + 40)
        && bh1.y <= (hero.y + 40)
    ) {
        soundEfx.src = soundHitBlackHole;
        soundEfx.play();
        soundEfx.addEventListener("ended", function(){
            alert("game over, you died in a black hole")
       });
        gameover = true;
        
    }
    if (
        hero.x <= (bh2.x + 40)
        && bh2.x <= (hero.x + 40)
        && hero.y <= (bh2.y + 40)
        && bh2.y <= (hero.y + 40)
    ) {
        soundEfx.src = soundHitBlackHole;
        soundEfx.play();
        soundEfx.addEventListener("ended", function(){
            alert("game over, you died in a black hole")
       });
        gameover = true;
    }
    if (
        hero.x <= (bh3.x + 40)
        && bh3.x <= (hero.x + 40)
        && hero.y <= (bh3.y + 40)
        && bh3.y <= (hero.y + 40)
    ) {
        soundEfx.src = soundHitBlackHole;
        soundEfx.play();
        soundEfx.addEventListener("ended", function(){
            alert("game over, you died in a black hole")
       });
        gameover = true;
    }



    // Are they touching?
    if (
        hero.x <= (monster.x + 90)
        && monster.x <= (hero.x + 40)
        && hero.y <= (monster.y + 85)
        && monster.y <= (hero.y + 45)
    ) {
        ++monstersCaught;       // keep track of our “score”
        soundEfx.src = soundRecharge;
        soundEfx.play();
        if(monstersCaught == 3){
            gameover = true;
            won = true;
            soundEfx.src = soundGameOver;
	        soundEfx.play();
            soundEfx.addEventListener("ended", function(){
                alert("YOU WON!")
           });
        }
        reset();       // start a new cycle
    }



    //curXFrame = ++curXFrame % frameCount; 	//Updating the sprite frame index 
    // it will count 0,1,2,0,1,2,0, etc

    if (counter == 5) {  // adjust this to change "walking speed" of animation
        curXFrame = ++curXFrame % frameCount; 	//Updating the sprite frame index 
        // it will count 0,1,2,0,1,2,0, etc
        counter = 0;
    } else {
        counter++;
    }


    srcX = curXFrame * width;   	//Calculating the x coordinate for spritesheet 
    //if left is true,  pick Y dim of the correct row
    if (left) {
        //calculate srcY 
        srcY = trackLeft * height;
    }

    //if the right is true,   pick Y dim of the correct row
    if (right) {
        //calculating y coordinate for spritesheet
        srcY = trackRight * height;
    }

    if (up) {
        //calculating y coordinate for spritesheet
        srcY = trackUp * height;
    }


    if (down) {
        //calculating y coordinate for spritesheet
        srcY = trackDown * height;
    }

    if (left == false && right == false  && up == false  && down == false) {
        srcX = 1 * width;
        srcY = 0 * height;
    }
        
};



// Draw everything in the main render function
var render = function () {
    if (bgReady) {
 
        ctx.drawImage(bgImage, 0, 0);
    }
    if (sideReady) {
        ctx.drawImage(sideImage, 968, 0);
        ctx.drawImage(sideImage, 0, 0);
    }
    if (topReady) {
        ctx.drawImage(topImage, 0, 968);
        ctx.drawImage(topImage, 0, 0);
    }
    if (bhReady) {
        ctx.drawImage(bhImage, bh1.x, bh1.y);
        ctx.drawImage(bhImage, bh2.x, bh2.y); 
        ctx.drawImage(bhImage, bh3.x, bh3.y);
    }
    bhImage

    if (heroReady) {
        //ctx.drawImage(heroImage, hero.x, hero.y);
         ctx.drawImage(heroImage, srcX, srcY, width, height, hero.x, hero.y, width, height);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Space Stations Visited: " + monstersCaught, 32, 32);

}



let placeItem = function (character)
{
	let X = 5;
	let Y = 6;
	let success = false;
	while(!success) {
		X = Math.floor( Math.random( ) * 9 ); // returns 0 thru 8
		
		Y = Math.floor( Math.random( ) * 9 );  // returns 0 thru 8
		
		if( chessBoard[X][Y] === 'x' ) {
			success = true;
		} 
	}
	chessBoard[X][Y] = 'O';  // mark thata square as taken
	character.x = (X*100) + 32; // allow for border
	character.y = (Y*100) + 32;
}



// The main game loop
var main = function () {

    if(gameover == false){
        var now = Date.now();
        var delta = now - then;
        update(delta / 1000);
        render();
        then = now;
        //  Request to do this again ASAP
        requestAnimationFrame(main);
    }
    // else {
    //     if(won == true){
    //     alert("You Won!")
    //     }
    // }
};



// Reset the game when the player catches a monster
var reset = function () {
    placeItem(hero);
    placeItem(monster);
    placeItem(bh1);
    placeItem(bh2);
    placeItem(bh3);
};


// end of define functions ==============================================




// Let's play this game!  ===============
var then = Date.now();
reset();
main();  // call the main game loop.


