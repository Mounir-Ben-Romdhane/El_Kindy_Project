import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from 'components/NavBar';
import FooterClient from 'components/FooterClient';
import SideBarTeacher from 'components/SideBarTeacher';
import TopBarTeacherStudent from 'components/TopBarTeacherStudent';
import Swal from 'sweetalert2'; // Importez SweetAlert2

const HomePagee = () => {

  const navigate = useNavigate();

  const [value, setValue] = useState("");
  //const handleJoinRoom = useCallback((e) => { navigate(`/room/${value}`) }, [navigate, value]);
  
  const handleJoinRoom = useCallback((e) => {
    e.preventDefault();
    if (!value) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Please enter a room name!',
        confirmButtonText: 'OK',
        confirmButtonColor: '#007bff',
      });
      return;
    }
    navigate(`/room/${value}`);
  }, [navigate, value]);
  

  return (


    <div>
      {/* **************** MAIN CONTENT START **************** */}
      <main>
<NavBar />
        {/* hedha l partie l fou9aneya  */}
        <TopBarTeacherStudent />

        {/* =======================
    Page content START */}
        <section className="pt-0">
          <div className="container">
            <div className="row">
              <SideBarTeacher />
              <div className="col-xl-9">
              
                <br></br>
                {/* Student review START */}
                <div className="card border bg-transparent rounded-3">
                <div className="card">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <h4>Check your list of meeting</h4>
                                <button className="btn btn-primary-soft ms-2 px-5 mb-0 flex-shrink-0"><Link to="/listMeeting"><i className="fas fa-sign-in-alt me-2" />List Meeting</Link></button>
                            </div>
                        </div>

                  {/* Reviews START */}
                  <div className="card-body mt-2 mt-sm-4 d-flex justify-content-center align-items-center ">
                    {/* Category item */}
                    <div className="col-sm-12 ">
                      <div className="card card-body shadow h-100 d-flex justify-content-center align-items-center  ">
                        {/* Title and image */}
                        <div className="d-flex align-items-center">
                          <img src="assets/images/element/meeting.png" className="h-60px mb-2" alt />
                          <div className="ms-3">
                            <h5 className="mb-0"><a href="#">Create your meeting room successfully!</a></h5>
                            <p className="mb-0 small">Feel free to explore our features for a rewarding experience</p>
                          </div>
                        </div>
                        {/* List */}
                        <div className="text-end">
                          {/* collapse textarea */}
                          <div className="collapse show" id="collapseComment">
                            <div className="d-flex mt-3">
                              <textarea className="form-control mb-0" placeholder="Add a name for your room..." rows={2} spellCheck="false" value={value}
                                onChange={(e) => setValue(e.target.value)} required/>
                              <button className="btn btn-sm btn-primary-soft ms-2 px-4 mb-0 flex-shrink-0" onClick={handleJoinRoom}><i className="fas fa-paper-plane fs-5" /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Category item */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* =======================
    Page content END */}




<FooterClient />
      </main>
      {/* **************** MAIN CONTENT END **************** */}

    </div>




  );

};

export default HomePagee;

