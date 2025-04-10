module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("photos", "tags", {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      defaultValue: [],
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("photos", "tags");
  },
};
