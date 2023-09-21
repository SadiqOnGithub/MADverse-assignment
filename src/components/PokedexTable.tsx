import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { type GetPokemonOutput } from '@/server/routers/pokemon';


type Props = {
  pokemons: GetPokemonOutput[];
};

function PokedexTable({ pokemons }: Props) {
  return (
    <>
      <Paper elevation={10} sx={{p: 2}}>
        <TableContainer component={Paper} sx={{ maxHeight: 440 }} >
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell >Name</TableCell>
                <TableCell align="center">Types</TableCell>
                <TableCell align="right">ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pokemons?.map((pokemon) => (
                <TableRow
                  key={pokemon.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ p: 0 }}>
                    <Avatar alt={pokemon?.name}
                      src={pokemon?.sprite}
                      sx={{ width: 70, height: 70 }}
                    />
                  </TableCell>
                  <TableCell>
                    {pokemon.name.toUpperCase()}
                  </TableCell>
                  <TableCell align="center">
                    {pokemon?.types.join(', ').toUpperCase()}
                  </TableCell>
                  <TableCell align="right">
                    {pokemon.id}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default PokedexTable;