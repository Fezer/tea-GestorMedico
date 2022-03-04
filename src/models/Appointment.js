const Sequelize = require("sequelize");

class Appointment extends Sequelize.Model{
    static init(sequelize){
        super.init(
            {
                physicianId: Sequelize.INTEGER,
                patientId: Sequelize.INTEGER,
                appointmentDate: Sequelize.DATE,
                description: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }
    static associate(models){
        this.belongsTo(models.Physician, { foreignKey: "physicianId" });
        this.belongsTo(models.Patient, { foreignKey: "patientId" });
    }
}

module.exports = Appointment;