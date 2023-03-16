import paper from 'paper';

import { CANVAS_HEIGHT, CANVAS_WIDTH, Colors } from './constants';
import { getRandomInt, removeIntersections } from './utils';

const PRIMARY_COLOR: any = Colors.green;
const STROKE_WIDTH = 2;
const COUNT = 20;

type XYCoordinate = [number, number]; // [x, y]

function getTriangle(p: typeof paper) {
  // Draw three random points
  const point1: XYCoordinate = [
    getRandomInt(-10, CANVAS_WIDTH),
    getRandomInt(-10, CANVAS_HEIGHT + 10),
  ];
  const point2: XYCoordinate = [
    point1[0] + getRandomInt(40, 80),
    point1[1] + getRandomInt(-20, 20),
  ];
  const point3: XYCoordinate = [
    (point1[0] + point2[0]) / 2 + getRandomInt(-10, 10),
    point1[1] + getRandomInt(20, 100),
  ];

  // Connect the points to make a triangle
  const segments = [point1, point2, point3];
  const triangle = new p.Path({
    segments,
    strokeColor: PRIMARY_COLOR,
    strokeWidth: STROKE_WIDTH,
    closed: true,
  });

  // Give the triangle a random rotation
  const rotation = getRandomInt(0, 270);
  triangle.rotate(rotation);

  return triangle;
}

export function drawTriangles(p: typeof paper) {
  const triangles: paper.Path[] = [];

  // Draw a series of random triangles
  do {
    // Draw a triangle on the canvas
    const triangle = getTriangle(p);
    // Check if that triangle intersects any existing triangles already on the canvas
    let validPlacement = true;
    for (const existingTriangle of triangles) {
      if (triangle.intersects(existingTriangle)) {
        // If the new triangle intersects any existing triangles,
        // then remove the new triangle and try again
        triangle.remove();
        validPlacement = false;
        break;
      }
    }

    // Once we've placed the desired number of triangles, exit
    validPlacement && triangles.push(triangle);
  } while (triangles.length < COUNT);

  /**
   * Clean up the label:
   *
   * Attempt to bridge the left and right edges of the canvas (that would wrap around
   * the bottle) by looking at any objects that intersect either edge. If there are
   * intersections, then clone that object to the other side to create a seemless wrap-around.
   * Here, we only keep right-side intersections and remove any triangles that intersect the
   * left canvas edge.
   */
  const leftCanvasEdge = new p.Path.Line([0, 0], [0, CANVAS_HEIGHT]);
  const rightCanvasEdge = new p.Path.Line([CANVAS_WIDTH, 0], [CANVAS_WIDTH, CANVAS_HEIGHT]);

  triangles.forEach((triangle) => {
    if (triangle.intersects(leftCanvasEdge)) {
      triangle.remove();
    } else if (triangle.intersects(rightCanvasEdge)) {
      const clone = triangle.clone();
      clone.position.x -= CANVAS_WIDTH;
      removeIntersections(clone, triangles);
    }
  });

  // Remove canvas edges (just used to detect intersections)
  leftCanvasEdge.remove();
  rightCanvasEdge.remove();

  // Draw result
  // @ts-ignore
  p.view.draw();
}
