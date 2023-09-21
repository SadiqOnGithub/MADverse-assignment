import { router, procedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';


export const pokemon = router({
  getPokemon: procedure
    .input(z.object({
      name: z.string()
    }))
    .query(async ({ input, ctx }) => {
      const { name } = input;
      const pokemon = await ctx.prisma.pokemon.findFirst({
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
      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((type) => type.name),
        sprite: pokemon.sprite,
      };
    }),

  // Procedure to get all Pokémon names
  getPokemonNames: procedure
    .query(async ({ ctx }) => {
      const allPokemonNames = await ctx.prisma.pokemon.findMany({
        select: {
          name: true,
        },
      });

      if (!allPokemonNames) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Pokemon found`,
        });
      }

      return allPokemonNames.map((pokemon) => pokemon.name).sort();
    }),

  // get pokemon's types
  getPokemonTypes: procedure
    .query(async ({ ctx }) => {
      const response = await ctx.prisma.type.findMany({
        select: {
          name: true,
        }
      });

      if (!response) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Type found`,
        });
      }

      const typeNames = response.map((type) => type.name);
      return typeNames;
    }),

  // get pokemons by an array of names
  getPokemonByNames: procedure
    .input(z.array(z.string()))
    .query(async ({ input, ctx }) => {
      const pokemonsArr = await ctx.prisma.pokemon.findMany({
        where: {
          name: {
            in: input,
          },
        },
        include: {
          types: true,
        },
      });

      if (!pokemonsArr) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Pokemon with these names '${input.join(', ')}'`,
        });
      }

      return pokemonsArr.map((pokemon: any) => ({
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((type: any) => type.name),
        sprite: pokemon.sprite,
      }));
    }),

  // get pokemons by types
  getPokemonByType: procedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const pokemonsArr = await ctx.prisma.type.findFirst({
        where: {
          name: input,
        },
        include: {
          pokemon: true
        },
      });

      if (!pokemonsArr) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No Pokemon with type '${input}'`,
        });
      }
      return pokemonsArr.pokemon
        .map((pokemon) => ({ types: [input], ...pokemon }))  // adding the missing types
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