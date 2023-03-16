import paper from 'paper';

import { CANVAS_HEIGHT, CANVAS_WIDTH, Colors } from './constants';
import { getRandomInt } from './utils';

const PRIMARY_COLOR: any = Colors.yellow;
const COUNT = 12;
const STROKE_WIDTH = 4;
const LINE_GAP = 6;
const ORIG_Y = (5 * CANVAS_HEIGHT) / 7;

type XYCoordinate = [number, number]; // [x, y]

export function drawWaves(p: typeof paper) {
  // Draw points to create a wave
  const points = CANVAS_WIDTH / 80;
  const segments: XYCoordinate[] = [];
  let x = 0;
  let y = ORIG_Y;

  for (let i = 0; i < points; i++) {
    segments.push([x, y]);

    x += 80;
    let yOffset = getRandomInt(0, 120);
    if (i % 2 === 0) {
      yOffset *= -1;
    }
    y -= yOffset;
  }

  // Create a final point at the same y-coordiate as the first point
  segments.push([x, ORIG_Y]);

  // Create a path from the points
  const path = new p.Path({
    segments,
    strokeColor: PRIMARY_COLOR,
    strokeWidth: STROKE_WIDTH,
  });

  path.smooth();

  // Match the handles of the first and last element
  path.firstSegment.handleOut = new p.Point(STROKE_WIDTH / 2, 0);
  path.lastSegment.handleIn = new p.Point(-STROKE_WIDTH / 2, 0);

  // Duplicate wave to create pattern
  let wave = path.clone();
  for (let j = 0; j <= COUNT; j++) {
    wave.translate(new p.Point(0, -STROKE_WIDTH - LINE_GAP));
    wave.strokeColor = PRIMARY_COLOR;
    wave.strokeWidth = getRandomInt(1, STROKE_WIDTH) - 0.5;
    wave = wave.clone();
  }

  // Draw result
  // @ts-ignore
  p.view.draw();
}
