# Project MarioBross

Desarollo del primer proyecto de Ironhack Barcelona.

## About me

Hola! Somos Eduardo y Gerard, desarrolladores web. Este proyecto es una adaptacion libre del juego original Mario Bros. desarrollada con Javascript y Canvas.

## Deployment

(En construcción)
You can play the game [here](#).

## Work structure

Desarrollamos este proyecto en pareja y ayudados de [Trello](
https://trello.com/b/90Odfrap/programacion) para organizar el flujo de trabajo.

## About the game

En esta adaptación de Mario Bros. puedes controlar a Mario, mientras trata de esquivar enemigos.

## Controls

Para jugar al juego se utilizará la flecha hacia arriba para hacer saltar a Mario.

## Win condition

Superación personal por record de puntos.

## Lose condition
Colisión con un obstáculo.

## Classes
|   Class   | Properties                                                            | Methods                                          |
| :-------: | --------------------------------------------------------------------- | ------------------------------------------------ |
|   Personajes   | img, xCut, yCut, wCut, hCut, xCanvas, yCanvas, wCanvas, hCanvas, speed                                               | draw()                 |
| Mario (extends Personajes) | img, xCut, yCut, wCut, hCut, xCanvas, yCanvas, wCanvas, hCanvas, speed                                                | draw(), moveLibre()                               |
|   Koopa (extends Personajes)  | img, xCut, yCut, wCut, hCut, xCanvas, yCanvas, wCanvas, hCanvas, speed | draw(), moveIzq() |
|   Juego   | canvas, ctx, escenario, Mario, Koopa, score, intervalId, iteracion | start(), gameOver(), clear(), draw(), recalculate() |

---
Any doubts? Contact me!
<a href=""><img align="right" width="20px" src="
https://simpleicons.now.sh/behance/495f7e
" alt="Prueba's Behance" /></a>
<a href=""><img align="right" width="20px" src="
https://simpleicons.now.sh/linkedin/495f7e
" alt="Prueba's LinkedIn" /></a>
<a href="mailto:
contact@email.com
"><img align="right" width="20px" src="
https://simpleicons.now.sh/maildotru/495f7e
" alt="Prueba's Facebook" /></a>