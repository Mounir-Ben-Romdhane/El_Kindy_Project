import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import React from 'react';
import SideBarTeacher from 'components/SideBarTeacher';
import { Link } from 'react-router-dom';
import TopBarTeacherStudent from  'components/TopBarTeacherStudent';
function index() {
    return (
        <div>
            {/* **************** MAIN CONTENT START **************** */}
            <main>

                <NavBar />
                {/* hedha l partie l fou9aneya  */}
                < TopBarTeacherStudent />
                {/* =======================
Page content START */}
                <section className="pt-0">
                    <div className="container">
                        <div className="row">
                           <SideBarTeacher />
                            {/* Main content START */}
                           
                            {/* Main content END */}
                        </div>{/* Row END */}
                    </div>
                </section>
                {/* =======================
Page content END */}


                <Footer />




            </main>
            {/* **************** MAIN CONTENT END **************** */}

        </div>
    )
}

export default index