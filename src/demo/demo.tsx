import {
  ChangeHistory,
  CircleOutlined,
  PauseCircleOutline,
  PlayCircleOutline,
  Texture,
  Waves,
} from '@mui/icons-material';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Stack from '@mui/joy/Stack';
import { SxProps } from '@mui/joy/styles/types';
import paper from 'paper/dist/paper-core';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useToggle } from 'react-use';

import {
  Colors,
  downloadSvg,
  drawCircles,
  drawLines,
  drawTriangles,
  drawWaves,
} from '../generators';

const Generators = ['triangles', 'circles', 'waves', 'lines'];

type Generator = (typeof Generators)[number];

const Decorators: Record<Generator, any> = {
  triangles: ChangeHistory,
  circles: CircleOutlined,
  waves: Waves,
  lines: Texture,
};

const DecoratorColors: Record<Generator, string> = {
  triangles: Colors.green,
  circles: Colors.red,
  waves: Colors.yellow,
  lines: Colors.blue,
};

const GeneratorFns: Record<Generator, (p: any) => void> = {
  triangles: drawTriangles,
  circles: drawCircles,
  waves: drawWaves,
  lines: drawLines,
};

const noop = () => {};

const sx: Record<string, SxProps> = {
  gridContainer: {
    flexGrow: 1,
    margin: '0 20px',
    justifyContent: 'center',
    flexWrap: { sm: 'wrap', md: 'nowrap' },
  },
  radioGroup: {
    display: 'flex',
    gap: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  list: {
    '--List-gap': '0.5rem',
    '--List-decorator-size': 'auto',
    maxWidth: { sm: 'auto', md: '200px' },
  },
  listItem: {
    border: 0,
    justifyContent: 'space-between',
  },
  listItemDecorator: {
    zIndex: 100,
  },
  radio: {
    padding: '5px 10px',
    border: 0,
  },
  controlButtons: {
    gap: '10px',
    maxWidth: { sm: 'auto', md: '200px' },
  },
  playButton: {
    display: 'flex',
    justifyContent: 'center',
  },
  canvasContainer: { display: 'flex', justifyContent: 'center' },
};

function initPaper(canvasId: string): typeof paper {
  let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  canvas && paper.setup(canvas);
  return paper;
}

function Demo() {
  const [paper, setPaper] = useState<any>(null);
  const [type, setType] = useState<Generator>('triangles');
  const [autoPlay, toggleAutoPlay] = useToggle(true);
  const timeoutRef = useRef<number>();

  const generatorFn = useMemo(() => (!!paper ? GeneratorFns[type] ?? noop : noop), [paper, type]);

  const run = useCallback(() => {
    if (paper) {
      paper.project.clear();
      generatorFn(paper);
    }
  }, [generatorFn, paper]);

  // Initialize canvas
  useEffect(() => {
    if (!paper && document.getElementById('demo')) {
      const paper = initPaper('demo');
      setPaper(paper);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (autoPlay && !timeoutRef.current) {
      const timeout = setInterval(run, 750);
      timeoutRef.current = timeout;
    }
    return () => {
      clearInterval(timeoutRef.current);
      timeoutRef.current = undefined;
    };
  }, [autoPlay, run, paper]);

  return (
    <Grid container spacing={3} columns={{ xs: 3, sm: 3, md: 12 }} sx={sx.gridContainer}>
      <Grid xs={3} sm={3} md={3}>
        <RadioGroup
          name="type"
          defaultValue={type}
          value={type}
          sx={sx.radioGroup}
          onChange={(event) => setType(event.target.value)}
        >
          <List sx={sx.list}>
            {Generators.map((generator) => {
              const Decorator = Decorators[generator];
              return (
                <ListItem variant="outlined" key={generator} sx={sx.listItem}>
                  <Radio
                    color="neutral"
                    disableIcon
                    overlay
                    value={generator}
                    label={generator}
                    sx={sx.radio}
                    slotProps={{
                      action: ({ checked }) => ({
                        sx: () => ({
                          borderRadius: 0,
                          border: 0,
                          '&:hover': {
                            background: 'transparent',
                            borderLeft: `4px solid ${DecoratorColors[generator]}`,
                          },
                          ...(checked && {
                            border: 0,
                            '&&': {
                              background: `${DecoratorColors[generator]}10`,
                              borderLeft: `4px solid ${DecoratorColors[generator]}`,
                            },
                          }),
                        }),
                      }),
                    }}
                  />
                  <ListItemDecorator sx={sx.listItemDecorator}>
                    <Decorator sx={{ fill: DecoratorColors[generator] }} />
                  </ListItemDecorator>
                </ListItem>
              );
            })}
          </List>
        </RadioGroup>
      </Grid>
      <Grid xs={3} sm={3} md={5} sx={sx.canvasContainer}>
        <canvas
          id="demo"
          data-paper-resize="true"
          style={{
            backgroundColor: 'black',
            borderRadius: 8,
            height: '100%',
            width: '100%',
            maxHeight: '288px',
            maxWidth: '540px',
          }}
        />
      </Grid>
      <Grid xs={3} sm={3} md={3}>
        <Stack sx={sx.controlButtons}>
          <Button
            variant="plain"
            color="neutral"
            onClick={toggleAutoPlay}
            startDecorator={autoPlay ? <PauseCircleOutline /> : <PlayCircleOutline />}
          >
            {autoPlay ? 'Pause' : 'Play'}
          </Button>
          <Button color="neutral" onClick={run} disabled={autoPlay}>
            Run
          </Button>
          <Button
            color="neutral"
            variant="soft"
            onClick={() => downloadSvg(paper, `random-brewing-${type}`)}
            disabled={autoPlay}
          >
            Download
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export { Demo };
