import paper from 'paper';

import { CANVAS_HEIGHT, CANVAS_WIDTH, Colors } from './constants';
import { getRandomInt, removeIntersections } from './utils';

const PRIMARY_COLOR: any = Colors.red;
const STROKE_WIDTH = 2;
const COUNT = 10;
const RADIUS = 40;
const RAIN_DENSITY = 1200;

type XYCoordinate = [number, number]; // [x, y]

function getCircle(
  p: typeof paper,
  clippingGroup: paper.Group,
): { clipMask: paper.Path.Circle; circle: paper.Path.Circle } {
  const center: XYCoordinate = [getRandomInt(0, CANVAS_WIDTH), getRandomInt(0, CANVAS_HEIGHT)];

  const clipMask = new p.Path.Circle(center, RADIUS);
  clipMask.strokeColor = PRIMARY_COLOR;
  clipMask.strokeWidth = STROKE_WIDTH;
  clippingGroup.addChild(clipMask);

  const circle = new p.Path.Circle(center, RADIUS);
  circle.strokeColor = PRIMARY_COLOR;
  circle.strokeWidth = STROKE_WIDTH;

  return { clipMask, circle };
}

export function drawCircles(p: typeof paper) {
  const clippingGroup = new p.Group();

  // Draw background "rain" lines
  const lines: paper.Path.Line[] = [];
  for (let i = 0; i < RAIN_DENSITY; i++) {
    const x = getRandomInt(-50, CANVAS_WIDTH);
    const y = getRandomInt(-50, CANVAS_HEIGHT);
    const length = getRandomInt(5, 20);

    const path = new p.Path.Line([x, y], [x + length, y + length]);
    path.strokeColor = PRIMARY_COLOR;
    path.strokeWidth = 1.5;
    path.rotation = -90;
    lines.push(path);
  }

  // Draw a series of random circles
  const circles: paper.Path.Circle[] = [];
  do {
    // Draw a circle on the canvas, with a matching clip mask
    const { circle, clipMask } = getCircle(p, clippingGroup);
    // Check if that circle intersects any existing circles already on the canvas
    let validPlacement = true;
    for (const existingCircle of circles) {
      if (circle.intersects(existingCircle)) {
        // If the new circle intersects any existing circles,
        // then remove the new circle and its clipping mask and try again
        circle.remove();
        clipMask.remove();
        validPlacement = false;
        break;
      }
    }
    validPlacement && circles.push(circle);
  } while (circles.length < COUNT);

  /**
   * Clean up the label:
   *
   * Attempt to bridge the left and right edges of the canvas (that would wrap around
   * the bottle) by looking at any objects that intersect either edge. If there are
   * intersections, then clone that object to the other side to create a seemless wrap-around.
   * Here, we only keep right-side intersections and remove any circles that intersect the
   * left canvas edge.
   */
  const leftCanvasEdge = new p.Path.Line([0, 0], [0, CANVAS_HEIGHT]);
  const rightCanvasEdge = new p.Path.Line([CANVAS_WIDTH, 0], [CANVAS_WIDTH, CANVAS_HEIGHT]);

  clippingGroup.children.forEach((child) => {
    if (child.intersects(leftCanvasEdge)) {
      child.remove();
    } else if (child.intersects(rightCanvasEdge)) {
      const clone = child.clone();
      clone.position.x -= CANVAS_WIDTH;
      removeIntersections(clone, clippingGroup.children);
    }
  });

  clippingGroup.clipMask = true;

  leftCanvasEdge.remove();
  rightCanvasEdge.remove();

  // Draw result
  // @ts-ignore
  p.view.draw();
}
