const cron = require('node-cron');
const nodemailer = require('nodemailer');


function sendEmailNotification() {
 
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:587,
    secure: false,
    auth: {
      user: 'gowthamtanu2000@gmail.com',
      pass: 'xixf umes cbfj mnjy'
    }
  })
  // Email message options
  const mailOptions = {
    from: 'gowthamtanu2000@gmail.com',
    to: 'gowthamtanu2000@gmail.com',
    subject: 'EMAIL SCHEDULE',
    text: "WELCOME EMAIL SCHEDULE?", 
    html: "<p>Hello,</p><p>Welcome to Gozen.</p><p>Form submission is completed. Our Team will reach immediatly</p><p>Best regards,<br>GOZEN</p>"
  }

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Define cron job to send email notifications  at  Sunday March 31'st 9:00 AM
//'0 0 28-31 * *' use the following for last week every Month
cron.schedule('58 22 27 3 3', () => {
  console.log('Sending email notification...');
  sendEmailNotification()
}, {
  timezone: 'Asia/Kolkata' // Set the timezone as per your requirement
})
sendEmailNotification()
console.log('Cron job scheduled to send email notifications every day at 9:00 AM.');
