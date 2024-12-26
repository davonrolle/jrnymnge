import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendWaitlistNotification = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Waitlist Registration",
    html: `
      <h2>New User Joined the Waitlist</h2>
      <p><strong>Name:</strong> ${userData.firstName} ${userData.lastName}</p>
      <p><strong>Email:</strong> ${userData.email}</p>
      <p><strong>Phone:</strong> ${userData.phone}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
