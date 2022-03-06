const Patient = require("../models/Patient");
const sequelize = require("sequelize");

module.exports = {
  async listAllPatient(req, res) {
    const patients = await Patient.findAll({
      order: [["name", "ASC"]],
    }).catch((error) => {
      return res.status(500).json({ msg: "Falha na conexão." });
    });
    if (!patients || patients == undefined){
      return res.status(404).json({ msg: "Não foi possivel encontrar pacientes." });
    }else{
      return res.status(200).json({ patients });
    }
  },

  async createPatient(req, res) {
    const { name, email, phone } = req.body;
    if(!name || !email || !phone)
      return res.status(400).json({ msg: "Dados do paciente não foram preenchidos."});

    const isPatientNew = await Patient.findOne({
      where: { email },
    }).catch((error) => {
      return res.status(500).json({ msg: "Falha na conexão." });
    });

    if(isPatientNew)
      return res.status(403).json({ msg: "Paciente já cadastrado."});
    else {
      const patient = await Patient.create({
        name,
        email,
        phone,
      });
      
      if(patient)
        return res.status(201).json({ msg: "Novo paciente cadastrado com sucesso." });
      else
        return res.status(404).json({ msg: "Houve um erro na cadastro do paciente." });
    }
  },

  async updatePatient(req, res) {
    const patient = req.body;
    console.log(patient); 
    if(!patient.id || (!patient.name && !patient.email && !patient.phone))
      return res.status(400).json({ msg: "Dados do paciente não foram preenchidos."});
    else {
      const patientExists = await Patient.findByPk(patient.id).catch((error) => {
        return res.status(500).json({ msg: "Falha na conexão." });
      });
      if(!patientExists)
        return res.status(404).json({ msg: "Paciente não encontrado." });
      else {
        await Patient.update(patient, {
          where: {id: patient.id},
        });
        return res.status(200).json({ msg: "Paciente atualizado com sucesso." });
      }
    }
  },
}