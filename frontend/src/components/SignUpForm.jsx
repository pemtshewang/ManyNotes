import signUpIcon from "../assets/signUpIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DialogContext } from "../../context/dialogContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignUpForm() {
  //creating the function to submit the form
  const signUp = async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/user/register",
      data
    );
    return response.data;
  };
  //creating the mutation
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {},
    onError: (error) => {
      //error handling
    },
  });

  //creating the validation schema
  const SignUpSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .required("Password confirmation is required"),
  });
  const { toggle } = useContext(DialogContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const passwordsMatch = () => {
    const password = watch("password");
    const password_confirmation = watch("password_confirmation");
    return password === password_confirmation;
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    mutation.mutate(data);
    reset();
  };
  useEffect(() => {
    if (mutation.isSuccess) {
      toggle();
    }
  }, [mutation.isSuccess]);

  return (
    <div className="w-full z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-y-bg px-10 mb-4 w-max"
      >
        <div className="flex justify-center py-10">
          <img
            className="w-10 h-10"
            src={signUpIcon}
            alt="Image of login icon"
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full text-s shadow appearance-none border-4 border-black bg-y-bg rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            className="w-full text-s shadow appearance-none border-4 border-black bg-y-bg rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            className="w-full shadow appearance-none border-4 border-black bg-y-bg rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            className={`w-full shadow appearance-none ${
              passwordsMatch() ? "border-black" : "border-red-500"
            } border-4 border-black bg-y-bg rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            name="password_confirmation"
            type="password"
            placeholder="Enter your password again"
            {...register("password_confirmation")}
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-xs italic">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center justify-between">
          <button
            className="font-raleway text-black font-bold bg-white border border-solid border-black outline outline-black outline-offset-2 py-2 px-5"
            type="submit"
          >
            Sign Up
          </button>
          <Link
            to="/#sign-in"
            className="py-3 font-bold text-black underline font-raleway mt-5"
            onClick={() => {
              toggle();
            }}
          >
            Already have an account? Sign In!
          </Link>
        </div>
      </form>
    </div>
  );
}
