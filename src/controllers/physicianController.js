const Physician = require("../models/Physician");
const Appointment = require("../models/Appointment");
const sequelize = require("sequelize");

const listAllPhysician = async (req, res) => {
  const physicians = await Physician.findAll({
    order: [["name", "ASC"]],
  }).catch((error) => {
    return res.status(500).json({ msg: "Falha na conexão.", error });
  });
  if (!physicians || physicians == undefined) {
    return res.status(404).json({ msg: "Não foi possivel encontrar médicos." });
  } else {
    return res.status(200).json({ physicians });
  }
};

const newPhysician = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(404).json({ msg: "Dados obrigatórios não foram preenchidos." });
  }

  const isPhysicianNew = await Physician.findOne({
    where: { email },
  });

  if (isPhysicianNew)
    return res.status(403).json({ msg: "Médico já cadastrado." });
  else {
    const physician = await Physician.create({
      name,
      email,
      password,
    }).catch((error) => {
      res.status(500).json({ msg: error.message });
    });

    if (physician)
      res.status(201).json({ msg: "Médico adicionado.", physician });
    else
      res.status(404).json({ msg: "Não foi possivel cadastrar novo médico." });
  }
};

const deletePhysician = async (req, res) => {
  const physicianId = req.params.id;
  const deletedPhysician = await Physician.destroy({
    where: { id: physicianId },
  }).catch(async (error) => {
    const physicianHasRef = await Appointment.findOne({
      where: { physicianId },
    }).catch((error) => {
      return res.status(500).json({ msg: "Falha na conexão.", error });
    });
    if (physicianHasRef)
      return res.status(403).json({ msg: "Médico possui agendamentos." });
  });
  if (deletedPhysician != 0) res.status(200).json({ msg: "Médico excluído" });
  else res.status(404).json({ msg: "Não foi possivel excluir médico." });
};

const updatePhysician = async (req, res) => {
  const  physician  = req.body;
  console.log(physician);
  if (!physician.id) return res.status(400).json({ msg: "Id vazia." });
  else {
    const physicianExists = await Physician.findByPk(physician.id);
    if (!physicianExists)
      return res.status(404).json({ msg: "Médico não encontrado." , physicianExists});
    else {
      if (physician.email || physician.name || physician.password) {
        await Physician.update(physician, {
          where: { id: physician.id },
        });
        return res.status(200).json({ msg: "Médico atualizado com sucesso." });
      } else {
        return res
          .status(400)
          .json({ msg: "Dados do Médico não foram preenchidos." });
      }
    }
  }
};

module.exports = {
  listAllPhysician,
  newPhysician,
  deletePhysician,
  updatePhysician,
};
