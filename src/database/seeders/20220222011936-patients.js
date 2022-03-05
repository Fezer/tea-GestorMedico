module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Patients",
      [
        {
          name: "Cleiton Noteilc",
          email: "cleiton@mail.com",
          phone: "1235678",
        },
        {
          name: "Alonson Onson",
          email: "alonson@mail.com",
          phone: "1235678",
        },
        {
          name: "Cleonasto Pirim",
          email: "cleorim@mail.com",
          phone: "1235678",
        },
        {
          name: "Peritonio Meiose",
          email: "periose@mail.com",
          phone: "1235678",
        },
        {
          name: "Mesoclasto Idalgo",
          email: "migaldo@mail.com",
          phone: "1235678",
        },
        {
          name: "Gerundiano Plural",
          email: "gerural@mail.com",
          phone: "1235678",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Patients",
      null,
      {}
    );
  },
};
