import React from 'react'
import SideBarTeacher from 'components/SideBarTeacher';
import TopBarTeacherTeacher from 'components/TopBarTeacherStudent';
import NavBar from "components/NavBar";
import axios from "api/axios";


function index() {

  //get All students
  const getStudents = async () => {
    try {
      const res = await axios.get("/students");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  getStudents();
  



  return (
    <div> <NavBar />
    <TopBarTeacherTeacher />
    <div className="container">
          <div className="row">
            <SideBarTeacher />
            <div className="container col-md-9 mt-3">
              <div className="row">





                </div>
                </div>
            </div>
            </div>




    </div>
  )
}

export default index