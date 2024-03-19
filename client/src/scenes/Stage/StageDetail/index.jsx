import React, { useEffect, useState } from "react";
import NavBar from 'components/NavBar'
import BannerStartHome from 'components/BannerStartHome'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from "components/Footer";

function Index() {
    const [stage, setstage] = useState([]);
    const [totalEntries, setTotalEntries] = useState(0);
    const { id } = useParams();
    const [selectedStage, setSelectedStage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:3001/stage/${id}`, {
              method: "GET",
             
            });
            if (response.ok) {
              const data = await response.json();
              setstage(data);
           
            } else {
              const errorMessage = await response.text();
              //dispatch(setLogout()); // Log out user if token refresh fails
              throw new Error(errorMessage);
            }
          } catch (error) {
            console.error("Error fetching stage:", error);
            // Handle error
          }
        };
    
        if (id) fetchData();
      }, [  id]);
    
      const handleDetailClick = (stage) => {
        setSelectedStage(stage);
      };
      

  return (

    <div>
          <NavBar />

<BannerStartHome
    title="Internship"
    description="Find Detail About Our Internship."
  />

      <section className="pt-5 pb-0">
  <div className="container">
    <div className="row g-0 g-lg-5">
      {/* Left sidebar START */}
      <div className="col-lg-4">
        <div className="row">
          <div className="col-md-6 col-lg-12">
            {/* Instructor image START */}
            <div className="card shadow p-2 mb-4 text-center">
              <div className="rounded-3">
                {/* Image */}
                {stage.picturePath ? (
                <img
                  src={`http://localhost:3001/assets/${stage.picturePath}`}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="card-img-top"
                />
              ) : (
                <span>No Image</span>
              )}
                            </div>
              {/* Card body */}
              <div className="card-body px-3">
               
                {/* Social media button */}
                <ul className="list-inline mb-0">
                  <li className="list-inline-item"> <a className="btn px-2 btn-sm bg-facebook" href="https://www.facebook.com/ConservatoireElkindy"><i className="fab fa-fw fa-facebook-f" /></a> </li>
                  <li className="list-inline-item"> <a className="btn px-2 btn-sm bg-instagram-gradient" href="https://www.instagram.com/conservatoireelkindy"><i className="fab fa-fw fa-instagram" /></a> </li>
                    </ul>
              </div>
            </div>
            {/* Instructor image END */}
          </div>
          
        </div> {/* Row End */}
      </div>
      {/* Left sidebar END */}
      {/* Main content START */}
      <div className="col-lg-8">
        {/* Title */}
        <h5 className="mb-0">El Kindy Conservatory offers Internships for it's students they can participate in </h5>

        <h1 className="mb-0">{stage.title}</h1>
        <p>El-kindy Conservatory Intership</p>
        <Link to={`/reservation/${stage._id}`} className="btn btn-primary btn-sm btn-block" onClick={() => setSelectedStage(stage)}>Reservation</Link>
        {/* Content */}
        <p className="mt-4">{stage.description}</p>
        {/* Personal info */}
        <ul className="list-group list-group-borderless">
          <li className="list-group-item px-0">
            <span className="h6 fw-light"><i className="fas fa-fw fa-clock text-primary me-1 me-sm-3" />Start Date:</span>
            <span>{stage.startDate}</span>
          </li>
          <li className="list-group-item px-0">
            <span className="h6 fw-light"><i className="fas fa-fw fa-clock text-primary me-1 me-sm-3" />Finish Date:</span>
            <span>{stage.finishDate}</span>
          </li>
          <li className="list-group-item px-0">
            <span className="h6 fw-light"><i className="fas fa-fw fa-headphones text-primary me-1 me-sm-3" />Phone number:</span>
            <span>+216 20 669 545</span>
          </li>

         
        </ul>
            </div>
      {/* Main content END */}
    </div>{/* Row END */}
  </div>
</section>
<Footer />

    </div>
  )
}

export default Index