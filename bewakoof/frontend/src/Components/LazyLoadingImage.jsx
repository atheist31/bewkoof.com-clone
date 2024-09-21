import React, { useState, useEffect, useRef } from "react";
import styles from "./LazyLoadingImage.module.css";

const LazyLoadingImage = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return <img ref={imageRef} src={isVisible ? src : ""} alt={alt}  className={styles.lazy_image}/>;
};

export default LazyLoadingImage;
