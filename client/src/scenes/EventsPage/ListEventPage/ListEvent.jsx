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
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleImageSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        setImageName(selectedFile.name);
        setImageFile(selectedFile);
        const tempUrl = URL.createObjectURL(selectedFile);
        setPreviewImageUrl(tempUrl); 
    }
};

const handleRemoveImage = () => {
  setImageName(null);
  setImageFile(null);
  setPreviewImageUrl(""); // Clear the preview image URL
  document.getElementById("picture").value = ""; // Reset the file input
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
          dateDebut: formatDate(eventData.dateDebut),
          dateFin: formatDate(eventData.dateFin),
        });
        if (eventData.picturePath) { 
          setPreviewImageUrl(`http://localhost:3001/assets/${eventData.picturePath}`);
          setImageName(eventData.picturePath); 
        }
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

  const sortEvents = (events) => {
    console.log("Sorting events by:", sortBy);

    if (sortBy === "Newest") {
      console.log("Sorting by Newest");
      return events.slice().sort(
        (a, b) => new Date(b.dateDebut) - new Date(a.dateDebut)
      );
    } else if (sortBy === "Oldest") {
      console.log("Sorting by Oldest");
      return events.slice().sort(
        (a, b) => new Date(a.dateDebut) - new Date(b.dateDebut)
      );
    } else if (sortBy === "Accepted") {
      console.log("Sorting by Accepted");
      return events;
    } else if (sortBy === "Rejected") {
      console.log("Sorting by Rejected");
      return events;
    } else {
      console.log("No sorting");
      return events;

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
                      placeholder={formState.price ? "Enter Event Price" : "Free Event"}
                    />
                  </div>
                  {/* Upload image START */}
                  <div className="m-4">
                    {/* Image */}
                    <div className="col-12">
  <div className="mb-3">
    <label htmlFor="picture" className="form-label">Event Image</label>
    {/* Image Preview or Current Image Display */}
    {previewImageUrl && (
      <div className="text-center mb-3">
        <img
          src={previewImageUrl}
          alt="Preview"
          style={{ maxWidth: "300px", maxHeight: "300px" }}
        />
        <div className="mt-2">
          <button type="button" className="btn btn-danger btn-sm" onClick={handleRemoveImage}>Remove Image</button>
        </div>
      </div>
    )}
    {/* Image Upload Input */}
    <input
      type="file"
      className="form-control"
      id="picture"
      name="picture"
      accept="image/*"
      onChange={handleImageSelect}
    />
    <p className="small mt-2">
      <b>Note:</b> Only JPG, JPEG, and PNG formats are supported. Our suggested dimensions are 600px * 450px. Larger images will be cropped to fit our thumbnails/previews.
    </p>
  </div>
</div>
                  </div>
                  {/* Upload image END */}
                </div>
                {/* Search and select END */}
              </div>
              <div className="card-body">
                <div className="table-responsive border-0 rounded-3">
                  <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 rounded-start">
                          Event Title
                        </th>
                        <th scope="col" className="border-0">
                          Start Date
                        </th>
                        <th scope="col" className="border-0">
                          End Date
                        </th>

                        <th scope="col" className="border-0">
                          Place
                        </th>
                        <th scope="col" className="border-0">
                          Time From
                        </th>
                        <th scope="col" className="border-0">
                          Time To
                        </th>
                        <th scope="col" className="border-0">
                          Price
                        </th>
                        <th scope="col" className="border-0 rounded-end">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map((event, index) => (
                        <tr key={index}>
                          <td>{event.title}</td>
                          <td>{new Date(event.dateDebut).toLocaleDateString()}</td>
                          <td>{new Date(event.dateFin).toLocaleDateString()}</td>
                          <td>{event.place}</td>
                          <td>{event.timeFrom}</td>
                          <td>{event.timeTo}</td>
                          <td>{event.price ? `${event.price} TND` : "Free"}</td>
                          <td>
                            {/* Actions */}
                            <a
                              onClick={() => editEvents(event._id)}
                              className="btn btn-success-soft btn-round me-1 mb-1 mb-md-0"
                            >
                              <i class="bi bi-pencil-square"></i>
                            </a>
                            <button
                              onClick={() => deleteEvents(event._id)}
                              className="btn btn-danger-soft btn-round me-1 mb-1 mb-md-0"
                            >
                              <i class="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {filteredEvents.map((event, index) => (
                      <tr key={index}>
                        <td>{event.name}</td>
                        <td>
                          {new Date(event.dateDebut).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(event.dateFin).toLocaleDateString()}
                        </td>
                        <td>{event.price || "Free"}</td>
                        <td>
                          {/* Actions */}
                          <a
                            onClick={() => editEvents(event._id)}
                            className="btn btn-success-soft btn-round me-1 mb-1 mb-md-0">
                            <i class="bi bi-pencil-square"></i>
                          </a>
                          <button
                            onClick={() => deleteEvents(event._id)}

                            className="btn btn-danger-soft btn-round me-1 mb-1 mb-md-0"><i class="bi bi-trash"></i>
</button>
                        </td>
                      </tr>
                    ))}


                          </table>
                        </div>
                      </div>
              {/* Pagination can be added here */ }
              {/* Pagination START */ }
                      < div className = "d-sm-flex justify-content-sm-between align-items-sm-center" >
                      {/* Content */ }
                      < p className = "mb-0 text-center text-sm-start" >
                      Showing { indexOfFirstEntry + 1} to{" "}
                    {Math.min(indexOfLastEntry, filteredEvents.length)} of{" "}
                    {filteredEvents.length} entries
                  </p>
                  {/* Pagination */}
                  <nav
                    className="d-flex justify-content-center mb-0"
                    aria-label="navigation"
                  >
                    <ul className="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                      <li className="page-item mb-0">
                        <a className="page-link" href="#" tabIndex={-1}>
                          <i className="fas fa-angle-left" />
                        </a>
                      </li>
                      <li className="page-item mb-0">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item mb-0 active">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item mb-0">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item mb-0">
                        <a className="page-link" href="#">
                          <i className="fas fa-angle-right" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                {/* Pagination END */}
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
      </main>
    </div>
  );
}
export default EditEvent;