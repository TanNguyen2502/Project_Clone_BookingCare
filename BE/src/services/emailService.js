require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });
    
    let info = await transporter.sendMail({
        from: '"BookingCare 👻" <xmlxlstan3476@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Xác nhận lịch đặt khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend),
    });
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi'){
        result = 
            `
                <h3> Xin chào ${dataSend.patientName} ! </h3>
                <p> Bạn nhận được thư này vì đã đặt lịch khám bệnh trên trang BookingCare của chúng tôi. </p>
                <p> Thông tin mà bạn đã điền: </p>
                <div> <b> Thời gian: ${dataSend.time} </b> </div>
                <div> <b> Bác sĩ: ${dataSend.doctorName} </b> </div>
                <p> Nếu các thông tin đã đúng, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất việc đặt lịch khám </p>
                <div>
                <a href = ${dataSend.redirectLink} target="_blank"> Click here </a>
                </div>
                <div> BookingCare xin chân thành cảm ơn bạn đã sử dụng dịch vụ </div>
            ` // html body
    }
    if(dataSend.language === 'en'){
        result = 
            `
                <h3> Dear ${dataSend.patientName} ! </h3>
                <p> You received this message because you booked an appointment on our BookingCare page. </p>
                <p> Information that you have filled in: </p>
                <div> <b> Time: ${dataSend.time} </b> </div>
                <div> <b> Doctor: ${dataSend.doctorName} </b> </div>
                <p> If the information is correct, please click on the link below to confirm and complete the appointment </p>
                <div>
                <a href = ${dataSend.redirectLink} target="_blank"> Click here </a>
                </div>
                <div> BookingCare would like to thank you for using the service </div>
            ` // html body
    }
    return result;
}
let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if(dataSend.language === 'vi'){
        result = 
            `
                <h3> Xin chào ${dataSend.patientName} ! </h3>
                <p> Bạn nhận được thư này vì đã đặt lịch khám bệnh trên trang BookingCare của chúng tôi. </p>
                <p> Thông tin đơn thuốc / hóa đơn được gửi trong file đính kèm. </p>
                <div> BookingCare xin chân thành cảm ơn! </div>
            ` // html body
    }
    if(dataSend.language === 'en'){
        result = 
            `
                <h3> Dear ${dataSend.patientName} ! </h3>
                <p> You received this message because you booked an appointment on our BookingCare page. </p>
                <p> ... </p>
                <div> BookingCare would like to thank you! </div>
            ` // html body
    }
    return result;
}
let sendAttachment = async (dataSend) => {
    return new Promise(async(resolve, reject) => {
        try{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
            });

            let info = await transporter.sendMail({
                from: '"BookingCare 👻" <xmlxlstan3476@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt khám bệnh", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.jpg`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            });
            resolve(true)
        } catch(e){
            reject(e);
        }
    })
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}