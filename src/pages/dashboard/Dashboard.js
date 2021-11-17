import React from "react";
import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";

export default function Dashboard({ isSidebarOpen }) {
  const { documents, error } = useCollection("projects");

  return (
    <div className="my-8 w-full">
      {documents && (
        <div
          className={`w-full flex justify-center ${
            documents.length > 0 ? "lg:justify-start" : "lg:justify-center"
          }`}
        >
          {error && <p className="text-caption text-danger-light">{error}</p>}
          {documents.length > 0 ? (
            <ProjectList projects={documents} isSidebarOpen={isSidebarOpen} />
          ) : (
            <div className="flex flex-col justify-center items-center mt-20">
              <img
                src="/404_illustration.png"
                alt="404_image"
                height={1800}
                width={240}
              />
              <p className="text-subtitle font-medium text-center">Sound of silence, eh?</p>
              <p className="text-caption text-center mt-1">Go try create a project!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
