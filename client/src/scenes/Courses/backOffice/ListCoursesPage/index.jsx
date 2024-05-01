import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAccessToken, setLogout } from "../../../../state";
import refreshToken from "scenes/Authentification/TokenService/tokenService";
import axios from "axios";
//refreshToken
import useAxiosPrivate from "hooks/useAxiosPrivate";

function Index() {
  // Custom hook to get Axios instance with authentication
  const axiosPrivate = useAxiosPrivate();

  // State variables
  const [courses, setCourses] = useState([]); // State to hold the list of courses
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const [sortOption, setSortOption] = useState(""); // State to hold the sorting option
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 8,
  });
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken);
  const refreshTokenState = useSelector((state) => state.refreshToken);
  const [courses, setCourses] = useState([]);

  //refresh token
  const axiosPrivate = useAxiosPrivate();
  // pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0); // Initialize with total number of entries
  const entriesPerPage = 8; // Number of entries to display per page

  // Fetch courses from the server when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosPrivate.get("/course/all"); // Fetch courses from the server
        setCourses(response.data.data); // Update the courses state with the fetched data
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses(); // Call the fetchCourses function
  }, [axiosPrivate]); // Only re-run effect if axiosPrivate changes


    const controller = new AbortController();

    const getCourses = async () => {
      try {
        const response = await axiosPrivate.get('/course/all', {
          signal: controller.signal
        });
        console.log(response.data);
        setCourses(response.data.data);
        setTotalEntries(response.data.data.length); // Update the totalEntries state
      } catch (err) {
        console.error(err);
        //navigate('/login', { state: { from: location }, replace: true });
      }
    }

    getCourses();

    return () => {
      controller.abort();
    }
  }, [accessToken, dispatch]);

  console.log("courses : ", courses);

  // Function to handle course deletion
  const handleDelete = async (id) => {
    try {
      await axiosPrivate.delete(`/course/delete/${id}`); // Delete the course with the specified id
      toast.success("Course deleted successfully !!", {
        autoClose: 1500,
        style: {
          color: "green",
        },
      });
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== id)
      ); // Update courses state after deletion
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      course.title.toLowerCase().includes(lowerCaseQuery) ||
      course.description.toLowerCase().includes(lowerCaseQuery) ||
      course.courseLevel.toLowerCase().includes(lowerCaseQuery) ||
      course.courseCategory.name.toLowerCase().includes(lowerCaseQuery)
    );
  });

  // Sort courses based on the selected sorting option
  const sortedCourses = filteredCourses.sort((a, b) => {
    switch (sortOption) {
      case "Newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "Oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      // Add other sorting options as needed
      default:
        return 0;
    }
  });

  const indexOfLastEntry = pagination.currentPage * pagination.entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - pagination.entriesPerPage;
  const handleSearchChange = (e) => {
    e.preventDefault();
    console.log("searchQuery :", e.target.value);
    setSearchQuery(e.target.value);
  };



  return (
    <div>
      {/* **************** MAIN CONTENT START **************** */}
      <main>
        <SideBar />
        {/* Page content START */}
        <div className="page-content">
          <TopBarBack />

          {/* Page main content START */}
          <div className="page-content-wrapper border">
            <ToastContainer />
            {/* Title */}
            <div className="row mb-3">
              <div className="col-12 d-sm-flex justify-content-between align-items-center">
                <h1 className="h3 mb-2 mb-sm-0">Courses</h1>
                <Link to="/addCourse" className="btn btn-sm btn-primary mb-0">
                  Create a Course
                </Link>
              </div>
            </div>

            {/* Render text if courses array is empty */}
            {courses.length === 0 && <h2>No courses available.</h2>}

            {/* Card START */}
            {courses.length != 0 && (
              <div className="card bg-transparent border">
                {/* Card header START */}
                <div className="card-header bg-light border-bottom">
                  {/* Search and select START */}
                  <div className="row g-3 align-items-center justify-content-between">
                    {/* Search bar */}
                    <div className="col-md-8">
                      <form className="rounded position-relative">
                        <input
                          className="form-control bg-body"
                          type="search"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                        {searchQuery === "" && ( // Check if the search query is empty
                          <button
                            className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                            onClick={(event) => event.preventDefault()}
                          >
                            <i className="fas fa-search fs-6 " />
                          </button>
                        )}
                      </form>
                    </div>
                    {/* Select option */}
                    <div className="col-md-3">
                      {/* Short by filter */}
                      <form>
                        {/* Sorting dropdown */}
                        <select
                          className="form-select  border-0 z-index-9"
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                        >
                          <option value="">Sort by</option>
                          <option value="Newest">Newest</option>
                          <option value="Oldest">Oldest</option>
                          {/* Add other sorting options here */}
                        </select>
                      </form>
                    </div>
                  </div>
                  {/* Search and select END */}
                </div>
                {/* Card header END */}
                {/* Card body START */}
                <div className="card-body">
                  {/* Course table START */}
                  <div className="table-responsive border-0 rounded-3">
                    {/* Table START */}
                    <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                      {/* Table head */}
                      <thead>
                        <tr>
                          <th scope="col" className="border-0 rounded-start">
                            Title
                          </th>
                          <th scope="col" className="border-0">
                            Description
                          </th>
                          <th scope="col" className="border-0">
                            Image
                          </th>
                          <th scope="col" className="border-0">
                            Level
                          </th>
                          <th scope="col" className="border-0">
                            Category
                          </th>

                          <th scope="col" className="border-0">
                            Action
                          </th>
                        </tr>
                      </thead>
                      {/* Table body START */}
                      <tbody>
                        {/* Table row */}
                        {sortedCourses.map((course) => (
                          <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.description}</td>
                            <td>
                              {/* Affichage de l'image */}
                              {course.picturePath ? (
                                <img
                                  src={`http://localhost:3001/assets/${course.picturePath}`}
                                  alt="Course"
                                  style={{ width: "130px", height: "110px", borderRadius: "15%" }} // Adjust size and border radius as needed
                                />
                              ) : (
                                <span>No Image</span>
                              )}
                            </td>

                            <td>
                              {course.courseLevel === "Beginner" && (
                                <span className="badge bg-primary text-white">
                                  Beginner
                                </span>
                              )}
                              {course.courseLevel === "Intermediate" && (
                                <span className="badge bg-purple text-white">
                                  Intermediate
                                </span>
                              )}
                              {course.courseLevel === "All level" && (
                                <span className="badge bg-orange text-white">
                                  All level
                                </span>
                              )}
                              {course.courseLevel === "Advance" && (
                                <span className="badge bg-warning text-white">
                                  Advance
                                </span>
                              )}
                            </td>
                            <td>{course.courseCategory.name}</td>
                            <td>
                              <Link
                                to={`/edit-course/${course._id}`}
                                className="btn btn-success-soft btn-round me-1 mb-1 mb-md-0"
                              >
                                <i class="bi bi-pencil-square"></i>
                              </Link>
                              <button
                                onClick={() => handleDelete(course._id)}
                                className="btn btn-danger-soft btn-round me-1 mb-1 mb-md-0"
                              >
                                <i class="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredCourses
                          .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                          .map((course) => (
                            <tr key={course.id}>
                              <td>{course.title}</td>
                              <td>{course.description}</td>
                              <td>
                                {/* Affichage de l'image */}
                                {course.picturePath ? (
                                  <img
                                    src={`http://localhost:3001/assets/${course.picturePath}`}
                                    alt="Course"
                                    style={{
                                      width: "100px",
                                      height: "auto",
                                      borderRadius: "10%",
                                    }} // Adjust size as needed
                                  />
                                ) : (
                                  <span>No Image</span>
                                )}
                              </td>

                              <td>
                                {course.courseLevel === "Beginner" && (
                                  <span className="badge bg-primary text-white">
                                    Beginner
                                  </span>
                                )}
                                {course.courseLevel === "Intermediate" && (
                                  <span className="badge bg-purple text-white">
                                    Intermediate
                                  </span>
                                )}
                                {course.courseLevel === "All level" && (
                                  <span className="badge bg-orange text-white">
                                    All level
                                  </span>
                                )}
                                {course.courseLevel === "Advance" && (
                                  <span className="badge bg-warning text-white">
                                    Advance
                                  </span>
                                )}
                              </td>
                              <td>{course.courseCategory.name}</td>
                              <td>
                                <Link
                                  to={`/edit-course/${course._id}`}
                                  className="btn btn-success-soft btn-round me-1 mb-1 mb-md-0"
                                >
                                  <i class="bi bi-pencil-square"></i>
                                </Link>
                                <button
                                  onClick={() => handleDelete(course._id)}
                                  className="btn btn-danger-soft btn-round me-1 mb-1 mb-md-0">
                                  <i class="bi bi-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      {/* Table body END */}
                    </table>
                    {/* Table END */}
                  </div>
                  {/* Course table END */}
                </div>
                {/* Card body END */}
                {/* Card ffooter START */}
                <div className="card-footer bg-transparent pt-0">
                  {/* Pagination START */}
                  <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
                    {/* Content */}
                    <p className="mb-0 text-center text-sm-start">Showing {(currentPage - 1) * 8 + 1} to {Math.min(currentPage * 8, totalEntries)} of {totalEntries} entries</p>
                    {/* Pagination */}
                    <nav className="d-flex justify-content-center mb-0" aria-label="navigation">
                      <ul className="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                        {/* Previous page button */}
                        <li className={`page-item ${currentPage * entriesPerPage >= totalEntries ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                            <i className="fas fa-angle-right" />
                          </button>
                        </li>

                        {/* Page numbers */}
                        {Array.from({ length: Math.ceil(totalEntries / 8) }, (_, index) => (
                          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                          </li>
                        ))}
                        {/* Next page button */}
                        <li className={`page-item ${currentPage * 8 >= totalEntries ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                            <i className="fas fa-angle-right" />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  {/* Pagination END */}

                </div>
                {/* Card footer END */}
              </div>
            )}
            {/* Card END */}
          </div>
          {/* Page main content END */}
        </div>
        {/* Page content END */}
      </main>
      {/* **************** MAIN CONTENT END **************** */}
    </div>
  );
}

export default Index;
