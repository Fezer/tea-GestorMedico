module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Physicians",
      [
        {
          name: "Clodoaldo Pereira",
          email: "clodoaldo@mail.com",
          password: "123",
        },
        {
          name: "Afonso Fonso",
          email: "afonso@mail.com",
          password: "123",
        },
        {
          name: "Jezinasio Anastacio",
          email: "jezi@mail.com",
          password: "123",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Physicians",
      null,
      {}
    );
  }
};
