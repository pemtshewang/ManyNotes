import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "../assets/close.png";

export default function MyDialog(props) {
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
        <Dialog.Panel className="z-50 flex flex-col items-center justify-center">
          <div className="border-4 border-solid border-black z-50 w-max py-3 bg-y-bg">
            <div className="flex flex-row-reverse">
              <button onClick={() => props.setIsOpen(false)}>
                <img className="w-10 h-10" src={CloseIcon} alt={"Close Icon"} />
              </button>
            </div>
            {props.component}
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}
