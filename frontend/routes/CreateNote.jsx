import React from "react";
import { NavLink } from "react-router-dom";
import AddIcon from "../src/assets/add.png";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));

const submitNote = async (note) => {
  const res = await axios.post(
    `http://localhost:3000/api/user/${user.id}/note/create`,
    note
  );
  return res.data;
};

const NoteSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
});

//component
const CreateNote = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: submitNote,
    onSuccess: (data) => {
      navigate(`/user/${user.id}/notes`);
    },
    onError: (error) => {},
  });
  const onSubmit = (data) => {
    console.log({
      ...data,
      user_id: user.id,
    });
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
            placeholder="Enter your title here"
            {...register("title")}
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
            placeholder="Enter your content here"
            {...register("content")}
          ></textarea>
        </div>
        <div className="flex ml-auto gap-3 mt-3">
          <button type="submit" className="border-2 border-black py-2 px-3">
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

export default CreateNote;
