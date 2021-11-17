import { Link } from "react-router-dom";
import { BsFilterSquare } from "react-icons/bs";
import React, { useState, Fragment } from "react";
import { Transition, Menu } from "@headlessui/react";
import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";

export default function Dashboard({ isSidebarOpen, setIsSidebarOpen }) {
  const filterList = [
    "All",
    "Graphic",
    "UI/UX",
    "Mobile Dev",
    "Web Dev",
  ];

  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ isTabActive, setIsTabActive ] = useState("All");
  const { documents, error } = useCollection("projects");

  const handleClick = (tab) => {
    setIsTabActive(tab);
  };

  const projects = documents ? documents.filter(document => {
    switch(isTabActive) {
      case 'All':
        return true
      case 'Graphic':
      case "UI/UX":
      case 'Mobile Dev':
      case 'Web Dev':
        return document.projectCategory === isTabActive
      default:
        return true
    }
  }) : null

  return (
    <div
      className={`w-full mx-6 ${
        isSidebarOpen ? "lg:ml-60 xl:ml-68" : "lg:ml-20"
      } lg:mr-80 xl:mr-92 duration-500`}
    >
      {/* HEADER */}
      <div className="flex w-full pt-8 lg:pt-4 pb-4 lg:space-y-4 justify-between items-end">
        <h2 className="text-heading-3 lg:text-heading-2 font-semibold">
          Dashboard
        </h2>
        <Link
          to="/create"
          className="flex items-center px-2.5 py-1.5 lg:px-3 lg:py-2 space-x-3 bg-white-main hover:bg-white-sub hover:shadow-sm duration-200 border border-black-border rounded-md"
        >
          <img src="/quill-icons/plus.svg" alt="add" />
          <p className="text-caption">New project</p>
        </Link>
      </div>

      {/* LG FILTER */}
      <div
        className={`${
          isSidebarOpen ? "space-x-10" : "space-x-16"
        } hidden lg:flex items-center`}
      >
        <button
          className="p-3 rounded-md hover:bg-black-surface duration-200"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        >
          <img src="/quill-icons/hamburger.svg" alt="menu" />
        </button>
        {filterList.map((filter) => {
          return (
            <p
              onClick={() => {
                handleClick(filter);
              }}
              key={filter}
              className={`hover:text-black-main duration-200 cursor-pointer select-none ${
                isTabActive === filter
                  ? "text-black-main font-medium"
                  : "text-gray-main font-light"
              }`}
            >
              {filter}
            </p>
          );
        })}
      </div>

      {/* SM FILTER */}
      <Menu>
        <div className="w-full flex lg:hidden justify-between items-center mb-4">
          <button
            className="p-3 rounded-md hover:bg-black-surface duration-200"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <img src="/quill-icons/hamburger.svg" alt="menu" />
          </button>
          <Menu.Button
            className="p-3 rounded-md hover:bg-black-surface duration-200 outline-none"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <BsFilterSquare size={20} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`z-50 absolute origin-top-right right-10 top-32 outline-none rounded-md bg-white-main border border-black-border w-56 shadow-xl flex flex-col`}
          >
            {filterList.map((filter) => {
              return (
                <Menu.Item key={filter}>
                  {({ active }) => (
                    <button
                      className={`px-4 py-3 font-caption text-black-main flex justify-start ${
                        active && "bg-black-surface duration-200"
                      } ${
                        isTabActive === filter && "font-medium bg-black-border"
                      }`}
                      onClick={() => handleClick(filter)}
                    >
                      {filter}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>

      {/* CONTENT */}
      <div className="w-full h-full">
        <div className="my-8 w-full">
          {projects && (
            <div
              className={`w-full flex justify-center ${
                projects.length > 0 ? "lg:justify-start" : "lg:justify-center"
              }`}
            >
              {error && (
                <p className="text-caption text-danger-light">{error}</p>
              )}
              {projects.length > 0 ? (
                <ProjectList
                  projects={projects}
                  isSidebarOpen={isSidebarOpen}
                />
              ) : (
                <div className="flex flex-col justify-center items-center mt-20">
                  <img
                    src="/404_illustration.png"
                    alt="404_image"
                    height={1800}
                    width={240}
                  />
                  <p className="text-subtitle font-medium text-center">
                    Sound of silence, eh?
                  </p>
                  <p className="text-caption text-center mt-1">
                    Go try create a project!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
