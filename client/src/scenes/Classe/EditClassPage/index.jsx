import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import BannerStart from "components/BannerStart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ClassesForm() {
  const [formState, setFormState] = useState({
    name: "",
    capacity: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasseData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/salle/${id}`);
        setFormState({
          name: response.data.name,
          capacity: response.data.capacity,
          status: response.data.status,
        });
      } catch (error) {
        console.error("Failed to fetch class data:", error);
        setMessage("Failed to load class data.");
      }
    };
    if (id) fetchClasseData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    // Update the form state
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    // Clear the error message when the user starts typing again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "" ? `Please enter ${name}` : "",
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    const errors = {};
    if (!formState.name) {
      errors.name = "Please enter a class name.";
    }
    if (!formState.capacity) {
      errors.capacity = "Please enter a class capacity.";
    }
    if (!formState.status) {
      errors.status = "Please select a class status.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.put(`http://localhost:3001/salle/${id}`, formState, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success("Class edited successfully !!", {
          autoClose: 1500,
          style: {
            color: "green",
          },
        });

        setTimeout(() => {
          navigate("/listClasse");
        }, 2000);
      } catch (error) {
        console.error("Failed to update class:", error);
        setMessage("Failed to update Class. Please try again.");
      }
    }
  };

  return (
    <main>
      <SideBar />
      <div className="page-content">
        <TopBarBack />
        <ToastContainer />
        <div className="page-content-wrapper border">

          <BannerStart
            title="Update Class"
            description="Make changes to your class details below."
          />
          <div className="container mt-4">
            <h2>Update Class</h2>
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
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  name="name"
                  
                  value={formState.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="capacity" className="form-label">
                  Capacity
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.capacity ? "is-invalid" : ""
                  }`}
                  id="capacity"
                  name="capacity"
                  
                  value={formState.capacity}
                  onChange={handleChange}
                />
                {errors.capacity && (
                  <div className="invalid-feedback">{errors.capacity}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className={`form-select ${
                    errors.status ? "is-invalid" : ""
                  }`}
                  id="status"
                  name="status"
                  
                  value={formState.status}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Update Category
              </button>
            </form>
          </div>


        {/* Add your banner component if you have one */}
        <BannerStart
          title="Update Class"
          description="Make changes to your class details below."
        />
        <div className="container mt-4">
          <h2>Update Class</h2>
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
            {/* Category Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                
                value={formState.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="capacity" className="form-label">
                Cpacity
              </label>
              <input
                type="text"
                className="form-control"
                id="capacity"
                name="capacity"
                
                value={formState.capacity}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
  <label htmlFor="status" className="form-label">
    Status
  </label>
  <select
    className="form-select"
    id="status"
    name="status"
    required
    value={formState.status}
    onChange={handleChange}
  >
    <option value="" disabled>
      Select Status
    </option>
    <option value="available">Available</option>
    <option value="occupied">Occupied</option>
    <option value="maintenance">Maintenance</option>
    {/* Ajoutez les autres choix ici en fonction de votre application */}
  </select>
</div>
           
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Update Category
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}

export default ClassesForm;
