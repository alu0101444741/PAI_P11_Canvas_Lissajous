/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since May 7 2022
 * @desc Client program for class Lissajous
*/

'use strict';

import { Lissajous } from '../class-lissajous/lissajous.js';

const CANVAS = document.getElementById('lissajous');
const WIDTH = Number(document.getElementById('lissajous').getAttribute('width'));
const HEIGHT = Number(document.getElementById('lissajous').getAttribute('height'));

const BUTTON_INC_A = document.getElementById('increaseA');
BUTTON_INC_A.addEventListener('click', onClickIncreaseA);

const BUTTON_DEC_A = document.getElementById('decreaseA');
BUTTON_DEC_A.addEventListener('click', onClickDecreaseA);

const BUTTON_INC_B = document.getElementById('increaseB');
BUTTON_INC_B.addEventListener('click', onClickIncreaseB);

const BUTTON_DEC_B = document.getElementById('decreaseB');
BUTTON_DEC_B.addEventListener('click', onClickDecreaseB);

let valueA = 1;
let valueB = 2;

/** @desc Función main para probar el funcionamiento de la clase Lissajous*/
function main() {
  //alert(`width = ${WIDTH} -><- height = ${HEIGHT}`);
  
  CANVAS.style.background = "black";
  let lissajous = new Lissajous(HEIGHT, WIDTH, CANVAS, valueA, valueB);
  //lissajous.drawWholeFigure();
  lissajous.update();  
}

function onClickIncreaseA() {
  ++valueA;
  let lissajous = new Lissajous(HEIGHT, WIDTH, CANVAS, valueA, valueB);
  lissajous.update();
}

function onClickIncreaseB() {
  ++valueB;
  let lissajous = new Lissajous(HEIGHT, WIDTH, CANVAS, valueA, valueB);
  lissajous.update();
}

function onClickDecreaseA() {
  valueA = Math.max(valueA - 1, 1);
  let lissajous = new Lissajous(HEIGHT, WIDTH, CANVAS, valueA, valueB);
  lissajous.update();
}

function onClickDecreaseB() {
  valueB = Math.max(valueB - 1, 1);
  let lissajous = new Lissajous(HEIGHT, WIDTH, CANVAS, valueA, valueB);
  lissajous.update();
}

main();