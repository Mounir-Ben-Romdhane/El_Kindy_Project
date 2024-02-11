import SideBar from 'components/SideBar'
import TopBarBack from 'components/TopBarBack'
import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

function Index() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);


  useEffect(() => {
  const test = async () => {
    try {
      const response = await fetch("http://localhost:3001/course/all", {
        method: "GET",
        
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
      });
      const allCourses = await response.json();

        if (allCourses && allCourses.data) {
          setCourses(allCourses.data);
        }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  test();
}, []);

const handleEditClick = (course) => {
  setSelectedCourse(course);
};

const handleDelete = async (id) => {
  try {
    await fetch(`http://localhost:3001/course/delete/${id}`, {
      method: 'DELETE',
    });
    // Filter out the deleted stage from the state
    setCourses(prevStages => prevStages.filter(course => course._id !== id)); // Assuming `_id` is the unique identifier
  } catch (error) {
    console.error("Error deleting stage:", error);
  }
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
            
              {/* Title */}
              <div className="row mb-3">
                <div className="col-12 d-sm-flex justify-content-between align-items-center">
                  <h1 className="h3 mb-2 mb-sm-0">Courses</h1>
                  <Link to="/addCourse" className="btn btn-sm btn-primary mb-0">Create a Course</Link>
                </div>
              </div>


              {/* Card START */}
                <div className="card bg-transparent border">
                  {/* Card header START */}
                  <div className="card-header bg-light border-bottom">
                    {/* Search and select START */}
                    <div className="row g-3 align-items-center justify-content-between">
                      {/* Search bar */}
                      <div className="col-md-8">
                        <form className="rounded position-relative">
                          <input className="form-control bg-body" type="search" placeholder="Search" aria-label="Search" />
                          <button className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit"><i className="fas fa-search fs-6 " /></button>
                        </form>
                      </div>
                      {/* Select option */}
                      <div className="col-md-3">
                        {/* Short by filter */}
                        <form>
                          <select className="form-select  border-0 z-index-9" aria-label=".form-select-sm">
                            <option value>Sort by</option>
                            <option>Newest</option>
                            <option>Oldest</option>
                            <option>Accepted</option>
                            <option>Rejected</option>
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
                            <th scope="col" className="border-0 rounded-start">Course Name</th>
                            <th scope="col" className="border-0">Instructor</th>
                            <th scope="col" className="border-0">Added Date</th>
                            <th scope="col" className="border-0">Type</th>
                            <th scope="col" className="border-0">Price</th>
                            <th scope="col" className="border-0">Status</th>
                            <th scope="col" className="border-0 rounded-end">Action</th>
                          </tr>
                        </thead>
                        {/* Table body START */}
                        <tbody>
                          
                          {/* Table row */}
                          {courses.map(course => (
                            <tr key={course.id}>
                              <td>{course.title}</td>
                              <td>{course.description}</td>
                              <td>course.addedDate</td>
                              <td>course.type</td>
                              <td>course.price</td>
                              <td>course.status</td>
                              <td>
                                <button href="#" className="btn btn-sm btn-dark me-1 mb-1 mb-md-0"
                                 onClick={() => handleEditClick(course)}
                                 >Edit</button>
                                 <button onClick={() => handleDelete(course._id)} className="btn btn-sm btn-danger me-1 mb-1 mb-md-0">Delete</button>
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
                  {/* Card footer START */}
                  <div className="card-footer bg-transparent pt-0">
                    {/* Pagination START */}
                    <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
                      {/* Content */}
                      <p className="mb-0 text-center text-sm-start">Showing 1 to 8 of 20 entries</p>
                      {/* Pagination */}
                      <nav className="d-flex justify-content-center mb-0" aria-label="navigation">
                        <ul className="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                          <li className="page-item mb-0"><a className="page-link" href="#" tabIndex={-1}><i className="fas fa-angle-left" /></a></li>
                          <li className="page-item mb-0"><a className="page-link" href="#">1</a></li>
                          <li className="page-item mb-0 active"><a className="page-link" href="#">2</a></li>
                          <li className="page-item mb-0"><a className="page-link" href="#">3</a></li>
                          <li className="page-item mb-0"><a className="page-link" href="#"><i className="fas fa-angle-right" /></a></li>
                        </ul>
                      </nav>
                    </div>
                    {/* Pagination END */}
                  </div>
                  {/* Card footer END */}
                </div>
              {/* Card END */}


          </div>
          {/* Page main content END */}
          
        </div>
        {/* Page content END */}
      </main>
      {/* **************** MAIN CONTENT END **************** */}
    </div>
  )
}

export default Index