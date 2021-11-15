import React from "react";
import { useState } from "react";
import Chatbar from "../../components/Chatbar";
import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";

export default function Dashboard({isSidebarOpen}) {
  const [isChatMode, setIsChatMode] = useState(false);
  const { documents, error } = useCollection("projects");

  return (
    <div className="my-8">
      {isChatMode ? (
        <div className="lg:hidden">
          <Chatbar />
        </div>
      ) : (
        <div className="w-full flex justify-center">
          {error && <p className="text-caption text-danger-light">{error}</p>}
          <ProjectList projects={documents} isSidebarOpen={isSidebarOpen}/>
        </div>
      )}

      {/* FAB */}
      <button
        className="flex lg:hidden fixed right-8 bottom-8 h-16 w-16 bg-white-sub hover:bg-black-surface duration-200 rounded-full shadow-lg justify-center items-center"
        onClick={() => setIsChatMode(!isChatMode)}
      >
        <img
          src="/quill-icons/send.svg"
          alt="message"
          className="pt-0.5 pr-0.5"
        ></img>
      </button>
    </div>
  );
}
