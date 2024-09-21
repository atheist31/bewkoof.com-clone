import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getMenProduct } from "../../Redux/Product/action";
import "./MenPage.css";
import MenPageCard from "./MenPageCard";
import Sidebar from "./Sidebar";
import Loader from "../../Layout/Loader";
import InitialLoader from "../../Layout/InitialLoader";

const MenPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const location = useLocation();
  const { menproduct, isLoading } = useSelector((store) => store.menReducer);
  let sortVal = { sort: searchParams.get("sort") };
  let obj = {
    params: {
      category: searchParams.getAll("category"),
      // fit: searchParams.getAll("fit"),
    },
  };

  useEffect(() => {
    dispatch(getMenProduct(obj.params));
  }, [dispatch, location.search, searchParams]);

  if (sortVal.sort === "asc") {
    menproduct.sort((a, b) => a.discountedPrice - b.discountedPrice);
  } else if (sortVal.sort === "desc") {
    menproduct.sort((a, b) => b.discountedPrice - a.discountedPrice);
  }

  return (
    <div className="men-section">
      <div className="men-Clothing">
        <h1>Men Clothing</h1>
      </div>
      <div className="product-div">
        <div className="sidebar">
          <Sidebar />
        </div>
        {menproduct.length > 0 ? (
          <div className="product-list">
            {menproduct?.map((el) => {
              return (
                <React.Fragment key={el.id}>
                  {isLoading ? <Loader /> : <MenPageCard menproduct={el} />}
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div className="product-list">
            {[1,2,3,4,5,6,7,8].map(()=>{
              return <Loader/>
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenPage;
