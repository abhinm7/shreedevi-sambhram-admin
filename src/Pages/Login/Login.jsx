import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Storecontext } from "../../Contexts/Storecontext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const { token, setToken } = useContext(Storecontext);

  const navigate = useNavigate();

  const url = `${import.meta.env.VITE_API_URL}/api/admin/admin-login`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && password && contact) {
      const loadingToast = toast.loading("Loading... Please wait.");

      try {
        const res = await axios.post(url, { name, contact, password });

        if (res.status === 200) {
          if (res.data.success) {
            toast.update(loadingToast, {
              render: "Login Successful",
              type: "success",
              isLoading: false,
              autoClose: 3000,
            });

            setToken(res.data.token);
            navigate("/admin");
          } else {
            toast.update(loadingToast, {
              render: "Login failed",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          }
        } else {
          toast.update(loadingToast, {
            render: "Login failed, Please try again",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error during login:", error);
        const errorMessage = error.response?.data?.message || "Error in login";
        toast.update(loadingToast, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4 
        sm:max-w-sm 
        md:max-w-md 
        lg:max-w-md 
        xl:max-w-md">
        <div className="bg-gray-800 rounded-lg shadow dark:border dark:border-gray-700">
          <div className="p-4 sm:p-6 space-y-2 sm:space-y-4 
            min-h-[400px] sm:min-h-[450px] 
            flex flex-col justify-center">
            <h1 className="text-lg sm:text-xl font-bold leading-tight tracking-tight text-white text-center">
              Sign in to admin
            </h1>
            <form className="space-y-2 sm:space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2.5 text-xs sm:text-sm placeholder-gray-400"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your contact number"
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2.5 text-xs sm:text-sm placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 sm:mb-2 text-xs sm:text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 sm:p-2.5 text-xs sm:text-sm placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 text-center mt-2 sm:mt-4"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;