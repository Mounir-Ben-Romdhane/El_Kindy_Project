import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-notifications/lib/notifications.css";
import { Link, useNavigate, useParams } from "react-router-dom";

function Index() {
  const [sortBy, setSortBy] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0); // Initialize with total number of entries
  const entriesPerPage = 8; // Number of entries to display per page


  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/event/events");
      const sortedEvents = sortEvents(response.data);
      setEvents([...sortedEvents]);
      setTotalEntries(sortedEvents.length);
    } catch (error) {
      console.error("Error Fetching Events:", error);
    }
  };

  const sortEvents = (events) => {
    console.log("Sorting events by:", sortBy);

    if (sortBy === "Newest") {
      console.log("Sorting by Newest");
      return events.slice().sort(
        (a, b) => new Date(b.dateDebut) - new Date(a.dateDebut)
      );
    } else if (sortBy === "Oldest") {
      console.log("Sorting by Oldest");
      return events.slice().sort(
        (a, b) => new Date(a.dateDebut) - new Date(b.dateDebut)
      );
    } else if (sortBy === "Accepted") {
      console.log("Sorting by Accepted");
      return events;
    } else if (sortBy === "Rejected") {
      console.log("Sorting by Rejected");
      return events;
    } else {
      console.log("No sorting");
      return events;
    }
  };

  const deleteEvents = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/event/events/${id}`);
      const updatedEvents = events.filter((event) => event._id !== id);
      setEvents(updatedEvents);
      toast.success("Event Deleted successfully !!", {
        autoClose: 1500,
        style: { color: "green" },
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.dateDebut.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.dateFin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.price && event.price.toString().includes(searchQuery))
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const navigate = useNavigate();

  const editEvents = (id) => {
    navigate(`/editEvent/${id}`);
  };

  return (
    <div>
      <main>
        <SideBar />
        <div className="page-content">
          <TopBarBack />
          <ToastContainer />
          <div className="page-content-wrapper border">
            <div className="row mb-3">
              <div className="col-12 d-sm-flex justify-content-between align-items-center">
                <h1 className="h3 mb-2 mb-sm-0">Events</h1>
                {/* Adjust the href to your event creation route */}
                <a href="/addEvent" className="btn btn-sm btn-primary mb-0">
                  Create an Event
                </a>
              </div>
            </div>

            <div className="card bg-transparent border">
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
                        onChange={handleSearchChange}
                      />
                      <button
                        className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                        type="submit"
                      >
                        <i className="fas fa-search fs-6 " />
                      </button>
                    </form>
                  </div>
                  {/* Select option */}
                  <div className="col-md-3">
                    {/* Short by filter */}
                    <form>
                      <select
                        className="form-select  border-0 z-index-9"
                        aria-label=".form-select-sm"
                        value={sortBy}
                        onChange={handleSortChange}>
                        <option value="">Sort by</option>
                        <option value="Newest">Newest</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </form>
                  </div>
                </div>
                {/* Search and select END */}
              </div>
              <div className="card-body">
                <div className="table-responsive border-0 rounded-3">
                  <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 rounded-start">
                          Event Title
                        </th>
                        <th scope="col" className="border-0">
                          Start Date
                        </th>
                        <th scope="col" className="border-0">
                          End Date
                        </th>

                        <th scope="col" className="border-0">
                          Place
                        </th>
                        <th scope="col" className="border-0">
                          Time From
                        </th>
                        <th scope="col" className="border-0">
                          Time To
                        </th>
                        <th scope="col" className="border-0">
                          Price
                        </th>
                        <th scope="col" className="border-0 rounded-end">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.map((event, index) => (
                        <tr key={index}>
                          <td>{event.title}</td>
                          <td>{new Date(event.dateDebut).toLocaleDateString()}</td>
                          <td>{new Date(event.dateFin).toLocaleDateString()}</td>
                          <td>{event.place}</td>
                          <td>{event.timeFrom}</td>
                          <td>{event.timeTo}</td>
                          <td>{event.price ? `${event.price} TND` : "Free"}</td>
                          <td>
                            {/* Actions */}
                            <a
                              onClick={() => editEvents(event._id)}
                              className="btn btn-success-soft btn-round me-1 mb-1 mb-md-0"
                            >
                              <i class="bi bi-pencil-square"></i>
                            </a>
                            <button
                              onClick={() => deleteEvents(event._id)}
                              className="btn btn-danger-soft btn-round me-1 mb-1 mb-md-0"
                            >
                              <i class="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {filteredEvents
    .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
    .map((event, index) => (
      <tr key={index}>
                        <td>{event.name}</td>
                        <td>
                          {new Date(event.dateDebut).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(event.dateFin).toLocaleDateString()}
                        </td>
                        <td>{event.price || "Free"}</td>
                        <td>
                          {/* Actions */}
                          <a
                            onClick={() => editEvents(event._id)}
                            className="btn btn-success-soft btn-round me-1 mb-1 mb-md-0">
                            <i class="bi bi-pencil-square"></i>
                          </a>
                          <button
                            onClick={() => deleteEvents(event._id)}

                            className="btn btn-danger-soft btn-round me-1 mb-1 mb-md-0"><i class="bi bi-trash"></i>
</button>
                        </td>
                      </tr>
                    ))}


                          
                          </table>
                        </div>
                      </div>
              {/* Pagination can be added here */ }
              {/* Pagination START */ }
              <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
                  {/* Content */}
                  <p className="mb-0 text-center text-sm-start">Showing {(currentPage - 1) * 8 + 1} to {Math.min(currentPage * 8, totalEntries)} of {totalEntries} entries</p>
                  {/* Pagination */}
                 {/* Pagination */}
<nav className="d-flex justify-content-center mb-0" aria-label="navigation">
  <ul className="pagination pagination-sm pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
    {/* Previous page button */}
    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
        <i className="fas fa-angle-left" />
      </button>
    </li>
    {/* Page numbers */}
    {Array.from({ length: Math.ceil(totalEntries / entriesPerPage) }, (_, index) => (
      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
        <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
      </li>
    ))}
    {/* Next page button */}
    <li className={`page-item ${currentPage * entriesPerPage >= totalEntries ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
        <i className="fas fa-angle-right" />
      </button>
    </li>
  </ul>
</nav>

                </div>
                {/* Pagination END */}
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}

export default Index;