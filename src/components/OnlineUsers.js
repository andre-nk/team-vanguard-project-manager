import React from "react";
import { useCollection } from "../hooks/useCollection";

export default function OnlineUsers({ isSidebarOpen, project }) {
  const { error, documents } = useCollection("users");
  const users = ["a", "b", "c", "d", "e", "f"];

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        {project ? (
          <h2 className="font-medium text-body">
            {project.projectName + " Comments"}
          </h2>
        ) : (
          documents && (
            <span className="flex w-full justify-between">
              <h2 className="font-medium text-subtitle">
                Members ({documents.length})
              </h2>
            </span>
          )
        )}
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
      <div className="flex flex-col w-full space-y-4 mt-6">
        {!project &&
          documents &&
          documents.map((user) => {
            return (
              <div
                key={user.id}
                className="w-full flex justify-start items-center space-x-4 hover:bg-black-surface duration-200 rounded-md"
              >
                <div className="relative inline-block">
                  <img
                    className={`inline-block object-cover w-10 h-10 rounded-md pb-0 bg-primary-surface`}
                    src={user.photoURL}
                    alt={`profile-${user.id}`}
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 inline-block w-3 h-3 border-2 border-tertiary-border rounded-full ${
                      user.online ? "bg-success-light" : "bg-gray-main"
                    }`}
                  ></span>
                </div>
                <p className="text-black-main text-caption">{user.displayName}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
