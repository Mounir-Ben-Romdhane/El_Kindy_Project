import BannerStart from "components/BannerStart";
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-notifications/lib/notifications.css";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditEvent() {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    price: "",
    dateDebut: "",
    dateFin: "",
    timeFrom: "",
    timeTo: "",
    place: "",
  });

  const [formModified, setFormModified] = useState(false);
  const [imageName, setImageName] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

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
          dateDebut: formatDate(eventData.dateDebut),
          dateFin: formatDate(eventData.dateFin),
          timeFrom: eventData.timeFrom,
          timeTo: eventData.timeTo,
          place: eventData.place,
        });
        if (eventData.picturePath) {
          setPreviewImageUrl(
            `http://localhost:3001/assets/${eventData.picturePath}`
          );
          setImageName(eventData.picturePath);
        }
      } catch (error) {
        console.error("Error Fetching Event:", error);
      }
    };
    fetchEvent();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleImageSelect = (event) => {
    const selectedFile = event.target.files[0];
    setImageName(selectedFile.name);
    setImageFile(selectedFile);

    event.target.parentElement.classList.remove("border-danger");

    if (!selectedFile) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        picture: "Please upload an image!",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        picture: "",
      }));
    }
    setFormModified(true);
  };

   // Function to handle removing the image
   const handleRemoveImage = () => {
    // Reset the image name to null
    setImageName(null);
    // Reset the image file
    setImageFile(null);
    // Reset the input field value to allow selecting the same file again
    document.getElementById("image").value = "";

    if (formState.picturePath === "") {
      // Update the error status for the picture field
      setErrors((prevErrors) => ({
        ...prevErrors,
        picture: "Please upload an image!",
      }));

      // Add red border if no image is selected after removal
      document
        .getElementById("image")
        .parentElement.classList.add("border-danger");
    }
    setFormModified(false);

  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    validateField(name, value);
    setFormModified(true); // Set form as modified when any field is changed

  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "title":
        error = value.trim() === "" ? "Please enter a course title!" : "";
        break;
      case "description":
        error = value.trim() === "" ? "Please enter a short description!" : "";
        break;
      case "picture":
        error = value === null ? "Please upload an image!" : "";
        break;
      case "courseCategory":
        error = value === "" ? "Please select a course category!" : "";
        break;
      case "courseLevel": // Add validation for courseLevel
        error = value === "" ? "Please select a course level!" : "";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validation
    const requiredFields = ["title", "description", "dateDebut", "dateFin", "timeFrom", "timeTo", "place"];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formState[field].trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("description", formState.description);
    formData.append("price", formState.price);
    formData.append("dateDebut", formatDate(formState.dateDebut));
    formData.append("dateFin", formatDate(formState.dateFin));
    formData.append("timeFrom", formState.timeFrom);
    formData.append("timeTo", formState.timeTo);
    formData.append("place", formState.place);
    if (imageFile) {
      formData.append("picture", imageFile);
    }

    try {
      const response = await axios.patch(
        `http://localhost:3001/event/update/${id}`,
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
                      className={"form-control" + (errors.title ? " is-invalid" : "")}
                      type="text"
                      name="title"
                      value={formState.title}
                      onChange={handleEventChange}
                      placeholder="Enter Event title"
                     
                    />
                    <div className="invalid-feedback">{errors.title}</div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Short Description</label>
                    <textarea
                      className={"form-control" + (errors.description ? " is-invalid" : "")}
                      name="description"
                      value={formState.description}
                      onChange={handleEventChange}
                      rows={2}
                      placeholder="Short description of the event"
                     
                    />
                    <div className="invalid-feedback">{errors.description}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Start Date</label>
                    <input
                      className={"form-control" + (errors.dateDebut ? " is-invalid" : "")}
                      type="date"
                      name="dateDebut"
                      value={formState.dateDebut}
                      onChange={handleEventChange}
                      required
                    />
                    <div className="invalid-feedback">{errors.dateDebut}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Date</label>
                    <input
                      className={"form-control" + (errors.dateFin ? " is-invalid" : "")}
                      type="date"
                      name="dateFin"
                      value={formState.dateFin}
                      onChange={handleEventChange}
                      required
                    />
                    <div className="invalid-feedback">{errors.dateFin}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Event Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formState.price}
                      onChange={handleEventChange}
                      placeholder={
                        formState.price ? "Enter Event Price" : "Free Event"
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Time From</label>
                    <input
                      type="time"
                      className={"form-control" + (errors.timeFrom ? " is-invalid" : "")}
                      name="timeFrom"
                      value={formState.timeFrom}
                      onChange={handleEventChange}
                    />
                    <div className="invalid-feedback">{errors.timeFrom}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Time To</label>
                    <input
                      type="time"
                      className={"form-control" + (errors.timeTo ? " is-invalid" : "")}
                      name="timeTo"
                      value={formState.timeTo}
                      onChange={handleEventChange}
                    />
                    <div className="invalid-feedback">{errors.timeTo}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Place</label>
                    <input
                      type="text"
                      value={formState.place}
                      className={"form-control" + (errors.place ? " is-invalid" : "")}
                      name="place"
                      placeholder="Enter event place"
                      onChange={handleEventChange}
                    />
                    <div className="invalid-feedback">{errors.place}</div>
                  </div>
                  <div className="m-4">
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="picture" className="form-label">
                          Event Image
                        </label>
                        {previewImageUrl && (
                          <div className="text-center mb-3">
                            <img
                              src={previewImageUrl}
                              alt="Preview"
                              style={{ maxWidth: "300px", maxHeight: "300px" }}
                            />
                            <div className="mt-2">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={handleRemoveImage}
                              >
                                Remove Image
                              </button>
                            </div>
                          </div>
                        )}
                        <input
                          type="file"
                          className="form-control"
                          id="picture"
                          name="picture"
                          accept="image/*"
                          onChange={handleImageSelect}
                        />
                        <p className="small mt-2">
                          <b>Note:</b> Only JPG, JPEG, and PNG formats are
                          supported. Our suggested dimensions are 600px * 450px.
                          Larger images will be cropped to fit our
                          thumbnails/previews.
                        </p>
                      </div>
                    </div>
                  </div>
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
