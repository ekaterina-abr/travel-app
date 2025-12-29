"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.renameColumn("users", "createdAt", "created_at");
    queryInterface.renameColumn(
      "users",
      "savedDestinations",
      "saved_destinations"
    );
    queryInterface.renameColumn("destinations", "icoCode", "iso_code");
    queryInterface.renameColumn("destinations", "savedTimes", "saved_times");
  },

  async down(queryInterface, Sequelize) {
    queryInterface.renameColumn("users", "created_at", "createdAt");
    queryInterface.renameColumn(
      "users",
      "saved_destinations",
      "savedDestinations"
    );
    queryInterface.renameColumn("destinations", "iso_code", "icoCode");
    queryInterface.renameColumn("destinations", "saved_times", "savedTimes");
  },
};
