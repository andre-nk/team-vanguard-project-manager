import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Project from "./pages/project/Project";
import Register from "./pages/register/Register";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Chatbar from "./components/Chatbar";
import { useAuthContext } from "./hooks/useAuthContext";
import { useState, Fragment } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, authIsReady } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTabActive, setIsTabActive] = useState("To do");

  const handleClick = (tab) => {
    setIsTabActive(tab);
  };

  console.log(isSidebarOpen);

  return (
    <div className="">
      {authIsReady && (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              <div className="flex lg:block">
                <div className={`flex fixed top-0 z-40 ${isSidebarOpen ? "w-full" : "w-0"}`}>
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
                    className={`hidden lg:flex ${
                      isSidebarOpen ? "w-3/12" : "w-20"
                    } duration-200`}
                  >
                    <Sidebar isSidebarActive={isSidebarOpen} />
                  </div>
                  {/* MAIN */}
                  <div className="w-full mx-6 lg:mx-8">
                    <div className="flex-col w-full pt-8 pb-4 lg:space-y-4">
                      <div className="flex justify-between items-center">
                        <h2 className="text-heading-3 lg:text-heading-1 font-semibold">
                          Dashboard
                        </h2>
                        <button className="flex items-center px-2.5 py-1.5 lg:px-3 lg:py-2 space-x-3 bg-white-main hover:bg-white-sub hover:shadow-sm duration-200 border border-black-border rounded-md">
                          <img src="/quill-icons/plus.svg" alt="add" />
                          <p className="text-caption">New project</p>
                        </button>
                      </div>
                    </div>

                    {/* LG */}
                    <div className="space-x-16 hidden lg:flex items-center">
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
                          handleClick("To do");
                        }}
                        className={`hover:text-black-main duration-200 cursor-pointer select-none ${
                          isTabActive === "To do"
                            ? "text-black-main font-medium"
                            : "text-gray-main font-light"
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
                            : "text-gray-main font-light"
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
                            : "text-gray-main font-light"
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
                            : "text-gray-main font-light"
                        }`}
                      >
                        Completed
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
                                  isTabActive === "To do" &&
                                  "font-medium bg-black-border"
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

                    <Dashboard />
                  </div>
                  {/* CHATBAR */}
                  <div className="w-5/12 hidden lg:block">
                    <Chatbar />
                  </div>
                </div>
              </div>
            </Route>
            <Route path="/create">
              {!user && <Redirect to="/login" />}
              <Create />
            </Route>
            <Route path="/projects/:id">
              {!user && <Redirect to="/login" />}
              <Project />
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
