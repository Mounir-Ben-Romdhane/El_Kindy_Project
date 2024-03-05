  import React, { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import axios from "axios";
  import CircularProgress from "@mui/material/CircularProgress";
  import Box from "@mui/material/Box";
  import Footer from "components/Footer";
  import Navbar from "components/NavBar";
  import { ToastContainer, toast } from "react-toastify";
  import Card from "@mui/material/Card";
  import CardContent from "@mui/material/CardContent";
  import CardMedia from "@mui/material/CardMedia";
  import Typography from "@mui/material/Typography";
  import "react-toastify/dist/ReactToastify.css";
  import "./detail.css";
  //toast
  import LocationOnIcon from '@mui/icons-material/LocationOn'; // New icon for address
  import MoneyOffIcon from '@mui/icons-material/MoneyOff'; // New icon for free price
  import DateRangeIcon from '@mui/icons-material/DateRange'; // New icon for date
  import CallIcon from '@mui/icons-material/Call'; // New icon for phone number
  import MailOutlineIcon from '@mui/icons-material/MailOutline'; // New icon for email  
  import AccessTimeIcon from '@mui/icons-material/AccessTime'; // New icon for time
  import PhoneIcon from '@mui/icons-material/Phone'; // New icon for phone number
  import EmailIcon from '@mui/icons-material/Email'; // New icon for email
  import EventAvailableIcon from '@mui/icons-material/EventAvailable';


  function DetailEvents() {
    const { id } = useParams();
    const [eventDetails, setEventDetails] = useState({});
    const [daysUntilStart, setDaysUntilStart] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reservation, setReservation] = useState({
      name: "",
      email: "",
      phoneNumber: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const toastShowSeccus = (msg) => {
      toast.success(msg, {
        autoClose: 2000,
        style: {
          color: "green", // Text color
        },
      });
    };
    
    useEffect(() => {
      if (Object.keys(eventDetails).length > 0) {
        calculateDaysUntilStart(eventDetails.dateDebut);
      }
    }, [eventDetails]);

    useEffect(() => {
      const fetchEventDetails = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:3001/event/events/${id}`
          );
          setEventDetails(response.data);
        } catch (error) {
          console.error("Error fetching event details:", error);
          setError("Failed to load event details. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchEventDetails();
    }, [id]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setReservation((reservation) => ({
        ...reservation,
        [name]: value,
      }));
    };

    const handleReservationSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        // Here you should replace 'YOUR_RESERVATION_ENDPOINT' with your actual endpoint URL
        const url = `http://localhost:3001/events/${id}/reservation`;
        const dataToSend = {
          userName: reservation.name,
          userEmail: reservation.email, // Assuming 'reservation.email' holds the user's email
          phoneNumber: reservation.phoneNumber, // Assuming this is correctly named
        };
        const response = await axios.post(url, dataToSend);
        console.log("Reservation response:", response.data);
        toast.success("Reservation successful!", {
          onClose: () => navigate("/listEventUser"),
          autoClose: 2000,
        });
      } catch (error) {
        toast.error("Reservation failed. " + error.message);
        console.error("Reservation error:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return <ToastContainer />;
    }

    const calculateDaysUntilStart = (startDate) => {
      const now = new Date();
      const start = new Date(startDate);
      const difference = start - now;
      const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysUntilStart(days);
    };

    return (
      <div>
        <ToastContainer />
        <title>Eduport - LMS, Education and Course Theme</title>
        {/* Meta Tags */}
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="author" content="Webestica.com" />
        <meta
          name="description"
          content="Eduport- LMS, Education and Course Theme"
        />
        {/* Favicon */}
        <link rel="shortcut icon" href="assets/images/favicon.ico" />
        {/* Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap"
        />
        {/* Plugins CSS */}
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/vendor/font-awesome/css/all.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
        />
        {/* Theme CSS */}
        <link
          id="style-switch"
          rel="stylesheet"
          type="text/css"
          href="assets/css/style.css"
        />
        {/* Favicon */}
        <link rel="shortcut icon" href="/assets/images/favicon.ico" />
        {/* Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap"
        />
        {/* Plugins CSS */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/vendor/font-awesome/css/all.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/vendor/choices/css/choices.min.css"
        />
        {/* Theme CSS */}
        <link
          id="style-switch"
          rel="stylesheet"
          type="text/css"
          href="/assets/css/style.css"
        />
        {/* Header START */}
        <Navbar />
        {/* Header END */}
        {/* **************** MAIN CONTENT START **************** */}
        <main>
          {/* =======================
      Page content START */}
        </main>

        {/* =======================
  Form and Tabs START */}
        <section>
          <div className="container">
            <div className="row">
              {/* Left Content START */}
              <div
                className="col-lg-5 position-relative mt-xl-0"
                id="fill-instructor-form"
              >
                {/* SVG decoration */}
                <figure className="position-absolute top-0 start-50 mt-n3 ms-5 d-none d-sm-block z-index-1">
                  <svg width="192.5px" height="89.4px" viewBox="0 0 192.5 89.4">
                    <path
                      className="fill-warning"
                      d="M170.2,0.5c-0.1,0-0.2,0-0.4,0c-2.6-0.1-5.2-0.4-7.8-0.5c-2.9-0.1-5.8,0-8.6,0.2c-1.4,0.1-2.9,0.3-4.3,0.5 c-0.5,0.1-1,0-1.5,0c-1-0.1-1.9,0.2-2.9,0.3c-5.6,0.9-11.1,2.1-16.5,3.6c-2.7,0.7-5.4,1.6-8.1,2.5c-0.6,0.2-1.2,0.4-1.8,0.5 c-0.4,0-0.8,0-1.2,0.1c-1.5,0.2-3,1.1-4.3,1.8c-3,1.5-5.9,3.2-8.6,5.2c-2,1.5-3.8,3.1-5.6,4.8c-0.9,0.9-1.7,1.8-2.5,2.7 c-0.4,0.4-1.1,0.7-1.4,1.2c-0.3,0.4-0.6,0.9-0.9,1.4c-0.9,1.2-1.7,2.3-2.7,3.4c-0.3,0.4-0.7,0.6-1.2,0.6c-1.4,0.1-2.8-0.1-4.2-0.1 c-0.7,0-1.2,0.2-1.9,0.2c-3.3,0.4-6.6,0.7-9.8,1.6c-1.7,0.5-3.4,0.9-5.1,1.4c-5.4,1.5-11,2.9-16,5.4c-4.6,2.2-8.7,5.2-12.7,8.3 c-2,1.6-4,3.2-5.9,4.9c-0.8,0.7-1.6,1.2-2.5,1.6c-0.9,0.5-1.7,1.3-2.4,2c-1.4,1.3-2.9,2.6-4.3,3.9c-1.2,1.1-2.5,2.1-3.6,3.3 c-0.9,1-2,1.9-3,2.8c-1,0.9-2.1,1.9-3.1,2.8c-0.8,0.7-1.6,1.2-2.3,1.9c-0.9,0.9-1.7,1.9-2.7,2.7c0-0.7,0.2-1.3,0.2-2 c0-1.8-0.2-3.7-0.7-5.5c-0.2-0.9-0.5-1.8-1.1-2.4c-0.6-0.7-1.7-1-2.4-0.6c-0.1,0.1-0.3,0.2-0.4,0.3c-0.1,0.2-0.1,0.4,0,0.6 c0.7,3.7,1.2,7.4,0.7,11.1c-0.2,2.4-0.9,4.9-2,7c-0.5,1-1.2,1.9-1.7,3c-0.4,1-1.4,1.8-2.1,2.7C0.3,86,0.1,86.3,0,86.6 c-0.1,0.4,0.1,0.7,0.2,1.1c0.3,0.8,0.8,1.6,1.6,1.7c0.5,0,0.9-0.2,1.3-0.5c0.9-0.5,1.7-1.1,2.6-1.6c0.4-0.2,0.7-0.5,1.1-0.7 c1.7-1.3,3.7-2.3,5.7-3.1c4.3-1.7,9.1-2.4,13.8-1.7c0.2,0,0.4,0.1,0.7,0c0.7-0.2,0.9-1.2,0.4-1.8c-0.4-0.6-1.2-0.8-1.9-1 c-2.7-0.8-5.4-1.5-8.2-1.8c-0.7-0.1-1.4-0.1-2.1-0.2c-0.3,0-0.6,0-0.8,0c-0.3,0-0.9,0.2-1.2,0.1C13,77,13,77.1,13,76.8 c0-0.4,0.6-0.8,0.9-1c0.5-0.4,0.9-0.8,1.4-1.2c1.1-1,2.3-1.9,3.4-2.9c0.6-0.5,1.1-1,1.7-1.5c0.3-0.3,0.5-0.7,0.9-1 c1.2-1.1,2.7-1.7,3.9-2.8c0.4-0.4,0.8-0.8,1.2-1.2c0.8-0.8,1.7-1.5,2.6-2.2c1-0.8,2.1-1.6,3.1-2.3c0.9-0.6,1.9-1.1,2.6-2 c0.8-1,2.1-1.7,3.1-2.5c1.1-0.9,2.2-1.8,3.3-2.6c3.9-3.1,7.9-6.2,12.3-8.6c5.2-2.7,10.6-4.9,16.3-6.4c5.5-1.4,11.2-1.8,16.8-2.7 c0.2,0,0.3-0.1,0.5-0.1c1.4-0.2,2.3-0.4,2,1.5c-0.8,4.9,2.3,7.5,5.8,9.8c4,2.5,8,5,12.7,5.8c5.2,0.9,10.4,2.7,15.9,0.8 c3-1,6.3-5,6.2-7.6c0-1.7-0.3-3.5-1-5.1c-0.6-1.4-1.5-3-2.8-3.7c-1-0.5-1.9-1.5-2.8-2.2c-1.1-0.8-2.2-1.5-3.3-2.1 c-2.3-1.2-4.8-2.1-7.3-2.8c-3.5-0.9-7.2-1.4-10.8-1.8c-0.9-0.1-1.7-0.2-2.6-0.2c-0.2,0-1.4,0-1.4-0.2c-0.1-0.2,0.3-0.5,0.4-0.6 c0.8-0.9,1.7-1.8,2.5-2.6c1.7-1.7,3.6-3.3,5.5-4.8c2-1.6,4.2-3,6.4-4.1c1.1-0.6,2.3-1.1,3.5-1.5c0.6-0.2,1.2-0.4,1.8-0.6 c0.4-0.2,0.7-0.5,1.1-0.7c1.2-0.6,2.7-0.9,4-1.3c1.4-0.4,2.8-0.8,4.2-1.2c2.8-0.8,5.6-1.5,8.4-2.2c3.4-0.8,6.9-1.6,10.3-2.4 c7.9-1.7,15.9-2.4,24-1.7c4.4,0.4,8.9,0.9,13.2,2.1c1.3,0.4,2.5,0.8,3.9,1.1c0.7,0.1,1.4,0.5,2,0.9c0.9,0.5,1.7,0.9,2.6,1.4 c0.3,0.2,0.7,0.3,0.9,0.1c0.1-0.1,0.1-0.3,0.1-0.4c0-0.9-0.4-1.8-1-2.5c-0.5-0.6-1.2-1.4-1.9-1.8c-0.9-0.6-2.2-0.9-3.3-1.3 c-1.1-0.4-2.2-0.7-3.3-1c-2.8-0.8-5.6-1.4-8.5-1.9C173.1,0.9,171.6,0.6,170.2,0.5z M106.8,36c5,0.8,11.2,2,16.2,6.2 c1.1,0.9,2.8,1.6,2.3,3.4c-0.4,1.7-2.1,1.8-3.5,2.3c-5,1.5-9.9,0-14.5-1.2c-4.9-1.2-9.7-3.3-13.5-7c-0.6-0.6-1.2-1.3-1.5-2.1 c-0.1-0.3-0.1-0.7-0.2-1c-0.1-0.3-0.3-0.6,0-0.9c0.2-0.2,0.5-0.3,0.9-0.3c2.4-0.4,4.9-0.6,7.4-0.5c0.9,0,1.8,0.4,2.7,0.5 C104.5,35.6,105.7,35.8,106.8,36z"
                    />
                  </svg>
                </figure>
                <div className="card card-body shadow p-4">
                  {/* Title */}
                  <h3>Make a Reservation</h3>
                  {/* Form START */}
                  <form
                    className="row g-3 mt-2 position-relative z-index-9"
                    onSubmit={handleReservationSubmit}
                  >
                    {/* Name */}
                    <div className="col-lg-6">
                      <label className="form-label" htmlFor="name">
                        Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={reservation.name}
                        onChange={handleInputChange}
                        aria-label="First name"
                      />
                    </div>
                    {/* Email */}
                    <div className="col-lg-6">
                      <label className="form-label" htmlFor="email">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={reservation.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    {/* Number */}
                    <div className="col-lg-12">
                      <label htmlFor="phoneNumber" className="form-label">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={reservation.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {/* Textarea */}
                    {/*   <div className="col-12">
                      <label className="form-label">Add Summary *</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        spellCheck="false"
                        defaultValue={""}
                      />
                    </div> */}
                    {/* Button */}
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary mb-0"
                        disabled={isSubmitting}
                      >
                        Submit Reservation
                      </button>
                    </div>
                  </form>
                  {/* Form END */}
                </div>
              </div>
              {/* Left Content END */}
              {/* Tabs START */}
              <div className="col-lg-7 z-index-9 mt-5 mt-xl-0">
  <h3>How to Participate In this Event?</h3>
  
  {/* Event Title */}
  <div className="card shadow-sm mt-4">
    <div className="card-body">
      <h5 className="card-title">{eventDetails.title}</h5>
      <p className="card-text">{eventDetails.description}</p>
    </div>
  </div>

  {/* Personal Info in Card Design */}
  <div className="card shadow-sm mt-3">
    <div className="card-body">
      <h6 className="card-subtitle mb-2 text-muted">Event Details</h6>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <LocationOnIcon className="text-primary me-2" />
          Address: <strong>2002 Rue De Tunis, TN, 2023</strong>
        </li>
        <li className="list-group-item">
          <MoneyOffIcon className="text-primary me-2" />
          Price: {eventDetails.price ? (
            <>
              <span className="text-success">${eventDetails.price}</span>
              <del className="text-muted ms-2">$350</del>
              <span className="badge bg-info text-dark ms-2">60% off</span>
            </>
          ) : (
            <span className="text-success">FREE</span>
          )}
        </li>
        <li className="list-group-item">
          <DateRangeIcon className="text-primary me-2" />
          Start Date: <strong>{new Date(eventDetails.dateDebut).toLocaleDateString()}</strong>
          <EventAvailableIcon className="text-primary ms-4 me-2" />
          End Date: <strong>{new Date(eventDetails.dateFin).toLocaleDateString()}</strong>
        </li>
        <li className="list-group-item">
          <AccessTimeIcon className="text-primary me-2" />
          Days until event starts: <strong>{daysUntilStart} days</strong>
        </li>
      </ul>
    </div>
  </div>
</div>

              {/* Tabs END */}
                        {/* Main content START */}
        
            </div>
          </div>
        </section>
        {/* =======================
  Form and Tabs END */}

        {/* **************** MAIN CONTENT END **************** */}
        {/* =======================
      Footer START */}
        <Footer />
        {/* =======================
      Footer END */}
        {/* Back to top */}
        <div className="back-top">
          <i className="bi bi-arrow-up-short position-absolute top-50 start-50 translate-middle" />
        </div>
        {/* Bootstrap JS */}
        {/* Vendors */}
        {/* Template Functions */}
      </div>
    );
  }

  export default DetailEvents;
