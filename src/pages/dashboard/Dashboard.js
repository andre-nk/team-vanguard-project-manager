import React from "react";
import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";

export default function Dashboard({ isSidebarOpen }) {
  const { documents, error } = useCollection("projects");

  return (
    <div className="my-8">
      <div className="w-full flex justify-center lg:justify-start">
        {error && <p className="text-caption text-danger-light">{error}</p>}
        <ProjectList projects={documents} isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
}
