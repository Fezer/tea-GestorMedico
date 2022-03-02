const Sequelize = require("sequelize");

class Patient extends Sequelize.Model{
    static init(sequelize){
        super.init(
            {
                id: Sequelize.INTEGER,
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                phone: Sequelize.STRING
            },
            {
                sequelize,
            }
        );
    }
    static associate(models){
        this.hasMany(models.Appointment, { foreignKey: "patientId" } );
    }
}

module.exports = Patient;