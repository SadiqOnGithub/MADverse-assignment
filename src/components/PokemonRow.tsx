import React from 'react';
import { Typography, Card, Box, Avatar } from '@mui/material';
import { trpc } from '@/utils/trpc';

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

  if (isLoading && !pokemon) {
    return <Typography>Summoning Pikachu's lightning bolts ⚡ ...</Typography>;
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row', // Arrange content in a row
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 'auto',
        // mt: 3,
        px: 2,
        pr: '5%',
      }}
    >
      <Avatar
        sx={{ width: 100, height: 100, marginRight: 2 }}
        alt={pokemon?.name}
        src={pokemon?.sprite}
      />

      <Box >
        {pokemon?.name.toUpperCase()}
      </Box>
      <Box >
        {pokemon?.types.join(', ').toUpperCase()}
      </Box>
      <Box >
        {pokemon?.id}
      </Box>
    </Card>

  );
};

export default PokemonRow;
