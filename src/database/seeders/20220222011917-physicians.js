module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Physicians",
      [
        {
          name: "Clodoaldo Pereira",
          email: "clodoaldo@mail.com",
          password: "$2a$12$0pWQzXQlnowht82JPdVmFuNhfyD49xAN4oViOGOkTRUB/gbeMfy5C", //1234567a
        },
        {
          name: "Afonso Fonso",
          email: "afonso@mail.com",
          password: "$2a$12$0pWQzXQlnowht82JPdVmFuNhfyD49xAN4oViOGOkTRUB/gbeMfy5C", //1234567a
        },
        {
          name: "Jezinasio Anastacio",
          email: "jezi@mail.com",
          password: "$2a$12$0pWQzXQlnowht82JPdVmFuNhfyD49xAN4oViOGOkTRUB/gbeMfy5C", //1234567a
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Physicians", null, {});
  },
};
