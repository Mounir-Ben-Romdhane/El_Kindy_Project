import React from 'react'
import AboutPage from '../src/scenes/AboutPage'
import BlogPage from '../src/scenes/BlogPage'
import ContactPage from '../src/scenes/ContactPage'
import HomePage from '../src/scenes/HomePage'
import ServicesPage from '../src/scenes/ServicesPage'
import ShopPage from '../src/scenes/ShopPage'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/blog" element={<BlogPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="/services" element={<ServicesPage />}/>
          <Route path="/shop" element={<ShopPage />}/>
        </Routes>
        <Footer/>
      </div>
  )
}

export default App