import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { trpc } from '@/utils/trpc';

type PokemonRowProps = {
  pokemonName: string;
};

const PokemonRow: React.FC<PokemonRowProps> = ({ pokemonName = "Squirtle" }) => {
  
  const { data: pokemon,
    isLoading,
    error,
  } = trpc.pokemon.getPokemon.useQuery({ name: pokemonName });

  if (isLoading) {
    return <Typography>Summoning Pikachu's lightning bolts ⚡ ...</Typography>
  }
  
  return (
    <Card variant="elevation" sx={{
      mb: 2,
      maxWidth: 400,
      mx: 'auto'
    }}>
      <CardContent>
        <Typography variant="h6">{pokemon?.name}</Typography>
        <Typography>ID: {pokemon?.id}</Typography>
        <Typography>Types: {pokemon?.types.join(', ')}</Typography>
        <Typography>ID: {pokemon?.sprite}</Typography>
        {/* <img src={pokemon?.sprite} alt={pokemon?.name} style={{ maxWidth: '100px' }} /> */}
      </CardContent>
    </Card>
  );
};

export default PokemonRow;
