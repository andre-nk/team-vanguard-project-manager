import React from "react";
import OnlineUsers from "./OnlineUsers";

export default function Chatbar({isSidebarOpen}) {
  return (
    <div
<<<<<<< HEAD
      className={`h-full p-8 lg:border-l border-black-border w-full`}
=======
      className={`h-full lg:h-screen p-8 lg:border-l border-black-border w-full`}
>>>>>>> 08ec140c50c3aad5bef729fad1caff5e8c7d670f
    >
      <div className="w-full">
        <OnlineUsers isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
}
