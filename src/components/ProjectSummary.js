import React, { useState, useEffect } from "react";
import { useDocument } from "../hooks/useDocument";
import { firestoreTools } from "../firebase/config";

export default function ProjectSummary({ project }) {
  const projectCreator = useDocument("users", project.createdBy);
  const [projectHandlers, setProjectHandlers] = useState([]);

  return (
    <div className="flex flex-col space-y-6">
      <img
        className="bg-primary-surface object-fill w-full h-36 rounded-md"
        src={`/covers/Cover_${Math.floor(Math.random() * 9) + 1}.png`}
        alt=""
      />
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
