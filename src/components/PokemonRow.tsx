import React from 'react';
import { Typography } from '@mui/material';
import { trpc } from '@/utils/trpc';
import PokedexTable from './PokedexTable';

type PokemonRowProps = {
  pokemonName: string;
};

const PokemonRow: React.FC<PokemonRowProps> = ({ pokemonName = "Squirtle" }) => {

  const { data: pokemon,
    isLoading,
    error,
  } = trpc.pokemon.getPokemon.useQuery({ name: pokemonName }, {
    refetchOnWindowFocus: false,
  });


  return (
    <>
      {
        (isLoading && pokemon === undefined) ? (
          <Typography>Summoning Pikachu's lightning bolts ⚡ ...</Typography>
        ) : (
          <PokedexTable pokemons={pokemon ? [pokemon] : []} />
        )
      }
    </>
  );
};

export default PokemonRow;
