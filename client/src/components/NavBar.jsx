import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLogout } from '../state'
import { useSelector } from "react-redux";
import { loadScripts } from '../scriptLoader';

function NavBar() {

  const accessToken = useSelector((state) => state.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(
      setLogout()
  );

  navigate("/");
  }

  const scriptsLoaded = useRef(false);

  useEffect(() => {
    const scripts = [
      //'/assets/js/functions.js',
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

 

  const handleSignIn = () => {
  
  navigate("/sign-in")
  }


  

  return (


    

    <div>
     {/* Header START */}
<header className="navbar-light bg-light navbar-sticky header-static">
  {/* Logo Nav START */}
  <nav className="navbar navbar-expand-xl">
    <div className="container">
      {/* Logo START */}

      <a className="navbar-brand" href="index.html">
        <img className="light-mode-item navbar-brand-item" src="/assets/images/logo/logo.png" style={{ width: '150px', height: '60px' }} alt="logo" />
        <img className="dark-mode-item navbar-brand-item" src="/assets/images/logo/logo.png" style={{ width: '150px', height: '60px' }} alt="logo" />

      </a>
      {/* Logo END */}
      {/* Responsive navbar toggler */}
      <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-animation">
          <span />
          <span />
          <span />
        </span>
      </button>
      {/* Main navbar START */}
      <div className="navbar-collapse w-100 collapse" id="navbarCollapse">
        {/* Nav Main menu START */}
        <ul className="navbar-nav navbar-nav-scroll mx-auto">
          {/* Nav item 4 Component*/}
          <li className="nav-item "><a className="nav-link active" href="docs/alerts.html">Home</a></li>
          {/* Nav item 1 Demos */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle " href="#" id="demoMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Corsus</a>
            <ul className="dropdown-menu" aria-labelledby="demoMenu">
              <li> <a className="dropdown-item" href="index.html">Home Default</a></li>
              <li> <a className="dropdown-item" href="index-2.html">Home Education</a></li>
              <li> <a className="dropdown-item active" href="index-3.html">Home Academy</a></li>
              <li> <a className="dropdown-item" href="index-4.html">Home Course</a></li>
              <li> <a className="dropdown-item" href="index-5.html">Home University</a></li>
              <li> <a className="dropdown-item" href="index-6.html">Home Kindergarten</a></li>
              <li> <a className="dropdown-item" href="index-7.html">Home Landing</a></li>
              <li> <a className="dropdown-item" href="index-8.html">Home Tutor</a></li>
              <li> <a className="dropdown-item" href="index-9.html">Home School <span className="badge bg-success ms-2 smaller">New</span></a></li>
              <li> <a className="dropdown-item" href="index-10.html">Home Abroad <span className="badge bg-success ms-2 smaller">New</span></a></li>
              <li> <hr className="dropdown-divider" /></li>
              <li> <a className="dropdown-item" href="request-demo.html">Request a demo</a></li>
              <li> <a className="dropdown-item" href="book-class.html">Book a Class</a></li>
              <li> <a className="dropdown-item" href="request-access.html">Free Access</a></li>
              <li> <a className="dropdown-item" href="university-admission-form.html">Admission Form</a></li>
            </ul>
          </li>
          {/* Nav item 2 Pages */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="pagesMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
            <ul className="dropdown-menu" aria-labelledby="pagesMenu">
              {/* Dropdown submenu */}
              <li className="dropdown-submenu dropend">
                <a className="dropdown-item dropdown-toggle" href="#">Course</a>
                <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                  <li> <a className="dropdown-item" href="course-categories.html">Course Categories <span className="badge bg-success ms-2 smaller">New</span></a></li>
                  <li> <hr className="dropdown-divider" /></li>
                  <li> <a className="dropdown-item" href="course-grid.html">Course Grid Classic</a></li>
                  <li> <a className="dropdown-item" href="course-grid-2.html">Course Grid Minimal</a></li>
                  <li> <hr className="dropdown-divider" /></li>
                  <li> <a className="dropdown-item" href="course-list.html">Course List Classic</a></li>
                  <li> <a className="dropdown-item" href="course-list-2.html">Course List Minimal</a></li>
                  <li> <hr className="dropdown-divider" /></li>
                  <li> <a className="dropdown-item" href="course-detail.html">Course Detail Classic</a></li>
                  <li> <a className="dropdown-item" href="course-detail-min.html">Course Detail Minimal</a></li>
                  <li> <a className="dropdown-item" href="course-detail-adv.html">Course Detail Advance</a></li>
                  <li> <a className="dropdown-item" href="course-video-player.html">Course Full Screen Video</a></li>
                </ul>
              </li>
              {/* Dropdown submenu */}
              <li className="dropdown-submenu dropend">
                <a className="dropdown-item dropdown-toggle" href="#">About</a>
                <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                  <li> <a className="dropdown-item" href="about.html">About Us</a></li>
                  <li> <a className="dropdown-item" href="contact-us.html">Contact Us</a></li>
                  <li> <a className="dropdown-item" href="blog-grid.html">Blog Grid</a></li>
                  <li> <a className="dropdown-item" href="blog-masonry.html">Blog Masonry</a></li>
                  <li> <a className="dropdown-item" href="blog-detail.html">Blog Detail</a></li>
                  <li> <a className="dropdown-item" href="pricing.html">Pricing</a></li>
                </ul>
              </li>
              <li> <a className="dropdown-item" href="instructor-list.html">Instructor List</a></li>
              <li> <a className="dropdown-item" href="instructor-single.html">Instructor Single</a></li>
              <li> <a className="dropdown-item" href="become-instructor.html">Become an Instructor</a></li>
              <li> <a className="dropdown-item" href="abroad-single.html">Abroad Single <span className="badge bg-success ms-2 smaller">New</span></a></li>
              {/* Dropdown submenu */}
              <li className="dropdown-submenu dropend">
                <a className="dropdown-item dropdown-toggle" href="#">Shop
                  <span className="badge bg-success ms-2 smaller">New</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                  <li> <a className="dropdown-item" href="shop.html">Shop grid</a></li>
                  <li> <a className="dropdown-item" href="shop-product-detail.html">Product detail</a></li>
                </ul>
              </li>
              {/* Dropdown submenu */}
              <li className="dropdown-submenu dropend">
                <a className="dropdown-item dropdown-toggle" href="#">Help
                  <span className="badge bg-success ms-2 smaller">New</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                  <li> <a className="dropdown-item" href="help-center.html">Help Center</a></li>
                  <li> <a className="dropdown-item" href="help-center-detail.html">Help Center Single</a></li>
                </ul>
              </li>
              {/* Dropdown submenu */}
              <li className="dropdown-submenu dropend">
                <a className="dropdown-item dropdown-toggle" href="#">Authentication</a>
                <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                  <li> <a className="dropdown-item" href="sign-in.html">Sign In</a></li>
                  <li> <a className="dropdown-item" href="sign-up.html">Sign Up</a></li>
                  <li> <a className="dropdown-item" href="forgot-password.html">Forgot Password</a></li>
                </ul>
              </li>
              <li> <a className="dropdown-item" href="faq.html">FAQs</a></li>
              <li> <a className="dropdown-item" href="error-404.html">Error 404</a></li>
              <li> <a className="dropdown-item" href="coming-soon.html">Coming Soon</a></li>
              <li> <a className="dropdown-item" href="cart.html">Cart</a></li>
              <li> <a className="dropdown-item" href="checkout.html">Checkout</a></li>
              <li> <a className="dropdown-item" href="empty-cart.html">Empty Cart</a></li>
              <li> <a className="dropdown-item" href="wishlist.html">Wishlist</a></li>
            </ul>
          </li>

          {/* Nav item 3 Account */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="accounntMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Accounts</a>
            <ul className="dropdown-menu" aria-labelledby="accounntMenu">
              {/* Dropdown submenu */}
              <li className="dropdown-submenu dropend">
                <a className="dropdown-item dropdown-toggle" href="#"><i className="fas fa-user-tie fa-fw me-1" />Instructor</a>
                <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                  <li> <a className="dropdown-item" href="/dashbordTeacher"><i className="bi bi-grid-fill fa-fw me-1" />Dashboard</a> </li>
                  <li> <a className="dropdown-item" href="instructor-create-course.html"><i className="bi bi-basket-fill fa-fw me-1" />Courses</a> </li>
                  <li> <a className="dropdown-item" href="instructor-create-course.html"><i className="bi bi-file-earmark-plus-fill fa-fw me-1" />Create Course</a> </li>
                  <li> <a className="dropdown-item" href="course-added.html"><i className="bi bi-file-check-fill fa-fw me-1" />Course Added</a> </li>
                  <li> <a className="dropdown-item" href="instructor-quiz.html"><i className="bi bi-question-diamond fa-fw me-1" />Quiz <span className="badge bg-success ms-2 smaller">New</span></a> </li>
                  <li> <a className="dropdown-item" href="instructor-earning.html"><i className="fas fa-chart-line fa-fw me-1" />Earnings</a> </li>
                  <li> <a className="dropdown-item" href="instructor-studentlist.html"><i className="fas fa-user-graduate fa-fw me-1" />Students</a> </li>
                  <li> <a className="dropdown-item" href="instructor-order.html"><i className="bi bi-cart-check-fill fa-fw me-1" />Orders</a> </li>
                  <li> <a className="dropdown-item" href="instructor-review.html"><i className="bi bi-star-fill fa-fw me-1" />Reviews</a> </li>
                  <li> <a className="dropdown-item" href="instructor-payout.html"><i className="fas fa-wallet fa-fw me-1" />Payout</a> </li>
                </ul>
              </li>
              {/* Dropdown submenu */}
              <li className="dropdown-submenu dropend">
                <a className="dropdown-item dropdown-toggle" href="#"><i className="fas fa-user-graduate fa-fw me-1" />Student</a>
                <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                  <li> <a className="dropdown-item" href="/dashbordStudent"><i className="bi bi-grid-fill fa-fw me-1" />Dashboard</a> </li>
                  <li> <a className="dropdown-item" href="student-subscription.html"><i className="bi bi-card-checklist fa-fw me-1" />My Subscriptions</a> </li>
                  <li> <a className="dropdown-item" href="student-course-list.html"><i className="bi bi-basket-fill fa-fw me-1" />Courses</a> </li>
                  <li> <a className="dropdown-item" href="student-course-resume.html"><i className="far fa-fw fa-file-alt me-1" />Course Resume <span className="badge bg-success ms-2 smaller">New</span></a> </li>
                  <li> <a className="dropdown-item" href="student-quiz.html"><i className="bi bi-question-diamond fa-fw me-1" />Quiz <span className="badge bg-success ms-2 smaller">New</span></a> </li>
                  <li> <a className="dropdown-item" href="student-payment-info.html"><i className="bi bi-credit-card-2-front-fill fa-fw me-1" />Payment Info</a> </li>
                  <li> <a className="dropdown-item" href="student-bookmark.html"><i className="fas bi-cart-check-fill fa-fw me-1" />Wishlist</a> </li>
                </ul>
              </li>
              <li> <a className="dropdown-item" href="admin-dashboard.html"><i className="fas fa-user-cog fa-fw me-1" />Admin</a> </li>
              <li> <hr className="dropdown-divider" /></li>
              <li> <a className="dropdown-item" href="instructor-edit-profile.html"><i className="fas fa-fw fa-edit me-1" />Edit Profile</a> </li>
              <li> <a className="dropdown-item" href="instructor-setting.html"><i className="fas fa-fw fa-cog me-1" />Settings</a> </li>
              <li> <a className="dropdown-item" href="instructor-delete-account.html"><i className="fas fa-fw fa-trash-alt me-1" />Delete Profile</a> </li>
              <li> <hr className="dropdown-divider" /></li>
              {/* Dropdown Level */}
              <li className="dropdown-submenu dropend">
                <a className="dropdown-item dropdown-toggle" href="#">Dropdown levels</a>
                <ul className="dropdown-menu dropdown-menu-start" data-bs-popper="none">
                  {/* dropdown submenu open right */}
                  <li className="dropdown-submenu dropend">
                    <a className="dropdown-item dropdown-toggle" href="#">Dropdown (end)</a>
                    <ul className="dropdown-menu" data-bs-popper="none">
                      <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                      <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                    </ul>
                  </li>
                  <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                  {/* dropdown submenu open left */}
                  <li className="dropdown-submenu dropstart">
                    <a className="dropdown-item dropdown-toggle" href="#">Dropdown (start)</a>
                    <ul className="dropdown-menu dropdown-menu-end" data-bs-popper="none">
                      <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                      <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                    </ul>
                  </li>
                  <li> <a className="dropdown-item" href="#">Dropdown item</a> </li>
                </ul>
              </li>
            </ul>
          </li>

          {/* Nav item 4 Component*/}
          <li className="nav-item "><a className="nav-link" href="docs/alerts.html">Témoignags</a></li>
          {/* Nav item 4 Component*/}
          <li className="nav-item "><a className="nav-link" href="docs/alerts.html">Contact</a></li>
          
        </ul>
        {/* Nav Main menu END */}
        {/* Nav Search START */}
        <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center">
          <div className="nav-item w-100">
            <form className="position-relative">
              <input className="form-control pe-5 bg-transparent" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn bg-transparent px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit"><i className="fas fa-search fs-6 " /></button>
            </form>
          </div>
        </div>
        {/* Nav Search END */}
      </div>
      {/* Main navbar END */}
      {/* Profile START */}
      {accessToken ? <div className="dropdown ms-1 ms-lg-0">
        <a className="avatar avatar-sm p-0" href="#" id="profileDropdown" role="button" data-bs-auto-close="outside" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">

          <img className="avatar-img rounded-circle" src={accessToken?.picturePath} alt="avatar" />

        </a>
        <ul className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3" aria-labelledby="profileDropdown">
          {/* Profile info */}
          <li className="px-3">
            <div className="d-flex align-items-center">
              {/* Avatar */}
              <div className="avatar me-3">

                <img className="avatar-img rounded-circle shadow" src={accessToken?.picturePath} alt="avatar" />

              </div>
              <div>
                <a className="h6 mt-2 mt-sm-0" href="#">
                  {accessToken?.firstName} {accessToken?.lastName}
                </a>
                <p className="small m-0">{accessToken?.email}</p>
              </div>
            </div>
            <hr />
          </li>
          {/* Links */}
          <li><a className="dropdown-item" href="#"><i className="bi bi-person fa-fw me-2" />Edit Profile</a></li>
          <li><a className="dropdown-item" href="#"><i className="bi bi-gear fa-fw me-2" />Account Settings</a></li>
          <li><a className="dropdown-item" href="#"><i className="bi bi-info-circle fa-fw me-2" />Help</a></li>
          <li><a
                className="dropdown-item bg-danger-soft-hover"
                onClick={logoutHandler}
              >
                <i className="bi bi-power fa-fw me-2" />
                Sign Out
              </a></li>
          <li> <hr className="dropdown-divider" /></li>
          {/* Dark mode switch START */}
          <li>
            <div className="modeswitch-wrap" id="darkModeSwitch">
              <div className="modeswitch-item">
                <div className="modeswitch-icon" />
              </div>
              <span>Dark mode</span>
            </div>
          </li> 
          {/* Dark mode switch END */}
        </ul>
      </div> :
			<div class="navbar-nav">
				<button class="btn btn-sm btn-primary mb-0" onClick={handleSignIn}><i class="bi bi-power me-2"></i>Sign In</button>
			</div>
      }
      
      {/* Profile START */}
    </div>
  </nav>
  {/* Logo Nav END */}
</header>

{/* Header END */}
</div>

  );
}

export default NavBar;