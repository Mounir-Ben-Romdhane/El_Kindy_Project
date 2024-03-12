import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "./Modal"; // Assurez-vous d'avoir un composant Modal
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import TopBarTeacherStudent from "components/TopBarTeacherStudent";
import SideBarTeacher from "components/SideBarTeacher";
import { jwtDecode } from "jwt-decode";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [rooms, setRooms] = useState([]);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [courses, setCourses] = useState([]); // Ajoutez un état pour stocker les cours
  const [teachers, setTeachers] = useState([]); // Ajout d'un état pour les enseignants
  const [students, setStudents] = useState([]); // Ajout d'un état pour les étudiants
  const [isLoading, setIsLoading] = useState(true);

  const axiosPrivate = useAxiosPrivate();
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.id; // Assurez-vous que le payload du token contient un champ `id`
    }
    return null;
  };
  function generateTimeSlots() {
    const slots = [];
    for (let hour = 9; hour < 21; hour += 2) {
      // Incrémentation par 2 pour sauter une heure à chaque itération
      let startHour = moment({ hour });
      let endHour = moment({ hour }).add(1, "hour");

      slots.push({
        title: `${startHour.format("HH[h]")} - ${endHour.format("HH[h]mm")}`,
        start: startHour.toDate(),
        end: endHour.toDate(),
      });

      // Merge chaque paire de créneaux horaires en une seule plage horaire d'une heure
      if (hour < 19) {
        let nextStartHour = moment({ hour }).add(1, "hour");
        let nextEndHour = moment({ hour }).add(2, "hour");

        slots.push({
          title: `${nextStartHour.format("HH[h]")} - ${nextEndHour.format(
            "HH[h]mm"
          )}`,
          start: nextStartHour.toDate(),
          end: nextEndHour.toDate(),
        });
      }
    }

    return slots;
  }
  useEffect(() => {
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

    // Mettre à jour l'état isLoading une fois que les données sont chargées
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Supposons que vous ayez un moyen d'obtenir l'ID de l'enseignant connecté
    const teacherId = getUserIdFromToken(); // Vous devez remplacer cette partie par la logique réelle pour obtenir l'ID de l'enseignant

    axiosPrivate
      .get(`http://localhost:3001/planning/teacher/${teacherId}`) // Modifiez l'URL pour qu'elle corresponde à votre API
      .then((response) => {
        const filteredEvents = response.data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));

        setEvents(filteredEvents);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the teacher-specific events",
          error
        );
      });
  }, [axiosPrivate]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/salle")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the rooms", error);
      });
    axiosPrivate
      .get("http://localhost:3001/course/all") // Récupérez la liste des cours
      .then((response) => {
        setCourses(response.data); // Stockez les cours dans l'état
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses", error);
      });
    // Pour les enseignants
    axios
      .get("http://localhost:3001/auth/teachers")
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the teachers", error);
      });

    // Pour les étudiants
    axios
      .get("http://localhost:3001/auth/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the students", error);
      });

    axios
      .get("http://localhost:3001/planning/all")
      .then((response) => {
        const loadedEvents = response.data.map((event) => {
          // Assurez-vous que chaque événement a un ID unique.
          const color = event.color; // Utilisez l'ID de l'événement pour récupérer sa couleur
          const teacherName = event.teacherId
            ? `${event.teacherId.firstName} ${event.teacherId.lastName}`
            : "Enseignant inconnu";
          const studentName = event.studentId
            ? `${event.studentId.firstName} ${event.studentId.lastName}`
            : "Étudiant inconnu";

          return {
            ...event,
            title: `${event.title} Teacher: ${teacherName}, Student: ${studentName}`,

            start: new Date(event.start),
            end: new Date(event.end),
            resourceId: event.resourceId,
            color, // Stockez la couleur avec l'événement
            teacherId: event.selectedTeacherId,
            studentId: event.selectedStudentId,
          };
        });

        const timeSlots = generateTimeSlots();
        setEvents([...timeSlots, ...loadedEvents]); // Combinez les tranches horaires avec les événements chargés
        console.log("Événements mis à jour pour le calendrier:", [
          ...timeSlots,
          ...loadedEvents,
        ]);
      })
      .catch((error) => {
        console.error("There was an error fetching the events", error);
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
    const selectedCourse = courses.data.find(
      (course) => course._id === event.courseId
    );

    if (!roomExists) {
      console.error("L'ID de la salle spécifiée n'existe pas.");
      return;
    }

    // Vérifiez si selectedCourse est défini avant d'accéder à sa propriété title
    const courseTitle = selectedCourse
      ? selectedCourse.title
      : "Titre de cours non trouvé";

    const newEvent = {
      id: events.length + 1, // Assurez-vous de donner un ID unique à chaque événement
      title: `${event.title} `,
      start: event.start,
      end: event.end,
      resourceId: roomId,
      color: event.color, // Utiliser la couleur sélectionnée du Modal
      teacherId: event.teacherId, // Utilisez event.teacherId au lieu de event.selectedTeacherId
      studentId: event.studentId, // Utilisez event.studentId au lieu de event.selectedStudentId
    };
    console.log("Nouvel événement à sauvegarder :", newEvent);

    // Fusionner le nouvel événement avec les événements existants
    const updatedEvents = [...events, newEvent];

    console.log("Evénements avant la sauvegarde :", events);

    // Mettre à jour les événements dans le state
    setEvents(updatedEvents);

    const response = axios.post("http://localhost:3001/planning/add", newEvent);
    const addedEvent = response.data;

    // Mise à jour de l'état avec le nouvel événement
    setEvents((prevEvents) => [...prevEvents, addedEvent]);
    console.log("Nouvel événement ajouté avec succès:", addedEvent);
  };
  const formats = {
    timeGutterFormat: (date, culture, localizer) =>
      localizer.format(date, "HH[h]mm", culture),
    eventTimeRangeFormat: ({ start, end }, culture, localizer) => {
      let startTime = localizer.format(start, "HH[h]mm", culture);
      let endTime = localizer.format(end, "HH[h]mm", culture);
      return `${startTime} - ${endTime}`;
    },
    dayRangeHeaderFormat: ({ start, end }, culture, localizer) => {
      let startTime = localizer.format(start, "HH[h]mm", culture);
      let endTime = localizer.format(end, "HH[h]mm", culture);
      return `${startTime} - ${endTime}`;
    },
  };
  const MyEvent = ({ event }) => {
    // Trouver les noms des enseignants et des étudiants à partir de leurs IDs
    const teacher = teachers.find((t) => t._id === event.teacherId);
    const student = students.find((s) => s._id === event.studentId);

    // Afficher les noms si trouvés, sinon afficher "Enseignant inconnu" ou "Étudiant inconnu"
    const teacherName = teacher
      ? `${teacher.firstName} ${teacher.lastName}`
      : "Enseignant inconnu";
    const studentName = student
      ? `${student.firstName} ${student.lastName}`
      : "Étudiant inconnu";

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

        {/* hedha l partie l fou9aneya  */}
        <TopBarTeacherStudent />
        {/* =======================
Page content START */}
        <section className="pt-0">
          <div className="container">
            <div className="row">
              <SideBarTeacher />
              <div className="col-xl-9">
                {/* Student review START */}
                <div className="card border bg-transparent rounded-3">
                  {/* Reviews START */}
                  <div className="card-body  ">
                    {/* Review item START */}
                    <div className="d-sm-flex">
                      <div>
                        <div className="mb-3 d-sm-flex justify-content-sm-between ">
                          {/* Title */}
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
                              max={new Date(0, 0, 0, 21, 0)} // Fin à 21:00 PM
                              step={30} // Définit des tranches horaires de 30 minutes
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
                              eventPropGetter={(event) => {
                                return {
                                  style: { backgroundColor: event.color },
                                };
                              }}
                            />

                            {showModal && (
                              <Modal
                                onClose={() => setShowModal(false)}
                                onSave={addNewEvent}
                                eventDetails={selectedEvent}
                                rooms={rooms}
                                courses={courses} // Passez les cours comme prop au composant Modal
                                teachers={teachers} // Passez les enseignants
                                students={students} // Passez les étudiants
                              />
                            )}
                          </div>
                        </div>

                        {/* Button */}
                        <div className="text-end"></div>
                      </div>
                    </div>
                    {/* Divider */}
                    <hr />
                    <div>
                      {/* ... */}
                      <div className="text-end"></div>

                      {/* ... */}
                    </div>
                    {/* Divider */}

                    {/* Review item END */}
                  </div>
                  {/* Reviews END */}
                </div>
                {/* Student review END */}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
      {/* **************** MAIN CONTENT END **************** */}
    </div>
  );
};
export default MyCalendar;
