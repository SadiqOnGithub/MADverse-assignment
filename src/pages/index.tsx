import * as React from 'react';
import { Box, Divider, Typography } from '@mui/material';

import PokemonForm from '@/components/PokemonForm';
import PokemonFormForArray from '@/components/PokemonFormForArray';


export default function Home() {

  return (
    <>
      <Box textAlign="center" my='25vh' >
        <Typography variant='h2' >Pokemons Table</Typography>
        <PokemonFormForArray />
      </Box>
      <Divider />
      <Box textAlign="center" sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }} >
        <Typography variant='h2' >Pokemon Info</Typography>
        <PokemonForm />
      </Box>
    </>
  );
}
