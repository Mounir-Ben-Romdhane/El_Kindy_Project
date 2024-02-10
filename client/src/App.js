import React, { useEffect } from 'react'
import AboutPage from '../src/scenes/AboutPage'
import HomePage from '../src/scenes/HomePage'
import SignUp from '../src/scenes/SignUp'
import SignIn from '../src/scenes/SignIn'
import AdminHomePage from '../src/scenes/AdminHomePage'
import ListCoursesPage from '../src/scenes/Courses/ListCoursesPage'
<<<<<<< HEAD
import ListEventsPage from '../src/scenes/EventsPage/ListEventPage'
import AddEventPage from '../src/scenes/EventsPage/AddEventPage'
=======
import AddCoursePage from '../src/scenes/Courses/AddCoursePage'
import EventsPage from '../src/scenes/EventsPage'
>>>>>>> master
import {BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("Script load error for ${src}"));
    document.head.appendChild(script);
  });
}

function App() {

  const isAuth = Boolean(useSelector((state) => state.token));

  

  useEffect(() => {
    const scripts = [
      '/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
      '/assets/vendor/tiny-slider/tiny-slider.js',
      '/assets/vendor/glightbox/js/glightbox.js',
      '/assets/vendor/purecounterjs/dist/purecounter_vanilla.js',
      '/assets/js/functions.js',
      '/assets/vendor/choices/js/choices.min.js',
      '/assets/vendor/aos/aos.js',
      '/assets/vendor/quill/js/quill.min.js',
      '/assets/vendor/stepper/js/bs-stepper.min.js'
    ];

    async function loadAllScripts() {
      try {
        for (const script of scripts) {
          await loadScript(script);
        }
        console.log('All scripts loaded');
      } catch (error) {
        console.error('Failed to load scripts', error);
      }
    }

    loadAllScripts();

    // Cleanup pour supprimer les scripts lors du démontage
    return () => {
      scripts.forEach(src => {
        const scriptTag = document.querySelector(scripts[src="${src}"]);
        scriptTag?.remove();
      });
    };
  }, []);

  return (
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
              path="/home" 
              element={isAuth ? <HomePage /> : <Navigate to="/" /> } 
            />
          <Route  path="/dashboard-admin" 
              element={isAuth ? <AdminHomePage /> : <Navigate to="/" /> } 
          />
          <Route  path="/listCourses" 
              element={isAuth ? <ListCoursesPage /> : <Navigate to="/" /> } 
          />
<<<<<<< HEAD
          <Route  path="/listEvents" 
              element={isAuth ? <ListEventsPage /> : <Navigate to="/" /> }   
          />
          <Route  path="/addEvent" 
              element={isAuth ? <AddEventPage /> : <Navigate to="/" /> }   
=======
          <Route  path="/addCourse" 
              element={isAuth ? <AddCoursePage /> : <Navigate to="/" /> } 
>>>>>>> master
          />
          <Route path="/about" element={<AboutPage />}/>
        </Routes>
      </div>
  )
}

export default App