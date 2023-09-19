import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NUMBER_OF_POKEMON_TO_SEED = 100; // Change this to the desired number of Pokemon

async function seedDatabase() {
  const seedData = await fetchAllPokemonData();

  for (const item of seedData) {

    // checking if types exist or not; creating types if not exist in db
    const typeNames = item.types;
    item.types = []; // Clear the types array in the Pokemon data
    const existingTypes = await Promise.all(
      typeNames.map(async (typeName: string) => {     // checking the existance of each type
        const existingType = await prisma.type.findFirst({
          where: { name: typeName },
        });

        if (existingType) {
          return existingType;
        } else {
          return prisma.type.create({ data: { name: typeName } }); // creating types
        }
      })
    );

    // creating the pokemon and connecting to the relevant type/types
    const pokemon = await prisma.pokemon.create({
      data: {
        ...item,
        types: { connect: existingTypes.map((type) => ({ id: type.id })) },
      },
    });
  }

  return seedData.length;
}


seedDatabase()
  .then((numOfPokemons) => {
    console.log(`Successfully added ${numOfPokemons} Pokemons 🎉`);
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



async function fetchPokemonData(index: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
  const pokemon = await res.json();
  return {
    name: pokemon.name,
    sprite: pokemon.sprites.front_default,
    types: pokemon.types.map((t: any) => t.type.name)
  };
};

async function fetchAllPokemonData() {
  const promises = Array(NUMBER_OF_POKEMON_TO_SEED)
    .fill(null)
    .map((_, index) => fetchPokemonData(index));

  return await Promise.all(promises);
};