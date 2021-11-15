import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [isError, setIsError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [obscurePassword, setObscurePassword] = useState("password");
  const { login, isPending, error } = useLogin();

  useEffect(() => {
    setIsError(error);
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-w-full h-screen bg-white-sub flex justify-center">
      <div className="p-8 bg-white-main rounded-lg shadow-xl flex-col self-center justify-center items-center">
        <div className="flex justify-center items-center pb-6">
          <img src="/logo-text.png" width="156px" alt="logo" />
        </div>
        <h2 className="text-heading-2 font-medium self-center text-center pb-6">
          Sign in to your account
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
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
            <p className="font-light text-gray-main self-center py-8">
              Loading...
            </p>
          ) : error ? (
            <p className="font-light text-danger-light py-8">{error}</p>
          ) : (
            <button className=" bg-white-main hover:bg-black-surface border-black-border border rounded-md text-medium flex-1 px-4 py-3 duration-200 mb-8 mt-6">
              Sign in
            </button>
          )}
          <p className="text-gray-main self-center font-light">
            Doesn't have an account yet?
            <Link to="/register">
              <span className="underline pl-1 hover:text-secondary-light  duration-200">
                Register here!
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
