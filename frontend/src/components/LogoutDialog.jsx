import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const LogoutDialog = (props) => {
    const navigate = useNavigate();
  return (
    <Transition
      show={props.isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
      className="fixed inset-0 z-50 overflow-y-auto m-10"
    >
      <Dialog onClose={() => props.setIsOpen(false)}>
        {/* Full-screen container to center the panel */}
        <Dialog.Panel className="z-50 flex flex-col items-center justify-center fixed inset-0 bg-black bg-opacity-50">
          <div className="border-4 border-black flex flex-col bg-y-bg p-5">
            <h4 className="font-raleway font-bold text-xl">Do you want log out?</h4>
            <div className="flex p-3">
            <button className="border-2 border-black p-2 font-semibold"
            onClick={() => {
                localStorage.removeItem("user");
                props.setIsOpen(false);
                navigate("/");
                }}
            >Logout</button>
            <button className="ml-auto border-2 border-black p-2 font-semibold" onClick={() => props.setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  )
}

export default LogoutDialog