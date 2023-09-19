import { z } from 'zod';
import { procedure, router } from '../trpc';
import { pokemon } from './pokemon';

export const appRouter = router({
  hello: procedure
    .input(z.string())
    .query((opts) => {
      return {
        greeting: `hello ${opts.input}`,
      };
    }),
  pokemon,
});

// export type definition of API
export type AppRouter = typeof appRouter;