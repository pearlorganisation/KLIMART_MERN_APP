const nodemailer = require("nodemailer");

// const sendEmail = async (options) => {
// create reusable transporter object using the default SMTP transport
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   // secure:true,
//   service: "gmail",
//   auth: {
//     user: process.env.SMTP_EMAIL,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// // send mail with defined transport object
// const message = {
//   from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
//   to: options.email, // list of receivers
//   subject: options.subject, // Subject line
//   text: options.message, // plain text body
// };

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_MAIL_PASSWORD,
    },
  });
  // const otp = generateOtp().toString();
  const mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        // console.log(mailData);
        // const otpDetails = { otp, email };
        resolve();
      }
    });
  });
};

module.exports = sendEmail;
