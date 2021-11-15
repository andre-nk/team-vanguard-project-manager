import React from "react";
import { Link } from "react-router-dom";

export default function ProjectList({ projects, isSidebarOpen }) {
  return (
    <div className="flex self-center">
      <div className="grid grid-flow-row gap-y-8 md:grid-cols-2 lg:grid-flow-col md:gap-12">
        {projects &&
          projects.map((project) => {
            return (
              <Link to={`projects/${project.id}`}>
                <div
                  key={project.id}
                  className={`w-64 ${
                    isSidebarOpen ? "lg:w-56" : "lg:w-64 xl:w-72"
                  } transform hover:rotate-2 rounded-md duration-200`}
                >
                  <img
                    className="bg-primary-surface object-fill w-full h-36 rounded-md"
                    src={`/covers/Cover_${
                      Math.floor(Math.random() * 9) + 1
                    }.png`}
                    alt=""
                  />
                  <div className="mt-4 mx-2 flex flex-col space-y-0.5">
                    <h1 className="text-body font-semibold text-black-main">
                      {project.projectName}
                    </h1>
                    <p className="text-caption font-light text-gray-main">
                      due date: {project.dueDate.toDate().toDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
