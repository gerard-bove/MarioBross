window.onload = () => {
  const scenaryImage = new Image();
  scenaryImage.src = 'imagenes/Fondo_juego.png';

  const scenaryImageLogo = new Image();
  scenaryImageLogo.src = 'imagenes/Initial_logo.png';

  const marioImage = new Image();
  marioImage.src = 'imagenes/Mario.png';

  const koopaImage = new Image();
  koopaImage.src = 'imagenes/Enemies.png'

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let welcomeMessage = "Press Spacebar to start game";
  ctx.font = "25px Arial";
  ctx.fillStyle = "white";
  let flicker = true;
  let flickerCount = 0;

  class Character {  
    constructor(img, xCut, yCut, wCut, hCut, xCanvas, wCanvas, hCanvas, xSpeed, ySpeed) {
      this.img = img;
      this.xCut = xCut;
      this.yCut = yCut;
      this.wCut = wCut;
      this.hCut = hCut;
      this.xCanvas = xCanvas;
      this.yCanvas = 524 - hCanvas; 
      this.wCanvas = wCanvas;
      this.hCanvas = hCanvas;
      this.xSpeed = xSpeed;
      this.ySpeed = ySpeed
    }

    draw() {
      //ctx.drawImage(imagenSprite, x_recorte, y_recorte, w_recorte, h_recorte, x_canvas, y_canvas, w_imagen, h_imagen);
      ctx.drawImage(this.img, this.xCut, this.yCut, this.wCut, this.hCut, this.xCanvas, this.yCanvas, this.wCanvas, this.hCanvas);
    }
  }
  class Koopa extends Character{
    constructor() {
      super(koopaImage, 166, 0, 23, 30, 1100, 35, 40, 5)
    }

    moveLeft() {
      this.xCanvas -= this.xSpeed;
    }
  }

  class Mario extends Character{
    constructor() {
      super(marioImage, 500, 0, 30, 57, 500, 28, 50, 5, -6)
      this.down = false;
      this.killEnemy = false;
    }
    
    jumpAction() {
      this.yCanvas = this.yCanvas + this.ySpeed ;
      if (this.killEnemy == true) {
        this.ySpeed = -6;
        this.down = false;
        this.killEnemy = false;
      }
      if (this.yCanvas < 370 && this.down == false) {
        this.ySpeed = 7;
        this.down = true;
      }
      if (this.yCanvas > 474 && this.down == true) {
        this.yCanvas = 474;
        game.jump = false;
        this.down = false;
        this.ySpeed = -6;
      }
    }
  }

  const backgroundImage = {
    img: scenaryImage,
    x: 0,
    speed: -2,

    move: function() {
      this.x += this.speed;
      this.x %= canvas.width;
    },

    draw: function() {
      ctx.drawImage(this.img, this.x, 0);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.x + canvas.width, 0);
      } else {
        ctx.drawImage(this.img, this.x - this.img.width, 0);
      }
    }
  }

  class Game {
    constructor(){
      this.enemiesArmy = [];
      this.gameStarted = false;
      this.jump = false;
      this.jumpCount = 0;
      this.enemiesCount = 0;
      this.identificator;
      this.enemyIndex;
      
    }

    newEnemy() {
      this.enemiesArmy.push(new Koopa());
      this.enemiesCount = 0;
    }

    drawAll() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); //borrar todo
      backgroundImage.draw(); 
      mario.draw();
    }

    gameOver() {
      clearInterval(this.identificator);
      ctx.clearRect(0, 0, canvas.width, canvas.height); //borrar todas las imagenes
      this.gameStarted = false;   //resetear todas las variables
      this.enemiesArmy.splice(0, this.enemiesArmy.length);
      this.jump = false;
      this.jumpCount = 0;
      this.enemiesCount = 0;
      mario.yCanvas = 524 - mario.hCanvas; 
    }

    update() {
      backgroundImage.move();

      if (this.jump) {   //Jump activado por la tecla flecha hacia arriba
        mario.jumpAction();
      }

      this.enemiesCount ++;
      if (this.enemiesCount == 70) {
        this.newEnemy();
      }
      if (this.enemiesArmy.length > 5) this.enemiesArmy.shift();   //eliminar los enemigos que ya han pasado por el escenario

      this.drawAll();
      
      this.enemiesArmy.forEach((enemy, indice) => {
        enemy.moveLeft()  //desplazar la posición de todos los enemigos hacia la izquierda
        enemy.draw();   //pintar toda la array de enemigos
        if ( mario.xCanvas + mario.wCanvas > enemy.xCanvas && mario.xCanvas < enemy.xCanvas + enemy.wCanvas ) {
          if ( mario.yCanvas + mario.hCanvas > enemy.yCanvas + 8) this.gameOver();
        }
        if ( mario.xCanvas + mario.wCanvas > enemy.xCanvas + 3 && mario.xCanvas + 3 < enemy.xCanvas + enemy.wCanvas ) {
          if ( mario.yCanvas + mario.hCanvas > enemy.yCanvas -10 && mario.killEnemy == false ) {
            mario.killEnemy = true;
            this.enemiesArmy.splice(indice, 1);
          }
        }
      });
    }

    startGame() {
      this.gameStarted = true;
      this.identificator = setInterval(()=> {
        this.update();
      }, 35)
    }
  }

  let mario = new Mario();
  /* class ScoreEngine {
  
    constructor() {
      this.score = 0;
    }
  
    updateScore() {
      this.score += points;
    }
  
    resetScore() {
      this.score = 0;
    }
  } */

  
////////Initial images///////////
// let imagenFondo = 
scenaryImage.onload = () => {

  if (!Game.gameStarted) ctx.drawImage(scenaryImage, 0, 0, canvas.width, canvas.height);
    }
    scenaryImageLogo.onload = () => {
    if (!Game.gameStarted) {
      ctx.drawImage(scenaryImageLogo, canvas.width/2 - 125, canvas.height/2 - 100, 250, 100);
      function flickerWelcomeMessage() {
          if (flickerCount < 10) ctx.fillText(welcomeMessage, 370, 350);
          if (flickerCount > 10) ctx.clearRect(100,100,100,100)
          flickerCount ++;
          if (flickerCount >= 20) {
            flickerCount = 0;
          }
        }
        flickerWelcomeMessage();
        }
  }


  ////////Start game///////////

  let game = new Game;

  ///////Manejo teclado//////////
  document.getElementsByTagName("body")[0].addEventListener("keydown", (event)=>{
    event.preventDefault();
    switch(event.key){
      case "ArrowUp":
        if (!game.jump)
        game.jump = true;
        break;
      case ' ':
        if (!game.gameStarted) {
          game.startGame(); //la tecla "espacio" inicia el juego;
        }
        break;
      case "ArrowLeft":
        mario.xCanvas -= 5;
      break;
      case "ArrowRight":
        mario.xCanvas += 5;
    }
  })  
}

