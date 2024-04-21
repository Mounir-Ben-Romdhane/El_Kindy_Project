import Reservation from "../models/Reservation.js";
import Event from "../models/Event.js";
import { sendSms } from "../index.js"
import axios from 'axios';






/* export const createReservation = async (req, res) => {
  console.log("Initiating reservation:", req.params, req.body);
  
  // Destructure eventId from req.body
  const { eventId, userName, userEmail, phoneNumber, numberOfReservations } = req.body;

  try {
    // Check if event with provided eventId exists
    const eventDetails = await Event.findById(eventId);
    if (!eventDetails) {
      return res.status(404).json({ message: "Event not found" });
    }
    console.log("Event price:", eventDetails.price);

    if (!eventDetails.price) {
      // Create new reservation with eventId
      const newReservation = new Reservation({ eventId, userName, userEmail, phoneNumber, numberOfReservations });
      const savedReservation = await newReservation.save();
      return res.status(201).json({ reservation: savedReservation });
    }

    // Calculate payment amount based on event price and numberOfReservations
    const amountinMillimes = eventDetails.price * 1000 * numberOfReservations;
    console.log(`Total cost for ${numberOfReservations} reservations: ${amountinMillimes} millimes`);

    // Prepare payment payload including numberOfReservations
    const paymentPayload = { amount: amountinMillimes };

    // Make payment request
    axios.post('http://localhost:3001/payment/payment', paymentPayload)
      .then(paymentResponse => {
        console.log("Payment link generated:", paymentResponse.data.result.developer_tracking_id);
        // Redirect to payment link
        res.redirect(paymentResponse.data.result.link);
      })
      .catch(paymentError => {
        console.error("Payment link generation failed:", paymentError);
        res.status(500).json({ message: "Error generating payment link", error: paymentError.message });
      });
  } catch (error) {
    console.error("Failed to create reservation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
} */

// Initiate payment for a paid event and then create a reservation
export const createReservation = async (req, res) => {
  console.log("initiatePaymentAndCreateReservation hit", req.params, req.body); 
  const { eventId } = req.params;
  const { userName, userEmail, phoneNumber,numberOfReservations } = req.body;

  try {
    // Get event details to determine the price
    const eventDetails = await Event.findById(eventId);
    console.log("event price : ",eventDetails.price);
    if (!eventDetails) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the event is free
    if (!eventDetails.price) {
      // If event is free, create reservation directly
      const newReservation = new Reservation({
        eventId,
        userName,
        userEmail,
        phoneNumber,
        numberOfReservations,
      });
      const savedReservation = await newReservation.save();
      return res.status(201).json({ reservation: savedReservation });
    }
    
    // If event is paid, generate payment link

    // Calculate payment amount based on event price and numberOfReservations

    const eventPrice = parseFloat(eventDetails.price); // Convert to float
    const numReservations = parseInt(numberOfReservations, 10); // Convert to integer

    const amountInMillimes = eventPrice * 1000 * numReservations; // Validate expected result

    console.log("Event Price:", eventPrice); // Should match expected event price
  console.log("Number of Reservations:", numReservations); // Should match expected count
  console.log("Amount in Millimes:", amountInMillimes); // Should reflect correct calculation
    // Prepare payment payload including numberOfReservations
    const paymentPayload = { amount: amountinMillimes };

    // Make payment request
    axios.post('http://localhost:3001/payment/payment', paymentPayload)
      .then(paymentResponse => {
        console.log("Payment link generated:", paymentResponse.data.result.developer_tracking_id);
        // Redirect to payment link
        res.redirect(paymentResponse.data.result.link);
      })
      .catch(paymentError => {
        console.error("Payment link generation failed:", paymentError);
        res.status(500).json({ message: "Error generating payment link", error: paymentError.message });
      });
  } catch (error) {
    console.error("Failed to create reservation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}






export const listReservationsByid = async (req, res) => {
  const { eventId } = req.params;
  try{
    const reservation = await Reservation.find({ eventId });
    res.json(reservation);
  }catch{
    res.status(500).send({ message: "Error fetching reservation", error: error.message });
  }
}

// Get All Events
export const listReservations = async (req, res) => {
 try{
  let reservations = await Reservation.find({}).populate('eventId');
  console.log(JSON.stringify(reservations, null, 2));
  res.json(reservations);
 }catch (err) {
  console.error(err);
  res
    .status(500)
    .json({
      error: "Internal Server Error",
      message: "Could not retrieve events",
    });
}
}


/* export const updateReservationStatus = async (req, res) => {
  const { reservationId } = req.params;
  const { status } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status },
      { new: true } // This option returns the document as it looks after update was applied.
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    if (status === 'accepted') {
      // Fetch event details here
      const eventDetails = await Event.findById(updatedReservation.eventId);
      if (!eventDetails) {
        return res.status(404).json({ message: "Event not found" });
      }

      
      sendSms(updatedReservation.phoneNumber).then(() => {
          console.log("SMS notification sent.");
      }).catch(err => {
          console.error("Failed to send SMS notification:", err);
      });

      generateInvoice({
        eventName: eventDetails.name,
        eventDate: eventDetails.date.toString(),
        userName: updatedReservation.userName,
        userEmail: updatedReservation.userEmail,
        price: eventDetails.price
      }).then(filePath => {
        // Assuming sendInvoiceEmail function is properly defined elsewhere or imported
        sendInvoiceEmail(updatedReservation.userEmail, filePath)
          .then(() => console.log("Invoice emailed successfully."))
          .catch(err => console.error("Error sending invoice email:", err));
      }).catch(err => console.error("Error generating invoice:", err)); 
    }


    res.json(updatedReservation);
  } catch (error) {
    console.error("Error updating reservation status:", error);
    res.status(500).json({ message: "Error updating reservation status", error: error.message });
  }
}; */



export const updateReservationStatus = async (req, res) => {
  const { reservationId } = req.params;
  const { status } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status },
      { new: true } // This option returns the document as it looks after update was applied.
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    if (status === 'accepted') {
      sendSms(updatedReservation.phoneNumber).then(() => {
          console.log("SMS notification sent.");
      }).catch(err => {
          console.error("Failed to send SMS notification:", err);
      });
  }

    res.json(updatedReservation);
  } catch (error) {
    console.error("Error updating reservation status:", error);
    res.status(500).json({ message: "Error updating reservation status", error: error.message });
  }
};