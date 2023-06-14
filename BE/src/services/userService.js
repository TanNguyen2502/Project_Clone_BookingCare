import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try{
			let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch(e){
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                });
                if(user){
                    let check = await bcrypt.compareSync(password, user.password);
                    if(check){ 
                        userData.errCode = 0;
                        userData.errMessage = 'Mật khẩu đúng';
                        delete user.password;
                        userData.user = user;
                    } else{
                        userData.errCode = 3;
                        userData.errMessage = 'Sai mật khẩu';
                    }
                } else{
                    userData.errCode = 2;
                    userData.errMessage = 'Tài khoản không tìm thấy!';
                }
            } else{
                userData.errCode = 1;
                userData.errMessage = 'Tài khoản đã có. Hãy thử lại';
            }
            resolve(userData);
        } catch(e){
            reject(e);
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: { email: userEmail }
            });
            if(user){
                resolve(true)
            } else{
                resolve(false)
            }
        } catch(e){
            reject(e);
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = '';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            } 
            resolve(users)
        } catch(e){
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            let check = await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    errMessage: 'Tài khoản đã được sử dụng'			
                })
            } else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({ 
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: 'Kết nối thành công'
                })
            }
        } catch(e){
            reject(e); 
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let foundUser = await db.User.findOne({
                where: { id: userId }
            })
            if(!foundUser){
                resolve({
                    errCode: 2,
                    errMessage: 'Tài khoản của bạn không tìm thấy!'
                })
            }
            await db.User.destroy({ 
                where: { id: userId } 
            })
            resolve({
                errCode: 0,
                message: 'Xóa thành công'
            });
        } catch(e){
            reject(e);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu dữ liệu nhập vào'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phoneNumber = data.phoneNumber;
                if(data.avatar){
                    user.image = data.avatar;
                }

                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Cập nhật thành công!'
                })
            } else{
                resolve({
                    errCode: 1,
                    errMessage: 'Không tìm thấy!'
                });
            } 
        } catch(e){
            reject(e);
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try{
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu dữ liệu nhập vào!'
                })
            } else{
                let res = {};
                let allCode = await db.AllCode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }
        } catch(e){
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService
}