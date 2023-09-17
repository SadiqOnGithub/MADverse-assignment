import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

export const createContext = async ( opts: CreateNextContextOptions) => {
  return {
    opts
  }
};

// you can also create inner context and infer from it only. maybe usefull for testing
export type Context = inferAsyncReturnType<typeof createContext>

/*
btw if we create inner and outer sperate then what will be used here? inner or outer?

>>>>>>> pages/api/trpc/[trpc].tx 
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
*/