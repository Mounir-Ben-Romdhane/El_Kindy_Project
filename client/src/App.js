import React, { useEffect, useRef } from 'react'
import AboutPage from '../src/scenes/AboutPage'
import HomePage from '../src/scenes/HomePage'
import SignUp from './scenes/Authentification/SignUp'
import SignIn from './scenes/Authentification/SignIn'
import ForgetPassword from './scenes/Authentification/ForgetPassword'
import ResetPassword from './scenes/Authentification/ResetPassword'
import NotFound from './scenes/NotFound'
import AdminHomePage from '../src/scenes/AdminHomePage'
import ListCoursesPage from '../src/scenes/Courses/ListCoursesPage'

import ListEventsPage from '../src/scenes/EventsPage/ListEventPage'
import AddEventPage from '../src/scenes/EventsPage/AddEventPage'
import AddCoursePage from '../src/scenes/Courses/AddCoursePage'
import ListCategoryPage from '../src/scenes/Category/ListCategoryPage'
import AddCategoryPage from '../src/scenes/Category/AddCategoryPage'
import EditCategoryPage from '../src/scenes/Category/EditCategoryPage'

import {BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { loadScripts } from './scriptLoader';



function App() {

  const isAuth = Boolean(useSelector((state) => state.token));
  
  const scriptsLoaded = useRef(false);


  useEffect(() => {
    const scripts = [
      'assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
      'assets/vendor/tiny-slider/tiny-slider.js',
      'assets/vendor/glightbox/js/glightbox.js',
      'assets/vendor/purecounterjs/dist/purecounter_vanilla.js',
      'assets/js/functions.js',
      'assets/vendor/choices/js/choices.min.js',
      'assets/vendor/aos/aos.js',
      'assets/vendor/quill/js/quill.min.js',
      'assets/vendor/stepper/js/bs-stepper.min.js',
    ];


  return (
    <>
    
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:id?/:token?" element={<ResetPassword />} />
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

          <Route  path="/listEvents" 
              element={isAuth ? <ListEventsPage /> : <Navigate to="/" /> }   
          />
          <Route  path="/addEvent" 
              element={isAuth ? <AddEventPage /> : <Navigate to="/" /> }   
              />
          <Route  path="/addCourse" 

              element={isAuth ? <AddCoursePage /> : <Navigate to="/" /> } 

              element={isAuth ? <AddEventPage /> : <Navigate to="/" /> }   />
          
          <Route path="/about" element={<AboutPage />}/>
            <Route  path="/listCategories" 
              element={isAuth ? <ListCategoryPage /> : <Navigate to="/" /> } 
          />
             <Route  path="/add-category" 
              element={isAuth ? <AddCategoryPage /> : <Navigate to="/" /> } 
          />
          <Route path="/edit-category/:id"
              element={isAuth ? <EditCategoryPage /> : <Navigate to="/" /> } 

          />
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </div>
      
      {/* Bootstrap JS */}
      <script strategy="beforeInteractive" src="/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>

      {/* Vendors */}
      <script strategy="beforeInteractive" src="/assets/vendor/tiny-slider/tiny-slider.js"></script>
      <script strategy="beforeInteractive" src="/assets/vendor/glightbox/js/glightbox.js"></script>
      <script strategy="beforeInteractive" src="/assets/vendor/purecounterjs/dist/purecounter_vanilla.js"></script>

      {/* Template Functions */}
      <script strategy="beforeInteractive" src="/assets/js/functions.js"></script>

      </>
  )
}

export default App