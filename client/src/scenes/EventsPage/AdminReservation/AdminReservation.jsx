import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import SideBar from "components/SideBar"; // Adjust import paths as needed
import TopBarBack from "components/TopBarBack"; // Adjust import paths as needed
import { Backdrop } from "@mui/material";
import { GridLoader } from "react-spinners";

const MySwal = withReactContent(Swal);


// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function Index() {
  const [reservations, setReservations] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [numberOfReservations, setNumberOfReservations] = useState(1);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  let [color, setColor] = useState("#399ebf");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0); // Initialize with total number of entries
  const entriesPerPage = 8; // Number of entries to display per page

  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(10);


  const handleIncrement = () => {
    setNumberOfReservations(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (numberOfReservations > 1) {
      setNumberOfReservations(prevCount => prevCount - 1);
    }
  };
  useEffect(() => {
    fetchReservations();
  }, []);

  

  const fetchReservations = async () => {
    setOpen(true);

    try {
      const response = await axios.get(
        "http://localhost:3001/events/reservations"
      );
      setReservations(response.data);
      setTotalEntries(response.data.length);
      setOpen(false);

    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const updateReservationStatus = async (reservationId, status) => {
    try {
      await axios.patch(
        `http://localhost:3001/events/reservations/${reservationId}`,
        { status }
      );
      MySwal.fire("Updated!", `The reservation has been ${status}.`, "success");
      fetchReservations();
    } catch (error) {
      console.error(`Error updating reservation status to ${status}:`, error);
      MySwal.fire(
        "Error!",
        `The reservation status could not be updated to ${status}.`,
        "error"
      );
    }
  };

  const handleSearch = debounce((term) => {
    setSearchTerm(term.toLowerCase());
  }, 300);


// Combined function for filtering and sorting reservations
const getFilteredAndSortedReservations = () => {
  let processedReservations = [...reservations];

 // Filter by search term
 processedReservations = processedReservations.filter(reservation =>
  reservation.eventId?.title.toLowerCase().includes(searchTerm) ||
  reservation.userName.toLowerCase().includes(searchTerm) ||
  reservation.userEmail.toLowerCase().includes(searchTerm) ||
  reservation.phoneNumber.toString().includes(searchTerm)
);

   // Further filter by status if a sort option is selected
   if (sortOption) {
    processedReservations = processedReservations.filter(reservation => reservation.status === sortOption.toLowerCase());
  }

  return processedReservations;
};

 // Calculate the currently displayed reservations
 const indexOfLastReservation = currentPage * reservationsPerPage;
 const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
 const currentReservations = reservations.slice(indexOfFirstReservation, indexOfLastReservation);
 const totalReservations = reservations.length;

 // Pagination controls
 const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
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
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open2}
              >
                <GridLoader color={color} loading={loading} size={20} />
              </Backdrop>
              <div className="page-content-wrapper border">
                <div className="row mb-3">
                  <div className="col-12 d-sm-flex justify-content-between align-items-center">
                    <h1 className="h3 mb-2 mb-sm-0">List Event Reservations</h1>
                    <Link to="/listEventUser" className="btn btn-sm btn-primary me-1 mb-1 mb-md-0">Add a Reservation</Link>
                  </div>
                </div>

                <div className="card bg-transparent border">
                  <div className="card-header bg-light border-bottom">
                    <div className="row g-3 align-items-center justify-content-between">
                      <div className="col-md-8">
                        <form className="rounded position-relative">
                          <input
                            className="form-control bg-body"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => handleSearch(e.target.value)}
                          />
                        </form>
                      </div>
                      <div className="col-md-3">
                        <select
                          className="form-select border-0 z-index-9"
                          aria-label=".form-select-sm"
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                        >
                          <option value="">Sort by</option>
                          <option value="asc">Ascendant</option>
                          <option value="desc">Descendant</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive border-0 rounded-3">
                      <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                        <thead>
                          <tr>
                            <th scope="col" className="border-0">
                              Event Title
                            </th>
                            <th scope="col" className="border-0">
                              User Name
                            </th>
                            <th scope="col" className="border-0">
                              User Email
                            </th>
                            <th scope="col" className="border-0">
                              Phone Number
                            </th>
                            <th scope="col" className="border-0">
                              Number of Reservations
                            </th>
                            <th scope="col" className="border-0">
                              Status
                            </th>
                            <th scope="col" className="border-0 rounded-end">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredReservations
                            .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                            .map((reservation, index) => (
                              <tr key={index}>
                                <td>
                                  {reservation.eventId
                                    ? reservation.eventId.title
                                    : "Event not found or deleted"}
                                </td>
                                <td>{reservation.userName}</td>
                                <td>{reservation.userEmail}</td>
                                <td>{reservation.phoneNumber}</td>
                                <td>{reservation.numberOfReservations}</td>
                                <td>
                                  {reservation.status === "pending" && (
                                    <span className="badge bg-warning bg-opacity-15 text-warning">
                                      Pending
                                    </span>
                                  )}
                                  {reservation.status === "accepted" && (
                                    <span className="badge bg-success bg-opacity-15 text-success">
                                      Accepted
                                    </span>
                                  )}
                                  {reservation.status === "refused" && (
                                    <span className="badge bg-danger bg-opacity-15 text-danger">
                                      Refused
                                    </span>
                                  )}
                                </td>
                                <td>
                                  <button
                                    onClick={() =>
                                      updateReservationStatus(
                                        reservation._id,
                                        "accepted"
                                      )
                                    }
                                    className="btn btn-sm btn-success me-1"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      updateReservationStatus(
                                        reservation._id,
                                        "refused"
                                      )
                                    }
                                    className="btn btn-sm btn-danger"
                                  >
                                    Refuse
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent pt-0">
                    <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
                      <p className="mb-0 text-center text-sm-start">Showing {(currentPage - 1) * 8 + 1} to {Math.min(currentPage * 8, totalEntries)} of {totalEntries} entries</p>
                      <nav className="d-flex justify-content-center mb-0" aria-label="navigation">
                        <ul className="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
                          <li className={`page-item ${currentPage * entriesPerPage >= totalEntries ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                              <i className="fas fa-angle-right" />
                            </button>
                          </li>
                          {Array.from({ length: Math.ceil(totalEntries / 8) }, (_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage * 8 >= totalEntries ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                              <i className="fas fa-angle-right" />
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>

          <div className="page-content-wrapper border">
            <div className="row mb-3">
              <div className="col-12 d-sm-flex justify-content-between align-items-center">
                <h1 className="h3 mb-2 mb-sm-0">List Event Reservations</h1>
                <Link to="/listEventUser" className="btn btn-sm btn-primary me-1 mb-1 mb-md-0">List Events</Link>
              </div>
            </div>

            <div className="card bg-transparent border">
              <div className="card-header bg-light border-bottom">
                <div className="row g-3 align-items-center justify-content-between">
                  <div className="col-md-8">
                    <form
                      className="rounded position-relative"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <input
                        className="form-control bg-body"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                      <button
                        className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                        type="button" 
                      >
                        <i className="fas fa-search fs-6" />
                      </button>
                    </form>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select border-0 z-index-9"
                      aria-label=".form-select-sm"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                       <option value="">Sort by</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Refused">Refused</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive border-0 rounded-3">
                  <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0">
                          Event Title
                        </th>
                        <th scope="col" className="border-0">
                          User Name
                        </th>
                        <th scope="col" className="border-0">
                          User Email
                        </th>
                        <th scope="col" className="border-0">
                          Phone Number
                        </th>
                        <th scope="col" className="border-0">N° Reservation</th> {/* Added new column header */}
                        <th scope="col" className="border-0">
                          Status
                        </th>
                        <th scope="col" className="border-0 rounded-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredAndSortedReservations().map((reservation, index) => (
                        <tr key={index}>
                          <td>
                            {reservation.eventId
                              ? reservation.eventId.title
                              : "Event not found or deleted"}
                          </td>
                          <td>{reservation.userName}</td>
                          <td>{reservation.userEmail}</td>
                          <td>{reservation.phoneNumber}</td>
                          <td>{reservation.numberOfReservations}</td>
                          <td>

                            {reservation.status === "pending" && (
                              <span className="badge bg-warning bg-opacity-15 text-warning">
                                Pending
                              </span>
                            )}
                            {reservation.status === "accepted" && (
                              <span className="badge bg-success bg-opacity-15 text-success">
                                Accepted
                              </span>
                            )}
                            {reservation.status === "refused" && (
                              <span className="badge bg-danger bg-opacity-15 text-danger">
                                Refused
                              </span>
                            )}
                          </td>

                          <td>
                            <button
                              onClick={() =>
                                updateReservationStatus(
                                  reservation._id,
                                  "accepted"
                                )
                              }
                              className="btn btn-success-soft btn-round me-1 mb-1 mb-md-0"
                            >
                              <i className="bi bi-check fs-4"></i> {/* Accept icon */}
                            </button>
                            <button
                              onClick={() =>
                                updateReservationStatus(
                                  reservation._id,
                                  "refused"
                                )
                              }
                              className="btn btn-danger-soft btn-round me-1 mb-1 mb-md-0"
                            >
                              <i className="bi bi-x fs-4"></i> {/* Refuse icon */}
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination">
              <p className="mb-0 text-center text-sm-start">
                Showing {indexOfFirstReservation + 1} to {Math.min(indexOfLastReservation, totalReservations)} of {totalReservations} entries
              </p>
            
            </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
export default Index;
