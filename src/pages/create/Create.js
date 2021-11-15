import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { timestamp } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Create() {
  const { user } = useAuthContext();
  const { documents } = useCollection("users");
  const { addDocument, response } = useFirestore("projects");
  const history = useHistory();

  const categories = [
    { value: "to_do", label: "To do" },
    { value: "not_started", label: "Not started" },
    { value: "on_going", label: "On going" },
    { value: "completed", label: "Completed" },
  ];

  const [users, setUsers] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectDueDate, setProjectDueDate] = useState(null);
  const [projectHandler, setProjectHandler] = useState([]);
  const [formErrors, setFormErrors] = useState("");

  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map((user) => {
          return { value: { ...user, id: user.id }, label: user.displayName };
        })
      );
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectCategory) {
      setFormErrors("Please select a category");
    }

    if (projectHandler.length < 1) {
      setFormErrors("Please select minimum of one handler");
    }

    const projectHandlers = projectHandler.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      projectName,
      projectDescription,
      projectCategory: projectCategory.value,
      dueDate: timestamp.fromDate(new Date(projectDueDate)),
      comments: [],
      createdBy: user.uid,
      projectHandlers,
    };

    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
  };

  return (
    <div>
      <div className="flex-col flex">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="projectName"
            className="text-caption text-black-main pl-0.5"
          >
            Project Name:
          </label>
          <input
            required
            type="text"
            name="projectName"
            id="projectName"
            className="w-full outline-none text-caption border focus:border-primary-border border-black-border rounded-md flex-1 px-4 py-3 duration-200 mb-4 mt-2"
            placeholder="Project name..."
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
          />
          <label
            htmlFor="projectDetail"
            className="text-caption text-black-main pl-0.5"
          >
            Project Details:
          </label>
          <textarea
            required
            type="text"
            name="projectDetail"
            id="projectDetail"
            className="w-full h-40 outline-none text-caption border focus:border-primary-border border-black-border focus:border-primary-blue rounded-md flex-1 px-4 py-3 duration-200 mb-2 mt-2"
            placeholder="Project details..."
            value={projectDescription}
            onChange={(e) => {
              setProjectDescription(e.target.value);
            }}
          />
          <label
            htmlFor="projectDueDate"
            className="text-caption text-black-main pl-0.5"
          >
            Due Date:
          </label>
          <input
            required
            type="date"
            name="projectDueDate"
            id="projectDueDate"
            className="w-full outline-none text-caption border focus:border-primary-border border-black-border rounded-md flex-1 px-4 py-2.5 duration-200 mb-4 mt-2"
            placeholder="Project name..."
            value={projectDueDate ?? ""}
            onChange={(e) => {
              setProjectDueDate(e.target.value);
            }}
          />
          <p
            htmlFor="projectAssignTo"
            className="text-caption text-black-main pl-0.5 mt-1"
          >
            Assign to:
          </p>
          {documents && (
            <Select
              isMulti="true"
              onChange={(option) => {
                setProjectHandler(option);
              }}
              options={users}
              className="mt-2 mb-2"
              styles={{
                control: (provided) => ({
                  ...provided,
                  borderColor: "#DDDDE7",
                  fontSize: "0.813rem",
                  borderRadius: "0.375rem",
                  padding: "0.25rem",
                }),
                option: (provided, state) => ({
                  ...provided,
                  color: "#191B1D",
                  backgroundColor: state.isSelected ? "#E8E8E8" : "#FEFFFF",
                  fontWeight: state.isSelected ? 500 : 300,
                  padding: "0.625rem",
                  paddingLeft: "16px",
                  fontSize: "0.813rem",
                }),
              }}
            />
          )}

          <p
            htmlFor="projectCategory"
            className="text-caption text-black-main pl-0.5 mt-6"
          >
            Project category:
          </p>
          <Select
            onChange={(option) => {
              setProjectCategory(option);
            }}
            options={categories}
            className="mt-2"
            styles={{
              control: (provided) => ({
                ...provided,
                borderColor: "#DDDDE7",
                fontSize: "0.813rem",
                borderRadius: "0.375rem",
                padding: "0.25rem",
              }),
              option: (provided, state) => ({
                ...provided,
                color: "#191B1D",
                backgroundColor: state.isSelected ? "#E8E8E8" : "#FEFFFF",
                fontWeight: state.isSelected ? 500 : 300,
                padding: "0.625rem",
                paddingLeft: "16px",
                fontSize: "0.813rem",
              }),
            }}
          />

          <button className="w-full bg-white-main hover:bg-black-surface border-black-border border rounded-md text-medium flex-1 px-4 py-3 duration-200 mt-8 mb-4">
            Create project
          </button>

          <div className="mb-8">
            {formErrors && (
              <p className="text-caption text-danger-light">*{formErrors}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
