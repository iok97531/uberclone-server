import dotenv from 'dotenv';
import Mailgun from 'mailgun-js';
dotenv.config();

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_APIKEY || '',
    domain: process.env.MAILGUN_DOMAIN || ''
});

const sendEmail = (subject:string, html:string) => {
    const emailData = {
        from: "iok97531@gmail.com",
        to: "iok97531@gmail.com",
        subject,
        html
    }
    return mailGunClient.messages().send(emailData);
}

export const sendVerificationEmail = (fullName:string, key:string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://a.com/verification${key}/">here</a>`;
    return sendEmail(emailSubject, emailBody);
}