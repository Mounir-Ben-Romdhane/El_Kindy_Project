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
      '/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
      '/assets/vendor/bootstrap/dist/js/bootstrap.bundle.js',

      '/assets/vendor/tiny-slider/tiny-slider.js',
      '/assets/vendor/glightbox/js/glightbox.js',
      '/assets/vendor/purecounterjs/dist/purecounter_vanilla.js',
      '/assets/js/functions.js',
      '/assets/vendor/choices/js/choices.min.js',
      '/assets/vendor/aos/aos.js',
      '/assets/vendor/quill/js/quill.min.js',
      '/assets/vendor/stepper/js/bs-stepper.min.js',
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