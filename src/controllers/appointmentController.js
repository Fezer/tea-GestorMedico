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
            return res.status(404).json({ msg: "Não há consultas para listar." });
        }else{
            return res.status(200).json({ appointments });
        }
    },

    async newAppointment(req, res){
        const physicianId = req.body.physicianId;
        const patientId = req.body.patientId;
        const date = req.body.date;
        const time = req.body.time;
        const description = req.body.description;
        
        
        //Regra de negócio: não é obrigatório que exista description para a consulta.
        if(!physicianId || !patientId || !date || !time){
            return res.status(400).json({ msg: "Campos obrigatórios não informados." });
        } else{
            // Regra de negócio: todas as consultas possuem duração de 30 minutos.
            var minutosAdicionais = 29;
            var appointmentDate = new Date(date+'T'+time+'Z'); 
            var appointmentDateMore = new Date(appointmentDate.getTime() + minutosAdicionais * 60000);
            var appointmentDateLess = new Date(appointmentDate.getTime() - minutosAdicionais * 60000);

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
                                    appointmentDate: { [Op.between]: [ (appointmentDateLess), (appointmentDateMore) ] } 
                                }
                            ] 
                        },
                        {  
                            [Op.and]: [
                                { physicianId },
                                { 
                                    // appointmentDate: { [Op.between]: [ (appointmentDate - 29*60000), (appointmentDate + 29*60000) ] }
                                    appointmentDate: { [Op.between]: [ (appointmentDateLess), (appointmentDateMore) ] }
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
            const nAppointment = await Appointment.create({
                physicianId,
                patientId,
                appointmentDate,
                description
            }).catch((error) => {
                return res.status(500).json({ msg: "Não foi possível inserir dados." });
            });
            if(nAppointment){
                return res.status(201).json({ msg: "Consulta cadastrada com sucesso." });
            }else{
                return res.status(404).json({ msg: "Não foi possível cadastrar consulta." });
            }
        }
    },

    async searchAppointmentByPatientId(req, res){
        if (isNaN(req.params.id)){
            return res.status(400).json({ msg: "Id informado não é um número" });
        }else{
            const patientId = req.params.id;
            const appointment = await Appointment.findAll({
                where: { patientId },
                order: [[ "appointmentDate", "ASC" ]]
            }).catch((error) => {
                return res.status(500).json({ msg: "Erro de conexão." });
            });
            if(!appointment){
                return res.status(404).json({ msg: "Não foram encontradas consultas para o paciente informado." });
            }else{
                return res.status(200).json({ appointment });
            }
        }
    },

    async searchAppointmentByPhysicianId(req, res){
        if (isNaN(req.params.id)){
            return res.status(400).json({ msg: "Id informado não é um número." })
        }else{
            const physicianId = req.params.id;
            const appointment = await Appointment.findAll({
                where: { physicianId },
                order: [[ "appointmentDate", "ASC" ]]
            }).catch((error) => {
                return res.status(500).json({ msg: "Erro de conexão." });
            });
            if(!appointment){
                return res.status(404).json({ msg: "Não foram encontradas consultas para o médico informado." });
            }else{
                return res.status(200).json({ appointment });
            }
        }
    },

    async deleteAppointment(req, res){
        if (isNaN(req.params.id)){
            return res.status(400).json({ msg: "Id informado não é um número." })
        }else{
            const id = req.params.id;
            const appointment = await Appointment.findByPk(id).catch((error) => {
                return res.status(500).json({ msg: "Erro de conexão. "});
            });
            if(!appointment){
                return res.status(404).json({ msg: "Não foram encontradas consultas." });
            }else{
                await Appointment.destroy({
                    where: { id }
                }).catch((error) => {
                    return res.status(500).json({ msg: "Erro ao deletar consulta." });
                });
                return res.status(200).json({ msg: "Consulta deletada com sucesso." });
            }
        }
    }
};