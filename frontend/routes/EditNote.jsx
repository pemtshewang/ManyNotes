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

const note = JSON.parse(localStorage.getItem("editNote"));
//component
const EditNote = () => {
  // Fetching user from the localStorage async
  const [user, setUser] = React.useState(null);
  const [title, setTitle] = React.useState(note.title);
  const [content, setContent] = React.useState(note.content);
  const submitNote = async () => {
    const res = await axios.put(
      `http://localhost:3000/api/user/${user.id}/note/update/${note.id}`,
      note
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
  const mutation = useMutation({
    mutationFn: submitNote,
    onSuccess: (data) => {
      console.log(data);
      navigate(`/user/${user.id}/notes`);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = (data) => {
    mutation.mutate({
      ...data,
      user_id: user.id,
    });
    reset();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NoteSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
