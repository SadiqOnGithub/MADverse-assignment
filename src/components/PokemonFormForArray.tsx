import React, { useState, } from 'react';
import { Box, TextField, Button, Container, Autocomplete } from '@mui/material';

import { trpc } from '@/utils/trpc';
import PokemonNamesCall from './PokemonNamesCall';


const PokemonFormForArray: React.FC = () => {
  const [pokemonNameList, setPokemonNameList] = useState<string[]>([]);
  const [pokemonsData, setPOkemonsData] = useState<string[]>([]);

  const { data: pokemonNames, isLoading } = trpc.pokemon.getPokemonNames.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <Container>
      <Box component="form" textAlign="center" sx={{ my: 7 }}>
        <Autocomplete
          multiple
          options={(!isLoading ? pokemonNames : []) as readonly string[]}
          loading={isLoading}
          loadingText="Summoning Pikachu's lightning bolts ⚡ ..."
          sx={{ maxWidth: 550, mx: "auto", mb: 5 }}
          onChange={(e, v) => setPokemonNameList(v)}
          renderInput={(params) => <TextField {...params}
            label="Pokemons"
          />}
        />
        <Button variant='contained'
          onClick={() => setPOkemonsData(pokemonNameList)}
        >Submit</Button>
      </Box>
      {pokemonsData.length > 0 && <PokemonNamesCall pokemonNameList={pokemonsData} />}
    </Container>
  );
};

export default PokemonFormForArray;