"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddEventPage = () => {
  const router = useRouter();
  const { data: session } = useSession(); 
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  
  const [formData, setFormData] = useState({
    title: "",
    desc_short: "",
    desc_full: "",
    date: "",
    ticket_price: "",
    category: "Conference", 
    imageURL: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (!session?.accessToken) {
      setMessage({ type: "error", text: "You must be logged in to add an event." });
      setLoading(false);
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      
      await axios.post(`${backendUrl}/addEvent`, {
        ...formData,
        ticket_price: Number(formData.ticket_price)
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.accessToken}`
        }
      });

      setMessage({ type: "success", text: "Event created successfully!" });
      
      
      setTimeout(() => router.push("/admin/manage"), 1500);
      
    } catch (err) {
      console.error(err);
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to create event." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-base-200 border-primary border-2 rounded-2xl shadow-xl overflow-hidden">
        
       
        <div className="bg-primary px-8 py-6">
          <h1 className="text-3xl font-bold text-black">Add New Event</h1>
          <p className="text-primary-content/80 mt-2">Create a new listing for the conference.</p>
        </div>

       
        {message.text && (
          <div className={`p-4 mx-8 mt-6 rounded-lg text-sm font-semibold ${
            message.type === "success" 
              ? "bg-green-100 text-green-700 border border-green-200" 
              : "bg-red-100 text-red-700 border border-red-200"
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label font-bold">Event Title</label>
              <input 
                type="text" 
                name="title" 
                required
                placeholder="e.g. React Summit 2025" 
                className="input input-bordered w-full focus:input-primary"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Category</label>
              <select 
                name="category" 
                className="select select-bordered w-full focus:select-primary"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Conference</option>
                <option>Workshop</option>
                <option>Meetup</option>
                <option>Hackathon</option>
                <option>Webinar</option>
              </select>
            </div>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label font-bold">Event Date</label>
              <input 
                type="date" 
                name="date" 
                required
                className="input input-bordered w-full focus:input-primary"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-control">
              <label className="label font-bold">Ticket Price ($)</label>
              <input 
                type="number" 
                name="ticket_price" 
                required
                min="0"
                placeholder="0.00" 
                className="input input-bordered w-full focus:input-primary"
                value={formData.ticket_price}
                onChange={handleChange}
              />
            </div>
          </div>

          
          <div className="form-control">
            <label className="label font-bold">Short Description</label>
            <input 
              type="text" 
              name="desc_short" 
              required
              maxLength={100}
              placeholder="A brief tagline for the event card (max 100 chars)" 
              className="input input-bordered w-full focus:input-primary"
              value={formData.desc_short}
              onChange={handleChange}
            />
          </div>

          
          <div className="form-control">
            <label className="label font-bold">
              <span className="label-text font-bold">Banner Image URL</span>
              <span className="label-text-alt text-gray-500">(Optional)</span>
            </label>
            <input 
              type="url" 
              name="imageURL" 
              placeholder="https://..." 
              className="input input-bordered w-full focus:input-primary"
              value={formData.imageURL}
              onChange={handleChange}
            />
          </div>

          
          <div className="form-control">
            <label className="label font-bold">Full Description</label>
            <textarea 
              name="desc_full" 
              required
              rows="5"
              placeholder="Detailed agenda, speakers, and event information..." 
              className="textarea textarea-bordered w-full focus:textarea-primary text-base"
              value={formData.desc_full}
              onChange={handleChange}
            ></textarea>
          </div>

          
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary w-full text-lg shadow-lg"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Publish Event"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddEventPage;