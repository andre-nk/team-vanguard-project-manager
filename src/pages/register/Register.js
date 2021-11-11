import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSignup } from "../../hooks/useSignup";

export default function Register() {
  const [isError, setIsError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [obscurePassword, setObscurePassword] = useState("password");
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, profilePicture);
  };

  const handleFileInput = (e) => {
    e.preventDefault();

    if (!e.target.files[0]) {
      setIsError("Please upload a profile image");
      return;
    }
    if (!e.target.files[0].type.includes("image")) {
      setIsError("Please upload a proper image file");
      return;
    }
    if (e.target.files[0].size > 1000000) {
      setIsError("Please upload a file less than 1mb");
      return;
    }

    setIsError("");
    setProfilePicture(e.target.files[0]);
  };

  return (
    <div className="min-w-full h-screen bg-white-sub flex items-center justify-center">
      <div className="py-8 px-8 bg-white-main rounded-lg shadow-xl">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="self-center mb-8">
            <img
              className="inline-block object-cover h-14 w-14 rounded-md pt-2 px-1 pb-0 bg-primary-light hover:bg-black-surface duration-200 cursor-pointer"
              src="https://avatars.dicebear.com/api/micah/seed.svg"
              alt="profile"
            />
            <input type="file" className="hidden" onChange={handleFileInput} />
          </label>
          <input
            type="text"
            name="displayName"
            id="displayName"
            value={displayName}
            className="outline-none border focus:border-primary-border border-black-border focus:border-primary-blue rounded-md flex-1 px-4 py-3.5 duration-200 mb-4"
            placeholder="Your name..."
            onChange={(value) => {
              setDisplayName(value.target.value);
            }}
          />
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            className="outline-none border focus:border-primary-border border-black-border focus:border-primary-blue rounded-md flex-1 px-4 py-3.5 duration-200 mb-4"
            placeholder="E-mail address..."
            onChange={(value) => {
              setEmail(value.target.value);
            }}
          />
          <div className="flex align-center justify-center">
            <input
              type={obscurePassword}
              name="password"
              id="password"
              value={password}
              className="outline-none border border-black-border focus:border-primary-border focus:border-primary-blue rounded-md flex-1 px-4 py-3.5 duration-200"
              placeholder="Password..."
              onChange={(value) => {
                setPassword(value.target.value);
              }}
            />
            {
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setObscurePassword(
                    obscurePassword === "password" ? "text" : "password"
                  );
                }}
              >
                {obscurePassword === "password" ? (
                  <AiOutlineEyeInvisible
                    size={20}
                    className="ml-4 self-center text-major-text cursor-pointer"
                  />
                ) : (
                  <AiOutlineEye
                    size={20}
                    className="ml-4 self-center text-major-text cursor-pointer"
                  />
                )}
              </button>
            }
          </div>
          {isPending ? (
            <p className="font-light text-gray-main self-center py-8">Loading...</p>
          ) : error ? (
            <p className="font-light text-danger-light py-8">{error}</p>
          ) : (
            <button className=" bg-white-main hover:bg-black-surface border-black-border border rounded-md text-medium flex-1 px-4 py-3 duration-200 mb-8 mt-6">
              Create your account
            </button>
          )}
          <p className="text-gray-main self-center font-light">
            Already have an account?
            <Link to="/register">
              <span className="underline pl-1 hover:text-secondary-light  duration-200">
                Sign in!
              </span>
            </Link>
          </p>
          {isError !== "" && (
            <p className="font-light text-danger-light">{isError}</p>
          )}
        </form>
      </div>
    </div>
  );
}
