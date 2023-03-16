import paper from 'paper';

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function removeIntersections(
  path: paper.Path | paper.Item,
  existingPaths: paper.Path[] | paper.Item[],
) {
  existingPaths.forEach((existingPath) => {
    if (path.intersects(existingPath)) {
      path.remove();
    }
  });
}

export function downloadSvg(p: typeof paper, filename: string) {
  const url =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(p.project.exportSVG({ asString: true }) as string);

  const link = document.createElement('a');
  link.download = filename + '.svg';
  link.href = url;
  link.click();
}
