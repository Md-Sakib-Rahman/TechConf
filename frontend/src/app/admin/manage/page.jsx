"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const ManageEventsPage = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const [deletingId, setDeletingId] = useState(null);

  
  useEffect(() => {
    const fetchMyEvents = async () => {
      if (!session?.accessToken) return;

      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        
        const res = await axios.get(`${backendUrl}/myaddedEvent`, {
          headers: {
            "Authorization": `Bearer ${session.accessToken}`
          }
        });

        setEvents(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load your events.");
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchMyEvents();
    } else {
        
        setLoading(false); 
    }
  }, [session]);

  
  const handleDeleteClick = (id) => {
    setItemToDelete(id);
  };

  
  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setDeletingId(itemToDelete);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      
      await axios.delete(`${backendUrl}/delete-event/${itemToDelete}`, {
        headers: {
          "Authorization": `Bearer ${session.accessToken}`
        }
      });

     
      setEvents(events.filter(event => event._id !== itemToDelete));
      
      
      setItemToDelete(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete event");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Manage Products</h1>
          <Link href="/admin/add" className="btn btn-primary text-black">
            + Add New Event
          </Link>
        </div>

        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
          </div>
        )}

        {!loading && events.length === 0 ? (
          <div className="text-center py-20 bg-base-200 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-500">No events found</h3>
            <p className="text-white mb-4">You have not created any events yet.</p>
            <Link href="/admin/add" className="btn btn-outline btn-sm">Create One</Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-200 border-b-primary border-b-2 shadow-sm">
            <table className="table w-full">
              
              <thead className="bg-base-300">
                <tr>
                  <th>Event</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              
            
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-base-100">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image 
                              src={event.imageURL || "https://placehold.co/100"} 
                              alt={event.title}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{event.title}</div>
                          <div className="text-sm opacity-50 truncate max-w-[200px]">
                            {event.desc_short}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-ghost badge-sm">
                        {event.category}
                      </span>
                    </td>
                    <td>
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="font-medium">
                      ${event.ticket_price}
                    </td>
                    <td className="text-right">
                      <button 
                        onClick={() => handleDeleteClick(event._id)}
                        className="btn btn-ghost btn-xs text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

     
      {itemToDelete && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="modal-action">
              <button 
                className="btn" 
                onClick={() => setItemToDelete(null)}
                disabled={deletingId !== null}
              >
                Cancel
              </button>
              <button 
                className="btn btn-error" 
                onClick={confirmDelete}
                disabled={deletingId !== null}
              >
                {deletingId ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setItemToDelete(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ManageEventsPage;