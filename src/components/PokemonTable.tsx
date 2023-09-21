import React from 'react';
import { Skeleton } from '@mui/material';

import { type GetPokemonOutput } from '@/server/routers/pokemon';
import { trpc } from '@/utils/trpc';
import PokedexTable from './PokedexTable';

type Props = {
  pokemonNameList: string[];
};

function PokemonTable({ pokemonNameList }: Props) {
  const {
    data: pokemons,
    isLoading
  } = trpc.pokemon.getPokemonByNames.useQuery<GetPokemonOutput[]>(pokemonNameList);

  return (
    <>
      {
        (isLoading && pokemons === undefined) ? (
          <Skeleton variant='rounded' height={`calc(60px + ${pokemonNameList.length*70}px)`}/>
        ) : (
          <PokedexTable pokemons={pokemons} />
        )
      }
    </>
  );
}

export default React.memo(PokemonTable);