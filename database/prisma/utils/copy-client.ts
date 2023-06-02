const {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmdirSync,
  unlinkSync,
} = require("fs");
const { join } = require("path");

/*
 * What it does?
 * 1) Copy Prisma Query Engine to /.prisma/client folder
 * 2) Remove copies in individual clients (node_modules/prisma-<client>/)
 *
 * The goal is to save storage in lambda functions by having only one copy of the engine
 */

const clients = ["eth", "governance", "social"];

const run = async () => {
  try {
    const databaseDir = process.cwd();
    const mainDir = join(databaseDir, ".");
    const globalPrismaDir = join(mainDir, ".prisma/");

    const engineFileName = getEngineFileName(
      join(mainDir, "node_modules", `prisma-${clients[0]}`)
    );

    // Remove current .prisma
    if (existsSync(globalPrismaDir)) {
      rmdirSync(globalPrismaDir, { recursive: true });
    }

    // Copy engine to .prisma
    mkdirSync(globalPrismaDir);
    mkdirSync(join(globalPrismaDir, "client"));
    copyFileSync(
      join(mainDir, "node_modules", `prisma-${clients[0]}`, engineFileName),
      join(globalPrismaDir, "client", engineFileName)
    );

    // Remove engine from individual clients
    for (const client of clients) {
      const clientEngine = join(
        mainDir,
        "node_modules",
        `prisma-${client}`,
        engineFileName
      );
      unlinkSync(clientEngine);
    }

    console.info(`Copied Prisma engine (${globalPrismaDir}${engineFileName}) `);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

function getEngineFileName(prismaDir: string) {
  return readdirSync(prismaDir).filter((file) => file.match(/engine/))[0];
}

run();
