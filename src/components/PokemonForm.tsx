import React, { useState, type SyntheticEvent } from 'react';
import { Box, TextField, Button, Container, Autocomplete } from '@mui/material';

import { trpc } from '@/utils/trpc';
import PokemonRow from './PokemonRow';

const PokemonForm: React.FC = () => {
  const [pokemonName, setPokemonName] = useState('');
  const { data: pokemonNames, isLoading } = trpc.pokemon.getPokemonNames.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });


  const onsubmit = (e: any) => {
    e.preventDefault();
    setPokemonName(e.currentTarget[0].value);
  };

  return (
    <Container>
      <Box component="form" textAlign="center" onSubmit={onsubmit} sx={{my: 7}}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={(!isLoading ? pokemonNames : []) as readonly string[]}
          loading={isLoading}
          loadingText="Summoning Pikachu's lightning bolts ⚡ ..."
          sx={{ maxWidth: 300, mx: "auto", mb: 5 }}
          renderInput={(params) => <TextField {...params} label="Pokemons" />}
        />
        <Button variant='contained' type='submit'>Submit</Button>
      </Box>
      {pokemonName && <PokemonRow pokemonName={pokemonName} />}
    </Container>
  );
};

export default PokemonForm;