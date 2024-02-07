import React, { useEffect } from 'react'
import AboutPage from '../src/scenes/AboutPage'
import BlogPage from '../src/scenes/BlogPage'
import ContactPage from '../src/scenes/ContactPage'
import HomePage from '../src/scenes/HomePage'
import ServicesPage from '../src/scenes/ServicesPage'
import ShopPage from '../src/scenes/ShopPage'
import SignUp from '../src/scenes/SignUp'
import SignIn from '../src/scenes/SignIn'
import {BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error("Script load error for ${src}"));
    document.head.appendChild(script);
  });
}

function App() {
  

  useEffect(() => {
    const scripts = [
      '/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
      '/assets/vendor/tiny-slider/tiny-slider.js',
      '/assets/vendor/glightbox/js/glightbox.js',
      '/assets/vendor/purecounterjs/dist/purecounter_vanilla.js',
      '/assets/js/functions.js',
    ];

    async function loadAllScripts() {
      try {
        for (const script of scripts) {
          await loadScript(script);
        }
        console.log('All scripts loaded');
      } catch (error) {
        console.error('Failed to load scripts', error);
      }
    }

    loadAllScripts();

    // Cleanup pour supprimer les scripts lors du démontage
    return () => {
      scripts.forEach(src => {
        const scriptTag = document.querySelector(scripts[src="${src}"]);
        scriptTag?.remove();
      });
    };
  }, []);

  return (
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/blog" element={<BlogPage />}/>
          <Route path="/contact" element={<ContactPage />}/>
          <Route path="/services" element={<ServicesPage />}/>
          <Route path="/shop" element={<ShopPage />}/>
        </Routes>
      </div>
  )
}

export default App