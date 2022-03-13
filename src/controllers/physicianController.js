const Physician = require("../models/Physician");
const Appointment = require("../models/Appointment");
const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function passwordValidation (password){
  if(password.length < 8){
    return "A senha deve possuir no mínimo 8 caracteres.";
  }else if(!password.match(/[a-zA-Z]/g)){
    return "A senha deve conter no mínimo uma letra.";
  }else if(!password.match(/[0-9]+/)){
    return "A senha deve conter no mínimo um número.";
  }else{
    return "OK";
  }
};

function hashPassword (password){
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

function generateToken(id){
  process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 82800,
  });
  return token;
};

const authentication = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(400).json({ msg: "Campos obrigatórios não informados." });
  }
  try{
    const physician = await Physician.findOne({
      where: { email },
    });
    if(!physician){
      return res.status(404).json({ msg: "Médico não encontrado." });
    } else{
      if (bcrypt.compareSync(password, physician.password)){
        const token = generateToken(physician.id);
        return res.status(200).json({ msg: "Autenticado com sucesso.", token });
      }else{
        return res.status(404).json({ msg: "Usuário ou senha inválidos." });
      }
    }
  } catch(error){
    return res.status(500).json(error);
  }
};

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
    return res.status(404).json({ msg: "Dados obrigatórios não foram preenchidos." });
  }

  const passwordValid = passwordValidation(password);
  if(passwordValid != "OK" ){
    return res.status(400).json({ msg: passwordValid });
  }

  const isPhysicianNew = await Physician.findOne({
    where: { email },
  });

  if (isPhysicianNew)
    return res.status(403).json({ msg: "Médico já cadastrado." });
  else {
    const hash = hashPassword(password);
    const physician = await Physician.create({
      name,
      email,
      password: hash,
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
  const physicianId = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  if (!physicianId){
    return res.status(400).json({ msg: "Id vazia." });
  }else {
    const physicianExists = await Physician.findByPk(physicianId).catch((error) => {
      res.status(500).json({ msg: "Erro de conexão." });
    });
    if (!physicianExists)
      return res.status(404).json({ msg: "Médico não encontrado." });
    else {
      if (name && email) {
        const emailExists = await Physician.findOne({
          where: { email },
        });
        if(emailExists && emailExists.id != physicianId){
          return res.status(403).json({ msg: "Email já cadastrado." });
        }else{
          await Physician.update({ name: name, email: email }, {
            where: { id: physicianId }
          }).catch((error) => {
            return res.status(500).json({msg: "Erro de conexão."});
          });
          return res.status(200).json({ msg: "Médico atualizado com sucesso." });
        } 
      }else {
        return res.status(400).json({ msg: "Dados do Médico não foram preenchidos." });
      }
    }
  }
};

module.exports = {
  authentication,
  listAllPhysician,
  newPhysician,
  deletePhysician,
  updatePhysician,
};
