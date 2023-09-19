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

      return pokemon;
    })
});