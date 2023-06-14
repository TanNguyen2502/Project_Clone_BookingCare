const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_bookingcare', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Kết nối dữ liệu thành công!');
    } catch(e) {
        console.error('Không thể kết nối dữ liệu: ', e);
    }
}

module.exports = connectDB;