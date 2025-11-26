"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { axiosPublic } from "@/Axios/AxiosPublic";
import Image from "next/image";

const EventDetailsPage = () => {
  const { id } = useParams(); 
  const router = useRouter();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
       
        const res = await axiosPublic.get(`/event/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (error || !event) return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <h2 className="text-2xl font-bold text-red-500">{error || "Event not found"}</h2>
      <button onClick={() => router.back()} className="btn btn-outline">Go Back</button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
     
      <button 
        onClick={() => router.back()} 
        className="btn btn-ghost mb-6 gap-2 pl-0 hover:bg-transparent hover:text-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Events
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
          <Image 
            src={event.imageURL || "https://placehold.co/600x400"} 
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 bg-primary text-black px-4 py-1 rounded-full text-sm font-bold shadow-md">
            {event.category}
          </div>
        </div>

        
        <div className="flex flex-col justify-center">
        
          <h1 className="text-4xl font-bold text-primary mb-4">{event.title}</h1>
          
          
          <div className="flex flex-wrap gap-4 mb-6 text-lg">
            <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-black font-bold bg-primary  px-4 py-2 rounded-lg border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ${event.ticket_price}
            </div>
          </div>

          
          <div className="flex items-center gap-3 mb-8 p-3 bg-base-100 border rounded-xl w-fit">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={event.added_by?.imageURL || "https://placehold.co/50"} alt="Organizer" />
                
              </div>
            </div>
            <div className="text-sm">
                
              <p className="text-gray-500">Organized by</p>
              
              <p className="font-bold text-primary-800">{event.added_by?.name || event.added_by?.email || "unknown User"}</p>
            </div>
          </div>

          
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-2">About this Event</h3>
            <p className="text-white leading-relaxed whitespace-pre-line">
              {event.desc_full || event.desc_short}
            </p>
          </div>

          
          <button className="btn btn-primary btn-lg mt-8 w-full sm:w-auto shadow-lg">
            Book Ticket Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;