import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Sidebar({ isSidebarActive }) {
  const { user, authIsReady } = useAuthContext();
  const { logout, isPending } = useLogout();

  return (
    <div
      className={`h-screen flex flex-col justify-between top-0 left-0 bg-white-sub border-r border-black-border`}
    >
      <div>
        <div className={isSidebarActive ? "px-8 block" : "px-2 mx-1 hidden lg:flex"}>
          <img
            src={isSidebarActive ? "/logo-text.png" : "/logo-single.png"}
            width="280px"
            alt="logo"
            className="pt-8 pb-6"
          />
        </div>
        {isSidebarActive &&
          (authIsReady ? (
            <div className="flex items-center space-x-3.5 justify-start py-2 px-6 hover:bg-black-surface duration-200">
              <div className="relative inline-block">
                <img
                  className="inline-block object-cover w-9 h-9 rounded-md bg-primary-surface"
                  src={user.photoURL}
                  alt="profile"
                />
              </div>
              <p className={`${isSidebarActive ? "text-caption" : "hidden"}`}>
                {user.displayName}
              </p>
            </div>
          ) : (
            <div className="flex items-center space-x-3.5 justify-start py-2 px-6 hover:bg-black-surface duration-200">
              <div className="relative inline-block">
                <img
                  className="inline-block object-cover w-9 h-9 rounded-md pt-1 px-1 pb-0 bg-primary-surface"
                  src="https://avatars.dicebear.com/api/micah/seed.svg"
                  alt="profile"
                />
              </div>
              <p className="text-caption">Jung Eunbi</p>
            </div>
          ))}
      </div>
      <div className="w-full h-10 flex justify-center items-center hover:bg-white-main border-t border-black-border duration-200">
        <button onClick={logout} disabled={isPending}>
          {
            isSidebarActive
            ? <p className="text-caption">{isPending ? "Loading" : "Sign out"}</p> 
            : <img src="/quill-icons/logout.svg" alt="" />
          }
        </button>
      </div>
    </div>
  );
}
