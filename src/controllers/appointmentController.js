const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Physician = require("../models/Physician");
const sequelize = require("sequelize");

module.exports = {


    async listAllAppointments(req, res){
        const appointments = await Appointment.findAll({
            order: [["appointmentDate", "ASC"]],
        }).catch((error) => {
            return res.status(500).json({ msg: "Erro de conexão" });
        });
        if(!appointments){
            return res.status(404).json({ msg: "Não há consultas para listar" });
        }else{
            return res.status(200).json({ appointments });
        }
    },


    // Regra de negócio: todas as consultas possuem duração de 30 minutos.
    async newAppoitment(req, res){
        const physicianId = req.body.physicianId;
        const patientId = req.body.patientId;
        const date = req.body.date;
        const time = req.body.time;
        const description = req.body.description;

        const appointmentDate = date + " " + time;

        console.log(physicianId);
        console.log(patientId);
        console.log(appointmentDate);
        console.log(description);

        //Regra de negócio: não é obrigatório que exista desription para a consulta.
        if(!physicianId || !patientId || !appointmentDate){
            return res.status(400).json({ msg: "Campos obrigatórios não informados." });
        }
        const patient = await Patient.findByPk(patientId).catch((error) => {
            return res.status(500).json({ msg: "Erro de conexão." });
        });
        if(!patient){
            return res.status(404).json({ msg: "Paciente não encontrado." });
        }
        const physician = await Physician.findByPk(physicianId).catch((error) => {
            return res.status(500).json({ msg: "Erro de conexão." });
        });
        if(!physician){
            return res.status(404).json({ msg: "Médico não encontrado." });
        }
        const Op = sequelize.Op;
        const appointment = await Appointment.findOne({
            where: { 
                [Op.or]: [
                    { 
                        [Op.and]: [
                            { patientId },
                            { 
                                // appointmentDate: { [Op.between]: [ (appointmentDate - 29*60000), (appointmentDate + 29*60000) ] } 
                                appointmentDate: { [Op.between]: [ (appointmentDate), (appointmentDate) ] } 
                            }
                        ] 
                    },
                    {  
                        [Op.and]: [
                            { physicianId },
                            { 
                                // appointmentDate: { [Op.between]: [ (appointmentDate - 29*60000), (appointmentDate + 29*60000) ] }
                                appointmentDate: { [Op.between]: [ (appointmentDate), (appointmentDate) ] }
                            }
                        ]
                    }
                ]
            }
        }).catch((error) => {
            return res.status(500).json({ msg: "Erro de conexão" });
        });
        if(appointment){
            return res.status(404).json({ msg: "Médico ou paciente já possuem consulta no período informado." });
        }
        const nAppoitment = await Appointment.create({
            physicianId,
            patientId,
            appointmentDate,
            description
        }).catch((error) => {
            return res.status(500).json({ msg: "Não foi possível inserir dados." });
        });
        if(nAppoitment){
            return res.status(201).json({ msg: "Consulta cadastrada com sucesso." });
        }else{
            return res.status(404).json({ msg: "Não foi possível cadastrar consulta." });
        }
    }
};