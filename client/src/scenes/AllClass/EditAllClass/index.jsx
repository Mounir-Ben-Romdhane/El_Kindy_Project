import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import BannerStart from "components/BannerStart"; // If you have this component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllCourses } from 'services/courseService/api';

function ClassesForm() {
  const [formState, setFormState] = useState({
    className: "",
    capacity: "",
    ordre: "",
    courses:[]
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchClasseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/classes/${id}`
        );
        setFormState({
          className: response.data.className,
          capacity: response.data.capacity,
          ordre: response.data.ordre,
          courses: response.data.courses
        });
        // Assuming response.data has a imagePath attribute
      } catch (error) {
        console.error("Failed to fetch class data:", error);
        setMessage("Failed to load class data.");
      }
    };

    if (id) fetchClasseData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
  
    if (name === 'courses') {
      const selectedValue = value;
      const courseId = value;
      const isChecked = checked;
  
      setFormState((prevFormData) => ({
        ...prevFormData,
        [name]: isChecked
          ? [...prevFormData[name], selectedValue]
          : prevFormData[name].filter((id) => id !== selectedValue),
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        courses: '',
      }));
    } else {
      setFormState({ ...formState, [name]: value });

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() ? '' : `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
      }));
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formValues = {
      className: formState.className,
      capacity: formState.capacity,
      ordre: formState.ordre,
      courses: formState.courses,

    };
  
    // Validation checks
    const errors = {};
    if (!formValues.className) {
      errors.className = 'Class Name is required.';
    }
    if (!formValues.capacity) {
      errors.capacity = 'Capacity is required.';
    }
    if (!formValues.ordre) {
      errors.ordre = 'Order is required.';
    }

    // Update the errors state
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        await axios.put(`http://localhost:3001/classes/${id}`, formValues, {
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
          navigate('/ListAllClasse');
        }, 2000);
      } catch (error) {
        console.error("Failed to update class:", error);
        setMessage("Failed to update Class. Please try again.");
      }
    }
  };
useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3001/course/allCourses", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        const { data } = responseData;
        if (Array.isArray(data)) {
          setCourses(data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);
  return (
    <main>
      <SideBar />
      <div className="page-content">
        <TopBarBack />
        <ToastContainer />
        <div className="page-content-wrapper border">
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
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name Class
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.className ? 'is-invalid' : ''}`}
                  id="classNamee"
                  name="className"
                  required
                  value={formState.className}
                  onChange={handleChange}
                />
                {errors.className && (
                  <div className="invalid-feedback">{errors.className}</div>
                )}
              </div>
               {/* Courses taught */}
               <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">
                        Courses Taught <span className="text-danger">*</span>
                      </h6>
                    </div>
                    <div className="col-lg-8">
                      <div className="row row-cols-3">
                        {courses.map((course) => (
                          <div key={course._id} className="col">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={course._id}
                                name="courses"
                                value={course._id}
                                onChange={handleChange}
                                checked={formState.courses.includes(course._id)}
                              />
                              <label className="form-check-label" htmlFor={course._id}>
                                {course.title}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              <div className="mb-3">
                <label htmlFor="capacity" className="form-label">
                  Capacity
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
                  id="capacity"
                  name="capacity"
                  required
                  value={formState.capacity}
                  onChange={handleChange}
                />
                {errors.capacity && (
                  <div className="invalid-feedback">{errors.capacity}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="ordre" className="form-label">
                  Order
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.ordre ? 'is-invalid' : ''}`}
                  id="ordre"
                  name="ordre"
                  required
                  value={formState.ordre}
                  onChange={handleChange}
                />
                {errors.ordre && (
                  <div className="invalid-feedback">{errors.ordre}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Update Class
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ClassesForm;
