module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Appointments",
      [
        {
          physicianId: 1,
          patientId: 1,
          appointmentDate: "2021-05-10",
          description: "Cariotica nasticulal"
        },
        {
          physicianId: 1,
          patientId: 2,
          appointmentDate: "2021-05-11",
          description: "Macintosh neuratoide"
        },
        {
          physicianId: 2,
          patientId: 2,
          appointmentDate: "2021-05-12",
          description: "Circuitoide resistivo"
        },
        {
          physicianId: 2,
          patientId: 3,
          appointmentDate: "2021-06-12",
          description: "Caso de Nulidade Ponteiral"
        },
        {
          physicianId: 3,
          patientId: 4,
          appointmentDate: "2021-06-01",
          description: "Sindrome do Aluno Cansado"
        },
        {
          physicianId: 3,
          patientId: 5,
          appointmentDate: "2021-06-03",
          description: "Falta de sono aguda grave"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Appointments",
      null,
      {}
    );
  },
};
