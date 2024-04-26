import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useSelector } from 'react-redux';
import NavBar from 'components/NavBar';
import SideBarStudent from 'components/SideBarStudent';
import TopBarTeacherStudent from 'components/TopBarTeacherStudent';
import Footer from 'components/Footer';
import Select from 'react-select'; // Importez React Select

const AssignmentsComponent = () => {
  const [assignments, setAssignments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseImages, setCourseImages] = useState({});
  const [selectedCourse, setSelectedCourse] = useState("");
  const accessToken = useSelector((state) => state.accessToken);
  const decodeToken = accessToken ? jwtDecode(accessToken) : "";

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auth/assignments/${decodeToken.course}/${decodeToken.id}`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        setAssignments(response.data);
        setLoading(false);
        console.log(response.data);

        response.data.forEach(async (assignment) => {
          try {
            const courseResponse = await axios.get(`http://localhost:3001/course/${assignment.courseId}`);
            console.log('URL correcte de l\'image:', courseResponse.data.picturePath);
            setCourseImages(prevState => ({
              ...prevState,
              [assignment.courseId]: courseResponse.data.picturePath
            }));
          } catch (error) {
            console.error('Error fetching course image:', error);
          }
        });
      } catch (error) {
        setError('Error fetching assignments');
        setLoading(false);
      }
    };
  
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/teachers'); 
        setTeachers(response.data);
      } catch (error) {
        setError('Error fetching teachers');
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auth/course/${decodeToken.id}`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        console.log()
        setCourses(response.data);
      } catch (error) {
        setError('Error fetching courses');
      }
    };
    
    if (accessToken && decodeToken) {
      fetchAssignments();
      fetchTeachers();
      fetchCourses();
    }
  
    return () => {
      // Clean up if necessary
    };
  }, [accessToken, decodeToken]);

  const getTeacherName = (teacherId) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher ? `${teacher.firstName} ${teacher.lastName}` : 'Unknown';
  };

  const handleCourseChange = (selectedOption) => {
    setSelectedCourse(selectedOption.value);
  };
  
  const courseOptions = courses.map(course => ({
    value: course._id,
    label: course.title
  }));

  const filteredAssignments = selectedCourse ? assignments.filter(assignment => assignment.courseId === selectedCourse) : assignments;

  return (
    <div>
      <NavBar />
      <TopBarTeacherStudent />
      <section className="pt-4">
        <div className="container">
          <div className="row">
            <SideBarStudent />
            <div className="col-xl-9">
              <Select
                options={courseOptions}
                onChange={handleCourseChange}
                value={courseOptions.find(option => option.value === selectedCourse)}
                placeholder="Sélect a course"
              />
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
                        <li className="list-inline-item h6 fw-light"><i className="fas fa-chalkboard-teacher text-primary me-2"></i>{getTeacherName(assignment.id)}</li>
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
      </section>
      <Footer />
    </div>
  );
}

export default AssignmentsComponent;
