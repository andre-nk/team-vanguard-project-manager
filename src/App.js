import React from "react";
import { useState } from "react";
import Helmet from "react-helmet";
import Favicon from "react-favicon";
import Login from "./pages/login/Login";
import Create from "./pages/create/Create";
import Sidebar from "./components/Sidebar";
import Chatbar from "./components/Chatbar";
import Project from "./pages/project/Project";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAuthContext } from "./hooks/useAuthContext";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

function App() {
  const { user, authIsReady } = useAuthContext();
  const [isChatMode, setIsChatMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      {authIsReady && (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Helmet>
                <title>Dashboard - Team Vanguard</title>
                <link
                  rel="icon"
                  type="image/png"
                  href="favicon.ico"
                  sizes="16x16"
                />
                <meta
                  name="Dashboard"
                  content="Team Vanguard Project Management System"
                />
              </Helmet>
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
                      <Dashboard
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                      />
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
              <Helmet>
                <title>Create Project - Team Vanguard</title>
                <link
                  rel="icon"
                  type="image/png"
                  href="favicon.ico"
                  sizes="16x16"
                />
                <meta
                  name="Create Project"
                  content="Team Vanguard Project Management System"
                />
              </Helmet>
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
              <Helmet>
                <title>Login- Team Vanguard</title>
                <link
                  rel="icon"
                  type="image/png"
                  href="favicon.ico"
                  sizes="16x16"
                />
                <meta
                  name="Log in"
                  content="Team Vanguard Project Management System"
                />
              </Helmet>
              {user && <Redirect to="/" />}
              <Login />
            </Route>
            <Route path="/register">
              <Helmet>
                <title>Register - Team Vanguard</title>
                <link
                  rel="icon"
                  type="image/png"
                  href="favicon.ico"
                  sizes="16x16"
                />
                <meta
                  name="Register"
                  content="Team Vanguard Project Management System"
                />
              </Helmet>
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
