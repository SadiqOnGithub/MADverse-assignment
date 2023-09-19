import { router, procedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/server/prisma';

export const pokemon = router({
  getPokemon: procedure
    .input(z.object({
      name: z.string()
    }))
    .query(async ({ input }) => {
      const { name } = input;
      const pokemon = await prisma.pokemon.findFirst({
        where: { name },
        include: {
          types: true,
        },
      });

      if (!pokemon) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Pokemon with name '${name}'`,
        });
      }

      // Transform the Prisma data into the desired format
      const formattedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((type) => type.name),
        sprite: pokemon.sprite,
      };

      return formattedPokemon;
    }),

  // Procedure to get all Pokémon names
  getAllPokemonNames: procedure
    .query(async () => {
      const allPokemonNames = await prisma.pokemon.findMany({
        select: {
          name: true,
        },
      });

      return allPokemonNames.map((pokemon) => pokemon.name).sort();
    }),

});


// Define the input and output types for the query
export type GetPokemonInput = {
  name: string;
};

export type GetPokemonOutput = {
  id: number;
  name: string;
  types: string[];
  sprite: string;
};