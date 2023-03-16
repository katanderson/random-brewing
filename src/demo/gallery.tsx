import { Sheet } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import Stack from '@mui/joy/Stack';
import { SxProps } from '@mui/joy/styles/types';

const sx: Record<string, SxProps> = {
  container: {
    rowGap: '20px',
  },
  labelGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelGridItem: {
    width: { xs: '100%', sm: '75%' },
  },
  rightAlign: {
    justifyContent: 'flex-end',
  },
  leftAlign: {
    justifyContent: 'flex-start',
  },
  logos: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& > img': {
      width: { xs: '100%', sm: '50%' },
    },
  },
};

function Gallery() {
  return (
    <Stack sx={sx.container}>
      <img src="wide_shapes_all.jpg" alt="Mixed bottles with shapes" width="100%" />
      <Grid container columnSpacing={2} rowSpacing={1} columns={{ xs: 3, sm: 12 }}>
        <Grid xs={3} sm={6} sx={{ ...sx.labelGrid, ...sx.rightAlign } as SxProps}>
          <Sheet sx={sx.labelGridItem}>
            <img src="label-triangles.png" alt="Random Brewing Co label DIPA" width="100%" />
          </Sheet>
        </Grid>
        <Grid xs={3} sm={6} sx={{ ...sx.labelGrid, ...sx.leftAlign } as SxProps}>
          <Sheet sx={sx.labelGridItem}>
            <img src="label-circles.png" alt="Random Brewing Co label porter" width="100%" />
          </Sheet>
        </Grid>
        <Grid xs={3} sm={6} sx={{ ...sx.labelGrid, ...sx.rightAlign } as SxProps}>
          <Sheet sx={sx.labelGridItem}>
            <img src="label-waves.png" alt="Random Brewing Co label saison" width="100%" />
          </Sheet>
        </Grid>
        <Grid xs={3} sm={6} sx={{ ...sx.labelGrid, ...sx.leftAlign } as SxProps}>
          <Sheet sx={sx.labelGridItem}>
            <img src="label-lines.png" alt="Random Brewing Co label gose" width="100%" />
          </Sheet>
        </Grid>
      </Grid>
      <img
        src="gif_square_frontback_all_500x500.gif"
        alt="All labels cycle gif"
        style={{ display: 'flex', margin: '0 auto', maxWidth: '100%' }}
      />
      <Sheet sx={sx.logos}>
        <img src="rbc-logo-all.png" alt="Random Brewing Co logo mockups" width="100%" />
      </Sheet>
      <Grid container columnSpacing={1} columns={{ xs: 3, sm: 12 }}>
        <Grid xs={3} sm={6}>
          <img
            src="square_front_SAISON_all.jpg"
            alt="Four saison bottles front facing"
            width="100%"
          />
        </Grid>
        <Grid xs={3} sm={6}>
          <img src="square_back_GOSE_all.jpg" alt="Four gose bottles back facing" width="100%" />
        </Grid>
        <Grid xs={3} sm={6}>
          <img
            src="square_back_PORTER_all.jpg"
            alt="Four porter bottles back facing"
            width="100%"
          />
        </Grid>
        <Grid xs={3} sm={6}>
          <img src="square_front_DIPA_all.jpg" alt="Four DIPA bottles front facing" width="100%" />
        </Grid>
      </Grid>
    </Stack>
  );
}

export { Gallery };
