import paper from 'paper';

import { CANVAS_HEIGHT, Colors } from './constants';
import { getRandomInt } from './utils';

const PRIMARY_COLOR: any = Colors.blue;
const STROKE_WIDTH = 2.5;
const COUNT_LINES = 20;
const COUNT_GROUPS = 3;

type XYCoordinate = [number, number]; // [x, y]

function getLine(p: typeof paper, point: XYCoordinate, direction: number) {
  const [x, y] = point;
  const length = getRandomInt(30, 60);
  const gap = getRandomInt(10, 100);

  const line =
    direction === 0
      ? new p.Path.Line([x, y + gap], [x + gap + length, y + gap])
      : new p.Path.Line([x + gap, y], [x + gap, y + gap + length]);

  line.strokeColor = PRIMARY_COLOR;
  line.strokeWidth = STROKE_WIDTH;

  return line;
}

export function drawLines(p: typeof paper) {
  // Draw random lines
  let x = -30;
  for (let i = 0; i < COUNT_LINES; i++) {
    const direction = getRandomInt(0, 1); // Horizontal vs. vertical line
    const point: XYCoordinate = [getRandomInt(x, x + 30), getRandomInt(-30, CANVAS_HEIGHT)];
    for (let j = 0; j < COUNT_GROUPS; j++) {
      getLine(p, point, direction);
    }
    x += 25;
  }

  // Draw result
  // @ts-ignore
  p.view.draw();
}
