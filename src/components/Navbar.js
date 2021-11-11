import React from "react";
import { useState } from "react";

export default function Navbar() {
  const [isTabActive, setIsTabActive] = useState("To do");

  const handleClick = (tab) => {
    setIsTabActive(tab);
  };

  console.log(isTabActive);

  return (
    <div className="flex-col w-full py-8 pb-2 lg:pb-8 lg:space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-heading-3 lg:text-heading-1 font-semibold">
          Dashboard
        </h2>
        <button className="flex items-center px-2.5 py-1.5 lg:px-3 lg:py-2 space-x-3 bg-white-main hover:bg-white-sub hover:shadow-sm duration-200 border border-black-border rounded-md">
          <img src="/quill-icons/plus.svg" alt="add" />
          <p className="text-caption">New project</p>
        </button>
      </div>

      {/* LG */}
      <div className="space-x-16 hidden lg:flex items-center">
        <button className="p-3 rounded-md hover:bg-black-surface duration-200">
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
