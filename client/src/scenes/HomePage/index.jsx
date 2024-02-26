import Footer from "components/Footer";
import NavBar from "components/NavBar";
import React, { useEffect, useRef } from 'react'

import { useSelector } from "react-redux";
import { loadScripts } from '../../scriptLoader';


function Index() {
  const user = useSelector((state) => state.user);
  const scriptsLoaded = useRef(false);

  useEffect(() => {
    const scripts = [
      '/assets/vendor/purecounterjs/dist/purecounter_vanilla.js',
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
  }, []); // Empty dependency array ensures this effect runs only once

 
    const test = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/getAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const allUsers = await response.json();

        if (allUsers) {
          console.log("users", allUsers.users);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };
    test();

  return (
    <>
      <NavBar />
      <div>
        {/* Start Hero Section 
      <Hero 
        title="Modern Interior Design Studio" 
        disc="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique." 
      />
      
		  {/* End Hero Section */}
        {/* =======================
      Counter START */}
        <section className="py-0 py-xl-5">
          <div className="container">
            <div className="row g-4">
              {/* Counter item */}
              <div className="col-sm-6 col-xl-3">
                <div className="d-flex justify-content-center align-items-center p-4 bg-warning bg-opacity-15 rounded-3">
                  <span className="display-6 lh-1 text-warning mb-0">
                    <i className="fas fa-tv"></i>
                  </span>
                  <div className="ms-4 h6 fw-normal mb-0">
                    <div className="d-flex">
                      <h5
                        className="purecounter mb-0 fw-bold"
                        data-purecounter-start="0"
                        data-purecounter-end="10"
                        data-purecounter-delay="200"
                      >
                        0
                      </h5>
                      <span className="mb-0 h5">K</span>
                    </div>
                    <p className="mb-0">Online Courses</p>
                  </div>
                </div>
              </div>
              {/* Counter item */}
              <div className="col-sm-6 col-xl-3">
                <div className="d-flex justify-content-center align-items-center p-4 bg-blue bg-opacity-10 rounded-3">
                  <span className="display-6 lh-1 text-blue mb-0">
                    <i className="fas fa-user-tie"></i>
                  </span>
                  <div className="ms-4 h6 fw-normal mb-0">
                    <div className="d-flex">
                      <h5
                        className="purecounter mb-0 fw-bold"
                        data-purecounter-start="0"
                        data-purecounter-end="200"
                        data-purecounter-delay="200"
                      >
                        0
                      </h5>
                      <span className="mb-0 h5">+</span>
                    </div>
                    <p className="mb-0">Expert Tutors</p>
                  </div>
                </div>
              </div>
              {/* Counter item */}
              <div className="col-sm-6 col-xl-3">
                <div className="d-flex justify-content-center align-items-center p-4 bg-purple bg-opacity-10 rounded-3">
                  <span className="display-6 lh-1 text-purple mb-0">
                    <i className="fas fa-user-graduate"></i>
                  </span>
                  <div className="ms-4 h6 fw-normal mb-0">
                    <div className="d-flex">
                      <h5
                        className="purecounter mb-0 fw-bold"
                        data-purecounter-start="0"
                        data-purecounter-end="60"
                        data-purecounter-delay="200"
                      >
                        0
                      </h5>
                      <span className="mb-0 h5">K+</span>
                    </div>
                    <p className="mb-0">Online Students</p>
                  </div>
                </div>
              </div>
              {/* Counter item */}
              <div className="col-sm-6 col-xl-3">
                <div className="d-flex justify-content-center align-items-center p-4 bg-info bg-opacity-10 rounded-3">
                  <span className="display-6 lh-1 text-info mb-0">
                    <i className="bi bi-patch-check-fill"></i>
                  </span>
                  <div className="ms-4 h6 fw-normal mb-0">
                    <div className="d-flex">
                      <h5
                        className="purecounter mb-0 fw-bold"
                        data-purecounter-start="0"
                        data-purecounter-end="6"
                        data-purecounter-delay="300"
                      >
                        0
                      </h5>
                      <span className="mb-0 h5">K+</span>
                    </div>
                    <p className="mb-0">Certified Courses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* =======================
      Counter END */}

        {/* =======================
      Popular course START */}
        <section>
          <div className="container">
            {/* Title */}
            <div className="row mb-4">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="fs-1">Most Popular Courses</h2>
                <p className="mb-0">Choose from hundreds of courses from specialist organizations</p>
              </div>
            </div>
            {/* Tabs START */}
            <ul className="nav nav-pills nav-pills-bg-soft justify-content-sm-center mb-4 px-3" id="course-pills-tab" role="tablist">
              {/* Tab item */}
              <li className="nav-item me-2 me-sm-5">
                <button className="nav-link mb-2 mb-md-0 active" id="course-pills-tab-1" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-1" type="button" role="tab" aria-controls="course-pills-tabs-1" aria-selected="false">Web Design</button>
              </li>
              {/* Tab item */}
              <li className="nav-item me-2 me-sm-5">
                <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-2" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-2" type="button" role="tab" aria-controls="course-pills-tabs-2" aria-selected="false">Development</button>
              </li>
              {/* Tab item */}
              <li className="nav-item me-2 me-sm-5">
                <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-3" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-3" type="button" role="tab" aria-controls="course-pills-tabs-3" aria-selected="false">Graphic Design</button>
              </li>
              {/* Tab item */}
              <li className="nav-item me-2 me-sm-5">
                <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-4" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-4" type="button" role="tab" aria-controls="course-pills-tabs-4" aria-selected="false">Marketing</button>
              </li>
              {/* Tab item */}
              <li className="nav-item me-2 me-sm-5">
                <button className="nav-link mb-2 mb-md-0" id="course-pills-tab-5" data-bs-toggle="pill" data-bs-target="#course-pills-tabs-5" type="button" role="tab" aria-controls="course-pills-tabs-5" aria-selected="false">Finance</button>
              </li>
            </ul>
            {/* Tabs END */}
            {/* Tabs content START */}
            <div className="tab-content" id="course-pills-tabContent">
              {/* Content START */}
              <div className="tab-pane fade show active" id="course-pills-tabs-1" role="tabpanel" aria-labelledby="course-pills-tab-1">
                <div className="row g-4">
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/08.jpg" className="card-img-top" alt="course image" />
                      {/* Card body */}
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                          <a href="#" className="h6 mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Sketch from A to Z: for app designer</a></h5>
                        <p className="mb-2 text-truncate-2">Proposal indulged no do sociable he throwing settling.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="far fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.0/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />12h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />15 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/02.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                          <a href="#" className="text-danger"><i className="fas fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Graphic Design Masterclass</a></h5>
                        <p className="mb-2 text-truncate-2">Rooms oh fully taken by worse do Points afraid but may end Rooms Points afraid but may end Rooms</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between ">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />9h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />65 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/03.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                          <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Create a Design System in Figma</a></h5>
                        <p className="mb-2 text-truncate-2">Rooms oh fully taken by worse do. Points afraid but may end afraid but may end.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />5h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />32 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/07.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                          <a href="#" className="text-danger"><i className="fas fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Deep Learning with React-Native </a></h5>
                        <p className="mb-2 text-truncate-2">Far advanced settling say finished raillery. Offered chiefly farther</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="far fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.0/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />18h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />99 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/11.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                          <a href="#" className="text-danger"><i className="fas fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Build Responsive Websites with HTML</a></h5>
                        <p className="mb-2 text-truncate-2">Far advanced settling say finished raillery. Offered chiefly farther</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="far fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.0/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />15h 30m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />68 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/12.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                          <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Build Websites with CSS</a></h5>
                        <p className="text-truncate-2 mb-2">Far advanced settling say finished raillery. Offered chiefly farther</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between mt-2">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />36h 30m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />72 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/04.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                          <a href="#" className="text-danger"><i className="fas fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Learn Invision</a></h5>
                        <p className="mb-2">Arrived off she elderly beloved him Course regard to up he hardly.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="far fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">3.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between mt-2">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />6h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />82 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/09.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                          <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">JavaScript: Full Understanding</a></h5>
                        <p className="text-truncate-2 mb-2">Far advanced settling say finished raillery. Offered chiefly farther.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">5.0/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />35h 20m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />89 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                </div> {/* Row END */}
              </div>
              {/* Content END */}
              {/* Content START */}
              <div className="tab-pane fade" id="course-pills-tabs-2" role="tabpanel" aria-labelledby="course-pills-tab-2">
                <div className="row g-4">
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/05.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                          <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">The Complete Web Development in python</a></h5>
                        <p className="text-truncate-2 mb-2">Mention Mr manners opinion if garrets enabled.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between mt-2">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />10h 00m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />26 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/06.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-info bg-opacity-10 text-info">Intermediate</a>
                          <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Angular – The Complete Guider</a></h5>
                        <p className="text-truncate-2 mb-2">Rooms oh fully taken by worse do. Points afraid but may end.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between mt-2">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />9h 32m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />42 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/07.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                          <a href="#" className="text-danger"><i className="fas fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Deep Learning with React-Native</a></h5>
                        <p className="text-truncate-2 mb-2">Far advanced settling say finished raillery. Offered chiefly farther</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="far fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.0/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />18h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />99 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/09.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                          <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">JavaScript: Full Understanding</a></h5>
                        <p className="text-truncate-2 mb-2">Far advanced settling say finished raillery. Offered chiefly farther</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">5.0/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />35h 20m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />89 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/10.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-info bg-opacity-10 text-info">Intermediate</a>
                          <a href="#" className="text-danger"><i className="fas fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Bootstrap 5 From Scratch</a></h5>
                        <p className="text-truncate-2 mb-2">Far advanced settling say finished raillery. Offered chiefly farther</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between mt-2">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />25h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />38 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/13.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                          <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">PHP with - CMS Project</a></h5>
                        <p className="text-truncate-2 mb-2">Far advanced settling say finished raillery. Offered chiefly farther</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="far fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.0/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />21h 22m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />30 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                </div>
              </div>
              {/* Content END */}
              {/* Content START */}
              <div className="tab-pane fade" id="course-pills-tabs-3" role="tabpanel" aria-labelledby="course-pills-tab-3">
                <div className="row g-4">
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/08.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                          <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Sketch from A to Z: for app designer</a></h5>
                        <p className="text-truncate-2 mb-2">Proposal indulged no do sociable he throwing settling</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="far fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.0/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />12h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />15 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/04.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                          <a href="#" className="text-danger"><i className="fas fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Learn Invision</a></h5>
                        <p className="mb-2">Arrived off she elderly beloved him Course regard to up he hardly.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="far fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">3.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between mt-2">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />6h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />82 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/02.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                          <a href="#" className="text-danger"><i className="fas fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Graphic Design Masterclass</a></h5>
                        <p className="text-truncate-2 mb-2">Rooms oh fully taken by worse do. Points afraid but may end.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />9h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />65 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/03.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                          <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Create a Design System in Figma</a></h5>
                        <p className="text-truncate-2 mb-2">Rooms oh fully taken by worse do. Points afraid but may end.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />5h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />32 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                </div>
              </div>
              {/* Content END */}
              {/* Content START */}
              <div className="tab-pane fade" id="course-pills-tabs-4" role="tabpanel" aria-labelledby="course-pills-tab-4">
                <div className="row g-4">
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/01.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-success bg-opacity-10 text-success">Beginner</a>
                          <a href="#" className="text-danger"><i className="fas fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Digital Marketing Masterclass</a></h5>
                        <p className="text-truncate-2 mb-2">Delivered dejection necessary objection do Mr prevailed.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />6h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />82 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/08.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                          <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Sketch from A to Z: for app designer</a></h5>
                        <p className="text-truncate-2 mb-2">Proposal indulged no do sociable he throwing settling.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="far fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">4.0/5.0</li>
                        </ul>
                      </div>	
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />12h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />15 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                </div>
              </div>
              {/* Content END */}
              {/* Content START */}
              <div className="tab-pane fade" id="course-pills-tabs-5" role="tabpanel" aria-labelledby="course-pills-tab-5">
                <div className="row g-4">
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/04.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                          <a href="#" className="text-danger"><i className="fas fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">Learn Invision</a></h5>
                        <p className="text-truncate-2 mb-2">Arrived off she elderly beloved him Course regard to up he hardly.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star-half-alt text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="far fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">3.5/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />6h 56m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />82 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                  {/* Card item START */}
                  <div className="col-sm-6 col-lg-4 col-xl-3">
                    <div className="card shadow h-100">
                      {/* Image */}
                      <img src="assets/images/courses/4by3/09.jpg" className="card-img-top" alt="course image" />
                      <div className="card-body pb-0">
                        {/* Badge and favorite */}
                        <div className="d-flex justify-content-between mb-2">
                          <a href="#" className="badge bg-purple bg-opacity-10 text-purple">All level</a>
                          <a href="#" className="h6 fw-light mb-0"><i className="far fa-heart" /></a>
                        </div>
                        {/* Title */}
                        <h5 className="card-title fw-normal"><a href="#">JavaScript: Full Understanding</a></h5>
                        <p className="text-truncate-2 mb-2">Far advanced settling say finished raillery. Offered chiefly farther.</p>
                        {/* Rating star */}
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item me-0 small"><i className="fas fa-star text-warning" /></li>
                          <li className="list-inline-item ms-2 h6 fw-light mb-0">5.0/5.0</li>
                        </ul>
                      </div>
                      {/* Card footer */}
                      <div className="card-footer pt-0 pb-3">
                        <hr />
                        <div className="d-flex justify-content-between">
                          <span className="h6 fw-light mb-0"><i className="far fa-clock text-danger me-2" />35h 20m</span>
                          <span className="h6 fw-light mb-0"><i className="fas fa-table text-orange me-2" />89 lectures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Card item END */}
                </div>
              </div>
              {/* Content END */}
            </div>
            {/* Tabs content END */}
          </div>
        </section>
        {/* =======================
      Popular course END */}

      
        {/* =======================
      Action box START */}
        <section className="pt-0 pt-lg-5">
          <div className="container position-relative">
            {/* SVG decoration START */}
            <figure className="position-absolute top-50 start-50 translate-middle ms-2">
              <svg>
                <path className="fill-white opacity-4" d="m496 22.999c0 10.493-8.506 18.999-18.999 18.999s-19-8.506-19-18.999 8.507-18.999 19-18.999 18.999 8.506 18.999 18.999z" />
                <path className="fill-white opacity-4" d="m775 102.5c0 5.799-4.701 10.5-10.5 10.5-5.798 0-10.499-4.701-10.499-10.5 0-5.798 4.701-10.499 10.499-10.499 5.799 0 10.5 4.701 10.5 10.499z" />
                <path className="fill-white opacity-4" d="m192 102c0 6.626-5.373 11.999-12 11.999s-11.999-5.373-11.999-11.999c0-6.628 5.372-12 11.999-12s12 5.372 12 12z" />
                <path className="fill-white opacity-4" d="m20.499 10.25c0 5.66-4.589 10.249-10.25 10.249-5.66 0-10.249-4.589-10.249-10.249-0-5.661 4.589-10.25 10.249-10.25 5.661-0 10.25 4.589 10.25 10.25z" />
              </svg>
            </figure>
            {/* SVG decoration END */}
            <div className="row">
              <div className="col-12">
                <div className="bg-info p-4 p-sm-5 rounded-3">
                  <div className="row position-relative">
                    {/* Svg decoration */}
                    <figure className="fill-white opacity-1 position-absolute top-50 start-0 translate-middle-y">
                      <svg width="141px" height="141px">
                        <path d="M140.520,70.258 C140.520,109.064 109.062,140.519 70.258,140.519 C31.454,140.519 -0.004,109.064 -0.004,70.258 C-0.004,31.455 31.454,-0.003 70.258,-0.003 C109.062,-0.003 140.520,31.455 140.520,70.258 Z" />
                      </svg>
                    </figure>
                    {/* Action box */}
                    <div className="col-11 mx-auto position-relative">
                      <div className="row align-items-center">
                        {/* Title */}
                        <div className="col-lg-7">
                          <h3 className="text-white">Become an Instructor!</h3>
                          <p className="text-white mb-3 mb-lg-0">Speedily say has suitable disposal add boy. On forth doubt miles of child. Exercise joy man children rejoiced. Yet uncommonly his ten who diminution astonished.</p>
                        </div>
                        {/* Content and input */}
                        <div className="col-lg-5 text-lg-end">
                          <a href="#" className="btn btn-outline-warning mb-0">Start Teaching Today</a>
                        </div>
                      </div>
                    </div>
                  </div> {/* Row END */}
                </div>
              </div>
            </div> {/* Row END */}
          </div>
        </section>
        {/* =======================
      Action box END */}


        {/* =======================
          Trending courses START */}
          <section className="pb-5 pt-0 pt-lg-5">
            <div className="container">
              {/* Title */}
              <div className="row mb-4">
                <div className="col-lg-8 mx-auto text-center">
                  <h2 className="fs-1">Our Trending Courses</h2>
                  <p className="mb-0">Check out most 🔥 courses in the market</p>
                </div>
              </div>
              <div className="row">
                {/* Slider START */}
                <div className="tiny-slider arrow-round arrow-blur arrow-hover">
                  <div
                    className="tiny-slider-inner pb-1"
                    data-autoplay="true"
                    data-arrow="true"
                    data-edge={2}
                    data-dots="false"
                    data-items={3}
                    data-items-lg={2}
                    data-items-sm={1}
                  >
                    {/* Card item START */}
                    <div>
                      <div className="card action-trigger-hover border bg-transparent">
                        {/* Image */}
                        <img
                          src="assets/images/courses/4by3/14.jpg"
                          className="card-img-top" alt={true.toString()}              />
                        {/* Ribbon */}
                        <div className="ribbon mt-3">
                          <span>Free</span>
                        </div>
                        {/* Card body */}
                        <div className="card-body pb-0">
                          {/* Badge and favorite */}
                          <div className="d-flex justify-content-between mb-3">
                            <span className="hstack gap-2">
                              <a
                                href="#"
                                className="badge bg-primary bg-opacity-10 text-primary"
                              >
                                Design
                              </a>
                              <a href="#" className="badge bg-dark text-white">
                                Beginner
                              </a>
                            </span>
                            <a href="#" className="h6 fw-light mb-0">
                              <i className="far fa-bookmark" />
                            </a>
                          </div>
                          {/* Title */}
                          <h5 className="card-title">
                            <a href="#">
                              The complete Digital Marketing Course - 8 Course in
                              1
                            </a>
                          </h5>
                          {/* Rating */}
                          <div className="d-flex justify-content-between mb-2">
                            <div className="hstack gap-2">
                              <p className="text-warning m-0">
                                4.5
                                <i className="fas fa-star text-warning ms-1" />
                              </p>
                              <span className="small">(6500)</span>
                            </div>
                            <div className="hstack gap-2">
                              <p className="h6 fw-light mb-0 m-0">6500</p>
                              <span className="small">(Student)</span>
                            </div>
                          </div>
                          {/* Time */}
                          <div className="hstack gap-3">
                            <span className="h6 fw-light mb-0">
                              <i className="far fa-clock text-danger me-2" />
                              6h 56m
                            </span>
                            <span className="h6 fw-light mb-0">
                              <i className="fas fa-table text-orange me-2" />
                              82 lectures
                            </span>
                          </div>
                        </div>
                        {/* Card footer */}
                        <div className="card-footer pt-0 bg-transparent">
                          <hr />
                          {/* Avatar and Price */}
                          <div className="d-flex justify-content-between align-items-center">
                            {/* Avatar */}
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-sm">
                                <img
                                  className="avatar-img rounded-1"
                                  src="assets/images/avatar/10.jpg"
                                  alt={true.toString()}                />
                              </div>
                              <p className="mb-0 ms-2">
                                <a href="#" className="h6 fw-light mb-0">
                                  Larry Lawson
                                </a>
                              </p>
                            </div>
                            {/* Price */}
                            <div>
                              <h4 className="text-success mb-0 item-show">
                                Free
                              </h4>
                              <a
                                href="#"
                                className="btn-sm btn-success-soft item-show-hover"
                              >
                                <i className="fas fa-shopping-cart me-2" />
                                Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Card item END */}
                    {/* Card item START */}
                    <div>
                      <div className="card action-trigger-hover border bg-transparent">
                        {/* Image */}
                        <img
                          src="assets/images/courses/4by3/15.jpg"
                          className="card-img-top"
                          alt={true.toString()}                />
                        {/* Card body */}
                        <div className="card-body pb-0">
                          {/* Badge and favorite */}
                          <div className="d-flex justify-content-between mb-3">
                            <span className="hstack gap-2">
                              <a
                                href="#"
                                className="badge bg-primary bg-opacity-10 text-primary"
                              >
                                Development
                              </a>
                              <a href="#" className="badge bg-dark text-white">
                                All level
                              </a>
                            </span>
                            <a href="#" className="h6 fw-light mb-0">
                              <i className="far fa-bookmark" />
                            </a>
                          </div>
                          {/* Title */}
                          <h5 className="card-title">
                            <a href="#">
                              Angular – The Complete Guide (2021 Edition)
                            </a>
                          </h5>
                          {/* Rating */}
                          <div className="d-flex justify-content-between mb-2">
                            <div className="hstack gap-2">
                              <p className="text-warning m-0">
                                4.0
                                <i className="fas fa-star text-warning ms-1" />
                              </p>
                              <span className="small">(3500)</span>
                            </div>
                            <div className="hstack gap-2">
                              <p className="h6 fw-light mb-0 m-0">4500</p>
                              <span className="small">(Student)</span>
                            </div>
                          </div>
                          {/* Time */}
                          <div className="hstack gap-3">
                            <span className="h6 fw-light mb-0">
                              <i className="far fa-clock text-danger me-2" />
                              12h 45m
                            </span>
                            <span className="h6 fw-light mb-0">
                              <i className="fas fa-table text-orange me-2" />
                              65 lectures
                            </span>
                          </div>
                        </div>
                        {/* Card footer */}
                        <div className="card-footer pt-0 bg-transparent">
                          <hr />
                          {/* Avatar and Price */}
                          <div className="d-flex justify-content-between align-items-center">
                            {/* Avatar */}
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-sm">
                                <img
                                  className="avatar-img rounded-1"
                                  src="assets/images/avatar/04.jpg"
                                  alt={true.toString()}                           />
                              </div>
                              <p className="mb-0 ms-2">
                                <a href="#" className="h6 fw-light mb-0">
                                  Billy Vasquez
                                </a>
                              </p>
                            </div>
                            {/* Price */}
                            <div>
                              <h4 className="text-success mb-0 item-show">
                                $255
                              </h4>
                              <a
                                href="#"
                                className="btn-sm btn-success-soft item-show-hover"
                              >
                                <i className="fas fa-shopping-cart me-2" />
                                Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Card item END */}
                    {/* Card item START */}
                    <div>
                      <div className="card action-trigger-hover border bg-transparent">
                        {/* Image */}
                        <img
                          src="assets/images/courses/4by3/17.jpg"
                          className="card-img-top"
                          alt={true.toString()}              />
                        {/* Card body */}
                        <div className="card-body pb-0">
                          {/* Badge and favorite */}
                          <div className="d-flex justify-content-between mb-3">
                            <span className="hstack gap-2">
                              <a
                                href="#"
                                className="badge bg-primary bg-opacity-10 text-primary"
                              >
                                Design
                              </a>
                              <a href="#" className="badge bg-dark text-white">
                                Beginner
                              </a>
                            </span>
                            <a href="#" className="h6 fw-light mb-0">
                              <i className="far fa-bookmark" />
                            </a>
                          </div>
                          {/* Title */}
                          <h5 className="card-title">
                            <a href="#">
                              Time Management Mastery: Do More, Stress Less
                            </a>
                          </h5>
                          {/* Rating */}
                          <div className="d-flex justify-content-between mb-2">
                            <div className="hstack gap-2">
                              <p className="text-warning m-0">
                                4.5
                                <i className="fas fa-star text-warning ms-1" />
                              </p>
                              <span className="small">(2000)</span>
                            </div>
                            <div className="hstack gap-2">
                              <p className="h6 fw-light mb-0 m-0">8000</p>
                              <span className="small">(Student)</span>
                            </div>
                          </div>
                          {/* Time */}
                          <div className="hstack gap-3">
                            <span className="h6 fw-light mb-0">
                              <i className="far fa-clock text-danger me-2" />
                              24h 56m
                            </span>
                            <span className="h6 fw-light mb-0">
                              <i className="fas fa-table text-orange me-2" />
                              55 lectures
                            </span>
                          </div>
                        </div>
                        {/* Card footer */}
                        <div className="card-footer pt-0 bg-transparent">
                          <hr />
                          {/* Avatar and Price */}
                          <div className="d-flex justify-content-between align-items-center">
                            {/* Avatar */}
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-sm">
                                <img
                                  className="avatar-img rounded-1"
                                  src="assets/images/avatar/09.jpg"
                                  alt={true.toString()}                          />
                              </div>
                              <p className="mb-0 ms-2">
                                <a href="#" className="h6 fw-light mb-0">
                                  Lori Stevens
                                </a>
                              </p>
                            </div>
                            {/* Price */}
                            <div>
                              <h4 className="text-success mb-0 item-show">
                                $500
                              </h4>
                              <a
                                href="#"
                                className="btn-sm btn-success-soft item-show-hover"
                              >
                                <i className="fas fa-shopping-cart me-2" />
                                Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Card item END */}
                    {/* Card item START */}
                    <div>
                      <div className="card action-trigger-hover border bg-transparent">
                        {/* Image */}
                        <img
                          src="assets/images/courses/4by3/16.jpg"
                          className="card-img-top" alt={true.toString()}                   />
                        {/* Card body */}
                        <div className="card-body pb-0">
                          {/* Badge and favorite */}
                          <div className="d-flex justify-content-between mb-3">
                            <span className="hstack gap-2">
                              <a
                                href="#"
                                className="badge bg-primary bg-opacity-10 text-primary"
                              >
                                Design
                              </a>
                              <a href="#" className="badge bg-dark text-white">
                                Beginner
                              </a>
                            </span>
                            <a href="#" className="h6 fw-light mb-0">
                              <i className="far fa-bookmark" />
                            </a>
                          </div>
                          {/* Title */}
                          <h5 className="card-title">
                            <a href="#">
                              Time Management Mastery: Do More, Stress Less
                            </a>
                          </h5>
                          {/* Rating */}
                          <div className="d-flex justify-content-between mb-2">
                            <div className="hstack gap-2">
                              <p className="text-warning m-0">
                                4.0
                                <i className="fas fa-star text-warning ms-1" />
                              </p>
                              <span className="small">(2000)</span>
                            </div>
                            <div className="hstack gap-2">
                              <p className="h6 fw-light mb-0 m-0">1200</p>
                              <span className="small">(Student)</span>
                            </div>
                          </div>
                          {/* Time */}
                          <div className="hstack gap-3">
                            <span className="h6 fw-light mb-0">
                              <i className="far fa-clock text-danger me-2" />
                              09h 56m
                            </span>
                            <span className="h6 fw-light mb-0">
                              <i className="fas fa-table text-orange me-2" />
                              21 lectures
                            </span>
                          </div>
                        </div>
                        {/* Card footer */}
                        <div className="card-footer pt-0 bg-transparent">
                          <hr />
                          {/* Avatar and Price */}
                          <div className="d-flex justify-content-between align-items-center">
                            {/* Avatar */}
                            <div className="d-flex align-items-center">
                              <div className="avatar avatar-sm">
                                <img
                                  className="avatar-img rounded-1"
                                  src="assets/images/avatar/01.jpg"
                                  alt={true.toString()}                        />
                              </div>
                              <p className="mb-0 ms-2">
                                <a href="#" className="h6 fw-light mb-0">
                                  Frances Guerrero
                                </a>
                              </p>
                            </div>
                            {/* Price */}
                            <div>
                              <h4 className="text-success mb-0 item-show">
                                $200
                              </h4>
                              <a
                                href="#"
                                className="btn-sm btn-success-soft item-show-hover"
                              >
                                <i className="fas fa-shopping-cart me-2" />
                                Add to cart
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Card item END */}
                  </div>
                </div>
                {/* Slider END */}
              </div>
            </div>
          </section>
          {/* =======================
          Trending courses END */}
      </div>
      <Footer />
    </>
  );
}

export default Index;