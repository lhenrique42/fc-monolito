import { Sequelize } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    const queryInterface = sequelize.getQueryInterface();
    await queryInterface.createTable("products", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        purchasePrice: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        salesPrice: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        stock: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });

    await sequelize.sync();
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.drop();
};
