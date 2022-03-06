const Patient = require("../models/Patient");
const sequelize = require("sequelize");

module.exports = {
  async listAllPatient(req, res) {
    console.log("listAllPatient");
    const patients = await Patient.findAll({
      order: [["name", "ASC"]],
    }).catch((error) => {
      return res.status(500).json({ msg: "Falha na conexão." });
    });
    if (!patients || patients == undefined){
      return res.status(404).json({ msg: "Não foi possivel encontrar médicos." });
    }else{
      return res.status(200).json({ patients });
    }
  },

  
}