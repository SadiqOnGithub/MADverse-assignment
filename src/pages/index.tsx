import * as React from 'react';
import { Box, Typography } from '@mui/material';

import PokemonForm from '@/components/PokemonForm';


export default function Home() {

  return (
    <>
      <Box textAlign="center" mt={10} >
        <Typography variant='h2' >Pokemon Info</Typography>
        <PokemonForm />
      </Box>
    </>
  );
}
