import axios from "axios";
import Inscription from "../models/Inscription.js";
import { sendEmail } from "../utils/sendMailer.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";


// Add a new inscription with payment initialization
export async function addInscriptionWithPayment(req, res) {
  const { id } = req.params;

  try {
    const inscription = await Inscription.findById(id);
    if (!inscription) {
      return res.status(404).json({ message: "Inscription not found" });
    }

    const paymentAmount = 100000;

    // Prepare payload for payment API, assuming payment needs to be initiated
    const payload = {
      app_token: "a1e02adf-ac26-42dd-ac2c-bcce4039c770",
      app_secret: process.env.flouci_secret,
      amount: paymentAmount,
      accept_card: "true",
      session_timeout_secs: 1200,
      success_link: "http://localhost:3000/SuccessInscription",
      fail_link: "http://localhost:3000/fail",
      developer_tracking_id: "84cb42aa-8358-4818-9c6c-42499e99be1e",
    };

    // Call the payment API to generate the payment link
    const response = await axios.post(
      "https://developers.flouci.com/api/generate_payment",
      payload
    );
    const paymentId = response.data.result.payment_id;
    const paymentLink = response.data.result.link;

    await Inscription.findByIdAndUpdate(id, {
      paymentId: paymentId,
      paymentLink: paymentLink,
      status: "not paid",
    });

    const body = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Required - Elkindy</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f7f7f7;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      border: 1px solid #cccccc;
      box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    }
    .header {
      background-color: #FFC107; /* Yellow color for the header */
      color: #333333;
      padding: 20px;
      text-align: center;
    }
    .header img {
      max-width: 100%;
      height: auto;
      border-bottom: 5px solid #333333; /* Adding a border to the header image */
      display: block;
      margin-bottom: 20px;
    }
    .content {
      padding: 20px;
      color: #333333;
      text-align: center;
    }
    .content h2 {
      color: #FFC107; /* Yellow color for the headings */
      margin-bottom: 20px;
    }
    .content p {
      line-height: 1.6;
      margin-bottom: 15px;
    }
    .payment-link {
      display: inline-block;
      background-color: #FFC107; /* Yellow color for the button */
      color: #333333;
      padding: 10px 20px;
      margin: 20px 0;
      border: none;
      text-decoration: none;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .payment-link:hover {
      background-color: #D99A05; /* Darker shade for hover effect */
    }
    .footer {
      background-color: #FFC107; /* Yellow color for the footer */
      color: #333333;
      text-align: center;
      padding: 10px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://i.imgur.com/4qQS8E2.jpeg" alt="Conservatory Scene">
      <h1>Payment Required</h1>
    </div>
    <div class="content">
      <h2>Dear ${inscription.firstName} ${inscription.lastName},</h2>
      <p>Thank you for registering with us. Your registration has been approved, and you are just one step away from completing the process.</p>
      <p>Please complete your payment by clicking the link below:</p>
      <a href="${paymentLink}" class="payment-link">Complete Payment</a>
      <p>If you have any questions or need further assistance, feel free to contact us.</p>
    </div>
    <div class="footer">
      © 2024 Elkindy. All rights reserved.
    </div>
  </div>
</body>
</html>`;


    await sendEmail(inscription.email, "Welcome to Elkindy", body);

    // Send response with payment link
    res.json({
      paymentLink: paymentLink,
      paymentId: paymentId,
      message: "Payment initiated. Please complete the payment.",
    });
  } catch (error) {
    console.error("Failed to approve inscription and initiate payment:", error);
    res
      .status(500)
      .json({ message: "Error processing payment", error: error.message });
  }
}

// Verify payment and update reservation status
export async function Verifyinscription(req, res) {
  const paymentId = req.params.id;

  try {
    // Find the inscription with the given paymentId
    const inscription = await Inscription.findOne({ paymentId });
    if (!inscription) {
      return res.status(404).json({ message: "Inscription not found for this paymentId." });
    }

    // Make a request to verify the payment
    const verifyUrl = `https://developers.flouci.com/api/verify_payment/${paymentId}`;
    const verifyResponse = await axios.get(verifyUrl, {
        headers: {
            'apppublic': 'a1e02adf-ac26-42dd-ac2c-bcce4039c770',
            'appsecret': process.env.flouci_secret
        }
    });

    // Check the verification response and proceed if successful
    if (verifyResponse.data && verifyResponse.data.result && verifyResponse.data.result.status === "SUCCESS") {
      // Update the payment status and inscription status
      inscription.paymentStatus = 'completed';
      inscription.status = 'confirmed';
      await inscription.save();

      // Check for an existing user with the same email
      const existingUser = await User.findOne({ email: inscription.email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email already exists' });
      }

      // Generate a random password for the new user
      const randomPassword = generateRandomPassword(10);
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(randomPassword, salt);

      // Create a new user
      const newUser = new User({
        firstName: inscription.firstName,
        lastName: inscription.lastName,
        email: inscription.email,
        password: passwordHash,
        passwordDecoded: randomPassword,
        verified: true,
        dateOfBirth: inscription.dateOfBirth,
        address: inscription.city,
        gender: inscription.gender,
        phoneNumber1: inscription.phoneNumber1,
        phoneNumber2: inscription.phoneNumber2,
        disponibilite: inscription.disponibilite,
        "studentInfo.parentName": inscription.parentName,
        "studentInfo.parentProfession": inscription.parentProfession,
        "studentInfo.coursesEnrolled": inscription.likedCourses,
        roles: ["student"],
      });

      await newUser.save();

      // Prepare and send an email
      const body = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Elkindy</title>
        <style>
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border: 1px solid #cccccc;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          }
          .header {
            background-color: #4CAF50; /* Green color for the header */
            color: #ffffff;
            padding: 20px;
            text-align: center;
          }
          .content img {
            max-width: 100%;
            height: auto;
            border-bottom: 5px solid #4CAF50; /* Matching the header */
            display: block;
            margin-bottom: 30px;
          }
          .content {
            padding: 20px;
            color: #333333;
            text-align: center;
          }
          .content h2 {
            color: #4CAF50; /* Green color for the headings */
            margin-bottom: 20px;
          }
          .content p {
            line-height: 1.6;
            margin-bottom: 15px;
          }
          .login-details {
            background-color: #E8F5E9; /* Light green for success */
            border-left: 3px solid #4CAF50; /* Green border for success */
            padding: 15px;
            margin: 25px 0;
            display: inline-block;
            transition: box-shadow 0.3s ease;
          }
          .login-details:hover {
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
          }
          .footer {
            background-color: #4CAF50; /* Green color for the footer */
            color: #ffffff;
            text-align: center;
            padding: 10px;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="content">
            <!-- Replace 'your-image-url.jpg' with the actual URL of your image -->
            <img class="image-with-border" src="https://i.imgur.com/4qQS8E2.jpeg" alt="Conservatory Scene">
      
            <p>Dear ${inscription.firstName + " " + inscription.lastName},</p>
            <p>We are pleased to inform you that your preinscription has been approved. Welcome to Elkindy, your new home for musical excellence!</p>
            <div class="login-details" style="width: 90%;">
              <h4><strong>Your Account Details:</strong></h4>
              <p><strong>Email:</strong> ${inscription.email}</p>
              <p><strong>Password:</strong> ${randomPassword}</p>
            </div>
            <p>We encourage you to log in promptly and start exploring the various resources available to you. Remember, the realm of music is vast, and every lesson is a step towards mastery. We are excited to see where this musical voyage will take you.</p>
            <p>Welcome aboard,</p>
            <p><strong>The Elkindy Team</strong></p>
          </div>
          <div class="footer">
            © 2024 Elkindy. All rights reserved.
          </div>
        </div>
      </body>
      </html>`;
      await sendEmail(inscription.email, "Welcome to Elkindy", body);

      res.json({ message: "Payment verified successfully. User account created and notified." });
    } else {
      res.status(400).json({
        message: "Payment verification failed.",
        details: verifyResponse.data
      });
    }
  } catch (error) {
    console.error("Error verifying payment and handling inscription:", error);
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
}

function generateRandomPassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; ++i) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

