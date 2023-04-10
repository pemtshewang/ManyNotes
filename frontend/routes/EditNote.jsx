import React from "react";
import { NavLink } from "react-router-dom";
import AddIcon from "../src/assets/add.png";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const NoteSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

//component
const EditNote = () => {
  // Fetching user from the localStorage async
  // Fetching user from the localStorage async
  const [user, setUser] = React.useState(null);
  const note = JSON.parse(localStorage.getItem("editNote"));
  const [title, setTitle] = React.useState(note.title);
  const [content, setContent] = React.useState(note.content);
  const token = decodeURIComponent(document.cookie).split(";")[0].split("=")[1]

  const submitNote = async () => {
    const updatedNote = { ...note, title, content }; // update note object with new values
    const res = await axios.put(
      `http://localhost:3000/api/user/${user.id}/note/update/${note.id}`,
      updatedNote,
      {
        headers:{
          Authorization: `Bearer ${token}` 
        }
      }
    );
    return res.data;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userFromStorage = await getUserFromStorage();
      setUser(userFromStorage);
    };
    fetchUser();
  }, []);

  const getUserFromStorage = async () => {
    return new Promise((resolve) => {
      const user = localStorage.getItem("user");
      if (user) {
        resolve(JSON.parse(user));
      } else {
        resolve(null);
      }
    });
  };

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    submitNote();
    navigate(`/user/${user.id}/notes`);
  };

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NoteSchema),
  });
  return (
    <form>
      <div className="flex flex-col">
        <div className="flex brand">
          <input
            className="bg-y-bg border-2 border-black w-60 font-bold text-center"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <img
            className="h-9 w-9 ml-auto"
            src={AddIcon}
            alt="Image of Edit Icon"
          />
        </div>
        <div className="mt-5">
          <textarea
            className="bg-y-bg border-2 border-black w-full h-20"
            name="content"
            id="content"
            {...register("content")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="flex ml-auto gap-3 mt-3">
          <button
            type="submit"
            className="border-2 border-black py-2 px-3"
            onClick={submit}
          >
            Save
          </button>
          <NavLink className="border-2 border-black py-2 px-3" to={-1}>
            Cancel
          </NavLink>
        </div>
      </div>
    </form>
  );
};

export default EditNote;
