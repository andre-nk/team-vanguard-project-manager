import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { BsFilterSquare } from "react-icons/bs";
import React, { useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useDocument } from "../../hooks/useDocument";
import { useFirestore } from "../../hooks/useFirestore";
import { useParams, useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import ProjectSummary from "../../components/ProjectSummary";

export default function Project() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const history = useHistory();
  const { deleteDocument } = useFirestore("projects");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { error, document } = useDocument("projects", id);

  if (error) {
    return (
      <p className="text-caption mt-8 text-danger-light">{error.message}</p>
    );
  }

  if (!document) {
    return <p className="text-caption mt-8 text-gray-main">Loading...</p>;
  }

  const deleteProject = (e) => {
    e.preventDefault();
    deleteDocument(id);
    history.push("/");
  };

  return (
    <div>
      {document && (
        <Helmet>
          <title>{document.projectName} - Team Vanguard</title>
          <link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
          <meta
            name="Create Project"
            content="Team Vanguard Project Management System"
          />
        </Helmet>
      )}
      <div className="flex w-full pt-8 pb-4 lg:space-y-4 justify-between items-center">
        {/* DESKTOP */}
        <div className="hidden lg:flex w-full justify-between items-center">
          <div className="space-x-8 flex">
            <Link
              to="/"
              className="flex items-center px-3.5 py-1.5 lg:px-3 lg:py-2 space-x-3 bg-white-main hover:bg-white-sub hover:shadow-sm duration-200 border border-black-border rounded-md"
            >
              <p className="text-caption">Back</p>
            </Link>
          </div>
          <div className="space-x-4 flex">
            {user.uid === document.createdBy && (
              <div className="space-x-4 flex">
                <button
                  className="flex items-center px-3 py-1.5 lg:px-3 lg:py-2 bg-white-main hover:bg-danger-surface hover:shadow-sm duration-200 border border-black-border hover:border-danger-light rounded-md"
                  onClick={deleteProject}
                >
                  <img src="/quill-icons/delete.svg" alt="delete" />
                </button>
                <button className="flex items-center px-3 py-1.5 lg:px-3 lg:py-2 bg-white-main hover:bg-white-sub hover:shadow-sm duration-200 border border-black-border rounded-md">
                  <img src="/quill-icons/archive.svg" alt="archive" />
                </button>
              </div>
            )}
            <button className="flex items-center px-3.5 py-1.5 lg:px-4 lg:py-2 bg-white-main hover:bg-white-sub hover:shadow-sm duration-200 border border-black-border rounded-md">
              <p className="text-caption">Mark as done</p>
            </button>
          </div>
        </div>

        {/* MOBILE */}
        <div className="flex lg:hidden w-full justify-between items-center">
          <Link
            to="/"
            className="flex lg:hidden items-center px-3.5 py-1.5 lg:px-3 lg:py-2 space-x-3 bg-white-main hover:bg-white-sub hover:shadow-sm duration-200 border border-black-border rounded-md"
          >
            <p className="text-caption">Back</p>
          </Link>
          <Menu>
            <Menu.Button
              className="p-3 rounded-md hover:bg-black-surface duration-200 outline-none"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <BsFilterSquare size={20} />
            </Menu.Button>
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
                className={`z-50 absolute origin-top-right right-6 top-20 outline-none rounded-md bg-white-main border border-black-border w-56 shadow-xl flex flex-col`}
              >
                {user.uid === document.createdBy && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`px-4 py-3 font-caption text-black-main flex space-x-3.5 items-center justify-start ${
                          active && "bg-danger-surface duration-200"
                        }`}
                        onClick={deleteProject}
                      >
                        <img src="/quill-icons/delete.svg" alt="delete" />
                        <p>Delete</p>
                      </button>
                    )}
                  </Menu.Item>
                )}
                {user.uid === document.createdBy && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`px-4 py-3 font-caption text-black-main flex space-x-3.5 items-center justify-start ${
                          active && "bg-black-surface duration-200"
                        }`}
                      >
                        <img src="/quill-icons/archive.svg" alt="archive" />
                        <p>Archive</p>
                      </button>
                    )}
                  </Menu.Item>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`px-4 py-3 font-caption text-black-main flex justify-start ${
                        active && "bg-black-surface duration-200"
                      }`}
                    >
                      Mark as done
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <ProjectSummary className="mt-4" project={document} />
    </div>
  );
}
