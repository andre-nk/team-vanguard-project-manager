import React from "react";
import Login from "./pages/login/Login";
import Create from "./pages/create/Create";
import Sidebar from "./components/Sidebar";
import Chatbar from "./components/Chatbar";
import { useState, Fragment } from "react";
import Project from "./pages/project/Project";
import { BsFilterSquare } from "react-icons/bs";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import { Menu, Transition } from "@headlessui/react";
import { useAuthContext } from "./hooks/useAuthContext";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

function App() {
  const { user, authIsReady } = useAuthContext();
  const [isChatMode, setIsChatMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTabActive, setIsTabActive] = useState("Graphic Design");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = (tab) => {
    setIsTabActive(tab);
  };

  return (
    <div className="debug-screens">
      {authIsReady && (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && (
                <div className="flex lg:block">
                  {/* MOBILE */}
                  <div
                    className={`flex fixed top-0 z-40 ${
                      isSidebarOpen ? "w-full" : "w-0"
                    }`}
                  >
                    <div
                      className={`fixed top-0 left-0 bottom-0 lg:hidden z-50 shadow-xl backdrop-filter ${
                        isSidebarOpen ? "w-8/12" : "w-0"
                      } duration-200`}
                    >
                      <Sidebar isSidebarActive={isSidebarOpen} />
                    </div>
                    <div
                      className={`fixed top-0 right-0 lg:hidden bg-black-main opacity-50 z-50 ${
                        isSidebarOpen ? "w-4/12 h-screen" : "w-0"
                      } duration-200`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="opacity-0 w-full h-full bg-black-main"></span>
                    </div>
                  </div>

                  <div className="w-full flex">
                    <div
                      className={`hidden lg:flex fixed top-0 left-0 bg-white-main ${
                        isSidebarOpen ? "w-2/12" : "w-12"
                      } duration-500`}
                    >
                      <Sidebar isSidebarActive={isSidebarOpen} />
                    </div>

                    {/* MAIN */}
                    {isChatMode ? (
                      <div className="lg:hidden w-full">
                        <Chatbar />
                      </div>
                    ) : (
                      <div
                        className={`w-full mx-6 ${
                          isSidebarOpen ? "lg:ml-60 xl:ml-68" : "lg:ml-20"
                        } lg:mr-80 xl:mr-92 duration-500`}
                      >
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

                        {/* LG */}
                        <div className={`${isSidebarOpen ? "space-x-10" : "space-x-16"} hidden lg:flex items-center`}>
                          <button
                            className="p-3 rounded-md hover:bg-black-surface duration-200"
                            onClick={() => {
                              setIsSidebarOpen(!isSidebarOpen);
                            }}
                          >
                            <img src="/quill-icons/hamburger.svg" alt="menu" />
                          </button>
                          <p
                            onClick={() => {
                              handleClick("Graphic Design");
                            }}
                            className={`hover:text-black-main duration-200 cursor-pointer select-none ${
                              isTabActive === "Graphic Design"
                                ? "text-black-main font-medium"
                                : "text-gray-main font-light"
                            }`}
                          >
                            Graphic Design
                          </p>
                          <p
                            onClick={() => {
                              handleClick("UI/UX Design");
                            }}
                            className={`hover:text-black-main duration-200 cursor-pointer select-none ${
                              isTabActive === "UI/UX Design"
                                ? "text-black-main font-medium"
                                : "text-gray-main font-light"
                            }`}
                          >
                            UI/UX Design
                          </p>
                          <p
                            onClick={() => {
                              handleClick("Web Development");
                            }}
                            className={`hover:text-black-main duration-200 cursor-pointer select-none ${
                              isTabActive === "Web Development"
                                ? "text-black-main font-medium"
                                : "text-gray-main font-light"
                            }`}
                          >
                            Web Development
                          </p>
                          <p
                            onClick={() => {
                              handleClick("Mobile Development");
                            }}
                            className={`hover:text-black-main duration-200 cursor-pointer select-none ${
                              isTabActive === "Mobile Development"
                                ? "text-black-main font-medium"
                                : "text-gray-main font-light"
                            }`}
                          >
                            Mobile Development
                          </p>
                        </div>

                        {/* SM */}
                        <Menu>
                          <div className="w-full flex lg:hidden justify-between items-center mb-4">
                            <button
                              className="p-3 rounded-md hover:bg-black-surface duration-200"
                              onClick={() => {
                                setIsSidebarOpen(!isSidebarOpen);
                              }}
                            >
                              <img
                                src="/quill-icons/hamburger.svg"
                                alt="menu"
                              />
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
                                      isTabActive === "Graphic Design" &&
                                      "font-medium bg-black-border"
                                    }`}
                                    onClick={() =>
                                      handleClick("Graphic Design")
                                    }
                                  >
                                    Graphic Design
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`px-4 py-3 font-caption text-black-main flex justify-start ${
                                      active && "bg-black-surface duration-200"
                                    } ${
                                      isTabActive === "UI/UX Design" &&
                                      "font-medium bg-black-border"
                                    }`}
                                    onClick={() => handleClick("UI/UX Design")}
                                  >
                                    UI/UX Design
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`px-4 py-3 font-caption text-black-main flex justify-start ${
                                      active && "bg-black-surface duration-200"
                                    } ${
                                      isTabActive === "Web Development" &&
                                      "font-medium bg-black-border"
                                    }`}
                                    onClick={() =>
                                      handleClick("Web Development")
                                    }
                                  >
                                    Web Development
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`px-4 py-3 font-caption text-black-main flex justify-start ${
                                      active && "bg-black-surface duration-200"
                                    } ${
                                      isTabActive === "Mobile Development" &&
                                      "font-medium bg-black-border"
                                    }`}
                                    onClick={() =>
                                      handleClick("Mobile Development")
                                    }
                                  >
                                    Mobile Development
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>

                        <div className="w-full h-full">
                          <Dashboard isSidebarOpen={isSidebarOpen} />
                        </div>
                      </div>
                    )}

                    {/* CHATBAR */}
                    <div className="hidden lg:block fixed top-0 right-0 bg-white-main w-3/12 h-screen">
                      <Chatbar isSidebarOpen={isSidebarOpen} />
                    </div>

                    {/* FAB */}
                    <button
                      className="flex lg:hidden fixed right-8 bottom-8 h-16 w-16 bg-white-sub hover:bg-black-surface duration-200 rounded-full shadow-lg justify-center items-center"
                      onClick={() => setIsChatMode(!isChatMode)}
                    >
                      <img
                        src={
                          isChatMode
                            ? "/quill-icons/escape.svg"
                            : "/quill-icons/send.svg"
                        }
                        alt="comment"
                        className={!isChatMode ?? "pt-4"}
                      ></img>
                    </button>
                  </div>
                </div>
              )}
            </Route>
            <Route path="/create">
              {!user && <Redirect to="/login" />}
              {user && (
                <div className="flex lg:block">
                  {/* MOBILE */}
                  <div
                    className={`flex fixed top-0 z-40 ${
                      isSidebarOpen ? "w-full" : "w-0"
                    }`}
                  >
                    <div
                      className={`fixed top-0 left-0 bottom-0 lg:hidden z-50 shadow-xl backdrop-filter ${
                        isSidebarOpen ? "w-8/12" : "w-0"
                      } duration-200`}
                    >
                      <Sidebar isSidebarActive={isSidebarOpen} />
                    </div>
                    <div
                      className={`fixed top-0 right-0 lg:hidden bg-black-main opacity-50 z-50 ${
                        isSidebarOpen ? "w-4/12 h-screen" : "w-0"
                      } duration-200`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <span className="opacity-0 w-full h-full bg-black-main"></span>
                    </div>
                  </div>

                  <div className="w-full flex">
                    <div
                      className={`hidden lg:flex fixed top-0 left-0 bg-white-main ${
                        isSidebarOpen ? "w-2/12" : "w-12"
                      } duration-500`}
                    >
                      <Sidebar isSidebarActive={isSidebarOpen} />
                    </div>

                    {/* MAIN */}
                    <div
                      className={`w-full mx-6 ${
                        isSidebarOpen ? "lg:ml-60 xl:ml-68" : "lg:ml-20"
                      } lg:mr-80 xl:mr-92 duration-500`}
                    >
                      <div className="flex w-full pt-8 pb-4 lg:space-y-4 justify-between items-center">
                        <div className="hidden lg:flex space-x-8">
                          <button
                            className="p-3 rounded-md hover:bg-black-surface duration-200"
                            onClick={() => {
                              setIsSidebarOpen(!isSidebarOpen);
                            }}
                          >
                            <img src="/quill-icons/hamburger.svg" alt="menu" />
                          </button>
                          <Link
                            to="/"
                            className="flex items-center px-3.5 py-1.5 lg:px-3 lg:py-2 space-x-3 bg-white-main hover:bg-white-sub hover:shadow-sm duration-200 border border-black-border rounded-md"
                          >
                            <p className="text-caption">Back</p>
                          </Link>
                        </div>
                        <Link
                          to="/"
                          className="flex lg:hidden items-center px-3.5 py-1.5 lg:px-3 lg:py-2 space-x-3 bg-white-main hover:bg-white-sub hover:shadow-sm duration-200 border border-black-border rounded-md"
                        >
                          <p className="text-caption">Back</p>
                        </Link>
                        <h2 className="text-heading-3 lg:text-heading-2 font-semibold">
                          Create Project
                        </h2>
                      </div>

                      <Create />
                    </div>

                    {/* CHATBAR */}
                    <div className="fixed top-0 right-0 bg-white-main w-3/12 h-screen hidden lg:block">
                      <Chatbar isSidebarOpen={isSidebarOpen} />
                    </div>
                  </div>
                </div>
              )}
            </Route>
            <Route path="/projects/:id">
              {!user && <Redirect to="/login" />}
              {user && (
                <div className="flex lg:block">
                  <div className="w-full flex">
                    <div
                      className={`hidden lg:flex fixed top-0 left-0 bg-white-main ${
                        isSidebarOpen ? "w-2/12" : "w-12"
                      } duration-500`}
                    >
                      <Sidebar isSidebarActive={isSidebarOpen} />
                    </div>

                    {isChatMode ? (
                      <div className="lg:hidden w-full h-full p-8">
                        <button
                          onClick={() => setIsChatMode(!isChatMode)}
                          className="flex items-center mb-8 px-3.5 py-1.5 lg:px-3 lg:py-2 space-x-3 bg-white-main hover:bg-white-sub hover:shadow-sm duration-200 border border-black-border rounded-md"
                        >
                          <p className="text-caption">Back</p>
                        </button>
                        <Chatbar />
                      </div>
                    ) : (
                      <div
                        className={`w-full mx-6 ${
                          isSidebarOpen ? "lg:ml-60 xl:ml-68" : "lg:ml-20"
                        } lg:mr-80 xl:mr-92 duration-500`}
                      >
                        <Project />
                      </div>
                    )}

                    {/* CHATBAR */}
                    <div className="fixed top-0 right-0 bg-white-main w-3/12 h-screen hidden lg:block">
                      <Chatbar isSidebarOpen={isSidebarOpen} />
                    </div>

                    {/* FAB */}
                    {!isChatMode && (
                      <button
                        className="flex lg:hidden fixed right-8 bottom-8 h-16 w-16 bg-white-sub hover:bg-black-surface duration-200 rounded-full shadow-lg justify-center items-center"
                        onClick={() => setIsChatMode(!isChatMode)}
                      >
                        <img
                          src="/quill-icons/comment.svg"
                          alt="comment"
                          className={!isChatMode ?? "pt-4"}
                        ></img>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              <Login />
            </Route>
            <Route path="/register">
              {user && <Redirect to="/" />}
              <Register />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
