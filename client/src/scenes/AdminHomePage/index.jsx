import SideBar from "components/SideBar";
import TopBarBack from "components/TopBarBack";
import React, {useEffect, useRef, useState} from "react";

import { loadScripts } from '../../scriptLoader';
import 'assets/css/style.css'

function Index() {
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
  
  
  return (
    <div>
      {/* **************** MAIN CONTENT START **************** */}
      <main>

        <SideBar />
        {/* Page content START */}
        <div className="page-content">
          <TopBarBack />

          {/* Page main content START */}
          <div className="page-content-wrapper border">
            {/* Title */}
            <div className="row">
              <div className="col-12 mb-3">
                <h1 className="h3 mb-2 mb-sm-0">Dashboard</h1>
              </div>
            </div>
          </div>
          {/* Page main content END */}
          
        </div>
        {/* Page content END */}
      </main>
      {/* **************** MAIN CONTENT END **************** */}
    </div>
  );
}

export default Index;
