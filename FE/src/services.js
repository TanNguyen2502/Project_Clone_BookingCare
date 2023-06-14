import axios from './axios';

const getAllUsers = (inputId) => {
	return axios.get(`/api/get-all-users?id=${inputId}`);
}
const createNewUserService = (data) => {
	return axios.post('/api/create-new-user', data);
}
const deleteUserService = (userId) => {
	return axios.delete('/api/delete-user', {
		data: {
			id: userId
		}
	});
}
const editUserService = (inputData) => {
	return axios.put('/api/edit-user', inputData);
}

const getDetailInforDoctor = (inputId) => {
	return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}

const getAllClinic = () => {
	return axios.get(`/api/get-clinic`);
}
const createNewClinic = (data) => {
	return axios.post('/api/create-new-clinic',data);
}
const getAllDetailClinicById = (data) => {
	return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}

const getAllSpecialty = () => {
	return axios.get(`/api/get-specialty`);
}
const createNewSpecialty = (data) => {
	return axios.post('/api/create-new-specialty', data);
}
const getAllDetailSpecialtyById = (data) => {
	return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}


const getAllPatientForDoctor = (data) => {
	return axios.get(`/api/get-list-patient-for-doctor?date=${data.date}`);
}
const postSendRemedy = (data) => {
	return axios.post('/api/send-remedy',data);
}
const postVerifyBookAppointment = (data) => {
	return axios.post('/api/verify-book-appointment', data);
}


const saveBulkScheduleDoctor = (data) => {
	return axios.post('/api/bulk-create-schedule', data);
}

const getAllCodeService = (inputType) => {
	return axios.get(`/api/allcode?type=${inputType}`);
}

const getScheduleDoctorByDate = (doctorId, date) => {
	return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctorById = (doctorId) => {
	return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}
const getProfileDoctorById = (doctorId) => {
	return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}
const getTopDoctorHomeService = (limit) => {
	return axios.get(`/api/top-doctor-home?limit=${limit}`);
}
const getAllDoctors = () => {
	return axios.get('/api/get-all-doctors');
}
const saveDetailDoctorService = (data) => {
	return axios.post('/api/save-infor-doctors', data);
}

const postPatientBookAppointment = (data) => {
	return axios.post('/api/patient-book-appointment', data);
}

export { 	
	getAllUsers, createNewUserService, deleteUserService, editUserService,
	getDetailInforDoctor, getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService, saveBulkScheduleDoctor, 
    getAllClinic, createNewClinic, getAllDetailClinicById, 
	getAllSpecialty, createNewSpecialty, getAllDetailSpecialtyById, 
	getAllPatientForDoctor, postSendRemedy, postVerifyBookAppointment, 
	
	getAllCodeService,
	getScheduleDoctorByDate,
	getExtraInforDoctorById, getProfileDoctorById, 
	postPatientBookAppointment,
} 

