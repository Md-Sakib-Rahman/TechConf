"use client"
import axios from "axios";
import Image from "next/image";
import Carousal from "@/components/Carousal/Carousal"
import Header from "@/components/Header/Header";
import  bannerImage1 from "@/assets/b1.jpg"
import  bannerImage2 from "@/assets/b2.jpg"
import  bannerImage3 from "@/assets/b3.png"
import  bannerImage4 from "@/assets/b4.jpg"
import { useState } from "react";
import FeaturedEvent from "@/components/FeaturedEvent/FeaturedEvent";
import Testimonials from "@/components/Testimonials/Testimonials";
import Sponsor from "@/components/Sponsor/Sponsor";
export default  function Home() {

  const [imgArr, setImgArr] = useState([bannerImage1, bannerImage2, bannerImage3, bannerImage4])  
  
  return (
    <div className="">

      <Header></Header>
      <Carousal imgArr={imgArr}></Carousal>
      <FeaturedEvent></FeaturedEvent>
      <Testimonials/>
      <Sponsor/>
    </div>
  );
}
