import BannerStart from "components/BannerStart";
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-notifications/lib/notifications.css";
import { Link, useNavigate } from "react-router-dom";

function AddEvent() {
  const [isPaid, setIsPaid] = useState(false);
const [isFree, setIsFree] = useState(false);
const [event, setEvent] = useState({
  title: "",
  description: "",
  dateDebut: "",
  dateFin: "",
  timeFrom: "",
  timeTo: "",
  place: "",
  imageFile: null
});
const [errors, setErrors] = useState({});

const validate = () => {
  let tempErrors = {};
  tempErrors.title = event.title ? "" : "This field is required.";
  tempErrors.description = event.description ? "" : "Write Small Description.";
  tempErrors.dateDebut = event.dateDebut ? "" : "This field is required.";
  tempErrors.dateFin = event.dateFin ? "" : "This field is required.";
  tempErrors.place = event.place ? "" : "This field is required.";
  tempErrors.timeFrom = event.timeFrom ? "" : "This field is required.";
  tempErrors.timeTo = event.timeTo ? "" : "This field is required.";
  setErrors(tempErrors);
  return Object.values(tempErrors).every(x => x === "");
};

  

  // State to hold the image name
  const [imageName, setImageName] = useState(null);
  // State to hold the image file
  const [imageFile, setImageFile] = useState(null);

  /* const [place, setPlace] = useState(""); // New state for place
  const [timeFrom, setTimeFrom] = useState(""); // New state for time from
  const [timeTo, setTimeTo] = useState(""); // New state for time to */

  // Function to handle selecting an image
  const handleImageSelect = (event) => {
    // Get the selected file
    const selectedFile = event.target.files[0];
    // Set the image name
    setImageName(selectedFile.name);
    // Set the image file
    setImageFile(selectedFile);
  };

  // Function to handle removing the image
  const handleRemoveImage = () => {
    // Reset the image name to null
    setImageName(null);
    // Reset the image file
    setImageFile(null);
    // Reset the input field value to allow selecting the same file again
    document.getElementById("image").value = "";
  };

  const navigate = useNavigate();

  const addEvent = async (values, onSubmitProps) => {
    
    console.log("values", values);
    // this allow us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    console.log("formData", formData);
    console.log("picture name", values.picture.name);

    const savedEventResponse = await fetch("http://localhost:3001/event/add", {
      method: "POST",
      body: formData,
    });
    const savedEvent = await savedEventResponse.json();

    if (savedEvent) {
      console.log("Event added!");
      console.log("Event", savedEvent);
      // Show the toast notification with autoClose: false
      toast.success("Event added successfully !!", {
        autoClose: 1500,
        style: {
          color: "green", // Text color
        },
      });
      setTimeout(() => {
        navigate("/listEvents");
      }, 2000);
    }
  };

  const handleFormSubmit = async (e, onSubmitProps) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (validate()) { // Check if all fields are valid
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());
      await addEvent(formValues, onSubmitProps);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
};


  return (
    <div>
      <SideBar />
      <main>
        <div className="page-content">
          <TopBarBack />
          <ToastContainer />
          <div className="page-content-wrapper border">
            <BannerStart
              title="Submit a New Event"
              description="Submit new Event here!"
            />
            <div className="card bg-transparent border rounded-3 mt-4">
              <div className="card-header bg-light border-bottom px-lg-3">
                <h2 className="p-2 " style={{ color: "#1d3b53" }}>
                  Event Details
                </h2>
              </div>
              <form onSubmit={handleFormSubmit} className="m-4">
                <div className="row g-4">
                  <div className="col-12">
                    <label className="form-label">Event Title</label>
                    <input
                      className={"form-control" + (errors.title ? " is-invalid" : "")}
                      type="text"
                      name="title"
                      placeholder="Enter Event title"
                      
                      onChange={handleChange}
                    />
                     <div className="invalid-feedback">{errors.title}</div>

                  </div>
                  <div className="col-12">
                    <label className="form-label">Short Description</label>
                    <textarea
                      className={"form-control" + (errors.description ? " is-invalid" : "")}
                      name="description"
                      rows={2}
                      placeholder="Short description of the event"
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.description}</div>

                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Start Date</label>
                    <input
                     className={"form-control" + (errors.dateDebut ? " is-invalid" : "")}
                      type="date"
                      name="dateDebut"
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.dateDebut}</div>

                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Date</label>
                    <input
                      className={"form-control" + (errors.dateFin ? " is-invalid" : "")}
                      type="date"
                      name="dateFin"
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.dateFin}</div>

                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Time From</label>
                    <input
                      type="time"
                      className={"form-control" + (errors.timeFrom ? " is-invalid" : "")}
                      name="timeFrom"
                      
                      onChange={handleChange}
                     
                      
                    />
                    <div className="invalid-feedback">{errors.timeFrom}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Time To</label>
                    <input
                      type="time"
                      className={"form-control" + (errors.timeTo ? " is-invalid" : "")}
                      name="timeTo"
                    
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.timeTo}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Place</label>
                    <input
                      type="text"
                      className={"form-control" + (errors.place ? " is-invalid" : "")}
                      name="place"
                      placeholder="Enter event place"
                   
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.place}</div>

                  </div>
                  {/*  <div className="col-md-6">
                    <label className="form-label">Event Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      placeholder="Enter event price"
                    />
                  </div> */}

