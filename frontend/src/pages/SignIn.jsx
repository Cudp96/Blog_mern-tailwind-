import React from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SiginIn = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      return dispatch(signInFailure("Please fill up required credentials"));
    }
    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <section className="min-h-screen mt-20">
      <div className="flex p-8 max-w-3xl gap-4 mx-auto flex-col md:flex-row md:items-center border rounded shadow-md">
        <div className="flex-1">
          <Link to={"/"} className="text-4xl font-bold dark:text-white ">
            <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
              Sudeep's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 text-justify ">
            "Welcome to our Sudeep's Blog ! 🌐 Dive into the world of coding,
            design, and innovation with us. Whether you're a seasoned developer
            or just starting your journey, we've got insightful articles,
            tutorials, and tips to fuel your passion for crafting exceptional
            web experiences. Stay tuned for the latest trends, best practices,
            and inspiring stories that will elevate your skills and expand your
            horizons. Let's build the web of tomorrow, today!"
          </p>
        </div>
        <div className="flex-1">
          <form
            className="flex flex-col gap-4 justify-center"
            onSubmit={handleSubmit}
          >
            <p className="text-center text-sm ">
              You can sigin Using Google Account also.
            </p>
            <div>
              <Label htmlFor="username">Email</Label>
              <TextInput
                type="email"
                placeholder="Email"
                className=""
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="username">Password</Label>
              <TextInput
                type="password"
                placeholder="Password"
                className=""
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="ml-2">Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-3 mt-4 text-sm">
            <span>Don't have an account?</span>
            <Link to={"/sign-up"} className="text-blue-700 hover:underline">
              Sign Up
            </Link>
          </div>
          {error && (
            <Alert className="mt-3 " color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </section>
  );
};

export default SiginIn;
