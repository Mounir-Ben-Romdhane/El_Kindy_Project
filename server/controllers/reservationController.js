import Reservation from "../models/Reservation.js";
import Event from "../models/Event.js";
import { sendSms } from "../index.js"
import axios from 'axios';

/* export const createReservation = async (req, res) => {
  console.log("createReservation hit", req.params, req.body); 
  const { eventId } = req.params;
  const { userName, userEmail, phoneNumber } = req.body;

  try{
    const newReservation = new Reservation({
      eventId,
      userName,
      userEmail,
      phoneNumber,
    })

    const saveReservation =await newReservation.save();
    res.status(201).json(saveReservation);
  }
  catch (error) {
    res.status(500).send({ message: "Error creating reservation", error: error.message });
}
} */

// Initiate payment for a paid event and then create a reservation
export const createReservation = async (req, res) => {
  console.log("initiatePaymentAndCreateReservation hit", req.params, req.body); 
  const { eventId } = req.params;
  const { userName, userEmail, phoneNumber } = req.body;

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
      });
      const savedReservation = await newReservation.save();
      return res.status(201).json({ reservation: savedReservation });
    }
    
    // If event is paid, generate payment link
    const paymentPayload = {
      amount: eventDetails.price,
    };
    
    axios.post('http://localhost:3001/payment/payment', paymentPayload)
      .then(paymentResponse => {
        const paymentLink = paymentResponse.data.result.link;
        // Redirect user to payment link
        res.redirect(paymentLink);
      })
      .catch(paymentError => {
        console.error("Error generating payment link:", paymentError);
        res.status(500).json({ message: "Error generating payment link", error: paymentError.message });
      });
  } catch (error) {
    console.error("Error initiating payment and creating reservation:", error);
    res.status(500).json({ message: "Error initiating payment and creating reservation", error: error.message });
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



