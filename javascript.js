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

  //koopa variables//
  let xCutKoopa = 166;
  let yCutKoopa = 0;
  let wCutKoopa = 25;
  let hCutKoopa = 30;
  let xCanvasKoopa = 1100;
  let xSpeedKoopa = 5;

  //Mario variables//
  let xCutMario = 500;
  let yCutMario = 0;
  let wCutMario = 30;
  let hCutMario = 57;
  let xCanvasMario = 500;
  let xSpeedMario = 5;
  let ySpeedMario = 5;

  //game variables//
  const enemiesArmy = [];
  let gameStarted = false;
  let jump = false;
  let jumpCount = 0;
  let enemiesCount = 0;

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
      super(koopaImage, xCutKoopa, yCutKoopa, wCutKoopa, hCutKoopa, xCanvasKoopa, 35, 40, xSpeedKoopa)
    }

    moveLeft() {
      this.xCanvas -= this.xSpeed;
    }
  }

  class Mario extends Character{
    constructor() {
      super(marioImage, xCutMario, yCutMario, wCutMario, hCutMario, xCanvasMario, 28, 50, xSpeedMario, ySpeedMario)
    }

    moveUp() {
      this.yCanvas -= this.ySpeed;
    }

    moveDown() {
      this.yCanvas += this.ySpeed;
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
      this.enemiesArmy = enemiesArmy;
      this.gameStarted = gameStarted;
      this.jump = jump;
      this.jumpCount = jumpCount;
      this.enemiesCount = enemiesCount;
      this.identificator
    }

    jumpAction() {
      if (this.jumpCount < 20) mario.moveUp();
        if (this.jumpCount >= 20) mario.moveDown();
        this.jumpCount ++;
        if (this.jumpCount >= 40) {
          this.jump = false;
          this.jumpCount = 0;
        }
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
      clearInterval(this.identificator)
    }

    update() {
      backgroundImage.move();

      if (this.jump) {   //Jump activado por la tecla flecha hacia arriba
        this.jumpAction();
      }

      this.enemiesCount ++;
      if (this.enemiesCount == 70) {
        this.newEnemy();
      }
      if (this.enemiesArmy.length > 5) enemiesArmy.shift();   //eliminar los enemigos que ya han pasado por el escenario

      this.drawAll();
      
      enemiesArmy.forEach((enemy) => {
        enemy.moveLeft()  //desplazar la posición de todos los enemigos hacia la izquierda
        enemy.draw();   //pintar toda la array de enemigos
        if ( mario.xCanvas + mario.wCanvas > enemy.xCanvas && mario.xCanvas < enemy.xCanvas + enemy.wCanvas ) {
          if ( mario.yCanvas + mario.hCanvas > enemy.yCanvas) this.gameOver();
        }
      });
    }

    startGame() {
      gameStarted = true;
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
        if (!gameStarted) game.startGame(); //la tecla "espacio" inicia el juego;
        break;
    }
  })  
}

