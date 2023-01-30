window.onload = () => {
  const scenaryImage = new Image();
  scenaryImage.src = 'imagenes/fondo juego super Mario.png';

  const marioImage = new Image();
  marioImage.src = 'imagenes/mario.png';

  const enemiesImage = new Image();
  enemiesImage.src = 'imagenes/enemies.png'

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let gameStarted = false;
  let jump = false;
  let jumpCount = 0;
  let enemiesCount = 0;
  /* const marioImage = document.createElement("img");
  marioImage.src = "imagenes/marioSprite.png"; */

  /* marioImage.addEventListener('load', ()=> {
  //ctx.drawImage(imagenSprite, x_recorte, y_recorte, w_recorte, h_recorte, x_canvas, y_canvas, w_imagen, h_imagen);
    ctx.drawImage(marioImage, 2, 100, 50, 50, 500, 200, 50, 50);
  }) */
  const backgroundImage = {
    img: scenaryImage,
    x: 0,
    speed: -1,

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

  const mario = {
    img: marioImage,
    x: 400,
    y: 488,
    speed: 0,


    draw: function() {
        //ctx.drawImage(imagenSprite, x_recorte, y_recorte, w_recorte, h_recorte, x_canvas, y_canvas, w_imagen, h_imagen);
        ctx.drawImage(this.img, 500, 0, 40, 70, 500, this.y, 30, 45);
    }
  }

  document.getElementById('start-button').onclick = () => {
    if(!gameStarted) {
      startGame();
    }
  };

  class Enemies {
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
  }
  const enemiesArmy = [];

  function startGame() {
    gameStarted = true;

    function update() {
      backgroundImage.move();
      if (jump) {
        if (jumpCount < 20) mario.y -= 5;
        if (jumpCount >= 20) mario.y += 5;
        jumpCount ++;
        if (jumpCount >= 40) {
          jump = false;
          jumpCount = 0;
        }
      }

      enemiesCount ++;
      if (enemiesCount == 70) {
        enemiesArmy.push(new Enemies());
        enemiesCount = 0;
      }
      if (enemiesArmy.length > 5) enemiesArmy.shift();
      console.log(enemiesArmy.length);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      backgroundImage.draw();
      mario.draw();
      enemiesArmy.forEach((enemy) => {
        enemy.xCanvas -= enemy.speed;
        enemy.draw();
      });
    }

     let identificator = setInterval(()=> {
      update();
    }, 40)
  }

  document.getElementsByTagName("body")[0].addEventListener("keydown", (event)=>{
    switch(event.key){
      case "ArrowUp":
        if (!jump)
        jump = true;
        break;
    }
  })
  // start calling updateCanvas once the image is loaded
  //img.onload = updateCanvas;

  /* const marioImage = document.createElement("img");
  marioImage.src = "imagenes/marioSprite.png"; */
 /*  function drawMario() {
    marioImage.addEventListener('load', ()=> {
      //ctx.drawImage(imagenSprite, x_recorte, y_recorte, w_recorte, h_recorte, x_canvas, y_canvas, w_imagen, h_imagen);
      ctx.drawImage(marioImage, 2, 100, 50, 50, 500, 200, 50, 50);
    })
  } */
  
}

