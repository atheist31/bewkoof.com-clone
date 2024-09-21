import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getWomenProduct } from "../../Redux/Product/action";
import "./WomenPage.css";
import WomenPageCard from "./WomenPageCard";
import WomenSidebar from "./WomenSidebar";
import Loader from "../../Layout/Loader";
import InitialLoader from "../../Layout/InitialLoader";

const WomenPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { womenproduct, isLoading } = useSelector(
    (store) => store.womenReducer
  );

  let sortVal = { sort: searchParams.get("sort") };

  let obj = {
    params: {
      category: searchParams.getAll("category"),
      // fit: searchParams.getAll("fit"),
      // _sort: searchParams.get("order") && "discountedPrice",
      // _order: searchParams.get("order"),
    },
  };

  useEffect(() => {
    dispatch(getWomenProduct(obj.params));
  }, [dispatch, location.search, searchParams]);

  if (sortVal.sort === "asc") {
    womenproduct.sort((a, b) => a.discountedPrice - b.discountedPrice);
  } else if (sortVal.sort === "desc") {
    womenproduct.sort((a, b) => b.discountedPrice - a.discountedPrice);
  }

  return (
    <div className="women-section">
      <div className="women-Clothing">
        <h1>WoMen Clothing</h1>
      </div>
      <div>
        <div className="women product-div">
          <div className="women sidebar">
            <WomenSidebar />
          </div>
          {womenproduct.length > 0 ? (
            <div className="women product-list">
              {womenproduct?.map((el) => {
                return isLoading ? (
                  <Loader />
                ) : (
                  <WomenPageCard key={el.id} womenproduct={el} />
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
    </div>
  );
};

export default WomenPage;
