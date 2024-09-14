import React from "react";
import { Link } from "react-router-dom";
import "./MenPageCard.css";

const MenPageCard = ({ menproduct }) => {
  return (
    <>
     <Link to={`/men/${menproduct._id}`} >
    <div className="product-box">
      <div className="product-image">
       
        <img src={menproduct.image[0]} alt={menproduct.title} loading="lazy" />
      
      </div>
      <div className="product-info">
        <h3 className="Product-brand">Befour®</h3>
        <p className="product-title">{menproduct.title}</p>
        <div className="price-box">
          <p className="discounted-price"> ₹{menproduct.discountedPrice}</p>
          <p className="regular-price">₹{menproduct.actualPrice}</p>
        </div>
        <div className="tribe-sec">
          <p className="tribe-price">
            {menproduct.loyaltyPrice} For TriBe Members
          </p>
        </div>
      </div>
    </div>
    </Link>
    </>
  );
};

export default MenPageCard;
