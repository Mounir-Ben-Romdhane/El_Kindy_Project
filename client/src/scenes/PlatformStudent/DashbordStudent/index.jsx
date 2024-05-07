
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from 'components/Footer';

import FooterClient from 'components/FooterClient';

import NavBar from 'components/NavBar';
import SideBarStudent from 'components/SideBarStudent';
import TopBarTeacherStudent from 'components/TopBarTeacherStudent';
import ReviewPopup from '../../ReviewPage/PopupReview';
import { CircularProgress } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

function Index() {
    const [openPopup, setOpenPopup] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [loading, setLoading] = useState(false);
    
  // Refresh token
  const axiosPrivate = useAxiosPrivate();

  
    useEffect(() => {
        checkLastDayOfMonth();
        fetchTeachers();
        
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axiosPrivate.get('/auth/getAllUserByRole/teacher');
            console.log("API response data:", response.data.data);  // Check what's being received from the API
            setTeachers(response.data.data);
            if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                setSelectedTeacher(response.data.data[0]);  // Default to the first teacher object
            }
        } catch (error) {
            console.error('Failed to fetch teachers:', error);
        }
    };

    const checkLastDayOfMonth = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const isLastDayOfMonth = today.getMonth() !== tomorrow.getMonth();

        if (isLastDayOfMonth) {
            const lastReviewDate = localStorage.getItem('lastReviewDate');
            const lastReviewMonth = lastReviewDate ? new Date(lastReviewDate).getMonth() : null;
            const currentMonth = today.getMonth();

            if (lastReviewMonth === null || lastReviewMonth !== currentMonth) {
                setOpenPopup(true);
                localStorage.setItem('lastReviewDate', today.toISOString());
            }
        }
    };

    return (
        <div>
            <main>
                <NavBar />
                <TopBarTeacherStudent />
                <section className="pt-0">
                    <div className="container">
                        <div className="row">
                            <SideBarStudent />
                            {loading ? <CircularProgress /> : (
                                <ReviewPopup
                                open={openPopup}
                                handleClose={() => setOpenPopup(false)}
                                teachers={teachers}
                                selectedTeacher={selectedTeacher}
                                setSelectedTeacher={setSelectedTeacher} // Confirm this is correctly passed
                              />
                            )}
                        </div>
                    </div>
                </section>

                <Footer />

                {/* =======================
Page content END */}




                <FooterClient />


            </main>
        </div>
    );
}

export default Index;