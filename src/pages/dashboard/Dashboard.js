import React from "react";
import Navbar from "../../components/Navbar";
import { useState, Fragment } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import Chatbar from "../../components/Chatbar";

export default function Dashboard() {
  const [isChatMode, setIsChatMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTabActive, setIsTabActive] = useState("To do");

  const handleClick = (tab) => {
    setIsTabActive(tab);
  };

  console.log(isTabActive);

  return (
    <div className="mx-8">
      {isChatMode ? (
        <div className="w-full lg:hidden">
          <Chatbar width="w-full" />
        </div>
      ) : (
        <div>
          <Navbar />
          <Menu>
            <div className="w-full flex lg:hidden justify-between items-center mb-4">
              <button className="p-3 rounded-md hover:bg-black-surface duration-200">
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
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`px-4 py-3 font-caption text-black-main flex justify-start ${
                        active && "bg-black-surface duration-200"
                      } ${
                        isTabActive === "To do" && "font-medium bg-black-border"
                      }`}
                      onClick={() => handleClick("To do")}
                    >
                      To do
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`px-4 py-3 font-caption text-black-main flex justify-start ${
                        active && "bg-black-surface duration-200"
                      } ${
                        isTabActive === "Not started" &&
                        "font-medium bg-black-border"
                      }`}
                      onClick={() => handleClick("Not started")}
                    >
                      Not started
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`px-4 py-3 font-caption text-black-main flex justify-start ${
                        active && "bg-black-surface duration-200"
                      } ${
                        isTabActive === "On going" &&
                        "font-medium bg-black-border"
                      }`}
                      onClick={() => handleClick("On going")}
                    >
                      On going
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`px-4 py-3 font-caption text-black-main flex justify-start ${
                        active && "bg-black-surface duration-200"
                      } ${
                        isTabActive === "Completed" &&
                        "font-medium bg-black-border"
                      }`}
                      onClick={() => handleClick("Completed")}
                    >
                      Completed
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          <p className="">Dashboard</p>
        </div>
      )}
      <button
        className="flex lg:hidden absolute right-8 bottom-8 h-16 w-16 bg-white-sub hover:bg-black-surface duration-200 rounded-full shadow-lg justify-center items-center"
        onClick={() => setIsChatMode(!isChatMode)}
      >
        <img
          src="/quill-icons/send.svg"
          alt="message"
          className="pt-0.5 pr-0.5"
        ></img>
      </button>
    </div>
  );
}
