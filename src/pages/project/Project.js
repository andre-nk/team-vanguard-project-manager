import React from "react";
import { useParams } from "react-router-dom";
import ProjectSummary from "../../components/ProjectSummary";
import { useDocument } from "../../hooks/useDocument";

export default function Project() {
  const { id } = useParams();
  const { error, document } = useDocument("projects", id);

  if (error) {
    return <p className="text-caption text-danger-light">{error.message}</p>;
  }

  if (!document) {
    return <p className="text-caption text-gray-main">Loading...</p>;
  }

  return (
    <div className="mt-4">
      <ProjectSummary project={document}/>
    </div>
  );
}
