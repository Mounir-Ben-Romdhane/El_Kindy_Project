import BannerStart from "components/BannerStart";
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { redirect } from "react-router";
import { useNavigate } from "react-router-dom";

function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: "",
    dateDebut: "",
    dateFin: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "file") {
      // Handle file input
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      // Handle all other inputs
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleRemoveInput = (e) => {
    setFormData({ ...formData, images: "" });
    document.getElementById("image").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:3001/event/event/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Event added successfully");
      navigate("/listEvents");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event");
    }
  };

  return (
    <div>
      <SideBar />
      <main>
        <div className="page-content">
          <TopBarBack />
          <div className="page-content-wrapper border">
            <BannerStart
              title="Submit a New Event"
              description="Read our 'Before you create an event' article before submitting!"
            />
            <div className="card bg-transparent border rounded-3 mt-4">
              <div className="card-header bg-light border-bottom px-lg-3">
                <h2 className="p-2 " style={{ color: "#1d3b53" }}>
                  Event Details
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="m-4">
                <div className="row g-4">
                  <div className="col-12">
                    <label className="form-label">Event Title</label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      placeholder="Enter Event title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Short Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows={2}
                      placeholder="Short description of the event"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Start Date</label>
                    <input
                      className="form-control"
                      type="date"
                      name="dateDebut"
                      value={formData.dateDebut}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Date</label>
                    <input
                      className="form-control"
                      type="date"
                      name="dateFin"
                      value={formData.dateFin}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Event Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      placeholder="Enter event price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Upload image START */}
                  <div className="col-12">
                    <div className="text-center justify-content-center align-items-center mx-5 my-5 p-sm-5 border border-2 border-dashed position-relative rounded-3">
                      {/* Image */}
                      <img
                        src="assets/images/element/gallery.svg"
                        className="h-50px"
                        alt
                      />
                      <div>
                        <h6 className="my-2">
                          Upload course image here, or
                          <a href="#!" className="text-primary">
                            {" "}
                            Browse
                          </a>
                        </h6>
                        <label style={{ cursor: "pointer" }}>
                          <span>
                            <input
                              className="form-control stretched-link"
                              type="file"
                              name="images" 
                              id="image"
                              onChange={handleChange}
                              accept="image/gif, image/jpeg, image/png"
                            />
                          </span>
                        </label>
                        <p className="small mb-0 mt-2">
                          <b>Note:</b> Only JPG, JPEG and PNG. Our suggested
                          dimensions are 600px * 450px. Larger image will be
                          cropped to 4:3 to fit our thumbnails/previews.
                        </p>
                      </div>
                    </div>
                    {/* Button */}
                    <div className="d-sm-flex justify-content-end mt-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-danger-soft mb-3"
                        onClick={handleRemoveInput}
                      >
                        Remove image
                      </button>
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
