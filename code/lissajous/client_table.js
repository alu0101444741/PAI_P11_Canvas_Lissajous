/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Roberto Carrazana Pernía
 * @since May 10 2022
 * @desc Client program for class TableLissajous
*/

'use strict';

import { TableLissajous } from '../table-lissajous/table_lissajous.js';

const WIDTH = Number(document.getElementById('lissajous').getAttribute('width'));
const HEIGHT = Number(document.getElementById('lissajous').getAttribute('height'));

/** @desc Función main para probar el funcionamiento de la clase Lissajous*/
function main() {
  //alert(`width = ${WIDTH} -><- height = ${HEIGHT}`);
  const CANVAS = document.getElementById('lissajous');
  CANVAS.style.background = "black";
  let lissajous = new TableLissajous(HEIGHT, WIDTH, 0, CANVAS);
  lissajous.update();
}
main();