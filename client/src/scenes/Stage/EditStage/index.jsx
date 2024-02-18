import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import BannerStart from "components/BannerStart"; // If you have this component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StageForm() {
  const [formState, setFormState] = useState({
    Title: "",
    description: "",
    startDate: "",
    finishDate: ""
  });
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStageData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/stage/${id}`
        );
        setFormState({
          Title: response.data.Title,
          description: response.data.description,
          startDate: response.data.startDate,
          finishDate: response.data.finishDate
        });
        setImageName(response.data.imagePath);
      } catch (error) {
        console.error("Failed to fetch stage data:", error);
        setMessage("Failed to load stage data.");
      }
    };

    if (id) fetchStageData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageSelect = (event) => {
    const selectedFile = event.target.files[0];
    setImageName(selectedFile.name);
    setImageFile(selectedFile);
  };

  const handleRemoveImage = () => {
    setImageName("");
    setImageFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (const key in formState) {
      formData.append(key, formState[key]);
    }
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(`http://localhost:3001/api/stage/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Stage edited successfully !!", {
        autoClose: 1500,
        style: {
          color: 'green'
        }
      });
      setTimeout(() => {
        navigate('/ListStage');
      }, 2000);
    } catch (error) {
      console.error("Failed to update stage:", error);
      setMessage("Failed to update stage. Please try again.");
    }
  };

  return (
    <main>
      <SideBar />
      <div className="page-content">
        <TopBarBack />
        <ToastContainer />

        {/* Add your banner component if you have one */}
        <BannerStart
          title="Update Stage"
          description="Make changes to your Stage details below."
        />
        <div className="container mt-4">
          <h2>Update Stage</h2>
          {message && (
            <div
              className={`alert ${message.startsWith("Failed") ? "alert-danger" : "alert-success"
                }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Stage Title */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Stage Title 
              </label>
              <input
                type="text"
                className="form-control"
                id="Title"
                name="Title"
                value={formState.Title}
                onChange={handleChange}
              />
            </div>
            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formState.description}
                onChange={handleChange}
              ></textarea>
            </div>
            {/* StartDate */}
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                value={formState.startDate}
                onChange={handleChange}
              />
            </div>
            {/* FinishDate */}
            <div className="mb-3">
              <label htmlFor="finishDate" className="form-label">
                Finish Date
              </label>
              <input
                type="date"
                className="form-control"
                id="finishDate"
                name="finishDate"
                value={formState.finishDate}
                onChange={handleChange}
              />
            </div>
            {/* Image Upload */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Category Image
              </label>
              {imageName && (
                <div>
                  <img
                    src={
                      imageName
                        ? `http://localhost:3001/assets/${imageName}`
                        : ""
                    }
                    alt="Category"
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={handleRemoveImage}
                  >
                    Remove image
                  </button>
                </div>

              )}

              <input
                type="file"
                className="form-control"
                id="picture"
                name="picture"
                accept="image/*"
                onChange={handleImageSelect} // Ensure this line is correct
              />
            </div>
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Update Internship
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default StageForm;
