import React from "react";
import { useState } from "react";
import Chatbar from "../../components/Chatbar";

export default function Dashboard() {
  const [isChatMode, setIsChatMode] = useState(false);

  return (
    <div className="mt-8">
      {isChatMode ? (
        <div className="lg:hidden">
          <Chatbar />
        </div>
      ) : (
        <div>
          <p className="">Dashboard</p>
        </div>
      )}
      <button
        className="flex lg:hidden absolute right-8 bottom-8 h-16 w-16 bg-white-sub hover:bg-black-surface duration-200 rounded-full shadow-lg justify-center items-center"
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
