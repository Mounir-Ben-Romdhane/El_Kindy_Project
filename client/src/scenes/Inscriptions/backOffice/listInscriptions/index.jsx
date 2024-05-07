import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPrivate from "hooks/useAxiosPrivate";

import { Backdrop } from "@mui/material";
import { GridLoader } from "react-spinners";

import { useNavigate, useParams } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import NoData from "components/NoData";
const MySwal = withReactContent(Swal);

function Index() {
  const [inscriptions, setInscriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortStatus, setSortStatus] = useState(""); // Sorting status: 'accepted', 'refused', 'pending', or ''
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  let [color, setColor] = useState("#399ebf");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const entriesPerPage = 8;

  // Refresh token
  const axiosPrivate = useAxiosPrivate();

  const fetchData = async () => {
    setOpen(true);

    try {
      const response = await axiosPrivate.get("/inscription/all");
      if (response.status === 200) {
        setInscriptions(response.data.data);
        setOpen(false);
      } else {
        setOpen(false);

        throw new Error("Failed to fetch inscriptions");
      }
    } catch (error) {
      setOpen(false);

      console.error("Error fetching inscriptions:", error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this inscription? This process cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPrivate.delete(
            `/inscription/delete/${id}`
          );
          if (response.status === 200) {
            toast.success("Inscription deleted successfully!", {
              autoClose: 1000,
              style: { color: "green" },
            });
            // Update the state to remove the deleted inscription
            setInscriptions((prevInscriptions) =>
              prevInscriptions.filter((inscription) => inscription._id !== id)
            );
          } else {
            toast.error("Failed to delete inscription. Please try again.", {
              autoClose: 1500,
              style: { color: "red" },
            });
            throw new Error("Failed to delete inscription");
          }
        } catch (error) {
          console.error("Error deleting inscription:", error);
          toast.error(
            "Failed to delete inscription. Please check the console for more details.",
            {
              autoClose: 1500,
              style: { color: "red" },
            }
          );
        }
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSort = (e) => {
    setSortStatus(e.target.value);
  };

  // Filter inscriptions based on search query
  const filteredInscriptions = inscriptions.filter((inscription) =>
    Object.values(inscription).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sorting
  let sortedInscriptions = [...filteredInscriptions];
  if (sortStatus) {
    sortedInscriptions = sortedInscriptions.filter(
      (inscription) => inscription.status === sortStatus
    );
  }

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = sortedInscriptions.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const activateUser = async (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to activate this inscription?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpen2(true);
        try {
          const response = await axiosPrivate.patch(
            `/inscription/${id}/approve`
          );
          if (response.status === 200) {
            setOpen2(false);
            toast.success("Inscription Activated successfully for this User!", {
              autoClose: 1000,
              style: { color: "green" },
            });
            fetchData();
          } else {
            toast.error("Error activating inscription.", {
              autoClose: 1500,
              style: { color: "red" },
            });
            setOpen2(false);
            throw new Error("Failed to activate inscription");
          }
        } catch (error) {
          setOpen2(false);
          console.error(error);
          if (error.response && error.response.status === 400) {
            toast.error("Email already exists.", {
              autoClose: 1500,
              style: { color: "red" },
            });
          } else {
            toast.error(
              "Error activating inscription. Please check the console for more details.",
              {
                autoClose: 1500,
                style: { color: "red" },
              }
            );
          }
        }
      }
    });
  };

  return (
    <div>
      {/* Main content */}
      <main>
        <SideBar />
        <div className="page-content">
          <TopBarBack />
          {open ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <GridLoader color={color} loading={loading} size={20} />
            </Backdrop>
          ) : error ? (
            <h2>Error: {error}</h2>
          ) : (
            <div>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open2}
              >
                <GridLoader color={color} loading={loading} size={20} />
              </Backdrop>
              <div className="page-content-wrapper border">
                <ToastContainer />
                <div className="row mb-3">
                  <div className="col-12 d-sm-flex justify-content-between align-items-center">
                    <h1 className="h3 mb-2 mb-sm-0">Inscriptions</h1>
                  </div>
                </div>

                {/* Render image and text if inscriptions array is empty */}
                {inscriptions.length === 0 && (
                  <NoData />
                )}

                {/* Card START */}
                {inscriptions.length !== 0 && (
                  <div className="card bg-transparent border">
                    <div className="card-header bg-light border-bottom">
                      <div className="row g-3 align-items-center justify-content-between">
                        {/* Search bar */}
                        <div className="col-md-8">
                          <form className="rounded position-relative">
                            <input
                              className="form-control bg-body"
                              type="search"
                              placeholder="Search"
                              aria-label="Search"
                              onChange={handleSearchChange}
                            />
                            {searchQuery === "" && ( // Check if the search query is empty
                              <button
                                className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                                type="submit"
                              >
                                <i className="fas fa-search fs-6 " />
                              </button>
                            )}
                          </form>
                        </div>
                        {/* Select option */}
                        <div className="col-md-3">
                          <form>
                            <select
                              className="form-select border-0 z-index-9"
                              aria-label=".form-select-sm"
                              onChange={handleSort}
                            >
                              <option value="">Sort by Status</option>
                              <option value="confirmed">Accepted</option>
                              <option value="refused">Refused</option>
                              <option value="pending">Pending</option>
                              <option value="not paid">Not Paid</option>
                              <option value="active">Active</option>
                            </select>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive border-0 rounded-3">
                        <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                          <thead style={{ whiteSpace: "nowrap" }}>
                            <tr>
                              <th
                                scope="col"
                                className="border-0 rounded-start"
                              >
                                Full Name
                              </th>
                              <th scope="col" className="border-0">
                                Email
                              </th>
                              <th scope="col" className="border-0">
                                Parent name
                              </th>
                              <th scope="col" className="border-0">
                                Phone number N°1
                              </th>
                              <th scope="col" className="border-0">
                                Status
                              </th>
                              <th scope="col" className="border-0 rounded-end">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody style={{ whiteSpace: "nowrap" }}>
                            {/* Table row */}
                            {currentEntries.map((inscription) => (
                              <tr key={inscription._id}>
                                <td>
                                  {inscription.firstName} {inscription.lastName}
                                </td>
                                <td>{inscription.email}</td>
                                <td>{inscription.parentName}</td>
                                <td>{inscription.phoneNumber1}</td>
                                <td>
                                  {inscription.status === "pending" && (
                                    <span className="badge bg-warning bg-opacity-15 text-warning">
                                      Pending
                                    </span>
                                  )}
                                  {inscription.status === "confirmed" && (
                                    <span className="badge bg-success bg-opacity-15 text-success">
                                      Paid
                                    </span>
                                  )}
                                  {inscription.status === "refused" && (
                                    <span className="badge bg-danger bg-opacity-15 text-danger">
                                      Refused
                                    </span>
                                  )}
                                  {inscription.status === "active" && (
                                    <span
                                      className="badge"
                                      style={{
                                        backgroundColor: "#28a745",
                                        color: "white",
                                        opacity: 0.6,
                                      }}
                                    >
                                      Active User
                                    </span>
                                  )}
                                  {inscription.status === "not paid" && (
                                    <span className="badge bg-info bg-opacity-15 text-info">
                                      Not Paid
                                    </span>
                                  )}
                                </td>

                                <td>
                                  <Link
                                    to={`/inscriptionDetails/${inscription._id}`}
                                    className="btn btn-info-soft btn-round mb-1 me-1 mb-md-0"
                                  >
                                    <i className="bi bi-eye"></i>
                                  </Link>
                                  

                                  {inscription.status !== "active" && (
                                    <button
                                      className="btn btn-success-soft btn-round me-1 mb-1 mb-md-0"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Activate User"
                                      onClick={() =>
                                        activateUser(inscription._id)
                                      }
                                    >
                                      <i className="bi bi-check-circle"></i>
                                    </button>
                                  )}
                                  <button
                                    className="btn btn-danger-soft btn-round me-1 mb-1 mb-md-0"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title=""
                                    data-bs-original-title="Delete"
                                    onClick={() =>
                                      handleDelete(inscription._id)
                                    }
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card-footer bg-transparent pt-0 px-4">
                      <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
                        <p className="mb-0 text-center text-sm-start">
                          Showing {indexOfFirstEntry + 1} to{" "}
                          {Math.min(
                            indexOfLastEntry,
                            sortedInscriptions.length
                          )}{" "}
                          of {sortedInscriptions.length} entries
                        </p>
                        <nav
                          className="d-flex justify-content-center mb-0"
                          aria-label="navigation"
                        >
                          <ul className="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                            <li
                              className={`page-item ${
                                currentPage === 1 && "disabled"
                              }`}
                            >
                              {" "}
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                <i className="fas fa-angle-left" />
                              </button>
                            </li>
                            {Array.from(
                              {
                                length: Math.ceil(
                                  sortedInscriptions.length / entriesPerPage
                                ),
                              },
                              (_, index) => (
                                <li
                                  key={index}
                                  className={`page-item ${
                                    index + 1 === currentPage ? "active" : ""
                                  }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() => paginate(index + 1)}
                                  >
                                    {index + 1}
                                  </button>
                                </li>
                              )
                            )}
                            <li
                              className={`page-item ${
                                currentPage ===
                                Math.ceil(
                                  sortedInscriptions.length / entriesPerPage
                                )
                                  ? "disabled"
                                  : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={
                                  currentPage ===
                                  Math.ceil(
                                    sortedInscriptions.length / entriesPerPage
                                  )
                                }
                              >
                                <i className="fas fa-angle-right" />
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Index;
