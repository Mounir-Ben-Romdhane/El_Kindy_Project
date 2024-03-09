import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../state";
import { useSelector } from "react-redux";
import { loadScripts } from "../scriptLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faTags, faCalendarAlt, faUsers, faClipboardList, faEnvelope, faBriefcase } from '@fortawesome/free-solid-svg-icons';


function NavBar() {
  const accessToken = useSelector((state) => state.accessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavItem, setActiveNavItem] = useState("");

  const logoutHandler = () => {
    dispatch(setLogout());

    navigate("/");
  };

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
    navigate("/sign-in");
  };

  useEffect(() => {
    // Set activeNavItem based on current location
    const pathname = location.pathname;
    setActiveNavItem(pathname);
  }, [location]);

  const handleNavItemClick = (item) => {
    setActiveNavItem(item === activeNavItem ? "" : item);
  };
  return (
    <div>
      {/* Header START */}
      <header className="navbar-light bg-light navbar-sticky header-static">
        {/* Logo Nav START */}
        <nav className="navbar navbar-expand-xl">
          <div className="container">
            {/* Logo START */}

            <Link className="navbar-brand" to="/home">
              <img
                className="light-mode-item navbar-brand-item"
                src="/assets/images/logo/logo.png"
                style={{ width: "150px", height: "60px" }}
                alt="logo"
              />
              <img
                className="dark-mode-item navbar-brand-item"
                src="/assets/images/logo/logo.png"
                style={{ width: "150px", height: "60px" }}
                alt="logo"
              />
            </Link>
            {/* Logo END */}
            {/* Responsive navbar toggler */}
            <button
              className="navbar-toggler ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
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
                {/* Nav HOME*/}
                <li className="nav-item ">
                  <Link 
                    className={`nav-link ${activeNavItem === "/home" ? "active" : ""}`}
                    to="/home"
                    onClick={() => handleNavItemClick("/home")}>
                    <i className="fas fa-home fa-fw me-1" />
                    Home
                  </Link>
                </li>
                {/* CORSUS */}
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle ${activeNavItem === "/category" || activeNavItem === "/courses" ? "active" : ""}`}
                    href="#"
                    id="demoMenu"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faGraduationCap} className="fa-fw me-1" /> 
                    Corsus
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="demoMenu">
                    <li>
                      {" "}
                      <Link 
                         className={`dropdown-item ${activeNavItem === "/category" ? "active" : ""}`}
                         to="/category"
                         onClick={() => handleNavItemClick("/category")}>
                       <FontAwesomeIcon icon={faTags} className="fa-fw me-1" /> {/* Category Courses */}
                        Category
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <Link 
                         className={`dropdown-item ${activeNavItem === "/courses" ? "active" : ""}`}
                         to="/courses"
                         onClick={() => handleNavItemClick("/courses")}>
                      <FontAwesomeIcon icon={faGraduationCap} className="fa-fw me-1" /> 
                        Courses
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <a className="dropdown-item" href="index-2.html">
                      <FontAwesomeIcon icon={faBriefcase} className="fa-fw me-1" /> {/* Stages */}
                        InternalShip
                      </a>
                    </li>
                  </ul>
                </li>
                
                {/* Nav item 4 Component*/}
                <li className="nav-item ">
                  <a className="nav-link" href="docs/alerts.html">
                  <FontAwesomeIcon icon={faCalendarAlt} className="fa-fw me-1" /> {/* Events */}
                    Events
                  </a>
                </li>
                

                {/* Nav item 4 Component*/}
                <li className="nav-item ">
                  <a className="nav-link" href="docs/alerts.html">
                  <FontAwesomeIcon icon={faUsers} className="fa-fw me-1" /> {/* Testimonials */}
                    Témoignags
                  </a>
                </li>
                {/* Nav item 4 Component*/}
                <li className="nav-item ">
                  <Link className={`nav-link ${activeNavItem === "/inscription" ? "active" : ""}`}
                    to="/inscription"
                    onClick={() => handleNavItemClick("/inscription")}>
                      <FontAwesomeIcon icon={faClipboardList} className="fa-fw me-1" /> {/* Preinscription */}
                    Inscription
                  </Link>
                </li>
                {/* Nav item 4 Component*/}
                <li className="nav-item ">
                  <Link 
                  className={`nav-link ${activeNavItem === "/contact-us" ? "active" : ""}`}
                  to="/contact-us"
                  onClick={() => handleNavItemClick("/contact-us")}>
                    <FontAwesomeIcon icon={faEnvelope} className="fa-fw me-1" /> {/* Contact */}
                    Contact
                  </Link>
                </li>
              </ul>
              {/* Nav Main menu END */}
              {/* Dark mode switch */}
              {
                !accessToken && 
                <div className="navbar-nav my-2 ms-2">
                  <div className="modeswitch-wrap" id="darkModeSwitch">
                    <div className="modeswitch-item">
                      <div className="modeswitch-icon" />
                    </div>
                  </div>
                </div>
              }
            
            </div>
            {/* Main navbar END */}
            
            {/* Profile START */}
            {accessToken ? (
              <div className="dropdown ms-1 ms-lg-0">
                <a
                  className="avatar avatar-sm p-0"
                  href="#"
                  id="profileDropdown"
                  role="button"
                  data-bs-auto-close="outside"
                  data-bs-display="static"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="avatar-img rounded-circle"
                    src={accessToken?.picturePath}
                    alt="avatar"
                  />
                </a>

                <ul
                  className="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3"
                  aria-labelledby="profileDropdown"
                >
                  {/* Profile info */}
                  <li className="px-3">
                    <div className="d-flex align-items-center">
                      {/* Avatar */}
                      <div className="avatar me-3">
                        <img
                          className="avatar-img rounded-circle shadow"
                          src={accessToken?.picturePath}
                          alt="avatar"
                        />
                      </div>
                      <div>
                        <a className="h6 mt-2 mt-sm-0" href="#">
                          {accessToken?.firstName} {accessToken?.lastName}
                        </a>
                        <p className="small m-0">{accessToken?.email}</p>
                      </div>
                    </div>
                    <hr />

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
                  <li> <Link className="dropdown-item" to="/dashbordTeacher"><i className="bi bi-grid-fill fa-fw me-1" />Dashboard</Link> </li>
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
                  <li> <Link className="dropdown-item" to="/dashbordStudent"><i className="bi bi-grid-fill fa-fw me-1" />Dashboard</Link> </li>
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
                  {/* Links */}
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-person fa-fw me-2" />
                      Edit Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-gear fa-fw me-2" />
                      Account Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <i className="bi bi-info-circle fa-fw me-2" />
                      Help
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item bg-danger-soft-hover"
                      onClick={logoutHandler}
                    >
                      <i className="bi bi-power fa-fw me-2" />
                      Sign Out
                    </a>
                  </li>
                  <li>
                    {" "}
                    <hr className="dropdown-divider" />
                  </li>
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
              </div>
            ) : (
              <div class="navbar-nav">
                
                {/* Signout button  */}
                <div className="navbar-nav d-lg-inline-block">
                  <button className="btn btn-orange-soft mb-0 rounded-pill" onClick={handleSignIn}><i className="fas fa-sign-in-alt me-2" />Sign In</button>
                </div>
              </div>
            )}

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
