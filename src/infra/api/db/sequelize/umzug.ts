import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
});

console.log(__dirname);

export const migrator = new Umzug({
    migrations: {
        glob: ["../migrations/*.ts", { cwd: __dirname }],
    },
    context: sequelize,
    storage: new SequelizeStorage({
        sequelize,
    }),
    logger: console,
    create: {
        folder: "src/infra/api/db/sequelize/migrations",
    },
});

export type Migration = typeof migrator._types.migration;
