import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from 'components/NavBar';
import { Link, useNavigate } from 'react-router-dom'
import TopBarTeacherStudent from "components/TopBarTeacherStudent";
import SideBarTeacher from "components/SideBarTeacher";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function TeacherView() {
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState("");
    const [courseImages, setCourseImages] = useState({});
    const [showModal, setShowModal] = useState(false);

    const [assignments, setAssignments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [newAssignment, setNewAssignment] = useState({
        title: '',
        courseId: '',
        picturePath: null,
        description: ''
    });

    useEffect(() => {
        fetchAssignments();
        fetchCourses();
    }, []);

    const fetchAssignments = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/assignments');
            setAssignments(response.data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:3001/course/all');
            const data = response.data.data;
            if (Array.isArray(data)) {
                setCourses(data);
                const images = {};
                data.forEach(course => {
                    images[course._id] = course.picturePath;
                });
                setCourseImages(images);
            } else {
                console.error('Data returned from API is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAssignment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setNewAssignment(prevState => ({
            ...prevState,
            picturePath: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newAssignment.title || !newAssignment.courseId || !newAssignment.picturePath) {
            toast.error('Please fill in all required fields');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('title', newAssignment.title);
            formData.append('courseId', newAssignment.courseId);
            formData.append('picturePath', newAssignment.picturePath);

            const response = await axios.post('http://localhost:3001/api/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                toast.success("Class added successfully !!", {
                    autoClose: 1500,
                    style: {
                        color: 'green',
                    },
                });

    
                setAssignments([...assignments, response.data]);
    
                setNewAssignment({
                    title: '',
                    courseId: '',
                    picturePath: null,
                    description: ''
                });

            } else {
                toast.error("Failed to add class", {
                    autoClose: 5000,
                    style: {
                        color: 'red',
                    },
                });
            }
        } catch (error) {
            console.error("Error adding class:", error);
            toast.error("Error adding class");
        }
    };

    const handleCourseChange = (event) => {
        const courseId = event.target.value; 
        setSelectedCourse(courseId);
    };
    const filteredAssignments = selectedCourse ? assignments.filter(assignment => assignment.courseId === selectedCourse) : assignments;

    return (
        <div>
            <NavBar />
            <TopBarTeacherStudent />
            <ToastContainer />

            <div className="container mt-3">
                <div className="row">
                    <SideBarTeacher />
                    <div className="col-xl-9">
                        <div className="card">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <h2>Add New Assignment</h2>
                                <button onClick={() => setShowModal(true)} className="btn btn-primary">Add Assignment</button>
                            </div>
                        </div>
                        {filteredAssignments.map((assignment, index) => (
                            <div key={assignment.id} className="assignment-section row align-items-center mb-4 border p-3">
                                <div className="col-md-3">
                                    <div style={{ background: 'linear-gradient(rgba(236, 231, 225, 0.25), rgba(18, 91, 193, 0.93))' }}>
                                        <img
                                            src={courseImages[assignment.courseId] ? `http://localhost:3001/assets/${courseImages[assignment.courseId]}` : "assets/images/default-event.jpg"}
                                            alt="Assignment image"
                                            className="card-img-top"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div>
                                        <h3 className="card-title"><a href={`http://localhost:3001/${assignment.picturePath}`} target="_blank">{assignment.title}</a></h3>
                                        <ul className="list-inline mb-2">
                                            <li className="list-inline-item h6 fw-light mb-1 mb-sm-0"><i className="far fa-clock text-danger me-2"></i>{new Date(assignment.createdAt).toLocaleDateString()}</li>
                                            <li className="list-inline-item h6 fw-light"><i className="fas fa-signal text-success me-2"></i>Beginner</li>
                                        </ul>
                                        <a href="#" className="btn btn-primary-soft btn-sm mb-0">Detail course</a>
                                        <p>{assignment.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Utilisez le composant de modal de react-bootstrap */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input id="title" className="form-control" type="text" name="title" value={newAssignment.title} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="course" className="form-label">Select Course</label>
                            <select id="course" className="form-select" name="courseId" value={newAssignment.courseId} onChange={handleInputChange}>
                                <option value="">Select Course</option>
                                {courses.map(course => (
                                    <option key={course._id} value={course._id}>{course.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="picture" className="form-label">Upload Assignment File (PDF)</label>
                            <input id="picture" className="form-control" type="file" name="picturePath" accept=".pdf" onChange={handleFileChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea id="description" className="form-control" name="description" value={newAssignment.description} onChange={handleInputChange} />
                        </div>
                        <Button variant="primary" type="submit">Create Assignment</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default TeacherView;
