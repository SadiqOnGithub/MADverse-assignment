import { Skeleton } from '@mui/material';

import { trpc } from '@/utils/trpc';
import PokedexTable from './PokedexTable';

type Props = {
  pokemonType: string;
};

function PokemonTypeCall({ pokemonType }: Props) {
  const {
    data: pokemons,
    isLoading
  } = trpc.pokemon.getPokemonByType.useQuery(pokemonType, {
    refetchOnWindowFocus: false,
  });
  return (
    <>
      {
        (isLoading && pokemons === undefined) ? (
          <Skeleton variant='rounded' height={`calc(60px + 70px)`} />
        ) : (
            <PokedexTable pokemons={pokemons ? pokemons : []} />
        )
      }
    </>
  );
}

export default PokemonTypeCall;