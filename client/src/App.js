import React, { useEffect, useRef } from "react";
import AboutPage from "../src/scenes/AboutPage";
import HomePage from "../src/scenes/HomePage";
import SignUp from "./scenes/Authentification/SignUp";
import SignIn from "./scenes/Authentification/SignIn";
import ForgetPassword from "./scenes/Authentification/ForgetPassword";
import ResetPassword from "./scenes/Authentification/ResetPassword";
import EmailVerify from "./scenes/Authentification/EmailVerify";
import NotFound from "./scenes/NotFound";
import AdminHomePage from "../src/scenes/AdminHomePage";
import ListCoursesPage from "../src/scenes/Courses/ListCoursesPage";
import Stage from "../src/scenes/Stage/StageHome";
import ListEventsPage from "../src/scenes/EventsPage/ListEventPage";
import AddEventPage from "../src/scenes/EventsPage/AddEventPage";
import AddCoursePage from "../src/scenes/Courses/AddCoursePage";
import ListCategoryPage from "../src/scenes/Category/ListCategoryPage";
import AddCategoryPage from "../src/scenes/Category/AddCategoryPage";
import EditCategoryPage from "../src/scenes/Category/EditCategoryPage";
import ListStage from "../src/scenes/Stage/ListStage";
import AddStage from "../src/scenes/Stage/AddStage";
import EditStage from "../src/scenes/Stage/EditStage";
import ListClassPage from "../src/scenes/Classe/ListClassPage";
import EditClassPage from "../src/scenes/Classe/EditClassPage";
import AddClassPage from "../src/scenes/Classe/AddClassPage";
import Category from "../src/scenes/CategoryHome";
import InscriptionPage from "./scenes/InscriptionPage";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { loadScripts } from "./scriptLoader";
import EditCourse from "scenes/Courses/EditCoursePage";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library

function App() {
  const isAuth = Boolean(useSelector((state) => state.accessToken));

  const scriptsLoaded = useRef(false);
  /*'/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
      '/assets/vendor/bootstrap/dist/js/bootstrap.bundle.js',
      '/assets/vendor/tiny-slider/tiny-slider.js',
      '/assets/vendor/glightbox/js/glightbox.js',
      '/assets/vendor/purecounterjs/dist/purecounter_vanilla.js',
      '/assets/vendor/choices/js/choices.min.js',
      '/assets/vendor/aos/aos.js',
      '/assets/vendor/quill/js/quill.min.js',
      '/assets/vendor/stepper/js/bs-stepper.min.js', */

  useEffect(() => {
    const scripts = [
      "/assets/vendor/quill/js/quill.min.js",
      "/assets/vendor/glightbox/js/glightbox.js",
      "/assets/vendor/purecounterjs/dist/purecounter_vanilla.js",
      "/assets/js/functions.js",
    ];

    if (!scriptsLoaded.current) {
      loadScripts(scripts);
      scriptsLoaded.current = true;
    }

    return () => {
      // Remove all script tags
      const scriptTags = document.querySelectorAll('script[src^="/assets"]');
      scriptTags.forEach((scriptTag) => {
        scriptTag.parentNode.removeChild(scriptTag);
      });
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route
          path="/reset-password/:id?/:token?"
          element={<ResetPassword />}
        />
        <Route
          path="/verify-account/:id/verify/:token"
          element={<EmailVerify />}
        />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/category"
          element={isAuth ? <Category /> : <Navigate to="/" />}
        />

        <Route
          path="/inscription/:id?"
          element={<InscriptionPage />}
          />

        <Route
          path="/dashboard-admin"
          element={
            <PrivateRoute
              element={<AdminHomePage />}
              requiredRoles={["superAdmin", "admin", "teacher"]}
            />
          }
        />
        
        <Route
          path="/listCourses"
          element={isAuth ? <ListCoursesPage /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-course/:id"
          element={isAuth ? <EditCourse /> : <Navigate to="/" />}
        />

        <Route
          path="/ListStage"
          element={isAuth ? <ListStage /> : <Navigate to="/" />}
        />
        <Route
          path="/AddStage"
          element={isAuth ? <AddStage /> : <Navigate to="/" />}
        />
        <Route
          path="/EditStage/:id"
          element={isAuth ? <EditStage /> : <Navigate to="/" />}
        />
        <Route
          path="/stage"
          element={isAuth ? <Stage /> : <Navigate to="/" />}
        />

        <Route
          path="/listEvents"
          element={isAuth ? <ListEventsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/addEvent"
          element={isAuth ? <AddEventPage /> : <Navigate to="/" />}
        />
        <Route
          path="/addCourse"
          element={isAuth ? <AddCoursePage /> : <Navigate to="/" />}
        />

        <Route
          path="/listClasse"
          element={isAuth ? <ListClassPage /> : <Navigate to="/" />}
        />
        <Route
          path="/add-classe"
          element={isAuth ? <AddClassPage /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-classe/:id"
          element={isAuth ? <EditClassPage /> : <Navigate to="/" />}
        />

        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />

        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/listCategories"
          element={isAuth ? <ListCategoryPage /> : <Navigate to="/" />}
        />
        <Route
          path="/add-category"
          element={isAuth ? <AddCategoryPage /> : <Navigate to="/" />}
        />
        <Route
          path="/edit-category/:id"
          element={isAuth ? <EditCategoryPage /> : <Navigate to="/" />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

// PrivateRoute component to check authentication and required roles
function PrivateRoute({ element, requiredRoles }) {
  const accessToken = useSelector((state) => state.accessToken);
  const userRoles = accessToken ? jwtDecode(accessToken).roles : [];

  // If user is authenticated and has required roles, render the element
  if (accessToken && userRoles.some((role) => requiredRoles.includes(role))) {
    return element;
  }

  // If user is not authenticated, redirect to login
  return <Navigate to="/" replace />;
}

export default App;
