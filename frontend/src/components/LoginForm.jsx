import loginIcon from "../assets/loginIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function LoginForm() {
  const LoginSchema = yup.object().shape({
    email: yup.string().email("Email Invalid").required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const login = async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/user/login",
      data
    );
    return response.data;
  };
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate(`/user/${data.id}/notes/`);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit = (data) => {
    mutation.mutate(data);
    reset();
  };
  return (
    <div className="w-full z-50">
      <form
        className="bg-y-bg px-10 mb-4 w-max"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-center py-10">
          <img
            className="w-10 h-10"
            src={loginIcon}
            alt="Image of login icon"
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full text-s shadow appearance-none border-4 border-black bg-y-bg rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
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
        <div className="mb-6">
          <input
            className="w-full shadow appearance-none border-4 border-black bg-y-bg rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
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
        <div className="flex flex-col items-center justify-between">
          <button
            className="font-raleway text-black font-bold bg-white border border-solid border-black outline outline-black outline-offset-2 py-2 px-5"
            type="submit"
          >
            Sign In
          </button>
          <Link
            to="/forgot-password"
            className="mt-9 font-bold text-black underline font-raleway"
          >
            Forgot Password?
          </Link>
          <Link
            to="/#sign-up"
            className="py-3 font-bold text-black underline font-raleway"
            onClick={() => toggle()}
          >
            Don't have an account? Sign Up!
          </Link>
        </div>
      </form>
    </div>
  );
}
