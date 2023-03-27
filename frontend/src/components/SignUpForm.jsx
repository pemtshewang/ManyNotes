import signUpIcon from "../assets/signUpIcon.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DialogContext } from "../../context/dialogContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function LoginForm() {
  const SignUpSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    password_confirmation: yup.string().required("Password confirmation is required"),
  });
  const { toggle } = useContext(DialogContext);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: SignUpSchema,
  });

  return (
    <div className="w-full z-50">
      <form onSubmit={handleSubmit(toggle)} className="bg-y-bg px-10 mb-4 w-max">
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
        </div>
        <div className="mb-1">
          <input
            className="w-full shadow appearance-none border-4 border-black bg-y-bg rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
        </div>
        <div className="mb-6">
          <input
            className="w-full shadow appearance-none border-4 border-black bg-y-bg rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            name="password_confirmation"
            type="password"
            placeholder="Enter your password again"
            {...register("password_confirmation")}
          />
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
