import React from "react";
import OnlineUsers from "./OnlineUsers";

export default function Chatbar({isSidebarOpen}) {
  return (
    <div
      className={`h-full lg:h-screen p-8 lg:border-l border-black-border w-full`}
    >
      <div className="w-full">
        <OnlineUsers isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
}
