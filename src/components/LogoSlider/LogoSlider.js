import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LogoSlider.css";

const LogoSlider = () => {
  const [settings] = useState({
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear",
  });

  const images = [
    "https://tukuz.com/wp-content/uploads/2019/10/helsana-logo-vector.png",
    "https://1000logos.net/wp-content/uploads/2022/02/css-logo.jpg",
    "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Swiss_Life.svg/1200px-Swiss_Life.svg.png",
    "https://1000logos.net/wp-content/uploads/2022/02/css-logo.jpg",
  ];

  return (
    <div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className='container'>
            <img src={image} alt='logo' className='logo' />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LogoSlider;
