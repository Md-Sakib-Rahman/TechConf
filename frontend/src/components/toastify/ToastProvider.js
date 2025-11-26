"use client";

import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
// Keep this import here too, just to be double-safe
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // 👇 THIS IS THE KEY FIX
        style={{ zIndex: 9999999 }} 
      />
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        style={{ zIndex: 9999999 }}
      /> */}
    </>
  );
}
