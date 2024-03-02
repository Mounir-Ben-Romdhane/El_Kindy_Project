import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import "react-confirm-alert/src/react-confirm-alert.css"; // Importez les styles CSS
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2"; // Importez SweetAlert2
const MySwal = withReactContent(Swal);

function Index() {
  const [inscription, setInscription] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/inscription/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setInscription(data.data);
      } else {
        const errorMessage = await response.text();
        //dispatch(setLogout()); // Log out user if token refresh fails
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/inscription/delete/${id}`, {
        method: "DELETE",
      });

      toast.success("Inscription deleted successfully !!", {
        autoClose: 1500,
        style: {
          color: "green", // Text color
        },
      });
      setInscription((prevStages) =>
        prevStages.filter((inscription) => inscription._id !== id)
      ); // Assuming `_id` is the unique identifier
    } catch (error) {
      console.error("Error deleting stage:", error);
    }
  };

  const approveInscription = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/inscription/${id}/approve`
      );
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectInscription = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/inscription/${id}/reject`
      );
      fetchData();
    } catch (error) {
      console.error(error);
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
            <ToastContainer />
            {/* Title */}
            <div className="row mb-3">
              <div className="col-12 d-sm-flex justify-content-between align-items-center">
                <h1 className="h3 mb-2 mb-sm-0">Inscriptions</h1>
              </div>
            </div>

            {/* Render text if courses array is empty */}
            {inscription.length === 0 && <h2>No isncriptions available.</h2>}

            {/* Card START */}
            {inscription.length != 0 && (
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
                          aria-label="Search"
                        />
                      </form>
                    </div>
                    {/* Select option */}
                    <div className="col-md-3">
                      {/* Short by filter */}
                      <form>
                        <select
                          className="form-select  border-0 z-index-9"
                          aria-label=".form-select-sm"
                        >
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
                      <thead style={{ whiteSpace: "nowrap" }}>
                        <tr>
                          <th scope="col" className="border-0 rounded-start">
                            Full Name
                          </th>
                          <th scope="col" className="border-0">
                            Gender
                          </th>
                          <th scope="col" className="border-0">
                            Date of birth
                          </th>
                          <th scope="col" className="border-0">
                            Email
                          </th>
                          <th scope="col" className="border-0">
                            City
                          </th>
                          <th scope="col" className="border-0">
                            Level of study
                          </th>
                          <th scope="col" className="border-0">
                            Parent name
                          </th>
                          <th scope="col" className="border-0">
                            Parent profession
                          </th>
                          <th scope="col" className="border-0">
                            Phone number N°1
                          </th>
                          <th scope="col" className="border-0">
                            Phone number N°2
                          </th>
                          <th scope="col" className="border-0">
                            Liked courses
                          </th>
                          <th scope="col" className="border-0">
                            Status
                          </th>
                          <th scope="col" className="border-0 rounded-end">
                            Action
                          </th>
                        </tr>
                      </thead>
                      {/* Table body START */}
                      <tbody style={{ whiteSpace: "nowrap" }}>
                        {/* Table row */}
                        {inscription.map((inscription) => (
                          <tr key={inscription.id}>
                            <td>
                              {inscription.firstName} {inscription.lastName}
                            </td>
                            <td>{inscription.gender}</td>
                            <td>{inscription.dateOfBirth}</td>
                            <td>{inscription.email}</td>
                            <td>{inscription.city}</td>
                            <td>{inscription.niveauEtude}</td>
                            <td>{inscription.parentName}</td>
                            <td>{inscription.parentProfession}</td>
                            <td>{inscription.phoneNumber1}</td>
                            <td>{inscription.phoneNumber2}</td>
                            {/* 
                          <td>
                            <select >
                              {inscription.likedCourses.map(course => (
                                <option key={course.id}>{course.title}</option>
                              ))}
                            </select>
                          </td>*/}
                            <td>
                              <ul>
                                {inscription.likedCourses.map((course) => (
                                  <li key={course.id}>{course.title}</li>
                                ))}
                              </ul>
                            </td>

                            <td>
                              {inscription.status === "pending" && (
                                <span className="badge bg-warning bg-opacity-15 text-warning">
                                  Pending
                                </span>
                              )}
                              {inscription.status === "accepted" && (
                                <span className="badge bg-success bg-opacity-15 text-success">
                                  Accepted
                                </span>
                              )}
                              {inscription.status === "refused" && (
                                <span className="badge bg-danger bg-opacity-15 text-danger">
                                  Refused
                                </span>
                              )}
                            </td>

                            <td>
                              <button
                                className="btn btn-sm btn-success-soft me-1 mb-1 mb-md-0"
                                onClick={() => approveInscription(inscription._id)}
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-sm btn-danger-soft me-1 mb-1 mb-md-0"
                                onClick={() => rejectInscription(inscription._id)}
                              >
                                Reject
                              </button>

                              <button
                                onClick={() => handleDelete(inscription._id)}
                                className="btn btn-sm btn-danger me-1 mb-1 mb-md-0"
                              >
                                Delete
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

                    {/* Pagination */}
                    <nav
                      className="d-flex justify-content-center mb-0"
                      aria-label="navigation"
                    >
                      <ul className="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                        <li className="page-item mb-0">
                          <a className="page-link" href="#" tabIndex={-1}>
                            <i className="fas fa-angle-left" />
                          </a>
                        </li>
                        <li className="page-item mb-0">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item mb-0 active">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item mb-0">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item mb-0">
                          <a className="page-link" href="#">
                            <i className="fas fa-angle-right" />
                          </a>
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
