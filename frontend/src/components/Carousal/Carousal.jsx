"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import bannerImage4 from "@/assets/b4.jpg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function App({ imgArr }) {
  return (
    <>
      <h2 className="text-center text-primary text-4xl font-bold my-10">
        Gallery
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          }
         
          
        }}
        className="mySwiper  "
      >
        {imgArr.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                src={item}
                alt=""
                className="w-[80%] mx-auto h-[40vh] object-cover rounded-2xl"
              />
            </SwiperSlide>
          );
        })}
      
      </Swiper>
    </>
  );
}
