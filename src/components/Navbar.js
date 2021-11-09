import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isTabActive, setIsTabActive] = useState("To do");

  const handleClick = (tab) => {
    setIsTabActive(tab);
  };

  console.log(isTabActive);

  return (
    <div className="w-full flex-col py-8 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-heading-1 font-semibold">Dashboard</h2>
        <button className="flex items-center space-x-3 bg-white-main hover:bg-white-sub hover:shadow-sm duration-200 border border-black-border rounded-md px-3 py-2">
          <img src="/quill-icons/plus.svg" alt="add" />
          <p className="text-caption">New project</p>
        </button>
      </div>
      <div
        className={`flex space-x-16 items-center text-body font-light text-gray-main`}
      >
        <button className="p-3 rounded-md hover:bg-black-surface">
          <img src="/quill-icons/hamburger.svg" alt="menu" />
        </button>
        <p
          onClick={() => {
            handleClick("To do");
          }}
          className={`hover:text-black-main duration-200 cursor-pointer select-none ${
            isTabActive === "To do"
              ? "text-black-main font-medium"
              : "text-gray-main"
          }`}
        >
          To do
        </p>
        <p
          onClick={() => {
            handleClick("Not started");
          }}
          className={`hover:text-black-main duration-200 cursor-pointer select-none ${
            isTabActive === "Not started"
              ? "text-black-main font-medium"
              : "text-gray-main"
          }`}
        >
          Not started
        </p>
        <p
          onClick={() => {
            handleClick("On going");
          }}
          className={`hover:text-black-main duration-200 cursor-pointer select-none ${
            isTabActive === "On going"
              ? "text-black-main font-medium"
              : "text-gray-main"
          }`}
        >
          On going
        </p>
        <p
          onClick={() => {
            handleClick("Completed");
          }}
          className={`hover:text-black-main duration-200 cursor-pointer select-none ${
            isTabActive === "Completed"
              ? "text-black-main font-medium"
              : "text-gray-main"
          }`}
        >
          Completed
        </p>
      </div>
    </div>
  );
}
