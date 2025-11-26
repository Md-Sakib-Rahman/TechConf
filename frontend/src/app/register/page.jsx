"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

      
      await axios.post(`${backendUrl}/auth/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        imageURL: formData.photoURL || "https://placehold.co/100" 
      });

      
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setError("Registration successful, but login failed. Please sign in manually.");
      } else {
        router.push("/"); 
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left w-[350px]">
          <h1 className="text-5xl text-center font-bold">Register now!</h1>
        </div>
        
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            
            
            {error && (
              <div role="alert" className="alert alert-error text-sm p-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="input w-full" 
                  placeholder="Name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <label className="label">Photo URL</label>
                <input 
                  type="text" 
                  name="photoURL"
                  className="input w-full" 
                  placeholder="Profile Pic Url (Optional)" 
                  value={formData.photoURL}
                  onChange={handleChange}
                />

                <label className="label">Email</label>
                <input 
                  type="email" 
                  name="email"
                  className="input w-full" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <label className="label">Password</label>
                <input 
                  type="text" 
                  name="password"
                  className="input w-full" 
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <div className="mt-2">
                  <Link href='/login' className="link link-hover text-primary text-sm">
                    Already have an Account?
                  </Link>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-neutral mt-4 w-full"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Register"}
                </button>
              </fieldset>
            </form>

            <div className="divider my-0">OR</div>

            <button 
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="btn bg-white text-black border-[#e5e5e5] w-full"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Register with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;