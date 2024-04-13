import React, { useState } from "react";

const Modal = ({
  onClose,
  onSave,
  onDelete,
  eventDetails,
  teachers,
  students,
  courses,
}) => {
  const isEditing = eventDetails._id; // Check if eventDetails has an id to determine if it's for editing

  const [course, setCourse] = useState({
    id: eventDetails.id || null,
    title: eventDetails.title || "",
    courseId: eventDetails.courseId || "",
    roomId: eventDetails.resourceId || "",
  });


  const [color, setColor] = useState(eventDetails.color || "#000000");
  const [selectedTeacherId, setSelectedTeacherId] = useState(
    eventDetails.teacherId || ""
  );
  const [selectedStudentId, setSelectedStudentId] = useState(
    eventDetails.studentId || ""
  );
  const [selectedRoomId, setSelectedRoomId] = useState(
    eventDetails.resourceId || ""
  ); // Use the current room as the initial value
  const [selectedCourseId, setselectedCourseId] = useState(
    eventDetails.courseId || ""
  );


  const rooms = eventDetails.rooms || []; // Retrieve the list of rooms from eventDetails
  const handleRoomChange = (e) => {
    const roomId = e.target.value;
    const isValidRoom = rooms.find((room) => room._id === roomId);
    if (isValidRoom) {
      setSelectedRoomId(roomId);
    } else {
      alert("The selected room does not exist. Please select a valid room.");
    }
  };

  const handleDelete = () => {
    console.log(eventDetails._id);
    onDelete(eventDetails.id); // Call the onDelete function with the event ID to delete
    onClose(); // Close the Modal after deletion
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCourse((prevState) => ({
      ...prevState,
      courseId: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { courseId } = course;

    if (!courseId) {
      alert("Please select a course.");
      return;
    }

    const selectedCourse = courses.data.find((c) => c._id === courseId);

    if (!selectedCourse) {
      alert("The selected course is not valid.");
      return;
    }

    const isValidRoom = rooms.find((room) => room._id === selectedRoomId);

    if (!isValidRoom) {
      alert("The selected room does not exist. Please select a valid room.");
      return;
    }

    const updatedEvent = {
      ...eventDetails,
      ...course,
      title: selectedCourse.title,
      color,
      teacherId: selectedTeacherId,
      studentId: selectedStudentId,
      resourceId: selectedRoomId,
      courseId: selectedCourseId,
    };

    onSave(updatedEvent);
  };

  const handleTeacherChange = (e) => {
    setSelectedTeacherId(e.target.value);
  };

  const handleStudentChange = (e) => {
    setSelectedStudentId(e.target.value);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "400px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ marginBottom: "10px" }}>
            {isEditing ? "Edit Planning" : "Add Planning"}
          </h2>
        </div>
        <label style={{ marginBottom: "16px", display: "block" }}>
          Select a course:
        </label>
        <select
              value={courses.data.courseId}
              onChange={handleInputChange}
              style={{
                marginBottom: "16px",
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">-- Select a course --</option>
              {courses.data.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
        

        <label style={{ marginBottom: "16px", display: "block" }}>
          Select a room:
        </label>
        <select
          value={selectedRoomId}
          onChange={handleRoomChange}
          style={{
            marginBottom: "16px",
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">-- Select a room --</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
        <label style={{ marginBottom: "16px", display: "block" }}>
          Select a teacher:
        </label>

        <select
          value={selectedTeacherId}
          onChange={handleTeacherChange}
          style={{
            marginBottom: "16px",
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">-- Choose a teacher --</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.firstName} {teacher.lastName}
            </option>
          ))}
        </select>
        <label style={{ marginBottom: "16px", display: "block" }}>
          Select a student:
        </label>

        <select
          value={selectedStudentId}
          onChange={handleStudentChange}
          style={{
            marginBottom: "16px",
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">-- Choose a student --</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.firstName} {student.lastName}
            </option>
          ))}
        </select>
        <label style={{ marginTop: "16px", display: "block" }}>
          Choose a color:
        </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ marginTop: "8px", display: "block" }}
        />
        <div style={{ marginTop: "8px" }}> {/* Espacement ajouté ici */}</div>

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            marginRight: "8px",
          }}
        >
          {isEditing ? "Edit" : "Add"}
        </button>

        <button
          onClick={onClose}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            marginRight: "8px",
          }}
        >
          Cancel
        </button>

        {isEditing && (
          <button
            onClick={handleDelete}
            style={{
              padding: "8px 16px",
              borderRadius: "4px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              marginRight: "8px",
            }}
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default Modal;
