import BannerStartHome from 'components/BannerStartHome'
import Footer from 'components/Footer'
import NavBar from 'components/NavBar'
import React, { useState, useEffect } from 'react'
import { getShop } from "services/shopService/api";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';

function Index() {
    const [cartItems, setCartItems] = useState(0);

    // Fonction pour ajouter un article au panier
    const addToCart = () => {
      setCartItems(cartItems + 1);
    };
    const { id } = useParams();
    const [shop, setShop] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const shop = await getShop(id);
                console.log("shop", shop.data);
                setShop(shop.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleString('en-US', options);
        return formattedDate;
    };
    return (
        <>
            <NavBar cartItems={cartItems}/>
            {/* **************** MAIN CONTENT START **************** */}
            <main>
                <ToastContainer />
                {/* =======================
Page Banner START */}
                <BannerStartHome
                    title="Detail Instrument"
                    description="Buy here , musical instruments for everyone ...!"
                />
                {/* =======================Page Banner END */}


                {/* =======================
Page content START */}
                <section className="pt-5">
                    <div className="container" data-sticky-container>
                        <div className="row g-4 g-sm-5">
                            {/* Left sidebar START */}
                            <div className="col-xl-4">
                                <div data-sticky data-margin-top={80} data-sticky-for={992}>
                                    <div className="row justify-content-center">
                                        <div className="col-md-8 col-xl-12">
                                            {/* Card START */}
                                            <div className="card shadow">
                                                {/* Image */}
                                                <div className="rounded-3">
                                                    <img src={`http://localhost:3001/assets/${shop.picturePath}`} className="card-img-top" alt="book image" />
                                                </div>
                                                {/* Card body */}
                                                <div className="card-body pb-3">
                                                    {/* Buttons and price */}
                                                    <div className="text-center">
                                                        {/* Buttons */}
                                                        <a href="#" className="btn btn-success-soft mb-2 mb-sm-0 me-00 me-sm-3" onClick={addToCart}><i className="bi bi-cart3 me-2" />Add to Cart</a>
                                                        <a href="#" className="btn btn-light mb-0"><i className="bi bi-bookmark me-2" />Add wishlist</a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Card END */}
                                        </div>
                                    </div> {/* Row End */}
                                </div>
                            </div>
                            {/* Left sidebar END */}
                            {/* Main content START */}
                            <div className="col-xl-8">
                                {/* Title */}
                                <h1 className="mb-4">{shop.name}</h1>

                                {/* Price Item START */}
                                <ul className="list-inline mb-4">
                                    {/* Price */}
                                    <li className="list-inline-item">
                                        <input type="radio" className="btn-check" name="options" id="option1" defaultChecked />
                                        <div className="card-footer  pt-0 px-3">
                                            {/* Conditionally render price with or without discount */}
                                            {shop.remise !== null ? (
                                                <div className="d-flex justify-content-end align-items-center me-2">
                                                    <li className="list-inline-item">
                                                        <label className="btn btn-success-soft-check" htmlFor={`option_${shop._id}`}>
                                                            {/* Price and discount */}
                                                            <span className="d-flex align-items-center">
                                                                <span className="mb-0 h5 me-2 text-success">{(shop.price - (shop.price * shop.remise) / 100).toFixed(2)} dt</span>
                                                                {/* Placeholder for discount */}
                                                                <span className="text-decoration-line-through fs-6 mb-0 me-2">{shop.price}dt</span>
                                                                {/* Placeholder for discount percentage */}
                                                                <span className="badge bg-danger text-white mb-0">{shop.remise}% off</span>
                                                            </span>
                                                        </label>
                                                    </li>
                                                </div>
                                            ) : (
                                                <div className="d-flex justify-content-end align-items-center me-2">

                                                    <li className="list-inline-item">
                                                        <label className="btn btn-success-soft-check" htmlFor={`option_${shop._id}`}>

                                                            <h5 className="text-success mb-0">{shop.price} dt</h5>
                                                        </label>
                                                    </li>
                                                </div>
                                            )}
                                        </div>
                                    </li>


                                </ul>
                                {/* Price Item END */}
                                {/* Content */}
                                <h4>Description</h4>
                                <p>{shop.description}.</p>
                                {/* Additional info */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        {/* List START */}
                                        <ul className="list-group list-group-borderless">
                                            <li className="list-group-item px-0">
                                                <span className="h6 fw-light"><i className="bi fa-fw bi-calendar-fill text-primary me-2" />Published date:</span>
                                                <span className="h6">{formatDate(shop.createdAt)}</span>
                                            </li>
                                            <li className="list-group-item px-0">
                                                <span className="h6 fw-light"><i className="fas fa-fw fa-book text-primary me-2" />Full Name:</span>
                                                <span className="h6">{shop.fullName}</span>
                                            </li>
                                            <li className="list-group-item px-0">
                                                <span className="h6 fw-light"><i className="fas fa-fw fa-font text-primary me-2" />Email Contact:</span>
                                                <span className="h6">{shop.email}</span>
                                            </li>

                                        </ul>
                                        {/* List END */}
                                    </div>
                                    <div className="col-md-6">
                                        {/* List START */}
                                        <ul className="list-group list-group-borderless">
                                            <li className="list-group-item px-0">
                                                <span className="h6 fw-light"><i className="bi fa-fw bi-calendar-fill text-primary me-2" />Mobile Number:</span>
                                                <span className="h6">+216 {shop.phoneNumber}</span>
                                            </li>
                                            <li className="list-group-item px-0">
                                                <span className="h6 fw-light"><i className="fas fa-fw fa-book text-primary me-2" />Brand :</span>
                                                <span className="h6">{shop.marque}</span>
                                            </li>


                                        </ul>
                                        {/* List END */}
                                    </div>
                                </div>


                            </div>
                            {/* Main content END */}
                        </div> {/* Row END */}
                    </div>
                </section>
                {/* =======================
Page content END */}



            </main>
            {/* **************** MAIN CONTENT END **************** */}

            <Footer />
        </>
    )
}

export default Index
