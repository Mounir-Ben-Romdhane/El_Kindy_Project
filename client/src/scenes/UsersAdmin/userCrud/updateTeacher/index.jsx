import React, { useEffect, useState } from 'react';
import { getAllClasses } from 'services/classesService/api';
import { getAllCourses } from 'services/courseService/api';
import { updateTeacher } from 'services/usersService/api';
import '../../../../App.css';

function UpdateTeacher({ teacher, onClose, fetchData }) {
  const [formData, setFormData] = useState({
    firstName: teacher.firstName || '',
    lastName: teacher.lastName || '',
    email: teacher.email || '',
    password: teacher.password || '',
    coursesTaught: teacher.coursesTaught || [],
    classesTeaching: teacher.classesTeaching || [],
    dateOfBirth: teacher.dateOfBirth ? teacher.dateOfBirth.split('T')[0] : '',
    address: teacher.address || '',
    gender: teacher.gender || '',
    phoneNumber1: teacher.phoneNumber1 || '',
    phoneNumber2: teacher.phoneNumber2 || '',
    qualifications: teacher.qualifications || '',
    experienceYears: teacher.experienceYears || 0,
    disponibilite: [],
  });

  // Update form data when teacher prop changes
useEffect(() => {
  setFormData({
    firstName: teacher.firstName || '',
    lastName: teacher.lastName || '',
    email: teacher.email || '',
    password: teacher.passwordDecoded || '',
    coursesTaught: teacher.teacherInfo.coursesTaught.map(course => course._id) || [],
    classesTeaching: teacher.teacherInfo.classesTeaching.map(classe => classe._id) || [], 
    dateOfBirth: teacher.dateOfBirth ? teacher.dateOfBirth.split('T')[0] : '',
    address: teacher.address || '',
    gender: teacher.gender || '',
    phoneNumber1: teacher.phoneNumber1 || '',
    phoneNumber2: teacher.phoneNumber2 || '',
    qualifications: teacher.teacherInfo.qualifications || '',
    experienceYears: teacher.teacherInfo.experienceYears || 0,
    disponibilite: teacher.disponibilite || [],
    // Add other necessary fields here
  });
  setSelectedTimeSlots(teacher.disponibilite || []);
}, [teacher]);

  //table time
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Function to handle cell click
  const handleCellClick = (day, startTime, endTime) => {
    const timeSlot = { day, startTime, endTime };
    // Check if the time slot is already selected
    const isSelected = selectedTimeSlots.some(
      (slot) =>
        slot.day === timeSlot.day &&
        slot.startTime === timeSlot.startTime &&
        slot.endTime === timeSlot.endTime
    );

    if (isSelected) {
      // Deselect the time slot
      setSelectedTimeSlots((prevSelected) =>
        prevSelected.filter(
          (slot) =>
            !(
              slot.day === timeSlot.day &&
              slot.startTime === timeSlot.startTime &&
              slot.endTime === timeSlot.endTime
            )
        )
      );
    } else {
      // Select the time slot
      setSelectedTimeSlots((prevSelected) => [...prevSelected, timeSlot]);
    }
  };

  // Function to handle cell hover
  const handleCellHover = (day, startTime, endTime) => {
    if (isMouseDown) {
      handleCellClick(day, startTime, endTime);
    }
  };

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const isSelectable = (day, hour, minute) => {
    if (day === "Saturday" || day === "Sunday") {
      return true; // Allow selection on Saturday and Sunday
    }

    const nonSelectableHours = [
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
    ];
    const currentTime = `${hour}:${minute < 10 ? "0" : ""}${minute}`;

    return !nonSelectableHours.includes(currentTime);
  };



  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        setCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await getAllClasses();
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchCourses();
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'coursesTaught' || name === 'classesTeaching') {
      const selectedValue = value;
      const isChecked = checked;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: isChecked
          ? [...prevFormData[name], selectedValue]
          : prevFormData[name].filter((id) => id !== selectedValue),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.disponibilite = selectedTimeSlots;
    console.log("formDta : ",formData);
    try {
      const response = await updateTeacher(teacher._id, formData);
      if (response.status === 200) {
        console.log('Teacher updated successfully!');
        onClose();
        fetchData();
      } else {
        console.error('Error updating teacher:', response.data);
      }
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  // Include the code for handling time slots here...

  return (
    <div className="page-content-wrapper border">
      <div className="container position-relative">
        <button
          className="btn btn-link text-danger position-absolute top-0 end-0 m-3"
          onClick={onClose}
          style={{ fontSize: '1.3rem' }}
        >
          <i className="bi bi-x-lg"></i>
        </button>
        <form onSubmit={handleSubmit}>
          {/* Personal information */}
          <div className="mt-5">
            <h5 className="font-base">Update Teacher Info</h5>
            <div className="accordion-body mt-3">
              <div className="row g-4">
                {/* First name */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">
                        First name <span className="text-danger">*</span>
                      </h6>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/* Last name */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">
                        Last name <span className="text-danger">*</span>
                      </h6>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/* Email */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">
                        Email <span className="text-danger">*</span>
                      </h6>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/* Password */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">
                        Password <span className="text-danger">*</span>
                      </h6>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
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
                                name="coursesTaught"
                                value={course._id}
                                onChange={handleChange}
                                checked={formData.coursesTaught.includes(course._id)}
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
                {/* Classes Teaching */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">
                        Classes Teaching <span className="text-danger">*</span>
                      </h6>
                    </div>
                    <div className="col-lg-8">
                      {classes.map((classItem) => (
                        <div key={classItem._id} className="form-check form-check-inline">
                          <input
                            type="checkbox"
                            name="classesTeaching"
                            value={classItem._id}
                            checked={formData.classesTeaching.includes(classItem._id)}
                            onChange={handleChange}
                            className="form-check-input"
                            id={classItem._id}
                          />
                          <label className="form-check-label" htmlFor={classItem._id}>
                            {classItem.className}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Date of Birth */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">Date of Birth</h6>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/* Address */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">Address</h6>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/* Gender */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">Gender</h6>
                    </div>
                    <div className="col-lg-8">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Phone Number 1 */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">
                        Phone Number 1 <span className="text-danger">*</span>
                      </h6>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        name="phoneNumber1"
                        value={formData.phoneNumber1}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/* Phone Number 2 */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">Phone Number 2</h6>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        name="phoneNumber2"
                        value={formData.phoneNumber2}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/* Qualifications */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">Qualifications</h6>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        name="qualifications"
                        value={formData.qualifications}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/* Experience Years */}
                <div className="col-12">
                  <div className="row g-xl-0 align-items-center">
                    <div className="col-lg-4">
                      <h6 className="mb-lg-0">Experience Years</h6>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="number"
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                {/* Add other necessary fields here */}
                  {/* Availability */}
                  <div className="mb-3">
                    <h6
                      className="mb-lg-0"
                      id="heading-3"
                    >
                      AVAILABLE TIME SLOTS
                    </h6>
                    <div
                      
                    >
                      <div className=" mt-3">
                        <div className="table-responsive">
                          <table className="calendar-table">
                            <thead>
                              <tr>
                                <th className="time-column"></th>
                                {dayNames.map((day) => (
                                  <th key={day}>{day}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {[...Array(20)].map((_, index) => {
                                const startHour =
                                  Math.floor(index / 2) + 10;
                                const startMinute =
                                  index % 2 === 0 ? "00" : "30";
                                const endHour =
                                  Math.floor((index + 1) / 2) + 10;
                                const endMinute =
                                  (index + 1) % 2 === 0 ? "00" : "30";
                                const startTime = `${startHour}:${startMinute}`;
                                const endTime = `${endHour}:${endMinute}`;

                                return (
                                  <tr key={index}>
                                    <td className="time-column">
                                      {startTime} - {endTime}
                                    </td>
                                    {dayNames.map((day, dayIndex) => (
                                      <td
                                        key={dayIndex}
                                        className={`
                      ${
                        !isSelectable(day, startHour, parseInt(startMinute))
                          ? "non-selectable-cell"
                          : ""
                      }
                      ${
                        selectedTimeSlots.some(
                          (slot) =>
                            slot.day === day &&
                            slot.startTime === startTime &&
                            slot.endTime === endTime
                        )
                          ? "selected"
                          : ""
                      }
                    `}
                                        onClick={() =>
                                          isSelectable(
                                            day,
                                            startHour,
                                            parseInt(startMinute)
                                          ) &&
                                          handleCellClick(
                                            day,
                                            startTime,
                                            endTime
                                          )
                                        }
                                        onMouseEnter={() =>
                                          isSelectable(
                                            day,
                                            startHour,
                                            parseInt(startMinute)
                                          ) &&
                                          handleCellHover(
                                            day,
                                            startTime,
                                            endTime
                                          )
                                        }
                                        onMouseDown={() =>
                                          setIsMouseDown(true)
                                        }
                                        onMouseUp={() =>
                                          setIsMouseDown(false)
                                        }
                                      ></td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTeacher;
