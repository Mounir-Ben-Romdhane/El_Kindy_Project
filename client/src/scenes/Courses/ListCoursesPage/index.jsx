import SideBar from 'components/SideBar'
import TopBarBack from 'components/TopBarBack'
import React, {useEffect} from 'react'

function Index() {

  

  useEffect(() => {
  const test = async () => {
    try {
      const response = await fetch("http://localhost:3001/course/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allCourses = await response.json();

      if (allCourses) {
        console.log("courses", allCourses);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  test();
}, []);
  

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
                  <a href="instructor-create-course.html" className="btn btn-sm btn-primary mb-0">Create a Course</a>
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
                          <tr>
                            {/* Table data */}
                            <td>
                              <div className="d-flex align-items-center position-relative">
                                {/* Image */}
                                <div className="w-60px">
                                  <img src="assets/images/courses/4by3/02.jpg" className="rounded" alt />
                                </div>
                                {/* Title */}
                                <h6 className="table-responsive-title mb-0 ms-2">	
                                  <a href="#" className="stretched-link"></a>
                                </h6>
                              </div>
                            </td>
                            {/* Table data */}
                            <td>
                              <div className="d-flex align-items-center mb-3">
                                {/* Avatar */}
                                <div className="avatar avatar-xs flex-shrink-0">
                                  <img className="avatar-img rounded-circle" src="assets/images/avatar/05.jpg" alt="avatar" />
                                </div>
                                {/* Info */}
                                <div className="ms-2">
                                  <h6 className="mb-0 fw-light">Carolyn Ortiz</h6>
                                </div>
                              </div>
                            </td>
                            {/* Table data */}
                            <td>28 Aug 2021</td>
                            {/* Table data */}
                            <td> <span className="badge bg-orange text-white">All level</span> </td>
                            {/* Table data */}
                            <td>$347</td>
                            {/* Table data */}
                            <td>
                              <span className="badge bg-success bg-opacity-15 text-success">Live</span>
                            </td>
                            {/* Table data */}
                            <td>
                              <a href="#" className="btn btn-sm btn-dark me-1 mb-1 mb-md-0">Edit</a>
                            </td>
                          </tr>
                          
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