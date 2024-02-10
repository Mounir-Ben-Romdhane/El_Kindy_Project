import BannerStart from 'components/BannerStart'
import SideBar from 'components/SideBar'
import TopBarBack from 'components/TopBarBack'
import React from 'react'

function index() {
  return (
    <div>
      <SideBar />
      <main>
       {/* Page content START */}
       <div className="page-content">
          <TopBarBack />

          {/* Page main content START */}
          <div className="page-content-wrapper border">

              {/* =======================
              Page Banner START */}
                <BannerStart 
                  title= "Submit a new Course"
                  description= "Read our Before you create a course article before submitting!"
                />
              {/* =======================
              Page Banner END */}
              <div class="card bg-transparent border rounded-3 mt-4">
                      {/* Card header */}
                <div className="card-header bg-light border-bottom px-lg-3">
                  {/* Step Buttons START */}
                    {/* Step 1 */}
                      <div className="">
                      <h2 className="p-2 " style={{color:"#1d3b53"}}>Course details</h2>
                      </div>
              </div>

            <form >
              {/* Step 1 content START */}
              <div className="m-4">
                {/* Title */}
                
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
                    <select className="form-select border-0 z-index-9 bg-transparent" aria-label=".form-select-sm" data-search-enabled="false" data-remove-item-button="true">
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
                  {/* Upload image START */}
                <div className="col-12">
                  <div className="text-center justify-content-center align-items-center mx-5 my-5 p-sm-5 border border-2 border-dashed position-relative rounded-3">
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
                  
                  
                </div>
                

                {/* Step 4 button */}
                <div className="d-md-flex justify-content-end align-items-start mt-4">
                  <div className="text-md-end">
                    <a href="course-added.html" className="btn btn-success mb-2 mb-sm-0">Submit a Course</a>
                    <p className="mb-0 small mt-1">Once you click "Submit a Course", your course will be uploaded and marked as pending for review.</p>
                  </div>
                </div>

              </div>
              
            </form>
            </div>


          </div>
        </div>
      </main>
    </div>
  )
}

export default index