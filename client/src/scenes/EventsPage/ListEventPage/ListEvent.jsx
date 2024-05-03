import React, { useEffect, useState } from "react";
import axios from "axios";
import BannerStart from 'components/BannerStart';
import kendy from "../../../../src/assetss/images/kendy.png";
import Navbar  from "components/NavBar";
import Footer from "components/Footer";
import '../../Style.css';
import BannerStartHome from "components/BannerStartHome";
import { Backdrop } from "@mui/material";
import { GridLoader } from "react-spinners";
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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    entriesPerPage: 8,
  });

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    console.log(e.target.value);
  };

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  let [color, setColor] = useState("#399ebf");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    // Fetch events when the component mounts
    const fetchEvents = async () => {
            setOpen(true);

      try {
        const response = await axios.get("http://localhost:3001/event/events");
        console.log('Response Data:', response.data);
        const filteredEvents = response.data.filter(event => {
          // Convert event start date and current date to Date objects
          const eventStartDate = new Date(event.dateDebut);
          setOpen(false);

          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          // Return true if the event's start date is today or in the future
          return eventStartDate >= currentDate;
        });
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };


    fetchEvents();
  }, [sortBy]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/event/events");
      const sortedEvents = sortEvents(response.data);
      setEvents([...sortedEvents]);
    } catch (error) {
      console.error("Error Fetching Events:", error);
    }
  };


  

  


  const sortEvents = (events) => {
    switch (sortBy) {
      case "Newest":
        return events.slice().sort((a, b) => new Date(b.dateDebut) - new Date(a.dateDebut));
      case "Oldest":
        return events.slice().sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut));
      case "Free":
        return events.filter(event => event.price === 0 || event.price === null || event.price === undefined)
        .sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut)); 
      case "Paid":
        return events.filter(event => event.price !== 0 && event.price !== null && event.price !== undefined)
        .sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut));
      default:
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
    setPagination({ ...pagination, currentPage: 1 }); // Reset pagination to first page when search query changes
  };

  const indexOfLastEntry = pagination.currentPage * pagination.entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - pagination.entriesPerPage;
  const currentEntries = filteredEvents.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
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
            <div className="">
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open2}
              >
                <GridLoader color={color} loading={loading} size={20} />
              </Backdrop>
              <ToastContainer />
              <div className="page-content-wrapper border">
                <div className="row mb-3">
                  <div className="col-12 d-sm-flex justify-content-between align-items-center">
                    <h1 className="h3 mb-2 mb-sm-0">Events</h1>
                    <a href="/addEvent" className="btn btn-sm btn-primary mb-0">
                      Create an Event
                    </a>
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
                      <div className="col-md-3">
                        <form>
                          <select
                            className="form-select border-0 z-index-9"
                            aria-label=".form-select-sm"
                            value={sortBy}
                            onChange={handleSortChange}
                          >
                            <option value="">Sort by</option>
                            <option value="Newest">Newest</option>
                            <option value="Oldest">Oldest</option>
                            <option value="Free">Free</option>
                            <option value="Paid">Paid</option>
                          </select>
                        </form>
                      </div>
                    </div>
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
                          {filteredEvents.map((event, index) => (
                            <tr key={index}>
                              <td>{event.title}</td>
                              <td>{new Date(event.dateDebut).toLocaleDateString()}</td>
                              <td>{new Date(event.dateFin).toLocaleDateString()}</td>
                              <td>{event.price ? `${event.price} TND` : "Free"}</td>
                              <td>
                                <a
                                  onClick={() => editEvents(event._id)}
                                  className="btn btn-success-soft btn-round me-1 mb-1 mb-md-0"
                                >
                                  <i className="bi bi-pencil-square"></i>
                                </a>
                                <button
                                  onClick={() => deleteEvents(event._id)}
                                  className="btn btn-danger-soft btn-round me-1 mb-1 mb-md-0"
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
                  <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
                    <p className="mb-0 text-center text-sm-start">
                      Showing {indexOfFirstEntry + 1} to{" "}
                      {Math.min(indexOfLastEntry, filteredEvents.length)} of{" "}
                      {filteredEvents.length} entries
                    </p>
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
