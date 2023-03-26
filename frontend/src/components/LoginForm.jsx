import loginIcon from "../assets/loginIcon.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DialogContext } from "../../context/dialogContext";

export default function LoginForm() {
    const { toggle } = useContext(DialogContext);
  return (
    <div className="w-full z-50">
      <form className="bg-y-bg px-10 mb-4 w-max">
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
          />
        </div>
        <div className="mb-6">
          <input
            className="w-full shadow appearance-none border-4 border-black bg-y-bg rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <button
            className="font-raleway text-black font-bold bg-white border border-solid border-black outline outline-black outline-offset-2 py-2 px-5"
            type="button"
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
