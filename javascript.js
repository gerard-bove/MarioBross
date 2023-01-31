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
      super(koopaImage, 166, 0, 25, 30, 1100, 35, 40, 5)
    }

    moveLeft() {
      this.xCanvas -= this.xSpeed;
    }
  }

  class Mario extends Character{
    constructor() {
      super(marioImage, 500, 0, 30, 57, 500, 28, 50, 5, -7)
    }
    
    jumpAction() {
      this.yCanvas = this.yCanvas + mario.ySpeed + 1;
      if (this.yCanvas < 350) mario.ySpeed = 8;
      if (this.yCanvas > 400 && this.yCanvas < 450) {
        this.jump = false;
        console.log("HOLA");
      }
    }

    /* moveUp() {
      this.yCanvas -= this.ySpeed;
    }

    moveDown() {
      this.yCanvas += this.ySpeed;
    } */
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
      this.gravity = 2
    }

      /* jumpAction() {
      if (this.jumpCount < 18) mario.moveUp();
        if (this.jumpCount >= 18) mario.moveDown();
        this.jumpCount ++;
        if (this.jumpCount >= 36) {
          this.jump = false;
          this.jumpCount = 0;
        }
    } */ 

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
      
      this.enemiesArmy.forEach((enemy) => {
        enemy.moveLeft()  //desplazar la posición de todos los enemigos hacia la izquierda
        enemy.draw();   //pintar toda la array de enemigos
        if ( mario.xCanvas + mario.wCanvas > enemy.xCanvas && mario.xCanvas < enemy.xCanvas + enemy.wCanvas ) {
          if ( mario.yCanvas + mario.hCanvas > enemy.yCanvas) this.gameOver();
        }
        if ( mario.xCanvas + mario.wCanvas > enemy.xCanvas + 3 && mario.xCanvas + 3 < enemy.xCanvas + enemy.wCanvas ) {
          if ( mario.yCanvas + mario.hCanvas > enemy.yCanvas -5 ) clearInterval(this.identificator);
        }
      });
    }

    startGame() {
      this.gameStarted = true;
      this.identificator = setInterval(()=> {
        this.update();
      }, 40)
    }
  }
  
  let mario = new Mario();
  ////////Initial images///////////


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
    }
  })  
}

