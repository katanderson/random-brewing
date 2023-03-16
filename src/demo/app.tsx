import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import { SxProps } from '@mui/joy/styles/types';
import Typography from '@mui/joy/Typography';

import { Demo } from './demo';
import { Gallery } from './gallery';

const sx: Record<string, SxProps> = {
  app: {
    minWidth: '420px',
  },
  header: {
    alignItems: 'center',
    width: '100%',
    padding: '5px 20px',
    justifyContent: 'space-between',
  },
  headerRight: {
    alignSelf: 'flex-end',
  },
  intro: {
    padding: '80px 0',
    textAlign: 'center',
    maxWidth: '550px',
    margin: '0 auto',
    width: { xs: '75%', md: '50%' },
  },
  about: {
    width: { xs: '90%', sm: '75%' },
    alignSelf: 'center',
    gap: { xs: 3, sm: 0 },
    marginBottom: '30px',
    '& p': {
      marginTop: 0,
    },
  },
  content: {
    '& > *': {
      margin: '0 20px',
    },
  },
  divider: {
    alignSelf: 'center',
    width: '75%',
    margin: '100px 0 50px',
  },
  footerDivider: {
    alignSelf: 'center',
    width: '75%',
    margin: '50px 0 0',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80px',
    textAlign: 'center',
  },
};

function Header() {
  return (
    <Stack direction="row" sx={sx.header}>
      <div />
      <img src="rbc-logo.svg" alt="logo" height="70px" />
      <a href="https://github.com/katanderson/random-brewing" target="_blank" rel="noreferrer">
        <img src="github-logo.svg" alt="github" height="20px" />
      </a>
    </Stack>
  );
}

function Intro() {
  return (
    <Stack sx={sx.intro}>
      <Typography level="h4">
        Random Brewing Co is a fictional brewery that seeks to celebrate the randomness of the
        brewing process in every label.
      </Typography>
      <Typography marginTop="14px">
        Built using{' '}
        <a href="http://paperjs.org/" target="_blank" rel="noreferrer">
          Paper.js
        </a>
      </Typography>
    </Stack>
  );
}

function About() {
  return (
    <Grid container columns={{ xs: 3, sm: 12 }} sx={sx.about}>
      <Grid xs={3} sm={4}>
        About This Project
      </Grid>
      <Grid xs={3} sm={8}>
        <Stack>
          <p>
            When my husband and I decided to try our hands at home brewing, I knew I wanted to
            create a custom label to go along with it – so even if our beer was terrible, at least
            the friends we gifted it to would have something special to store in the back of their
            refrigerators.
          </p>
          <p>
            As we quickly discovered, there are plenty of moments brewing can go wrong – it truly is
            both an art and a science. Though the process is highly controlled, each brew is subject
            to innumerable factors that can influence the final flavor, even between bottles of the
            same batch.
          </p>
          <p>
            Random Brewing Co is inspired by this unique variation lying within each bottle. The
            geometric patterns featured in each label are generated from scripts written with{' '}
            <a href="http://paperjs.org/" target="_blank" rel="noreferrer">
              Paper.js
            </a>
            , which use a set of randomly generated values to create slightly different variations
            of the same image each time the script runs. Every label in the series maintains a
            visual theme while individual elements alter in shape, size, and position. No two
            bottles will look – or taste – the same.
          </p>
          <p>
            I expanded this idea beyond our initial brewing attempt to conceptualize what an entire
            brewery might look like based on this idea. I created four different beer styles, each
            individualized with a unique geometry while still maintaining the overall Random Brewing
            Co style and branding.
          </p>
          <p>
            Check out the gallery below for examples of each beer style's label (bottles modeled and
            rendered in Maya).
          </p>
        </Stack>
      </Grid>
    </Grid>
  );
}

function Footer() {
  return (
    <Sheet sx={sx.footer}>
      Copyright &copy; 2022-{new Date().getFullYear()} Katherine Anderson. All rights reserved.
    </Sheet>
  );
}

function App() {
  return (
    <Stack sx={sx.app}>
      <Header />
      <Stack sx={sx.content} gap={2}>
        <Intro />
        <Demo />
        <Divider sx={sx.divider} />
        <About />
        <Gallery />
        <Divider sx={sx.footerDivider} />
        <Footer />
      </Stack>
    </Stack>
  );
}

export default App;
