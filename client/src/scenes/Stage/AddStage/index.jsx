import React, { useState,useEffect } from 'react';
import SideBar from 'components/SideBar';
import TopBarBack from 'components/TopBarBack';
import Quill from 'quill';

function Index() {
    const [stageData, setStageData] = useState({
      titre: '',
      startDate: '',
      finishDate: '',
      description: '',
      imageStage: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setStageData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:3001/stage/createStage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(stageData)
        });
        
        const savedStage = await response.json();
  
        if (savedStage) {
          console.log("Stage added successfully:", savedStage);
          // Optionally, you can reset the form fields here
          setStageData({
            titre: '',
            startDate: '',
            finishDate: '',
            description: '',
            imageStage: ''
          });
        }
      } catch (error) {
        console.error("Error adding stage:", error);
      }
    };
    

    return (
        <div>
            <TopBarBack />
            <SideBar />
            <div>
                <section
                    className="py-0 bg-blue h-100px align-items-center d-flex h-200px rounded-0"
                    style={{
                        background:
                            "url(assets/images/pattern/04.png) no-repeat center center",
                        backgroundSize: "cover",
                    }}
                >
                    {/* Main banner background image */}
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                {/* Title */}
                                <h1 className="text-white">Submit a new Internship</h1>
                                <p className="text-white mb-0">
                                    Read our{" "}
                                    <a href="#" className="text-white">
                                        <u>"Before you create a course"</u>
                                    </a>{" "}
                                    article before submitting!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* =======================
        Page Banner END */}^

