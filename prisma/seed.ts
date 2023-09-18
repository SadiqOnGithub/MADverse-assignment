import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = [
  {
    name: "Bulbasaur",
    sprite: "https://pokemon.com/pictures/bulbasaur.png",
    types: ["grass"],
  },
  {
    name: "Charmander",
    sprite: "https://pokemon.com/pictures/charmander.png",
    types: ["fire"],
  },
  {
    name: "Squirtle",
    sprite: "https://pokemon.com/pictures/squirtle.png",
    types: ["water"],
  },
  {
    name: "Pikachu",
    sprite: "https://pokemon.com/pictures/pikachu.png",
    types: ["electric"],
  },
  {
    name: "Jigglypuff",
    sprite: "https://pokemon.com/pictures/jigglypuff.png",
    types: ["normal", "fairy"],
  },
  {
    name: "Eevee",
    sprite: "https://pokemon.com/pictures/eevee.png",
    types: ["normal"],
  },
  {
    name: "Pidgey",
    sprite: "https://pokemon.com/pictures/pidgey.png",
    types: ["normal", "flying"],
  },
  {
    name: "Machop",
    sprite: "https://pokemon.com/pictures/machop.png",
    types: ["fighting"],
  },
  {
    name: "Geodude",
    sprite: "https://pokemon.com/pictures/geodude.png",
    types: ["rock", "ground"],
  },
  {
    name: "Magikarp",
    sprite: "https://pokemon.com/pictures/magikarp.png",
    types: ["water"],
  }
];

async function seedDatabase() {
  const createdPokemon = [];

  for (const item of seedData) {
    const typeNames = item.types;
    item.types = []; // Clear the types array in the Pokemon data

    const existingTypes = await Promise.all(
      typeNames.map(async (typeName) => {
        const existingType = await prisma.type.findFirst({
          where: { name: typeName },
        });

        if (existingType) {
          return existingType;
        } else {
          return prisma.type.create({ data: { name: typeName } });
        }
      })
    );

    const pokemon = await prisma.pokemon.create({
      data: {
        ...item,
        types: { connect: existingTypes.map((type) => ({ id: type.id })) },
      },
    });

    createdPokemon.push(pokemon);
  }

  return createdPokemon;
}

seedDatabase()
  .then((createdPokemon) => {
    console.log("Seed data added successfully:", createdPokemon);
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

