import React, { useEffect, useRef } from 'react'
import AboutPage from '../src/scenes/AboutPage'
import HomePage from '../src/scenes/HomePage'
import SignUp from './scenes/Authentification/SignUp'
import SignIn from './scenes/Authentification/SignIn'
import ForgetPassword from './scenes/Authentification/ForgetPassword'
import ResetPassword from './scenes/Authentification/ResetPassword'
import EmailVerify from './scenes/Authentification/EmailVerify'
import NotFound from './scenes/NotFound'
import AdminHomePage from '../src/scenes/AdminHomePage'
import ListCoursesPage from '../src/scenes/Courses/ListCoursesPage'
import Stage from '../src/scenes/Stage/StageHome'
import ListEventsPage from '../src/scenes/EventsPage/ListEventPage'
import AddEventPage from '../src/scenes/EventsPage/AddEventPage'
import AddCoursePage from '../src/scenes/Courses/AddCoursePage'
import ListCategoryPage from '../src/scenes/Category/ListCategoryPage'
import AddCategoryPage from '../src/scenes/Category/AddCategoryPage'
import EditCategoryPage from '../src/scenes/Category/EditCategoryPage'
import ListStage from '../src/scenes/Stage/ListStage'
import AddStage from '../src/scenes/Stage/AddStage'
import EditStage from '../src/scenes/Stage/EditStage'
import ListClassPage from '../src/scenes/Classe/ListClassPage'
import EditClassPage from '../src/scenes/Classe/EditClassPage'
import AddClassPage from '../src/scenes/Classe/AddClassPage'

import './assetss/css/style.css'



import Category from '../src/scenes/CategoryHome'


import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { loadScripts } from './scriptLoader';
import EditCourse from 'scenes/Courses/EditCoursePage'



function App() {

    const isAuth = Boolean(useSelector((state) => state.accessToken));

    const scriptsLoaded = useRef(false);

  return (
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:id?/:token?" element={<ResetPassword />} />
          <Route path="/verify-account/:id/verify/:token" element={<EmailVerify />} />
          <Route 
              path="/home" 
              element={isAuth ? <HomePage /> : <Navigate to="/" /> } 
            />
             <Route 
              path="/category" 
              element={isAuth ? <Category /> : <Navigate to="/" /> } 
            />
          <Route  path="/dashboard-admin" 
              element={isAuth ? <AdminHomePage /> : <Navigate to="/" /> } 
          />
          <Route  path="/listCourses" 
              element={isAuth ? <ListCoursesPage /> : <Navigate to="/" /> } 
          />
          <Route path="/edit-course/:id"
              element={isAuth ? <EditCourse /> : <Navigate to="/" /> } 

          />
                
                <Route path="/ListStage"
                    element={isAuth ? <ListStage /> : <Navigate to="/" />}
                />
                <Route path="/AddStage"
                    element={isAuth ? <AddStage /> : <Navigate to="/" />}
                />
                <Route path="/EditStage/:id"
                    element={isAuth ? <EditStage /> : <Navigate to="/" />}
                />
                       <Route
                    path="/stage"
                    element={isAuth ? <Stage /> : <Navigate to="/" />}
                />
                      

          <Route  path="/listEvents" 
              element={isAuth ? <ListEventsPage /> : <Navigate to="/" /> }   
          />
          <Route  path="/addEvent" 
              element={isAuth ? <AddEventPage /> : <Navigate to="/" /> }   
              />
          <Route  path="/addCourse" 
              element={isAuth ? <AddCoursePage /> : <Navigate to="/" /> } 

                />


          <Route  path="/listClasse" 
              element={isAuth ? <ListClassPage /> : <Navigate to="/" /> } 
          />
             <Route  path="/add-classe" 
              element={isAuth ? <AddClassPage /> : <Navigate to="/" /> } 
          />
          <Route path="/edit-classe/:id"
              element={isAuth ? <EditClassPage /> : <Navigate to="/" /> } 

          />

           <Route 
              path="/home" 
              element={isAuth ? <HomePage /> : <Navigate to="/" /> } 
            />



            
          
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
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </div>
  )
}

export default App