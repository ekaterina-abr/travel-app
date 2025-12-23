"use strict";
const { DestinationId } = require("../types.ts");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    console.log("Migration UP");
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      savedDestinations: {
        type: Sequelize.ARRAY(Sequelize.ENUM(...Object.values(DestinationId))),
        defaultValue: [],
        field: "savedDestinations",
        Model: {
          getTableName() {
            return "users";
          },
        },
      },
    });
    await queryInterface.createTable("destinations", {
      id: {
        type: Sequelize.ENUM(...Object.values(DestinationId)),
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      isoCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      savedTimes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("destinations");
  },
};
