import React from "react";
import ReactTooltip from "react-tooltip";
import { useDocument } from "../hooks/useDocument";

export default function ProjectSummary({ project }) {
  const projectCreator = useDocument("users", project.createdBy);

  return (
    <div className="flex flex-col space-y-12">
      <div className="relative inline-block">
        <img
          className="bg-primary-surface object-cover w-full h-36 rounded-md"
          src={`/covers/Cover_${Math.floor(Math.random() * 9) + 1}.png`}
          alt=""
        />
        <span className="absolute left-5 -bottom-5 flex -space-x-4">
          {project.projectHandlers.length <= 8
            ? project.projectHandlers.map((handler) => {
                return (
                  <div key={handler.id} data-tip={handler.displayName}>
                    <img
                      className="inline-block object-fill w-12 h-12 rounded-full border-2 border-white-sub bg-white-sub"
                      src={handler.photoURL}
                      alt="profile"
                    />
                    <ReactTooltip
                      className="bg-black-main opacity-50 px-0"
                      place="bottom"
                      type="dark"
                      effect="float"
                    />
                  </div>
                );
              })
            : project.projectHandlers.map((handler, index) => {
                if (index === project.projectHandlers.length) {
                  return (
                    <span
                      key={"ending-avatar"}
                      className="inline-block object-fill w-12 h-12 rounded-full border-2 border-white-sub bg-white-sub">
                      +{project.projectHandlers.length - 8}
                    </span>
                  );
                } else {
                  return (
                    <div key={handler.uid} data-tip={handler.displayName}>
                      <img
                        className="inline-block object-fill w-12 h-12 rounded-full border-2 border-white-sub bg-white-sub"
                        src={handler.photoURL}
                        alt="profile"
                      />
                      <ReactTooltip
                        className="bg-black-main opacity-50 px-0"
                        place="bottom"
                        type="dark"
                        effect="float"
                      />
                    </div>
                  );
                }
              })}
        </span>
      </div>
      <div className="space-y-1.5">
        <h1 className="text-heading-2 font-semibold text-black-main">
          {project.projectName}
        </h1>
        <div className="flex space-x-1">
          <p className="text-caption font-light text-gray-main">created by:</p>
          {projectCreator.document && (
            <p className="text-caption font-light text-gray-main hover:text-info-light underline duration-200">
              {projectCreator.document.displayName}
            </p>
          )}
        </div>
        <p className="text-caption font-light text-gray-main">
          due date: {project.dueDate.toDate().toDateString()}
        </p>
        <p className="text-body text-black-main pt-4">
          {project.projectDescription}
        </p>
      </div>
    </div>
  );
}
