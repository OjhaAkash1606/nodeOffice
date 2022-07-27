// https://myaccount.google.com/lesssecureapps

const nodeMailer = require("nodemailer");

const transport = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "khemchand1619@gmail.com",
    pass: "PRAKASH@1619"
  }
});

const mailOptions = {
  from: "khemchand1619@gmail.com",
  to: "kevinautotradetech@gmail.com",
  subject: "For testing",
  text: "This mail sent only for testing via server "
};

transport.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email has been sent", info.response);
  }
});
