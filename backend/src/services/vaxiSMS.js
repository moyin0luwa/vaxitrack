import africastalking from 'africastalking';
import dotenv from 'dotenv';

dotenv.config();
// Initialize the Africa's Talking SDK
const vaxitalking = africastalking({
  apiKey: process.env.AFRICASTALKING_API_KEY,
  username: process.env.AFRICASTALKING_USERNAME
});

const sms = vaxitalking.SMS;

export const sendVaccinationReminder = async ({ phoneNumber, patientName, vaccineName, nextDoseDue }) => {
  const formattedDate = new Date(nextDoseDue).toDateString();
  const message = `Dear ${patientName}, your child's next dose of ${vaccineName} is due on ${formattedDate}. Please take note of this so as not to miss your appointment.`;

  try {
    const response = await sms.send({
      to: [process.env.SIMULATOR_PHONE], // Had to use the simulator phone number for testing
      message,
      from: process.env.AFRICASTALKING_SENDER_ID || '', // can be left blank for sandbox
    });
    console.log("📨 SMS Sent:", response);
  } catch (err) {
    console.error("❌ Failed to send SMS:", err);
  }
};

