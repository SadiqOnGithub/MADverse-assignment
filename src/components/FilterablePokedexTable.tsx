import { useState, } from 'react';
import { Box, TextField, Button, Container, Autocomplete } from '@mui/material';

import { trpc } from '@/utils/trpc';
import PokemonTypeCall from './PokemonTypeCall';


type Props = {};

function FilterablePokedexTable({ }: Props) {
  const [pokemonType, setPokemonType] = useState<string | null>('');
  const [pokemonsData, setPOkemonsData] = useState<string | null>('');

  const { data: pokemonTypes, isLoading } = trpc.pokemon.getPokemonTypes.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  console.log("hey heu", pokemonTypes);

  return (
    <>
      <Container>
        <Box component="form" textAlign="center" sx={{ my: 7 }}>
          <Autocomplete
            // multiple
            options={(!isLoading ? pokemonTypes : []) as readonly string[]}
            loading={isLoading}
            loadingText="Summoning Pikachu's lightning bolts ⚡ ..."
            sx={{ maxWidth: 300, mx: "auto", mb: 5 }}
            onChange={(e, v) => setPokemonType(v)}
            renderInput={(params) => <TextField {...params}
              label="Pokemons"
            />}
          />
          <Button variant='contained'
            onClick={() => setPOkemonsData(pokemonType)}
          >Submit</Button>
        </Box>
        {pokemonsData && <PokemonTypeCall pokemonType={pokemonsData} />}
      </Container>

    </>
  );
}

export default FilterablePokedexTable;