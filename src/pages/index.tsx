import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { trpc } from '../utils/trpc';


export default function Home() {
  // const hello = trpc.hello.useQuery({ text: 'client' });
  const hello = trpc.hello.useQuery({text: "mom"})

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {hello.data.greeting}
        </Typography>
      </Box>
    </Container>
  );
}
