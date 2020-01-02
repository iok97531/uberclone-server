import dotenv from 'dotenv';
import Twilio from 'twilio';
dotenv.config();

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export const sendSMS = (to: string, body: string) => {
    return twilioClient.messages.create({
        body,
        to,
        from: process.env.TWILIO_PHONE
    });
};

export const sendVerificationSMS = (to: string, key: string) => sendSMS(to, `verification key is: ${key}`);