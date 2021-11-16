import React, { useState } from "react";
import OnlineUsers from "./OnlineUsers";
import { useParams } from "react-router-dom";
import { timestamp } from "../firebase/config";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";

const { v4: uuidv4 } = require("uuid");

export default function Chatbar({ isSidebarOpen }) {
  const { id } = useParams();
  const { user } = useAuthContext();
  const { document } = useDocument("projects", id);
  const { updateDocument, response } = useFirestore("projects");

  const [newComment, setNewComment] = useState("");

  const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

  const handleKeyDown = async (event) => {
    if (event.key === "Enter" && newComment.length > 0) {
      const commentToAdd = {
        displayName: user.displayName,
        content: newComment,
        createdAt: timestamp.fromDate(new Date()),
        id: uuidv4(),
      };

      await updateDocument(id, {
        comments: [...document.comments, commentToAdd],
      });

      if (!response.error) {
        setNewComment("");
      }
    }
  };

  return (
    <div
      className={`${
        !document ? "p-8" : "p-0 lg:p-8"
      } h-full lg:border-l border-black-border w-full`}
    >
      <div className="w-full">
        {document ? (
          <div className="w-full flex flex-col">
            <OnlineUsers isSidebarOpen={isSidebarOpen} project={document} />
            <input
              required
              type="text"
              name="newComment"
              id="newComment"
              className="w-full outline-none text-caption border focus:border-primary-border border-black-border rounded-md flex-1 px-4 py-3 duration-200"
              placeholder="Add a project comment..."
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
            />
            <div className="mt-8">
              {document.comments.map((comment) => (
                <div className="flex items-start mb-4" key={comment.id}>
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 10 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.41421 0H11V12L0.707107 1.70711C0.0771421 1.07714 0.523309 0 1.41421 0Z"
                      fill="#F6F3F8"
                    />
                  </svg>
                  <div>
                    <span className="py-2.5 px-3 flex flex-col space-y-0.5 items-start justify-start bg-tertiary-surface rounded-md rounded-tl-none">
                      <p className="text-xs font-light opacity-70">
                        {comment.displayName}
                      </p>
                      <p className="text-sm text-left">
                        {comment.content}
                      </p>
                    </span>
                    <p className="text-xs font-light text-gray-main mt-2">
                      {
                        isToday(comment.createdAt.toDate()) === true
                        ? comment.createdAt.toDate().toTimeString().substring(0, 8)
                        : comment.createdAt.toDate().toDateString(), comment.createdAt.toDate().toTimeString().substring(0, 5)
                      }
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <OnlineUsers isSidebarOpen={isSidebarOpen} />
        )}
      </div>
    </div>
  );
}
