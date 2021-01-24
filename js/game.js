const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const bombImg = new Image();
bombImg.src = "img/bomb.png";

const bombImg1 = new Image();
bombImg1.src = "img/bomb.png";

let box = 32;

let score = 0;

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

let bomb = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

let bomb1 = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if(event.keyCode == 37 && dir != "right")
    dir = "left";
  else if(event.keyCode == 38 && dir != "down")
    dir = "up";
  else if(event.keyCode == 39 && dir != "left")
    dir = "right";
  else if(event.keyCode == 40 && dir != "up")
    dir = "down";
}

function eatTail(head, arr) {
  for(let i = 0; i < arr.length; i++) {
    if(head.x == arr[i].x && head.y == arr[i].y)
      clearInterval(game);
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  ctx.drawImage(bombImg, bomb.x, bomb.y);

  ctx.drawImage(bombImg1, bomb1.x, bomb1.y);

  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX == food.x && snakeY == food.y) {
    if(snakeX == box || snakeX == box * 17
      || snakeY == 3 * box || snakeY == box * 17){
      score += 2;
      food.x = Math.floor((Math.random() * 17 + 1)) * box
      food.y = Math.floor((Math.random() * 15 + 3)) * box
      bomb.x = Math.floor((Math.random() * 17 + 1)) * box
      bomb.y = Math.floor((Math.random() * 15 + 3)) * box
      }else{
      score++;
      food.x = Math.floor((Math.random() * 17 + 1)) * box
      food.y = Math.floor((Math.random() * 15 + 3)) * box
      
      bomb1.x = Math.floor((Math.random() * 17 + 1)) * box
      bomb1.y = Math.floor((Math.random() * 15 + 3)) * box
      }
  } else {
    snake.pop();
  }
 
  function newfood(food, arr) {
    for(let i = 0; i < arr.length; i++) {
      if(food.x == arr[i].x && food.y == arr[i].y || food.x == bomb.x && food.y == bomb.y
        || food.x == bomb1.x && food.y == bomb1.y){
      food.x = Math.floor((Math.random() * 17 + 1)) * box
      food.y = Math.floor((Math.random() * 15 + 3)) * box
      return 0;
      }
    }
  }
  function newbomb(bomb, arr) {
    for(let i = 0; i < arr.length; i++) {
      if(bomb.x == arr[i].x && bomb.y == arr[i].y || bomb.x == bomb1.x && bomb.y == bomb1.y){
      bomb.x = Math.floor((Math.random() * 17 + 1)) * box
      bomb.y = Math.floor((Math.random() * 15 + 3)) * box
      return 0;
      }
    }
  }
  function newbomb1(bomb1, arr) {
    for(let i = 0; i < arr.length; i++) {
      if(bomb1.x == arr[i].x && bomb1.y == arr[i].y){
      food.x = Math.floor((Math.random() * 17 + 1)) * box
      food.y = Math.floor((Math.random() * 15 + 3)) * box
      return 0;
      }
    }
  }
  if(snakeX < box || snakeX > box * 17
    || snakeY < 3 * box || snakeY > box * 17)
    clearInterval(game);

  if(snakeX == bomb.x && snakeY == bomb.y)
     clearInterval(game);

  if(snakeX == bomb1.x && snakeY == bomb1.y)
     clearInterval(game);

  if(dir == "left") snakeX -= box;
  if(dir == "right") snakeX += box;
  if(dir == "up") snakeY -= box;
  if(dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  newfood(food, snake);

  newbomb(bomb, snake);

  newbomb1(bomb1, snake);

  snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);