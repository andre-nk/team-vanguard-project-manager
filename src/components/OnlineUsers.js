import React from "react";
import ReactTooltip from "react-tooltip";
import { useCollection } from "../hooks/useCollection";

export default function OnlineUsers({ isSidebarOpen }) {
  const { error, documents } = useCollection("users");
  const users = ["a", "b", "c", "d", "e", "f"];

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex min-w-full justify-between">
        <h2 className="font-medium text-subtitle">Members (25)</h2>
        <img src="/quill-icons/chevron_right.svg" alt="arrow_right" />
      </div>
      {error && (
        <div className="flex space-x-4">
          {users.map((user) => {
            return (
              <div className="relative inline-block">
                <img
                  className={`inline-block object-cover ${
                    isSidebarOpen ? "w-12 h-9" : "w-10 h-10"
                  } rounded-md pt-1 px-1 pb-0 bg-primary-surface`}
                  src={`https://avatars.dicebear.com/api/micah/${user}.svg`}
                  alt="profile"
                />
                <span className="absolute -bottom-1 -right-1 inline-block w-3 h-3 bg-success-light border-2 border-tertiary-border rounded-full"></span>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex space-x-4">
        {documents &&
          documents.slice(0, 6).map((user) => {
            return (
              <div key={user.id}>
                <div className="relative inline-block" data-tip={user.displayName}>
                  <img
                    className={`inline-block object-cover ${
                      isSidebarOpen ? "w-9 h-9" : "w-10 h-10"
                    } rounded-md pb-0 bg-primary-surface object-fill`}
                    src={user.photoURL}
                    alt={`profile-${user.id}`}
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 inline-block w-3 h-3 border-2 border-tertiary-border rounded-full ${
                      user.online ? "bg-success-light" : "bg-gray-main"
                    }`}
                  ></span>
                </div>
                <ReactTooltip className="bg-black-main opacity-50 px-0" place="bottom" type="dark" effect="float"/>
              </div>
            );
          })}
      </div>
    </div>
  );
}
