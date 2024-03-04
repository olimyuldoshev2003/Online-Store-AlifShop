// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Swiper1.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

//For images of swiper
import imgSwiper1 from "../../assets/img1Swiper1.jpg";
import imgSwiper2 from "../../assets/img2Swiper1.jpg";

export default function Swiper1() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={imgSwiper1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imgSwiper2} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
