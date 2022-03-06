const Physician = require("../models/Physician");
const sequelize = require("sequelize");

module.exports = {
  async listAllPhysician(req, res) {
    const physicians = await Physician.findAll({
      order: [["name", "ASC"]],
    }).catch((error) => {
      return res.status(500).json({ msg: "Falha na conexão." });
    });
    if (!physicians || physicians == undefined){
      return res.status(404).json({ msg: "Não foi possivel encontrar médicos." });
    }else{
      return res.status(200).json({ physicians });
    }
  },
}