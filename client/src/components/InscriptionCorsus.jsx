import React from "react";

function InscriptionCorsus(props) {
  return (
    <div>
{/* =======================
Page Banner START */}
<section className="py-5 bg-light" >
  <div className="container">
    <div className="row position-relative">
      {/* SVG decoration */}
      
      {/* Title and breadcrumb */}
      <div className="col-lg-10 mx-auto text-center position-relative">
        {/* SVG decoration */}
        <figure className="position-absolute top-50 end-0 translate-middle-y">
          <svg width="27px" height="27px">
            <path className="fill-orange" d="M13.122,5.946 L17.679,-0.001 L17.404,7.528 L24.661,5.946 L19.683,11.533 L26.244,15.056 L18.891,16.089 L21.686,23.068 L15.400,19.062 L13.122,26.232 L10.843,19.062 L4.557,23.068 L7.352,16.089 L-0.000,15.056 L6.561,11.533 L1.582,5.946 L8.839,7.528 L8.565,-0.001 L13.122,5.946 Z" />
          </svg>
        </figure>
        {/* SVG decoration */}
        <figure className="position-absolute top-100 start-50 translate-middle mt-3 ms-n9 d-none d-lg-block">
          <svg>
            <path className="fill-success" d="m181.6 6.7c-0.1 0-0.2-0.1-0.3 0-2.5-0.3-4.9-1-7.3-1.4-2.7-0.4-5.5-0.7-8.2-0.8-1.4-0.1-2.8-0.1-4.1-0.1-0.5 0-0.9-0.1-1.4-0.2-0.9-0.3-1.9-0.1-2.8-0.1-5.4 0.2-10.8 0.6-16.1 1.4-2.7 0.3-5.3 0.8-7.9 1.3-0.6 0.1-1.1 0.3-1.8 0.3-0.4 0-0.7-0.1-1.1-0.1-1.5 0-3 0.7-4.3 1.2-3 1-6 2.4-8.8 3.9-2.1 1.1-4 2.4-5.9 3.9-1 0.7-1.8 1.5-2.7 2.2-0.5 0.4-1.1 0.5-1.5 0.9s-0.7 0.8-1.1 1.2c-1 1-1.9 2-2.9 2.9-0.4 0.3-0.8 0.5-1.2 0.5-1.3-0.1-2.7-0.4-3.9-0.6-0.7-0.1-1.2 0-1.8 0-3.1 0-6.4-0.1-9.5 0.4-1.7 0.3-3.4 0.5-5.1 0.7-5.3 0.7-10.7 1.4-15.8 3.1-4.6 1.6-8.9 3.8-13.1 6.3-2.1 1.2-4.2 2.5-6.2 3.9-0.9 0.6-1.7 0.9-2.6 1.2s-1.7 1-2.5 1.6c-1.5 1.1-3 2.1-4.6 3.2-1.2 0.9-2.7 1.7-3.9 2.7-1 0.8-2.2 1.5-3.2 2.2-1.1 0.7-2.2 1.5-3.3 2.3-0.8 0.5-1.7 0.9-2.5 1.5-0.9 0.8-1.9 1.5-2.9 2.2 0.1-0.6 0.3-1.2 0.4-1.9 0.3-1.7 0.2-3.6 0-5.3-0.1-0.9-0.3-1.7-0.8-2.4s-1.5-1.1-2.3-0.8c-0.2 0-0.3 0.1-0.4 0.3s-0.1 0.4-0.1 0.6c0.3 3.6 0.2 7.2-0.7 10.7-0.5 2.2-1.5 4.5-2.7 6.4-0.6 0.9-1.4 1.7-2 2.6s-1.5 1.6-2.3 2.3c-0.2 0.2-0.5 0.4-0.6 0.7s0 0.7 0.1 1.1c0.2 0.8 0.6 1.6 1.3 1.8 0.5 0.1 0.9-0.1 1.3-0.3 0.9-0.4 1.8-0.8 2.7-1.2 0.4-0.2 0.7-0.3 1.1-0.6 1.8-1 3.8-1.7 5.8-2.3 4.3-1.1 9-1.1 13.3 0.1 0.2 0.1 0.4 0.1 0.6 0.1 0.7-0.1 0.9-1 0.6-1.6-0.4-0.6-1-0.9-1.7-1.2-2.5-1.1-4.9-2.1-7.5-2.7-0.6-0.2-1.3-0.3-2-0.4-0.3-0.1-0.5 0-0.8-0.1s-0.9 0-1.1-0.1-0.3 0-0.3-0.2c0-0.4 0.7-0.7 1-0.8 0.5-0.3 1-0.7 1.5-1l5.4-3.6c0.4-0.2 0.6-0.6 1-0.9 1.2-0.9 2.8-1.3 4-2.2 0.4-0.3 0.9-0.6 1.3-0.9l2.7-1.8c1-0.6 2.2-1.2 3.2-1.8 0.9-0.5 1.9-0.8 2.7-1.6 0.9-0.8 2.2-1.4 3.2-2 1.2-0.7 2.3-1.4 3.5-2.1 4.1-2.5 8.2-4.9 12.7-6.6 5.2-1.9 10.6-3.4 16.2-4 5.4-0.6 10.8-0.3 16.2-0.5h0.5c1.4-0.1 2.3-0.1 1.7 1.7-1.4 4.5 1.3 7.5 4.3 10 3.4 2.9 7 5.7 11.3 7.1 4.8 1.6 9.6 3.8 14.9 2.7 3-0.6 6.5-4 6.8-6.4 0.2-1.7 0.1-3.3-0.3-4.9-0.4-1.4-1-3-2.2-3.9-0.9-0.6-1.6-1.6-2.4-2.4-0.9-0.8-1.9-1.7-2.9-2.3-2.1-1.4-4.2-2.6-6.5-3.5-3.2-1.3-6.6-2.2-10-3-0.8-0.2-1.6-0.4-2.5-0.5-0.2 0-1.3-0.1-1.3-0.3-0.1-0.2 0.3-0.4 0.5-0.6 0.9-0.8 1.8-1.5 2.7-2.2 1.9-1.4 3.8-2.8 5.8-3.9 2.1-1.2 4.3-2.3 6.6-3.2 1.2-0.4 2.3-0.8 3.6-1 0.6-0.2 1.2-0.2 1.8-0.4 0.4-0.1 0.7-0.3 1.1-0.5 1.2-0.5 2.7-0.5 3.9-0.8 1.3-0.2 2.7-0.4 4.1-0.7 2.7-0.4 5.5-0.8 8.2-1.1 3.3-0.4 6.7-0.7 10-1 7.7-0.6 15.3-0.3 23 1.3 4.2 0.9 8.3 1.9 12.3 3.6 1.2 0.5 2.3 1.1 3.5 1.5 0.7 0.2 1.3 0.7 1.8 1.1 0.7 0.6 1.5 1.1 2.3 1.7 0.2 0.2 0.6 0.3 0.8 0.2 0.1-0.1 0.1-0.2 0.2-0.4 0.1-0.9-0.2-1.7-0.7-2.4-0.4-0.6-1-1.4-1.6-1.9-0.8-0.7-2-1.1-2.9-1.6-1-0.5-2-0.9-3.1-1.3-2.5-1.1-5.2-2-7.8-2.8-1-0.8-2.4-1.2-3.7-1.4zm-64.4 25.8c4.7 1.3 10.3 3.3 14.6 7.9 0.9 1 2.4 1.8 1.8 3.5-0.6 1.6-2.2 1.5-3.6 1.7-4.9 0.8-9.4-1.2-13.6-2.9-4.5-1.7-8.8-4.3-11.9-8.3-0.5-0.6-1-1.4-1.1-2.2 0-0.3 0-0.6-0.1-0.9s-0.2-0.6 0.1-0.9c0.2-0.2 0.5-0.2 0.8-0.2 2.3-0.1 4.7 0 7.1 0.4 0.9 0.1 1.6 0.6 2.5 0.8 1.1 0.4 2.3 0.8 3.4 1.1z" />
          </svg>
        </figure>
        {/* Title */}
        <h1>Pré-Inscription</h1>
        {/* Breadcrumb */}
        <div className="d-flex justify-content-center position-relative">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><a href="#">Welcome Here</a></li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
</section>
{/* =======================
Page Banner END */}



      {/* =======================
Contact form START */}
      <section
        id="contact-form"
        className="position-relative bg-light overflow-hidden pt-0 pt-md-5"
      >
        {/* SVG decoration */}
       
        <div className="container">
          <div className="row g-4 g-sm-5 align-items-center justify-content-center">
            {/* Contact form START */}
            <div className="col-lg-11 d-flex" >
              <div className="card card-body shadow p-4 p-sm-5 ">
                {/* SVG decoration */}
                <figure className="position-absolute top-0 start-100 mt-n5 ms-n7">
                  <svg enableBackground="new 0 0 167 107">
                    <path
                      className="fill-danger"
                      d="m87.1 1c-0.4 0.5-0.8 1-1.3 1.5l-3 2.7c-2.6 2.3-5.1 4.7-7.8 6.8-13.4 10.5-26.8 21-40.1 31.5l-25.8 20.4c-0.4 0.3-0.8 0.6-1.1 0.9-0.7 0.6-1.5 1-2.4 0.2-0.8-0.7-0.6-1.7-0.1-2.4 0.6-1 1.4-2 2.2-2.8 0.5-0.4 1-0.9 1.5-1.3 2.8-2.6 5.7-5.2 8.6-7.5 21.6-16.6 43.3-33.1 65.8-48.5 1.2-0.9 2.5-1.7 3.8-2.5 0 0 0.1 0.1 0.4 0.2-0.2 0.3-0.5 0.6-0.7 0.8zm78.9 20.9c-0.4 0.2-0.7 0.4-1.1 0.6-0.3 0.2-0.7 0.5-1.1 0.7-14.6 8.6-29 17.5-43.1 27-21.6 14.4-43 29.2-63.4 45.2-3.8 3-7.5 6-11.2 9-0.6 0.5-1.1 0.9-1.7 1.3-0.8 0.6-1.6 0.9-2.4 0.2s-0.6-1.7-0.1-2.4c0.6-1 1.3-2 2.2-2.8l0.1-0.1c2.5-2.3 5-4.6 7.7-6.6 30.4-23 61.6-44.5 94.9-63 3.8-2.1 7.7-4.1 11.6-6 1.9-1 3.9-2 5.8-3 0.5-0.2 1-0.4 1.4-0.6 0.2 0.1 0.3 0.3 0.4 0.5zm-66.1-13.4c0.7-0.5 1.3-1.1 1.9-1.7-0.1-0.1-0.2-0.2-0.5-0.3-0.7 0.5-1.4 1-2.1 1.6-0.7 0.5-1.4 1.1-2.1 1.6-4 2.9-8.1 5.8-12.1 8.7-19.3 13.8-38.6 27.7-57.8 41.8-5.4 3.9-10.5 8.1-15.6 12.3-2.1 1.7-4.2 3.5-6.3 5.2-1.5 1.2-2.8 2.6-4.1 4-0.5 0.5-1 1.1-1.2 1.8-0.1 0.5 0.1 1.2 0.4 1.5s1.1 0.4 1.5 0.2c0.8-0.4 1.5-0.9 2.2-1.5l7.2-6c4.2-3.6 8.5-7.1 12.8-10.5 10.6-8.2 21.3-16.4 31.9-24.5l23.4-18c6.9-5.4 13.7-10.8 20.5-16.2zm0.5 13.5c-1.1 1-2.2 2-3.4 2.9-3.3 2.6-6.7 5.2-10 7.8-11 8.5-22 17-32.9 25.6-6.4 5.1-12.8 10.3-19.1 15.4-3.5 2.8-7 5.7-10.5 8.5-0.8 0.7-1.6 1.4-2.5 1.9-0.5 0.3-1.6 0.3-1.9 0-0.4-0.4-0.5-1.4-0.2-1.9 0.4-0.8 1-1.6 1.7-2.3 0.7-0.6 1.4-1.3 2.1-1.9 1.7-1.6 3.4-3.2 5.2-4.7 20-15.8 40.2-31.3 61.3-45.6 2.3-1.6 4.7-3.1 7.1-4.6 0.5-0.3 1-0.7 1.5-1 0.4-0.2 0.8-0.4 1.2-0.7 0.1 0.1 0.1 0.2 0.2 0.3s0.2 0.2 0.2 0.3zm7 13.4 0.6-0.6c-0.3-0.2-0.4-0.3-0.4-0.3-1.5 1.1-3 2.2-4.5 3.2-16.7 11.1-32.8 23-48.7 35.1-4.7 3.5-9.3 7.1-13.9 10.7-0.9 0.7-1.7 1.5-2.4 2.3-0.6 0.7-0.9 1.6-0.2 2.4 0.7 0.9 1.6 0.8 2.4 0.3 1.1-0.6 2.2-1.3 3.2-2.1 1.8-1.4 3.5-2.8 5.2-4.3 1.7-1.4 3.5-2.8 5.2-4.3 12.1-9.5 24.3-19 36.5-28.4l15-12c0.6-0.4 1.3-1.2 2-2z"
                    />
                  </svg>
                </figure>
                <div className="text-center" >
                  {/* Title */}
                  <div className="row position-relative z-index-9">
                    <div className="col-12 text-center mx-auto">
                      <h2 className="mb-0">{props.title}</h2>
                    </div>
                  </div>
                  {/* Form START */}
                <form className="row g-3" >

                  <div className="row ">
                    <div className="col-lg-10 col-xl-8 mx-auto text-center position-relative">
                      {/* SVG decoration */}
                      <figure className="position-absolute top-0 start-0 translate-middle ms-8">
                        <svg
                          style={{ enableBackground: "new 0 0 141.7 143.9" }}
                        >
                          <path
                            stroke="#F99D2B"
                            fill="#F99D2B"
                            d="M137.7,53.1c9.6,29.3,1.8,64.7-20.2,80.7s-58.1,12.6-83.5-5.8C8.6,109.5-6.1,76.1,2.4,48.7 C10.8,21.1,42.2-0.7,71.5,0S128.1,23.8,137.7,53.1z"
                          />
                        </svg>
                      </figure>
                      {/* SVG decoration */}
                      <figure className="position-absolute bottom-0 end-0 me-n9 rotate-193">
                        <svg width="297.5px" height="295.9px">
                          <path
                            stroke="#F99D2B"
                            fill="none"
                            strokeWidth={13}
                            d="M286.2,165.5c-9.8,74.9-78.8,128.9-153.9,120.4c-76-8.6-131.4-78.2-122.8-154.2C18.2,55.8,87.8,0.3,163.7,9"
                          />
                        </svg>
                      </figure>
                      {/* FAQ START */}
                      <div
                        className="accordion accordion-icon accordion-shadow mt-4 text-start position-relative"
                        id="accordionExample2"
                      >
                        {/* Item */}
                        <div className="accordion-item mb-3 ">
                          <h6
                            className="accordion-header font-base "
                            id="heading-1"
                          >
                            <button
                              className="accordion-button fw-bold rounded collapsed pe-5"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapse-1"
                              aria-expanded="true"
                              aria-controls="collapse-1"
                            >
                              Personal information
                            </button>
                          </h6>
                          {/* Body */}
                          <div
                            id="collapse-1"
                            className="accordion-collapse collapse show"
                            aria-labelledby="heading-1"
                            data-bs-parent="#accordionExample2"
                          >
                            <div className="accordion-body mt-3">
                            <div className="row g-4">
                              {/* First name */}
                              <div className="col-12">
                                <div className="row g-xl-0 align-items-center">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Student first name <span className="text-danger">*</span></h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <input type="text" className="form-control" id="firstName" />
                                  </div>
                                </div>
                              </div>
                              {/* Middle name */}
                              <div className="col-12">
                                <div className="row g-xl-0 align-items-center">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Student middle name <span className="text-danger">*</span></h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <input type="text" className="form-control" id="middleName" />
                                  </div>
                                </div>
                              </div>
                              {/* Last name */}
                              <div className="col-12">
                                <div className="row g-xl-0 align-items-center">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Student last name <span className="text-danger">*</span></h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <input type="text" className="form-control" id="lastName" />
                                  </div>
                                </div>
                              </div>
                              {/* Gender */}
                              <div className="col-12">
                                <div className="row g-xl-0 align-items-center">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Gender <span className="text-danger">*</span></h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <div className="d-flex">
                                      <div className="form-check radio-bg-light me-4">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                          Male
                                        </label>
                                      </div>
                                      <div className="form-check radio-bg-light">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                          Female
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Date of birth */}
                              <div className="col-12">
                                <div className="row g-xl-0 align-items-center">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Date of birth</h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <div className="row g-2 g-sm-4">
                                      <div className="col-4">
                                        <select className="form-select js-choice z-index-9 border-0 bg-light" aria-label=".form-select-sm">
                                          <option value>Date</option>
                                          <option>1</option>
                                          <option>2</option>
                                          <option>3</option>
                                          <option>4</option>
                                          <option>5</option>
                                          <option>6</option>
                                          <option>7</option>
                                          <option>8</option>
                                          <option>9</option>
                                          <option>10</option>
                                          <option>11</option>
                                          <option>12</option>
                                          <option>13</option>
                                          <option>14</option>
                                          <option>15</option>
                                          <option>16</option>
                                          <option>17</option>
                                          <option>18</option>
                                          <option>19</option>
                                          <option>20</option>
                                          <option>21</option>
                                          <option>22</option>
                                          <option>23</option>
                                          <option>24</option>
                                          <option>25</option>
                                          <option>26</option>
                                          <option>27</option>
                                          <option>28</option>
                                          <option>29</option>
                                          <option>30</option>
                                          <option>31</option>
                                        </select>
                                      </div>
                                      <div className="col-4">
                                        <select className="form-select js-choice z-index-9 border-0 bg-light" aria-label=".form-select-sm">
                                          <option value>Month</option>
                                          <option>Jan</option>
                                          <option>Feb</option>
                                          <option>Mar</option>
                                          <option>Apr</option>
                                          <option>Jun</option>
                                          <option>Jul</option>
                                          <option>Aug</option>
                                          <option>Sep</option>
                                          <option>Oct</option>
                                          <option>Nov</option>
                                          <option>Dec</option>
                                        </select>
                                      </div>
                                      <div className="col-4">
                                        <select className="form-select js-choice z-index-9 border-0 bg-light" aria-label=".form-select-sm">
                                          <option value>Year</option>
                                          <option>1990</option>
                                          <option>1991</option>
                                          <option>1992</option>
                                          <option>1993</option>
                                          <option>1994</option>
                                          <option>1995</option>
                                          <option>1996</option>
                                          <option>1997</option>
                                          <option>1998</option>
                                          <option>1999</option>
                                          <option>2000</option>
                                          <option>2001</option>
                                          <option>2002</option>
                                          <option>2003</option>
                                          <option>2004</option>
                                          <option>2005</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Email */}
                              <div className="col-12">
                                <div className="row g-xl-0 align-items-center">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Email <span className="text-danger">*</span></h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <input type="email" className="form-control" id="email" />
                                  </div>
                                </div>
                              </div>
                              {/* Phone number */}
                              <div className="col-12">
                                <div className="row g-xl-0 align-items-center">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Phone number <span className="text-danger">*</span></h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <input type="text" className="form-control" id="phoneNumber" />
                                  </div>
                                </div>
                              </div>
                              {/* Home address */}
                              <div className="col-12">
                                <div className="row g-xl-0">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Your address <span className="text-danger">*</span></h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <textarea className="form-control" rows={3} placeholder defaultValue={""} />
                                  </div>
                                </div>
                              </div>
                              {/* City */}
                              <div className="col-12">
                                <div className="row g-xl-0 align-items-center">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Select city <span className="text-danger">*</span></h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <select className="form-select js-choice z-index-9 rounded-3 border-0 bg-light" aria-label=".form-select-sm">
                                      <option value>Select city</option>
                                      <option>New york</option>
                                      <option>Mumbai</option>
                                      <option>Delhi</option>
                                      <option>London</option>
                                      <option>Los angeles</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              {/* State */}
                              <div className="col-12">
                                <div className="row g-xl-0 align-items-center">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Select state <span className="text-danger">*</span></h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <select className="form-select js-choice z-index-9 rounded-3 border-0 bg-light" aria-label=".form-select-sm">
                                      <option value>Select state</option>
                                      <option>Maharashtra</option>
                                      <option>California</option>
                                      <option>Florida</option>
                                      <option>Alaska</option>
                                      <option>Ohio</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              {/* Country */}
                              <div className="col-12">
                                <div className="row g-xl-0 align-items-center">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Select country <span className="text-danger">*</span></h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <select className="form-select js-choice z-index-9 rounded-3 border-0 bg-light" aria-label=".form-select-sm">
                                      <option value>Select country</option>
                                      <option>India</option>
                                      <option>Canada</option>
                                      <option>Japan</option>
                                      <option>America</option>
                                      <option>Dubai</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              {/* Zip code*/}
                              <div className="col-12">
                                <div className="row g-xl-0 align-items-center">
                                  <div className="col-lg-4">
                                    <h6 className="mb-lg-0">Zip code <span className="text-danger">*</span></h6>
                                  </div>
                                  <div className="col-lg-8">
                                    <input type="text" className="form-control" id="zipCode" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            </div>
                          </div>
                        </div>
                        {/* Item */}
                        <div className="accordion-item mb-3">
                          <h6
                            className="accordion-header font-base"
                            id="heading-2"
                          >
                            <button
                              className="accordion-button fw-bold rounded collapsed pe-5"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapse-2"
                              aria-expanded="false"
                              aria-controls="collapse-2"
                            >
                              Parent detail
                            </button>
                          </h6>
                          {/* Body */}
                          <div
                            id="collapse-2"
                            className="accordion-collapse collapse"
                            aria-labelledby="heading-2"
                            data-bs-parent="#accordionExample2"
                          >
                            <div className="accordion-body mt-3">
                              {/* Form START */}
                              <form className="row g-3 position-relative">
                                {/* Name */}
                                <div className="col-md-6 col-lg-12 col-xl-6">
                                  <label className="form-label">
                                    First name *
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-label="First name"
                                  />
                                </div>
                                {/* Last name */}
                                <div className="col-md-6 col-lg-12 col-xl-6">
                                  <label className="form-label">
                                    Last name *
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-label="Last name"
                                  />
                                </div>
                                {/* Email */}
                                <div className="col-md-6 col-lg-12 col-xl-6">
                                  <label className="form-label">Email *</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                  />
                                </div>
                                {/* Phone number */}
                                <div className="col-md-6 col-lg-12 col-xl-6">
                                  <label className="form-label">
                                    Phone number *
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                                {/* Select subject */}
                                <div className="col-12">
                                  <label className="form-label">
                                    Select subject
                                  </label>
                                  <select
                                    className="form-select js-choice z-index-9"
                                    aria-label=".form-select-sm"
                                  >
                                    <option value>Select subject</option>
                                    <option>Physics</option>
                                    <option>Chemistry</option>
                                    <option>History</option>
                                    <option>Language</option>
                                    <option>Marketing</option>
                                  </select>
                                </div>
                                {/* Comment */}
                                <div className="col-12">
                                  <label className="form-label">
                                    Message *
                                  </label>
                                  <textarea
                                    className="form-control"
                                    rows={3}
                                    defaultValue={""}
                                  />
                                </div>
                              </form>
                              {/* Form END */}
                            </div>
                          </div>
                        </div>
                        {/* Item */}
                        <div className="accordion-item mb-3">
                          <h6
                            className="accordion-header font-base"
                            id="heading-3"
                          >
                            <button
                              className="accordion-button fw-bold collapsed rounded pe-5"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapse-3"
                              aria-expanded="false"
                              aria-controls="collapse-3"
                            >
                              Education
                            </button>
                          </h6>
                          {/* Body */}
                          <div
                            id="collapse-3"
                            className="accordion-collapse collapse"
                            aria-labelledby="heading-3"
                            data-bs-parent="#accordionExample2"
                          >
                            <div className="accordion-body mt-3">
                              {/* Form START */}
                              <form className="row g-3 position-relative">
                                {/* Name */}
                                <div className="col-md-6 col-lg-12 col-xl-6">
                                  <label className="form-label">
                                    First name *
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-label="First name"
                                  />
                                </div>
                                {/* Last name */}
                                <div className="col-md-6 col-lg-12 col-xl-6">
                                  <label className="form-label">
                                    Last name *
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    aria-label="Last name"
                                  />
                                </div>
                                {/* Email */}
                                <div className="col-md-6 col-lg-12 col-xl-6">
                                  <label className="form-label">Email *</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                  />
                                </div>
                                {/* Phone number */}
                                <div className="col-md-6 col-lg-12 col-xl-6">
                                  <label className="form-label">
                                    Phone number *
                                  </label>
                                  <input type="text" className="form-control" />
                                </div>
                                {/* Select subject */}
                                <div className="col-12">
                                  <label className="form-label">
                                    Select subject
                                  </label>
                                  <select
                                    className="form-select js-choice z-index-9"
                                    aria-label=".form-select-sm"
                                  >
                                    <option value>Select subject</option>
                                    <option>Physics</option>
                                    <option>Chemistry</option>
                                    <option>History</option>
                                    <option>Language</option>
                                    <option>Marketing</option>
                                  </select>
                                </div>
                                {/* Comment */}
                                <div className="col-12">
                                  <label className="form-label">
                                    Message *
                                  </label>
                                  <textarea
                                    className="form-control"
                                    rows={3}
                                    defaultValue={""}
                                  />
                                </div>
                              </form>
                              {/* Form END */}
                            </div>
                          </div>
                        </div>
                        {/* Button */}
                        <div className="col-12 text-center mt-4">
                          <button
                            type="submit"
                            className="btn btn-primary mb-0"
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                      {/* FAQ END */}
                    </div>
                  </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Contact form END */}
          </div>
        </div>
      </section>
      {/* =======================
Contact form END */}
    </div>
  );
}

export default InscriptionCorsus;
