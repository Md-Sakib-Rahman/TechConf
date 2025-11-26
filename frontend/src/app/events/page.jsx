"use client";

import React, { useEffect, useState } from "react";
import EventCardComp from "./EventCardComp";
import { axiosPublic } from "@/Axios/AxiosPublic"; 

const EventsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosPublic.get('/all-events');
        setCards(result.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

 
  const filteredCards = cards.filter((card) => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.desc_short.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center my-20">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <h2 className="text-center text-primary my-10 text-3xl font-bold">
        Events
      </h2>

      
      <div className="flex justify-center mb-8">
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
          <input 
            type="text" 
            className="grow" 
            placeholder="Search events..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
      </div>
      
      
      <div className="my-10 grid grid-cols-3 gap-6 mx-auto max-xl:grid-cols-2 max-sm:grid-cols-1">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <EventCardComp key={card._id} event={card} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No events found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;