<div>
  <section>
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto text-center">
          {/* Content */}
          <p className="text-center">Use this interface to add a new Course to the portal. Once you are done adding the item it will be reviewed for quality. If approved, your course will appear for sale and you will be informed by email that your course has been accepted.</p>
        </div>
      </div>
      <div className="card bg-transparent border rounded-3 mb-5">
        <div id="" className="bs- -outline">
          {/* Card header */}
          <div className="card-header bg-light border-bottom px-lg-5">
            {/* Step Buttons START */}
            <div className="bs--header" role="tablist">
              {/* Step 1 */}
              <div className="step" data-target="#step-1">
                <div className="d-grid text-center align-items-center">
                  <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="trigger1" aria-controls="step-1">
                    <span className="bs--circle">1</span>
                  </button>
                  <h6 className="bs--label d-none d-md-block">Course details</h6>
                </div>
              </div>
              <div className="line" />
              {/* Step 2 */}
              <div className="step" data-target="#step-2">
                <div className="d-grid text-center align-items-center">
                  <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="trigger2" aria-controls="step-2">
                    <span className="bs--circle">2</span>
                  </button>
                  <h6 className="bs--label d-none d-md-block">Course media</h6>
                </div>
              </div>
              <div className="line" />
              {/* Step 3 */}
              <div className="step" data-target="#step-3">
                <div className="d-grid text-center align-items-center">
                  <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="trigger3" aria-controls="step-3">
                    <span className="bs--circle">3</span>
                  </button>
                  <h6 className="bs--label d-none d-md-block">Curriculum</h6>
                </div>
              </div>
              <div className="line" />
              {/* Step 4 */}
              <div className="step" data-target="#step-4">
                <div className="d-grid text-center align-items-center">
                  <button type="button" className="btn btn-link step-trigger mb-0" role="tab" id="trigger4" aria-controls="step-4">
                    <span className="bs--circle">4</span>
                  </button>
                  <h6 className="bs--label d-none d-md-block">Additional information</h6>
                </div>
              </div>
            </div>
            {/* Step Buttons END */}
          </div>
          {/* Card body START */}
          <div className="card-body">
            {/* Step content START */}
            <div className="bs--content">
              <form onsubmit="return false">
                {/* Step 1 content START */}
                <div id="step-1" role="tabpanel" className="content fade" aria-labelledby="trigger1">
                  {/* Title */}
                  <h4>Course details</h4>
                  <hr /> {/* Divider */}
                  {/* Basic information START */}
                  <div className="row g-4">
                    {/* Course title */}
                    <div className="col-12">
                      <label className="form-label">Course title</label>
                      <input className="form-control" type="text" placeholder="Enter course title" />
                    </div>
                    {/* Short description */}
                    <div className="col-12">
                      <label className="form-label">Short description</label>
                      <textarea className="form-control" rows={2} placeholder="Enter keywords" defaultValue={""} />
                    </div>
                    {/* Course category */}
                    <div className="col-md-6">
                      <label className="form-label">Course category</label>
                      <select className="form-select  border-0 z-index-9 bg-transparent" aria-label=".form-select-sm" data-search-enabled="true">
                        <option value>Select category</option>
                        <option>Engineer</option>
                        <option>Medical</option>
                        <option>Information technology</option>
                        <option>Finance</option>
                        <option>Marketing</option>
                      </select>
                    </div>
                    {/* Course level */}
                    <div className="col-md-6">
                      <label className="form-label">Course level</label>
                      <select className="form-select  border-0 z-index-9 bg-transparent" aria-label=".form-select-sm" data-search-enabled="false" data-remove-item-button="true">
                        <option value>Select course level</option>
                        <option>All level</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advance</option>
                      </select>
                    </div>
                    {/* Language */}
                    <div className="col-md-6">
                      <label className="form-label">Language</label>
                      <select className="form-select  border-0 z-index-9 bg-transparent" multiple="multiple" aria-label=".form-select-sm" data-max-item-count={3} data-remove-item-button="true">
                        <option value>Select language</option>
                        <option>English</option>
                        <option>German</option>
                        <option>French</option>
                        <option>Hindi</option>
                      </select>
                    </div>
                    {/* Switch */}
                    <div className="col-md-6 d-flex align-items-center justify-content-start mt-5">
                      <div className="form-check form-switch form-check-md">
                        <input className="form-check-input" type="checkbox" id="checkPrivacy1" />
                        <label className="form-check-label" htmlFor="checkPrivacy1">Check this for featured course</label>
                      </div>
                    </div>
                    {/* Course time */}
                    <div className="col-md-6">
                      <label className="form-label">Course time</label>
                      <input className="form-control" type="text" placeholder="Enter course time" />
                    </div>
                    {/* Total lecture */}
                    <div className="col-md-6">
                      <label className="form-label">Total lecture</label>
                      <input className="form-control" type="text" placeholder="Enter total lecture" />
                    </div>
                    {/* Course price */}
                    <div className="col-md-6">
                      <label className="form-label">Course price</label>
                      <input type="text" className="form-control" placeholder="Enter course price" />
                    </div>
                    {/* Course discount */}
                    <div className="col-md-6">
                      <label className="form-label">Discount price</label>
                      <input className="form-control" type="text" placeholder="Enter discount" />
                      <div className="col-12 mt-1 mb-0">
                        <div className="form-check small mb-0">
                          <input className="form-check-input" type="checkbox" id="checkBox1" />
                          <label className="form-check-label" htmlFor="checkBox1">
                            Enable this Discount
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Course description */}
                    <div className="col-12">
                      <label className="form-label">Add description</label>
                      {/* Editor toolbar */}
                      <div className="bg-light border border-bottom-0 rounded-top py-3" id="toolbar">
                        <span className="ql-formats">
                          <select className="ql-size" />
                        </span>
                        <span className="ql-formats">
                          <button className="ql-bold" />
                          <button className="ql-italic" />
                          <button className="ql-underline" />
                          <button className="ql-strike" />
                        </span>
                        <span className="ql-formats">
                          <select className="ql-color" />
                          <select className="ql-background" />
                        </span>
                        <span className="ql-formats">
                          <button className="ql-code-block" />
                        </span>
                        <span className="ql-formats">
                          <button className="ql-list" value="ordered" />
                          <button className="ql-list" value="bullet" />
                          <button className="ql-indent" value={-1} />
                          <button className="ql-indent" value={+1} />
                        </span>
                        <span className="ql-formats">
                          <button className="ql-link" />
                          <button className="ql-image" />
                        </span>
                        <span className="ql-formats">
                          <button className="ql-clean" />
                        </span>
                      </div>
                      {/* Main toolbar */}
                      <div className="bg-body border rounded-bottom h-400px overflow-hidden" id="editor">
                        <br />
                        <h1>Quill Rich Text Editor</h1>
                        <br />
                                      </div>
                    </div>	
                    {/* Step 1 button */}
                    <div className="d-flex justify-content-end mt-3">
                      <button className="btn btn-primary next-btn mb-0">Next</button>
                    </div>
                  </div>
                  {/* Basic information START */}
                </div>
                {/* Step 1 content END */}
                {/* Step 2 content START */}
                <div id="step-2" role="tabpanel" className="content fade" aria-labelledby="trigger2">
                  {/* Title */}
                  <h4>Course media</h4>
                  <hr /> {/* Divider */}
                  <div className="row">
                    {/* Upload image START */}
                    <div className="col-12">
                      <div className="text-center justify-content-center align-items-center p-4 p-sm-5 border border-2 border-dashed position-relative rounded-3">
                        {/* Image */}
                        <img src="assets/images/element/gallery.svg" className="h-50px" alt />
                        <div>
                          <h6 className="my-2">Upload course image here, or<a href="#!" className="text-primary"> Browse</a></h6>
                          <label style={{cursor: 'pointer'}}>
                            <span> 
                              <input className="form-control stretched-link" type="file" name="my-image" id="image" accept="image/gif, image/jpeg, image/png" />
                            </span>
                          </label>
                          <p className="small mb-0 mt-2"><b>Note:</b> Only JPG, JPEG and PNG. Our suggested dimensions are 600px * 450px. Larger image will be cropped to 4:3 to fit our thumbnails/previews.</p>
                        </div>	
                      </div>
                      {/* Button */}
                      <div className="d-sm-flex justify-content-end mt-2">
                        <button type="button" className="btn btn-sm btn-danger-soft mb-3">Remove image</button>
                      </div>
                    </div>
                    {/* Upload image END */}
                    {/* Upload video START */}
                    <div className="col-12">
                      <h5>Upload video</h5>
                      {/* Input */}
                      <div className="col-12 mt-4 mb-5">
                        <label className="form-label">Video URL</label>
                        <input className="form-control" type="text" placeholder="Enter video url" />
                      </div>
                      <div className="position-relative my-4">
                        <hr />
                        <p className="small position-absolute top-50 start-50 translate-middle bg-body px-3 mb-0">Or</p>
                      </div>
                      <div className="col-12">
                        <label className="form-label">Upload video</label>
                        <div className="input-group mb-3">
                          <input type="file" className="form-control" id="inputGroupFile01" />
                          <label className="input-group-text">.mp4</label>
                        </div>
                        <div className="input-group mb-3">
                          <input type="file" className="form-control" id="inputGroupFile02" />
                          <label className="input-group-text">.WebM</label>
                        </div>
                        <div className="input-group mb-3">
                          <input type="file" className="form-control" id="inputGroupFile03" />
                          <label className="input-group-text">.OGG</label>
                        </div>
                      </div>
                      {/* Preview */}
                      <h5 className="mt-4">Video preview</h5>
                      <div className="position-relative">
                        {/* Image */}
                        <img src="assets/images/about/04.jpg" className="rounded-4" alt />
                        <div className="position-absolute top-50 start-50 translate-middle">
                          {/* Video link */}
                          <a href="https://www.youtube.com/embed/tXHviS-4ygo" className="btn btn-lg text-danger btn-round btn-white-shadow mb-0" data-glightbox data-gallery="video-tour">
                            <i className="fas fa-play" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Upload video END */}
                    {/* Step 2 button */}
                    <div className="d-flex justify-content-between mt-3">
                      <button className="btn btn-secondary prev-btn mb-0">Previous</button>
                      <button className="btn btn-primary next-btn mb-0">Next</button>
                    </div>
                  </div>
                </div>
                {/* Step 2 content END */}
                {/* Step 3 content START */}
                <div id="step-3" role="tabpanel" className="content fade" aria-labelledby="trigger3">
                  {/* Title */}
                  <h4>Curriculum</h4>
                  <hr /> {/* Divider */}
                  <div className="row">
                    {/* Add lecture Modal button */}
                    <div className="d-sm-flex justify-content-sm-between align-items-center mb-3">
                      <h5 className="mb-2 mb-sm-0">Upload Lecture</h5>
                      <a href="#" className="btn btn-sm btn-primary-soft mb-0" data-bs-toggle="modal" data-bs-target="#addLecture"><i className="bi bi-plus-circle me-2" />Add Lecture</a>
                    </div>
                    {/* Edit lecture START */}
                    <div className="accordion accordion-icon accordion-bg-light" id="accordionExample2">
                      {/* Item START */}
                      <div className="accordion-item mb-3">
                        <h6 className="accordion-header font-base" id="heading-1">
                          <button className="accordion-button fw-bold rounded d-inline-block collapsed d-block pe-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-1" aria-expanded="false" aria-controls="collapse-1">
                            Introduction of Digital Marketing 
                          </button>
                        </h6>
                        <div id="collapse-1" className="accordion-collapse collapse show" aria-labelledby="heading-1" data-bs-parent="#accordionExample2">
                          {/* Topic START */}
                          <div className="accordion-body mt-3">
                            {/* Video item START */}
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="position-relative">
                                <a href="#" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"><i className="fas fa-play" /></a>
                                <span className="ms-2 mb-0 h6 fw-light">Introduction</span>
                              </div>
                              {/* Edit and cancel button */}
                              <div>
                                <a href="#" className="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"><i className="far fa-fw fa-edit" /></a>
                                <button className="btn btn-sm btn-danger-soft btn-round mb-0"><i className="fas fa-fw fa-times" /></button>
                              </div>
                            </div>
                            {/* Divider */}
                            <hr />
                            {/* Video item END */}
                            {/* Video item START */}
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="position-relative">
                                <a href="#" className="btn btn-danger-soft btn-round btn-sm mb-0 stretched-link position-static"><i className="fas fa-play" /></a>
                                <span className="ms-2 mb-0 h6 fw-light">What is Digital Marketing</span>
                              </div>
                              {/* Edit and cancel button */}
                              <div>
                                <a href="#" className="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"><i className="far fa-fw fa-edit" /></a>
                                <button className="btn btn-sm btn-danger-soft btn-round mb-0"><i className="fas fa-fw fa-times" /></button>
                              </div>
                            </div>
                            {/* Divider */}
                            <hr />
                            {/* Video item END */}
                            {/* Add topic */}
                            <a href="#" className="btn btn-sm btn-dark mb-0" data-bs-toggle="modal" data-bs-target="#addTopic"><i className="bi bi-plus-circle me-2" />Add topic</a>
                          </div>
                          {/* Topic END */}
                        </div>
                      </div>
                      {/* Item END */}
                      {/* Item START */}
                      <div className="accordion-item mb-3">
                        <h6 className="accordion-header font-base" id="heading-2">
                          <button className="accordion-button fw-bold rounded d-inline-block collapsed d-block pe-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                            Customer Life cycle
                          </button>
                        </h6>
                        <div id="collapse-2" className="accordion-collapse collapse" aria-labelledby="heading-2" data-bs-parent="#accordionExample2">
                          <div className="accordion-body mt-3">
                            {/* Add topic */}
                            <a href="#" className="btn btn-sm btn-dark mb-0" data-bs-toggle="modal" data-bs-target="#addTopic">
                              <i className="bi bi-plus-circle me-2" />Add topic
                            </a>	
                          </div>
                        </div>
                      </div>
                      {/* Item END */}
                      {/* Item START */}
                      <div className="accordion-item mb-3">
                        <h6 className="accordion-header font-base" id="heading-3">
                          <button className="accordion-button fw-bold collapsed rounded d-block pe-5" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
                            How much should I offer the sellers? 
                          </button>
                        </h6>
                        {/* Body */}
                        <div id="collapse-3" className="accordion-collapse collapse" aria-labelledby="heading-3" data-bs-parent="#accordionExample2">
                          <div className="accordion-body mt-3">
                            {/* Add topic */}
                            <a href="#" className="btn btn-sm btn-dark mb-0" data-bs-toggle="modal" data-bs-target="#addTopic">
                              <i className="bi bi-plus-circle me-2" />Add topic
                            </a>
                          </div>
                        </div>
                      </div>	
                      {/* Item END */}
                    </div>
                    {/* Edit lecture END */}
                    {/* Step 3 button */}
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-secondary prev-btn mb-0">Previous</button>
                      <button className="btn btn-primary next-btn mb-0">Next</button>
                    </div>
                  </div>
                </div>
                {/* Step 3 content END */}
                {/* Step 4 content START */}
                <div id="step-4" role="tabpanel" className="content fade" aria-labelledby="trigger4">
                  {/* Title */}
                  <h4>Additional information</h4>
                  <hr /> {/* Divider */}
                  <div className="row g-4">
                    {/* Edit faq START */}
                    <div className="col-12">
                      <div className="bg-light border rounded p-2 p-sm-4">
                        <div className="d-sm-flex justify-content-sm-between align-items-center mb-3">
                          <h5 className="mb-2 mb-sm-0">Upload FAQs</h5>
                          <a href="#" className="btn btn-sm btn-primary-soft mb-0" data-bs-toggle="modal" data-bs-target="#addQuestion"><i className="bi bi-plus-circle me-2" />Add Question</a>
                        </div>
                        <div className="row g-4">
                          <div className="col-12">
                            <div className="bg-body p-3 p-sm-4 border rounded">
                              {/* Item 1 */}
                              <div className="d-sm-flex justify-content-sm-between align-items-center mb-2">
                                {/* Question */}
                                <h6 className="mb-0">How Digital Marketing Work?</h6>
                                {/* Button */}
                                <div className="align-middle">
                                  <a href="#" className="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"><i className="far fa-fw fa-edit" /></a>
                                  <button className="btn btn-sm btn-danger-soft btn-round mb-0"><i className="fas fa-fw fa-times" /></button>
                                </div>
                              </div>
                              {/* Content */}
                              <p>Comfort reached gay perhaps chamber his six detract besides add. Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. At weddings believed laughing although the material does the exercise of. Up attempt offered ye civilly so sitting to. She new course gets living within Elinor joy. She rapturous suffering concealed.</p>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="bg-body p-4 border rounded">
                              {/* Item 2 */}
                              <div className="d-sm-flex justify-content-sm-between align-items-center mb-2">
                                {/* Question */}
                                <h6 className="mb-0">How Digital Marketing Work?</h6>
                                {/* Button */}
                                <div className="align-middle">
                                  <a href="#" className="btn btn-sm btn-success-soft btn-round me-1 mb-1 mb-md-0"><i className="far fa-fw fa-edit" /></a>
                                  <button className="btn btn-sm btn-danger-soft btn-round mb-0"><i className="fas fa-fw fa-times" /></button>
                                </div>
                              </div>
                              {/* Content */}
                              <p>Comfort reached gay perhaps chamber his six detract besides add. Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. At weddings believed laughing although the material does the exercise of. Up attempt offered ye civilly so sitting to. She new course gets living within Elinor joy. She rapturous suffering concealed.</p>
                            </div>	
                          </div>
                        </div>
                      </div>	
                    </div>
                    {/* Edit faq END */}
                    {/* Tags START */}
                    <div className="col-12">
                      <div className="bg-light border rounded p-4">
                        <h5 className="mb-0">Tags</h5>
                        {/* Comment */}
                        <div className="mt-3">
                          <input type="text" className="form-control mb-0" data-placeholder="true" data-placeholder-val="Enter tags" data-max-item-count={14} data-remove-item-button="true" />
                          <span className="small">Maximum of 14 keywords. Keywords should all be in lowercase and separated by commas. e.g. javascript, react, marketing</span>
                        </div>
                      </div>
                    </div>
                    {/* Tags START */}
                    {/* Reviewer START */}
                    <div className="col-12">
                      <div className="bg-light border rounded p-4">
                        <h5 className="mb-0">Message to a reviewer</h5>
                        {/* Comment */}
                        <div className="mt-3">
                          <textarea className="form-control" rows={4} placeholder="Write a message" spellCheck="false" defaultValue={""} />
                          <div className="form-check mb-0 mt-2">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">
                              Any images, sounds, or other assets that are not my own work, have been appropriately licensed for use in the file preview or main course. Other than these items, this work is entirely my own and I have full rights to sell it here.
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Reviewer START */}
                    {/* Step 4 button */}
                    <div className="d-md-flex justify-content-between align-items-start mt-4">
                      <button className="btn btn-secondary prev-btn mb-2 mb-md-0">Previous</button>
                      <button className="btn btn-light me-auto ms-md-2 mb-2 mb-md-0">Preview Course</button>
                      <div className="text-md-end">
                        <a href="course-added.html" className="btn btn-success mb-2 mb-sm-0">Submit a Course</a>
                        <p className="mb-0 small mt-1">Once you click "Submit a Course", your course will be uploaded and marked as pending for review.</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Step 4 content END */}
              </form>
            </div>
          </div>
          {/* Card body END */}
        </div>
      </div>
    </div>
  </section>
  {/* =======================
Steps END */}<br />
</div>


            <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

            </div>
        </div>
    );
}

export default Index;
