"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function AuthProvider({ children }) {
  
  return <><ToastContainer
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
      ></ToastContainer><SessionProvider>
    {children}
    
    </SessionProvider>;
  </>

}