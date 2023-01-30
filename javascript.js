window.onload = () => {
  const scenaryImage = new Image();
  scenaryImage.src = 'imagenes/Fondo_juego.png';

  const scenaryImageLogo = new Image();
  scenaryImageLogo.src = 'imagenes/Initial_logo.png';

  const marioImage = new Image();
  marioImage.src = 'imagenes/Mario.png';

  const enemiesImage = new Image();
  enemiesImage.src = 'imagenes/Enemies.png'

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let gameStarted = false;
  let jump = false;
  let jumpCount = 0;
  let enemiesCount = 0;

  class Koopa {
    constructor() {
      this.img = enemiesImage;
      this.xCut = 162;
      this.yCut = 0;
      this.wCut = 30;
      this.hCut = 30;
      this.xCanvas = 1100;
      this.yCanvas = 484;
      this.wCanvas = 35;
      this.hCanvas = 40;
      this.speed = 4;
    }

    moveLeft() {
      this.xCanvas -= this.speed
    }

    draw() {
      //ctx.drawImage(imagenSprite, x_recorte, y_recorte, w_recorte, h_recorte, x_canvas, y_canvas, w_imagen, h_imagen);
      ctx.drawImage(this.img, this.xCut, this.yCut, this.wCut, this.hCut, this.xCanvas, this.yCanvas, this.wCanvas, this.hCanvas);
    }
  }

  class Mario{
    constructor() {
      this.img = marioImage;
      this.xCut = 500;
      this.yCut = 0;
      this.wCut = 40;
      this.hCut = 70;
      this.xCanvas = 500;
      this.yCanvas = 479;
      this.wCanvas = 40;
      this.hCanvas = 55;
      this.speed = 5;
    }

    moveUp() {
      this.yCanvas -= this.speed;
    }

    moveDown() {
      this.yCanvas += this.speed;
    }

    draw() {
      //ctx.drawImage(imagenSprite, x_recorte, y_recorte, w_recorte, h_recorte, x_canvas, y_canvas, w_imagen, h_imagen);
      ctx.drawImage(this.img, this.xCut, this.yCut, this.wCut, this.hCut, this.xCanvas, this.yCanvas, this.wCanvas, this.hCanvas);
  }  
  }
  
  /* class Koopa extends Character {
    constructor(yCut) {
      super(yCut)
      this.img = enemiesImage;
      this.xCut = 162;
      this.yCut = 0;
      this.wCut = 30;
      this.hCut = 30;
      this.xCanvas = 1100;
      this.yCanvas = 484;
      this.wCanvas = 35;
      this.hCanvas = 40;
      this.speed = 4;
    }
    moveLeft() {
      this.xCanvas -= this.speed
    }
    draw() {
      //ctx.drawImage(imagenSprite, x_recorte, y_recorte, w_recorte, h_recorte, x_canvas, y_canvas, w_imagen, h_imagen);
      ctx.drawImage(this.img, this.xCut, this.yCut, this.wCut, this.hCut, this.xCanvas, this.yCanvas, this.wCanvas, this.hCanvas);
    }
  } */

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
    },
  };
//hacer clase general para Mario y enemigos, y heredar de la general para marcar las caracteristicas de cada uno en su clase propia de herencia.
//hacer clase juego que organice el jeugo y no este repartido.
//controlar la eliminacion de enemigos del array con un delete(para machacar en memorias). 
/*   const mario = {
    img: marioImage,
    x: 400,
    y: 479,
    speed: 0,


    draw: function() {
        //ctx.drawImage(imagenSprite, x_recorte, y_recorte, w_recorte, h_recorte, x_canvas, y_canvas, w_imagen, h_imagen);
        ctx.drawImage(this.img, 500, 0, 40, 70, 500, this.y, 40, 55);
    }
  } */

  /* class Enemies {
    constructor() {
      this.img = enemiesImage;
      this.xCut = 162;
      this.yCut = 0;
      this.wCut = 30;
      this.hCut = 30;
      this.xCanvas = 1100;
      this.yCanvas = 484;
      this.wCanvas = 35;
      this.hCanvas = 40;
      this.speed = 4;
    }

    draw() {
      //ctx.drawImage(imagenSprite, x_recorte, y_recorte, w_recorte, h_recorte, x_canvas, y_canvas, w_imagen, h_imagen);
      ctx.drawImage(this.img, this.xCut, this.yCut, this.wCut, this.hCut, this.xCanvas, this.yCanvas, this.wCanvas, this.hCanvas);
    }
  } */

  const enemiesArmy = [];
  let mario = new Mario();
  ////////Initial images///////////


  ////////Start game///////////
  function startGame() {
    gameStarted = true;

    function update() {
      backgroundImage.move();

      if (jump) {   //Jump activado por la tecla flecha hacia arriba
        if (jumpCount < 20) mario.moveUp();
        if (jumpCount >= 20) mario.moveDown();
        jumpCount ++;
        if (jumpCount >= 40) {
          jump = false;
          jumpCount = 0;
        }
      }

      enemiesCount ++;
      if (enemiesCount == 70) {
        enemiesArmy.push(new Koopa());
        enemiesCount = 0;
      }
      if (enemiesArmy.length > 5) enemiesArmy.shift();

      //repintar todo//
      ctx.clearRect(0, 0, canvas.width, canvas.height); //borrar todo
      backgroundImage.draw(); 
      mario.draw();
      enemiesArmy.forEach((enemy) => {
        enemy.moveLeft()  //desplazar la posición de todos los enemigos hacia la izquierda
        enemy.draw();   //pintar toda la array de enemigos
      });
    }

     let identificator = setInterval(()=> {
      update();
    }, 40)
  }

  ///////Manejo teclado//////////
  document.getElementsByTagName("body")[0].addEventListener("keydown", (event)=>{
    event.preventDefault();
    switch(event.key){
      case "ArrowUp":
        if (!jump)
        jump = true;
        break;
      case ' ':
        if (!gameStarted) startGame();
        break;
    }
  })  
}

