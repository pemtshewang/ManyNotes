import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../src/assets/landinglogo.png";
import Book from "../src/assets/book.png";
import Features from "../src/components/features";
import ArrowDown from "../src/assets/adown.png";
import Cup from "../src/assets/cup.png";
import MyDialog from "../src/components/Modal";
import LoginForm from "../src/components/LoginForm";
import SignUpForm from "../src/components/SignUpForm";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = React.useState(false);
  const toggle= () => {
    setIsLoginOpen( prevState => !prevState)
    setIsSignUpOpen( prevState => !prevState)
  }
  return (
    <main className="bg-y-bg h-screen">
      {/* The model component goes here */}
      {isLoginOpen && (
        <MyDialog
          isOpen={isLoginOpen}
          setIsOpen={setIsLoginOpen}
          component={<LoginForm />}
          toggle={toggle}
        />
      )}
      {
        isSignUpOpen && (
          <MyDialog
            isOpen={isSignUpOpen}
            setIsOpen={setIsSignUpOpen}
            component={<SignUpForm />}
            toggle={toggle}
          />
        )
      }
      <nav className="flex pt-5 pl-5">
        <div className="flex flex-col ">
          <div className="font-raleway text-2xl font-black">Many</div>
          <div className="font-raleway text-2xl font-black">Notes</div>
        </div>
        <div className="ml-auto mr-8">
          <Link
            to="/"
            className="text-black hover:text-red-500 px-3 py-2 rounded-md text-base font-raleway font-semibold"
          >
            About
          </Link>
          <Link
            to="/"
            className="text-black hover:text-red-500 px-3 py-2 rounded-md text-base font-raleway font-semibold"
          >
            Support Dev
          </Link>
          <Link
            to="/#sign-up"
            className="text-black hover:text-red-500 px-3 py-2 rounded-md text-base font-raleway font-semibold"
            onClick={() => setIsSignUpOpen(true)}
          >
            Sign Up
          </Link>
        </div>
      </nav>
      <div className="grid grid-cols-2 bg-y-bg">
        <div>
          <div className="flex flex-col pt-10">
            <div className="mx-auto">
              <img className="h-25 w-60" src={Logo} alt={"image of cat"} />
            </div>
            <div className="mx-auto py-5">
              <p className="text-xl font-raleway font-light">
                Never lose a note again with ManyNotes
              </p>
            </div>
            <div className="mx-auto font-bold border border-solid border-black bg-white p-2 px-5 mt-8 text-black font-raleway outline outline-offset-2">
              <NavLink
              onClick={() => setIsLoginOpen(true)}
              >Get Started</NavLink>
            </div>
            <div className="ml-10 mt-10">
              <img src={Cup} alt={"Image of cup"} />
            </div>
            <div className="ml-auto">
              <NavLink to="#features">
                <img className="h-12 w-12" src={ArrowDown} alt={"Arrow Down"} />
              </NavLink>
            </div>
          </div>
        </div>
        <div className="w-3/5 ml-auto">
          <img src={Book} alt={"image of book"} />
        </div>
      </div>
      <Features />
    </main>
  );
};

export default Index;
