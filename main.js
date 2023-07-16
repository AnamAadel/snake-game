 let inputDir = {x: 0,y: 0};
 const bite = new Audio('music/food.mp3');
 const gameover = new Audio('music/gameover.mp3');
 const move = new Audio('music/move.mp3');
 const gameArea = document.getElementById('gameArea');

 let score = 0;
let pastTime = 0;
let speed = 5;
let snakeArr = [
    {x: 14,y: 13},
]
let food = {x:15,y: 15};

 function main(cirTime){
    window.requestAnimationFrame(main);

    if((cirTime - pastTime)/1000<1/speed){
        return;
    }
    pastTime = cirTime;
    // console.log(cirTime);

    gameEngine();
 };

 function isCollide(sarr){
    
    for(var i=1;i<sarr.length; i++){
        if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y){
            return true;
        }

        
    }
    if(sarr[0].x >= 30 || sarr[0].x <= 0 || sarr[0].y >= 30 || sarr[0].y <= 0){
        return true;
    }
 }

    function gameEngine(){
        // Part 1: Updating the snake array & food

        if(isCollide(snakeArr)){
            gameover.play();
            inputDir = {x: 0,y: 0};
            alert("Game Over. Press any key to play again!");
            snakeArr = [{x: 15,y: 13}];
            score = 0;
        }

        // if you have eaten the foood incement the score and regenerate the food

        if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
            bite.play();
            snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y: snakeArr[0].y + inputDir.y});
            console.log(snakeArr);

        let a = 2;
        let b = 25;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
        }

        // moving the snake

        for(var i= snakeArr.length -2; i>=0; i--){
            snakeArr[i+1] = {...snakeArr[i]};
            // snakeArr[i+1] = s;
        }

        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;



        // Part 2: Display the snake and food

        // display the snake
        gameArea.innerHTML = "";

        snakeArr.forEach((e,index)=>{
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            if(index === 0){
                snakeElement.classList.add('head');
            }else{
                snakeElement.classList.add('body');
            }
            gameArea.appendChild(snakeElement);
        });
        
        // display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
            gameArea.appendChild(foodElement);
    }

 window.requestAnimationFrame(main);



 window.addEventListener("keydown",function(e){

    move.play();

    // console.log(e.key);

    switch(e.key){
        case "ArrowRight":

            inputDir.x = 1;
            inputDir.y = 0;
        break;
        case "ArrowLeft":

            inputDir.x = -1;
            inputDir.y = 0;
        break;
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
        break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
        break;
        default:
            break;

    }
 })


