import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import BannerStart from 'components/BannerStart';
import InscriptionCorsus from 'components/InscriptionCorsus';

function Index() {
    const { id } = useParams();
  return (
    <div>
        <NavBar />
        <InscriptionCorsus
          title={id}
            />
        <Footer />
    </div>
  )
}

export default Index