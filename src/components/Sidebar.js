import React from "react";

export default function Sidebar() {
  return (
    <div className="h-screen flex flex-col justify-between top-0 left-0 bg-white-sub border-r border-black-border">
      <div>
        <div className="px-6">
          <img src="/logo-text.png" alt="logo" className="pt-8 pb-6" />
        </div>
        <div className="flex items-center space-x-3.5 justify-start py-2 px-6 hover:bg-black-surface duration-200">
          <div class="relative inline-block">
            <img
              class="inline-block object-cover w-9 h-9 rounded-md pt-1 px-1 pb-0 bg-red-500"
              src="https://avatars.dicebear.com/api/micah/seed.svg"
              alt="Profile image"
            />
            <span class="absolute -bottom-1 -right-1 inline-block w-3 h-3 bg-success-light border-2 border-tertiary-border rounded-full"></span>
          </div>
          <p className="text-caption">Jung Eunbi</p>
        </div>
      </div>
      <div className="w-full h-10 flex justify-center items-center hover:bg-white-main border-t border-black-border duration-200">
        <button>
            <p className="text-caption">Sign out</p>
        </button>
      </div>
    </div>
  );
}
