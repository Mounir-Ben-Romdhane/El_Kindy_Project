import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "./Modal";
import { useSelector } from "react-redux"; // Importez useSelector depuis React Redux
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import TopBarTeacherStudent from "components/TopBarTeacherStudent";
import SideBarTeacher from "components/SideBarTeacher";
// Importez jwtDecode pour décoder le jeton d'accès
import { jwtDecode } from "jwt-decode";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [rooms, setRooms] = useState([]);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useSelector((state) => state.accessToken); // Récupérez le jeton d'accès du store Redux
  const decodeToken = accessToken ? jwtDecode(accessToken) : "";

  // Utilisez le jeton d'accès dans vos requêtes HTTP
  useEffect(() => {
    const fetchPlannings = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/planning/teacher/${decodeToken.id}`, {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });
        setEvents(response.data.map((planning) => ({
          id: planning._id,
          title: planning.title,
          start: new Date(planning.start),
          end: new Date(planning.end),
          resourceId: planning.resourceId,
          color: planning.color,
          teacherId: planning.teacherId,
          studentId: planning.studentId,
        })));
      } catch (error) {
        console.error('Erreur lors de la récupération des plannings', error);
        // Affichez un message d'erreur à l'utilisateur ou effectuez d'autres actions en cas d'erreur
      }
    };
  
    fetchPlannings();
  }, [accessToken, decodeToken.id]);
  



  useEffect(() => {
    axios
      .get("http://localhost:3001/salle")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the rooms", error);
      });
      axios
      .get("http://localhost:3001/course/all")
      .then((response) => {
        setCourses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses", error);
      });
  
    axios
      .get("http://localhost:3001/auth/teachers")
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the teachers", error);
      });
  
    axios
      .get("http://localhost:3001/auth/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the students", error);
      });
  }, []); // Supprimer la redondance ici
  

  useEffect(() => {
    axios
      .get("http://localhost:3001/salle")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the rooms", error);
      });

      axios
      .get("http://localhost:3001/course/all")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses", error);
      });
  }, []);

  const handleSelectSlot = ({ start, end, resourceId }) => {
    setSelectedEvent({ start, end, resourceId });
    setShowModal(true);
  };

  const addNewEvent = (event) => {
    setShowModal(false);
    const roomId = event.roomId;
    const roomExists = rooms.some((room) => room._id === roomId);
    const selectedCourse = courses.data.find((course) => course._id === event.courseId);

    if (!roomExists) {
      console.error("L'ID de la salle spécifiée n'existe pas.");
      return;
    }

   
  };

  const formats = {
    timeGutterFormat: (date, culture, localizer) => localizer.format(date, "HH[h]mm", culture),
    eventTimeRangeFormat: ({ start, end }, culture, localizer) => {
      const startTime = localizer.format(start, "HH[h]mm", culture);
      const endTime = localizer.format(end, "HH[h]mm", culture);
      return `${startTime} - ${endTime}`;
    },
    dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
      const startTime = localizer.format(start, "HH[h]mm", culture);
      const endTime = localizer.format(end, "HH[h]mm", culture);
      return `${startTime} - ${endTime}`;
    },
  };

  const MyEvent = ({ event }) => {
    const teacher = teachers.find((t) => t._id === event.teacherId);
    const student = students.find((s) => s._id === event.studentId);
    const teacherName = teacher ? `${teacher.firstName} ${teacher.lastName}` : "Enseignant inconnu";
    const studentName = student ? `${student.firstName} ${student.lastName}` : "Étudiant inconnu";

    return (
      <div>
        <strong>{event.title}</strong>
        <div>Teacher: {teacherName}</div>
        <div>Student: {studentName}</div>
      </div>
    );
  };

  return (
    <div>
      <main>
        <NavBar />
        <TopBarTeacherStudent />
        <section className="pt-0">
          <div className="container">
            <div className="row">
              <SideBarTeacher />
              <div className="col-xl-9">
                <div className="card border bg-transparent rounded-3">
                  <div className="card-body">
                    <div className="d-sm-flex">
                      <div>
                        <div className="mb-3 d-sm-flex justify-content-sm-between">
                          <div>
                            <Calendar
                              components={{
                                event: MyEvent,
                              }}
                              key={events.length}
                              localizer={localizer}
                              events={events}
                              onSelectSlot={handleSelectSlot}
                              selectable={false}
                              resourceIdAccessor="resourceId"
                              resourceTitleAccessor="resourceTitle"
                              defaultView="day"
                              min={new Date(0, 0, 0, 9, 0)}
                              max={new Date(0, 0, 0, 21, 0)}
                              step={30}
                              timeslots={1}
                              views={{ month: false, week: false, day: true }}
                              resources={rooms.map((room) => ({
                                resourceId: room._id,
                                resourceTitle: room.name,
                              }))}
                              startAccessor="start"
                              endAccessor="end"
                              style={{ height: "100%", width: "70%" }}
                              formats={formats}
                              eventPropGetter={(event) => ({
                                style: { backgroundColor: event.color },
                              })}
                            />
                            {showModal && (
                              <Modal
                                onClose={() => setShowModal(false)}
                                onSave={addNewEvent}
                                eventDetails={selectedEvent}
                                rooms={rooms}
                                courses={courses}
                                teachers={teachers}
                                students={students}
                              />
                            )}
                          </div>
                        </div>
                        <div className="text-end"></div>
                      </div>
                    </div>
                    <hr />
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default MyCalendar;


