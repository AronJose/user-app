const nodemailer = require('nodemailer');

module.exports = async (email, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587,
            secure:false,
            auth: {
                user: 'aron.jose.tblr@gmail.com',
                pass: 'vbxpyqbgttvlamyw'
            }
        });
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "verify",
            text: text
        });
        console.log("email send successFully");
        
    } catch (error) {
        console.log(error,"Email error")
        console.log("email not sent")
    }
}