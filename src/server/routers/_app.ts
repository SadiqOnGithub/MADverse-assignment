import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  userList: procedure
    .input(z.string())
    .query(async ({ input }) => {
      console.log("input query received: ", input);

      // retive users from db
      const userList = Array(3).fill({ userName: input });
      console.log("userList Fetched: ", userList);
      return userList;
    }),
  userCreate: procedure
    .input(z.string())
    .mutation(async ({ input }) => {
      console.log("mutaion recieved: ", input);

      // create user in db

      const userCreated = { name: input };
      console.log("user created: ", userCreated);
      return userCreated;
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;