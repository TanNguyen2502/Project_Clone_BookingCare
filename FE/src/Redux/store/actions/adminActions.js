import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, 
            deleteUserService, editUserService, getTopDoctorHomeService, 
            getAllDoctors, saveDetailDoctorService, getAllSpecialty, 
            getAllClinic } from '../../../services.js'; 
// import { ROW_SELECT_DISABLED  } from 'react-bootstrap-table-next';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try{
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data));
            } else{ 
                dispatch(fetchGenderFailed());
            }
        } catch(e){
            dispatch(fetchGenderFailed());
            console.log('Lỗi fetchGender:', e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data));
            } else{ 
                dispatch(fetchPositionFailed());
            }
        } catch(e){
            dispatch(fetchPositionFailed());
            console.log('fetchPosition error:',e)
        }
    }
}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data));
            } else{ 
                dispatch(fetchRoleFailed());
            }
        } catch(e){
            dispatch(fetchRoleFailed());
            console.log('fetchRole error:', e)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try{
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                alert('Đã lấy dữ liệu');
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else{ 
                dispatch(saveUserFailed());
            }
        } catch(e){
            dispatch(saveUserFailed());
            console.log('saveUserFailed error:', e)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try{
            let res = await getAllUsers("ALL");
            if(res){
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else{
                alert('Fetch all users error --1!');
                dispatch(fetchAllUsersFailed());
            }
            //LỖI: HÀM IF
            // if(res && res.errCode === 0){
            //     dispatch(fetchAllUsersSuccess(res.users.reverse()))
            // } else{
            //     alert('Fetch all users error --1!');
            //     dispatch(fetchAllUsersFailed());
            // }
        } catch(e){
            alert('Fetch all users error!');
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error', e)
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try{
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
                alert('Xóa thành công!');
				dispatch(deleteUserSuccess());
				dispatch(fetchAllUsersStart());
            } else{
                alert('Xóa thất bại!');
                dispatch(deleteUserFailed());
            }
        } catch(e){
            alert('Xóa bị lỗi!');
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})    
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try{
            let res = await editUserService(data);
            if(res && res.errCode === 0){
                alert('Cập nhật thành công!');
				dispatch(editUserSuccess());
				dispatch(fetchAllUsersStart());
            } else{ 
				alert('Cập nhật lỗi!');
                dispatch(editUserFailed());
            }
        } catch(e){
			alert('Cập nhật lỗi!');    
            dispatch(editUserFailed());
            console.log('EditUserFailed error:', e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async(dispatch, getState) => {
        try{
            let res = await getTopDoctorHomeService('');
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch(e){
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async(dispatch, getState) => {
        try{
            let res = await getAllDoctors();
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch(e){
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async(dispatch, getState) => {
        try{
            let res = await saveDetailDoctorService(data);
            if(res){
                alert('Đã lưu dữ liệu');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else{
                alert('Lỗi lưu dữ liệu');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch(e){
            alert('Lỗi lưu dữ liệu');
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async(dispatch, getState) => {
        try{
            let res = await getAllCodeService("TIME");
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else{
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch(e){
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const getAllRequiredDoctorInfor = () => {
    return async(dispatch, getState) => {
        try{
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if( resPrice && resPrice.errCode === 0 
                && resPayment && resPrice.errCode === 0 
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0) {
                    let data = {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data,
                        resSpecialty: resSpecialty.data,
                        resClinic: resClinic.data
                    }
                dispatch(fetchRequiredDoctorInForSuccess(data));
            } else{
                dispatch(fetchRequiredDoctorInForFailed());
            }
        } catch(e){
            dispatch(fetchRequiredDoctorInForFailed());
            console.log('fetchRequiredDoctorInFor ERROR:', e)
        }
    }
}
export const fetchRequiredDoctorInForSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInForFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
})