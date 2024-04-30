import axios from "axios";
import Inscription from "../models/Inscription.js";



// Add a new inscription with payment initialization
export async function addInscriptionWithPayment(req, res) {
    const { id } = req.params;

    try {
        const inscription = await Inscription.findById(id);
        if (!inscription) {
            return res.status(404).json({ message: "Inscription not found" });
        }

        const paymentAmount = 100; 

          // Prepare payload for payment API, assuming payment needs to be initiated
          const payload = {
            app_token: "a1e02adf-ac26-42dd-ac2c-bcce4039c770",
            app_secret: process.env.flouci_secret,
            amount: paymentAmount, 
            accept_card: "true",
            session_timeout_secs: 1200,
            success_link: "http://localhost:3000/success",
            fail_link: "http://localhost:3000/fail",
            developer_tracking_id: "84cb42aa-8358-4818-9c6c-42499e99be1e"
        };

          // Call the payment API to generate the payment link
          const response = await axios.post("https://developers.flouci.com/api/generate_payment", payload);
          const paymentId = response.data.result.payment_id;
          const paymentLink = response.data.result.link;

          
           
        await Inscription.findByIdAndUpdate(id, {
            paymentId: paymentId,
            paymentLink: paymentLink,
            status: 'not paid' 
        });

        // Send response with payment link
        res.json({
            paymentLink: paymentLink, 
            paymentId: paymentId,
            message: "Payment initiated. Please complete the payment."
        });

    } catch (error) {
        console.error("Failed to approve inscription and initiate payment:", error);
        res.status(500).json({ message: "Error processing payment", error: error.message });
    }
    
}




// Verify payment and update reservation status
export async function Verify(req, res) {
    const paymentId = req.params.id;

    try {
        // Find the reservation with the given paymentId
        const reservation = await Reservation.findOne({ paymentId });

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found for this paymentId." });
        }

        // Make a request to verify the payment
        const verifyUrl = `https://developers.flouci.com/api/verify_payment/${paymentId}`;
        const verifyResponse = await axios.get(verifyUrl, {
            headers: {
                'apppublic': 'a1e02adf-ac26-42dd-ac2c-bcce4039c770',
                'appsecret': process.env.flouci_secret
            }
        });

        // Assuming payment verification is successful
        console.log("Payment verification response:", verifyResponse.data);

        // Update reservation status to 'accepted' upon successful payment verification
        reservation.status = 'accepted';
        await reservation.save();

        res.json({ message: "Payment verified successfully. Reservation status updated." });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Error verifying payment", error: error.message });
    }
}