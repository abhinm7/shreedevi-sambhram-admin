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
    <section className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow dark:border dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Sign in to admin
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="block mb-2 text-sm font-medium text-white"
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
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
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
                  className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
