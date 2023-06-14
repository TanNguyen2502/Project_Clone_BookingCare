import patientService from '../services/patientService';

let postBookAppointment = async (req, res) => {
    try{
        let infor = await patientService.postBookAppointment(req.body);
        return res.status(200).json(infor);
    } catch(e){
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi từ server'
        })
    }
}
let postVerifyBookAppointment = async (req, res) => {
    try{
        let infor = await patientService.postVerifyBookAppointment(req.body);
        return res.status(200).json(infor);
    } catch(e){
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Lỗi từ server'
        })
    }
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}