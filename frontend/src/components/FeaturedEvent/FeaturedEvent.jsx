import Image from "next/image";
import React, { useEffect, useState } from "react";
import FCard from "./FCard";
import axios from "axios";
import { axiosPublic } from "@/Axios/AxiosPublic";

const FeaturedEvent = () => {
  const [cards, setCards]=useState([])  
  const [loading, setLoading]=useState(true)  
 
  useEffect( ()=>{
    const getFeature = async ()=>{
        try{
          const data = await (await axiosPublic.get('/all-events')).data.slice(0, 3)
          setCards(data)
          setLoading(false)
        }catch(err){
          console.log(err)
        }    
    }
    getFeature()
    
  },[])  

  if(loading) return (
    <div className="flex justify-center items-center my-20">
      <span className="loading loading-spinner loading-xl">XX</span>
    </div>
  )
  return (
    <div>
      <h2 className="text-center text-3xl text-primary my-10 font-bold">
        Featured Event
      </h2>
      <div className="flex justify-center items-center gap-10 max-xl:flex-col w-[90%] mx-auto">
        {
            cards.map((card, index)=> <FCard key={index} card={card} ></FCard>)
        }
      </div>
    </div>
  );
};

export default FeaturedEvent;