<div className="col-md-6 event-price-container">
  <label htmlFor="paidCheckbox" className="form-label">
    Event Price
  </label>
  <div className="price-toggle">
    <input
      className="form-check-input"
      type="checkbox"
      id="paidCheckbox"
      checked={isPaid}
      onChange={() => {
        setIsPaid(!isPaid);
        setIsFree(false); // Uncheck the free option when paid is selected
      }}
    />
    <label className="form-check-label" htmlFor="paidCheckbox">
      Paid
    </label>
  </div>
  {isPaid && (
    <input
      type="number"
      className="form-control price-input"
      name="price"
      placeholder="Enter event price"
    />
  )}

  <div className="price-toggle mt-2">
    <input
      className="form-check-input"
      type="checkbox"
      id="freeCheckbox"
      checked={isFree}
      onChange={() => {
        setIsFree(!isFree);
        setIsPaid(false); // Uncheck the paid option when free is selected
      }}
    />
    <label className="form-check-label" htmlFor="freeCheckbox">
      Free
    </label>
  </div>
</div>
                  {/* Upload image START */}
                  <div className="m-4">
                    {/* Image */}
                    <div className="col-12">
                      <div className="text-center justify-content-center align-items-center mx-5 my-5 p-sm-5 border border-2 border-dashed position-relative rounded-3">
                        {/* Display the image */}
                        {imageFile && (
                          <div>
                            <img
                              src={URL.createObjectURL(imageFile)}
                              alt="Uploaded image"
                              className="img-fluid mb-2"
                              style={{ maxWidth: "300px", maxHeight: "300px" }} // Limit image dimensions
                            />
                            <p className="mb-0">Uploaded image</p>
                          </div>
                        )}
                        {/* Upload image button */}
                        <div className="mb-3">
                          <h6 className="my-2">
                            Upload Event image here, or{" "}
                            <span
                              className="text-primary"
                              style={{ cursor: "pointer" }}
                            >
                              Browse
                            </span>
                          </h6>
                          {/* File input */}
                          <input
                            className="form-control"
                            type="file"
                            name="picture"
                            id="image"
                            accept="image/gif, image/jpeg, image/png"
                            onChange={handleImageSelect}
                          />
                          {/* Note */}
                          <p className="small mb-0 mt-2">
                            <b>Note:</b> Only JPG, JPEG, and PNG formats are
                            supported. Our suggested dimensions are 600px *
                            450px. Larger images will be cropped to fit our
                            thumbnails/previews.
                          </p>
                        </div>
                        {/* Remove image button */}
                        {imageName && (
                          <div className="d-sm-flex justify-content-end mt-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-danger-soft mb-3"
                              onClick={handleRemoveImage}
                            >
                              Remove image
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Upload image END */}
                </div>
                <div className="d-md-flex justify-content-end align-items-start mt-4">
                  <button
                    type="submit"
                    className="btn btn-success mb-2 mb-sm-0"
                  >
                    Submit Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddEvent;