import { Box, Divider, Typography } from '@mui/material';

import PokemonForm from '@/components/PokemonForm';
import PokemonFormForArray from '@/components/PokemonFormForArray';
import FilterablePokedexTable from '@/components/FilterablePokedexTable';


export default function Home() {

  return (
    <>
      <Box textAlign="center" sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }} >
        <Typography variant='h2' >Pokemon By Name</Typography>
        <PokemonForm />
      </Box>
      <Divider />
      <Box textAlign="center" my='25vh' >
        <Typography variant='h2' >Pokemons By Names</Typography>
        <PokemonFormForArray />
      </Box>
        <Divider />
      <Box textAlign="center" my='25vh' >
        <Typography variant='h2' >Pokemons By Type</Typography>
        <FilterablePokedexTable />
      </Box>
    </>
  );
}
