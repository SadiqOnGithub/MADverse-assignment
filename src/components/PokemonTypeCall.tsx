import React from 'react';
import { Skeleton } from '@mui/material';

import { type GetPokemonOutput } from '@/server/routers/pokemon';
import { trpc } from '@/utils/trpc';
import PokedexTable from './PokedexTable';

type Props = {
  pokemonType: string;
};

function PokemonTypeCall({ pokemonType }: Props) {
  console.log(pokemonType);
  const {
    data: pokemons,
    isLoading
  } = trpc.pokemon.getPokemonByType.useQuery(pokemonType, {
    refetchOnWindowFocus: false,
  });
  console.log(pokemons)
  return (
    <>
      {
        (isLoading && pokemons === undefined) ? (
          <Skeleton variant='rounded' height={`calc(60px + ${70}px)`} />
        ) : (
          <PokedexTable pokemons={pokemons} />
        )
      }
    </>
  );
}

export default PokemonTypeCall;