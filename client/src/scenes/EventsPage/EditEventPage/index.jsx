import BannerStart from "components/BannerStart";
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-notifications/lib/notifications.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditEvent() {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    price: "",
    dateDebut: "",
    dateFin: "",
  });

  const [imageName, setImageName] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleImageSelect = (event) => {
    const selectedFile = event.target.files[0];
    setImageName(selectedFile.name);
    setImageFile(selectedFile);
  };

  const handleRemoveImage = () => {
    setImageName(null);
    setImageFile(null);
    document.getElementById("image").value = "";
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/event/events/${id}`
        );

        const eventData = response.data;
        setFormState({
          title: eventData.title,
          description: eventData.description,
          price: eventData.price,
          dateDebut: eventData.dateDebut,
          dateFin: eventData.dateFin,
        });
        console.log(formState.dateDebut);
        setImageName(eventData.imagePath);
      } catch (error) {
        console.error("Error Fetching Event:", error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleEventChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to format date to "yyyy-MM-dd"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("description", formState.description);
    formData.append("price", formState.price);
    formData.append("dateDebut", formatDate(formState.dateDebut));
    formData.append("dateFin", formatDate(formState.dateFin));
  
    if (imageFile) {
      formData.append("picture", imageFile);
    }
    
    try {
      const response = await axios.put(
        `http://localhost:3001/event/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Event updated successfully !!", {
          autoClose: 1500,
          style: { color: "green" },
        });
        navigate("/listEvents");
      } else {
        toast.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error Updating Event:", error);
      toast.error("Failed to update event");
    }
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
              title="Edit Event"
              description="Edit event details below"
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
                      className="form-control"
                      type="text"
                      name="title"
                      value={formState.title}
                      onChange={handleEventChange}
                      placeholder="Enter Event title"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Short Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formState.description}
                      onChange={handleEventChange}
                      rows={2}
                      placeholder="Short description of the event"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Start Date</label>
                    <input
                      className="form-control"
                      type="date"
                      name="dateDebut"
                      value={formState.dateDebut}
                      onChange={handleEventChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Date</label>
                    <input
                      className="form-control"
                      type="date"
                      name="dateFin"
                      value={formState.dateFin}
                      onChange={handleEventChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Event Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formState.price}
                      onChange={handleEventChange}
                      placeholder="Enter event price"
                    />
                  </div>
                  {/* Upload image START */}
                  <div className="m-4">
                    {/* Image */}
                    <div className="col-12">
                      <div className="text-center justify-content-center align-items-center mx-5 my-5 p-sm-5 border border-2 border-dashed position-relative rounded-3">
                        {/* Display the image */}
                        {imageName && (
                          <div>
                            <img
                              src={
                                imageName
                                  ? `http://localhost:3001/assets/${imageName}`
                                  : ""
                              }
                              alt="image Event"
                              style={{ maxWidth: "300px", maxHeight: "300px" }}
                            />
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
                    Update Event
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
export default EditEvent;
