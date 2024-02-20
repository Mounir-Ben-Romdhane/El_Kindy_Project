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
    title: "",
    description: "",
    startDate:"",
    finishDate:"",
    picturePath:"",
  });
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/stage/${id}`
        );
        setFormState({
          name: response.data.name,
          description: response.data.description,
          startDate: new Date(response.data.startDate),
          finishDate: new Date(response.data.finishDate),
          picturePath: response.data.picturePath,
        });
        // Assuming response.data has a imagePath attribute
        setImageName(response.data.imagePath);
      } catch (error) {
        console.error("Failed to fetch Internship data:", error);
        setMessage("Failed to load Internship data.");
      }
    };

    if (id) fetchCategoryData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageSelect = (event) => {
    // Get the selected file
    const selectedFile = event.target.files[0];
    // Set the image name
    setImageName(selectedFile.name);
    // Set the image file
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
      formData.append("picture", imageFile); // Ensure the file is appended with the key "picture"
    }
  
    try {
      await axios.put(`http://localhost:3001/api/stage/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header
        },
      });
      toast.success("Internship edited successfully !!", { autoClose: 1500,
        style: {
          color: 'green' // Text color
        }});
      setTimeout(() => {
        navigate('/listStage');
      }, 2000);
    } catch (error) {
      console.error("Failed to update Internship:", error);
      setMessage("Failed to update Internship. Please try again.");
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
          title="Update Internship"
          description="Make changes to your Internship details below."
        />
        <div className="container mt-4">
          <h2>Update Stage</h2>
          {message && (
            <div
              className={`alert ${
                message.startsWith("Failed") ? "alert-danger" : "alert-success"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* title  */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formState.title}
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
              startDate
              </label>
              <textarea
                className="form-control"
                id="startDate"
                name="startDate"
                rows="3"
                value={formState.startDate}
                onChange={handleChange}
              ></textarea>
            </div>
            {/* finishDate */}
            <div className="mb-3">
              <label htmlFor="finishDate" className="form-label">
              finishDate
              </label>
              <textarea
                className="form-control"
                id="finishDate"
                name="finishDate"
                rows="3"
                value={formState.finishDate}
                onChange={handleChange}
              ></textarea>
            </div>
            {/* Image Upload */}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
              Internship Image
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
              Update Stage
            </button>
          </form>
        </div>
      </div>
      
    </main>
  );
}

export default StageForm;