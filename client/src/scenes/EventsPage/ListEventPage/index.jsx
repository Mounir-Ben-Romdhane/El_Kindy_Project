import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";

function Index() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    /*     const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/event/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error Fetching Events:", error);
      }
    }; */
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/event/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error Fetching Events:", error);
    }
  };

  const deleteEvents = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/event/events/${id}`);
      // Filter out the deleted event from the events array
      const updatedEvents = events.filter((event) => event._id !== id);
      setEvents(updatedEvents);
      alert("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  const editEvents = async(id)=>{
  
  }

  return (
    <div>
      <main>
        <SideBar />
        <div className="page-content">
          <TopBarBack />
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
                          Price
                        </th>
                        <th scope="col" className="border-0 rounded-end">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event, index) => (
                        <tr key={index}>
                          <td>{event.title}</td>
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
                              className="btn btn-sm btn-info"
                            >
                              Edit
                            </a>
                            <button
                              onClick={() => deleteEvents(event._id)}
                              className="btn btn-sm btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Pagination can be added here */}
              {/* Pagination START */}
              <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
                {/* Content */}
                <p className="mb-0 text-center text-sm-start">
                  Showing 1 to 8 of 20 entries
                </p>
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default Index;
