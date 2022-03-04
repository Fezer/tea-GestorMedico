const Physician = require("../models/Physician");

module.exports = {
  async listAllPhysician(req, res) {
    const physicians = await Physician.findAll({
      order: [["name", "ASC"]],
    }).catch((error) => {
      res.status(500).json({ msg: "Falha na conexão." });
    });
    if (physicians) res.status(200).json({ physicians });
    else res.status(404).json({ msg: "Não foi possivel encontrar médicos." });
  },
};
