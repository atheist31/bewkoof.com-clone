import React from "react";
import { Link } from "react-router-dom";
import "./WomenPageCard.css";
import LazyLoadingImage from "../../Components/LazyLoadingImage";

const MenPageCard = ({ womenproduct }) => {
  return (
    <Link to={`/women/${womenproduct._id}`} >
    <div className="product-box1">
      <div className="product-image1">
        
        {/* <img src={womenproduct.image[0]} alt={womenproduct.title} /> */}
         <LazyLoadingImage src={womenproduct.image[0]} alt={womenproduct.title} />
      </div>
      <div className="product-info1">
        <h2 className="Product-brand1">Bewakoof®</h2>
        <p className="product-title1">{womenproduct.title}</p>
        <div className="price-box1">
          <p className="discounted-price1">₹ {womenproduct.discountedPrice}</p>
          <p className="regular-price1">₹{womenproduct.actualPrice}</p>
        </div>
        <div className="tribe-sec1">
          <p className="tribe-price1">
            {womenproduct.loyaltyPrice} For TriBe Members
          </p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default MenPageCard;
