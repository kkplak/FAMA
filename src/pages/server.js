const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST route for handling form submission
app.post("/send-email", (req, res) => {
  const { name, surname, email, message } = req.body;

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com", // Enter your email address
      pass: "your-email-password", // Enter your email password (or use app password)
    },
  });

  // Email content
  const mailOptions = {
    from: "your-email@gmail.com", // Sender's email address
    to: "your-email@gmail.com", // Receiver's email address
    subject: "New message from your website",
    text: `
      Name: ${name} ${surname}\n
      Email: ${email}\n
      Message: ${message}
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error: Unable to send email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
