window.onload = () => {
  const scenaryImage = new Image();
  scenaryImage.src = 'imagenes/Fondo_juego.png';

  const scenaryImageLogo = new Image();
  scenaryImageLogo.src = 'imagenes/Initial_logo.png';

  const marioImage = new Image();
  marioImage.src = 'imagenes/Mario.png';

  const koopaImage = new Image();
  koopaImage.src = 'imagenes/Enemies.png'

  const gameOverScreen = new Image();
  gameOverScreen.src = 'imagenes/Game_over_screen.webp'

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let welcomeMessage = "Press Spacebar to start game";
  ctx.font = "25px Arial";
  ctx.fillStyle = "white";
  let flickerCount = 0;
  let flick;

  let gameOverMessage = "Press Spacebar to restart";
  ctx.font = "25px Arial";
  ctx.fillStyle = "white";
  let flickerCount2 = 0;
  let flick2;

  let marioCount = 0;
  let koopaCount = 0;

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
      this.ySpeed = ySpeed;
    }

    draw() {
      //ctx.drawImage(imagenSprite, x_recorte, y_recorte, w_recorte, h_recorte, x_canvas, y_canvas, w_imagen, h_imagen);
      ctx.drawImage(this.img, this.xCut, this.yCut, this.wCut, this.hCut, this.xCanvas, this.yCanvas, this.wCanvas, this.hCanvas);
    }
  }
  class Koopa extends Character{
    constructor() {
      super(koopaImage, 166, 0, 23, 30, 1100, 35, 40, 5)
      this.rodando = false;
    }

    moveLeft() {
      this.xCanvas -= this.xSpeed;
      if(this.rodando) this.xCanvas -= this.xSpeed;
    }

    draw(){
      koopaCount ++;
      ctx.drawImage(this.img, this.xCut, this.yCut, this.wCut, this.hCut, this.xCanvas, this.yCanvas, this.wCanvas, this.hCanvas);
      if(this.rodando){
      if(koopaCount %8 == 0 || koopaCount %8 == 4){
        this.xCut = 7;
        this.yCut = 35;
        this.hCut = 20;
        this.hCanvas = 30;
        this.wCut = 20;
        // this.yCanvas = this.yCanvas + 6;
        }
        if(koopaCount %8 == 1 || koopaCount %8 == 5){
        this.xCut = 7;
        this.yCut = 65;
        this.hCut = 20;
        this.hCanvas = 30;
        this.wCut = 20;
        // this.yCanvas = this.yCanvas + 6;
        }
        if(koopaCount %8 == 2 || koopaCount %8 == 6){
        this.xCut = 7;
        this.yCut = 95;
        this.hCut = 20;
        this.hCanvas = 30;
        this.wCut = 20;
        // this.yCanvas = this.yCanvas + 6;
        }
        if(koopaCount %8 == 3 || koopaCount %8 == 7){
          this.xCut = 7;
          this.yCut = 125;
          this.hCut = 20;
          this.hCanvas = 30;
          this.wCut = 20;
          // this.yCanvas = this.yCanvas + 6;
          }
        if(koopaCount > 20) koopaCount = 0;
      }
    } 
  }


  class Mario extends Character{
    constructor() {
      super(marioImage, 500, 0, 30, 57, 500, 28, 50, 5, -6)
      this.down = false;
      this.killEnemy = false;
    }
    
    jumpAction() {
      this.yCanvas = this.yCanvas + this.ySpeed;
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
      this.randomCounterEnemies = 20 + Math.floor(Math.random() * 60);
      this.numberOfEnemies = 0;
    }

    newEnemy() {
      this.enemiesArmy.push(new Koopa());
      this.enemiesCount = 0;
      this.randomCounterEnemies = 20 + Math.floor(Math.random() * 60);
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
      this.gameOverMessage();
    }

    update() {
      backgroundImage.move();
      
      marioCount ++;
      if (marioCount %13 == 0 || marioCount %13 == 1 || marioCount %13 == 6 || marioCount %13 == 7)  mario.yCut = 0;
      if (marioCount %13 == 2 || marioCount %13 == 3 || marioCount %13 == 8 || marioCount %13 == 9 || marioCount %13 == 12) mario.yCut = 100;
      if (marioCount %13 == 4 ||marioCount %13 == 5 || marioCount %13 == 10  || marioCount %13 == 11) mario.yCut = 200;
      if (marioCount == 40) marioCount = 0;


      if (this.jump) {   //Jump activado por la tecla flecha hacia arriba
        mario.jumpAction();
        mario.yCut = 400;
      }

      this.enemiesCount ++;
      if (this.enemiesCount == 70) {
        this.newEnemy();
      }
      if (this.enemiesArmy.length > 0) {
        if (this.enemiesArmy[0].xCanvas < 0) this.enemiesArmy.shift();   //eliminar los enemigos que ya han pasado por el escenario
      }
      
      this.drawAll();
      
      this.enemiesArmy.forEach((enemy, indice) => {
        enemy.moveLeft()  //desplazar la posición de todos los enemigos(Koopa) hacia la izquierda
        enemy.draw();   //pintar toda la array de enemigos(Koopa)
        if ( mario.xCanvas + mario.wCanvas > enemy.xCanvas && mario.xCanvas < enemy.xCanvas + enemy.wCanvas ) { //colision eje X
          if ( mario.yCanvas + mario.hCanvas > enemy.yCanvas + 8) this.gameOver();  //colision eje y
        }
        if ( mario.xCanvas + mario.wCanvas > enemy.xCanvas + 3 && mario.xCanvas + 3 < enemy.xCanvas + enemy.wCanvas ) { //colision por arriba: matar enemigo
          if ( mario.yCanvas + mario.hCanvas > enemy.yCanvas -10 && mario.killEnemy == false ) {  //colision por arriba: matar enemigo
            mario.killEnemy = true;
            enemy.rodando = true;
            enemy.yCanvas = enemy.yCanvas + 6;
            
            
          }
        }
      });
    }

    startGame() {
      this.gameStarted = true;
      clearInterval(flick);
      clearInterval(flick2);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.identificator = setInterval(()=> {
        this.update();
      }, 35)
    }
    gameOverMessage() {
      function flickerGameOverMessage() {
        flickerCount2 ++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(gameOverScreen, 0, 0, canvas.width, canvas.height);
        if (!game.gameStarted && flickerCount2 %2 == 0) ctx.fillText(gameOverMessage, 370, 350);
      }

      if (!game.gameStarted) {
        ctx.drawImage(gameOverScreen, 0, 0, canvas.width, canvas.height);
        controlFlik2();
      
    }
      function controlFlik2() {
        flick2 = setInterval(()=> {
          flickerGameOverMessage();
        }, 1000);
      }

    }
  }

  let mario = new Mario();

////////Initial images///////////

scenaryImage.onload = () => {
  if (!game.gameStarted) {
    ctx.drawImage(scenaryImage, 0, 0, canvas.width, canvas.height);
  }
}
scenaryImageLogo.onload = () => {
      
      if (!game.gameStarted) {
        ctx.drawImage(scenaryImageLogo, canvas.width/2 - 125, canvas.height/2 - 100, 250, 100);
        controlFlik();
      function flickerWelcomeMessage() {
        flickerCount ++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(scenaryImage, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(scenaryImageLogo, canvas.width/2 - 125, canvas.height/2 - 100, 250, 100);
        if (!game.gameStarted && flickerCount %2 == 0) ctx.fillText(welcomeMessage, 370, 350);
      }
    }
    function controlFlik() {
      flick = setInterval(()=> {
        flickerWelcomeMessage();
      }, 1000);
    }
    
  }

//}

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
        if (mario.xCanvas > 0) mario.xCanvas -= 5;
      break;
      case "ArrowRight":
        if (mario.xCanvas < 1056 - mario.wCanvas) mario.xCanvas += 5;
    }
  })  
}

