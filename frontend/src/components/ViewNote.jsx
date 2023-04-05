import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseIcon from "../assets/close.png";
import { DialogContext } from "../../context/dialogContext";

export default function ViewDialog(props) {
  return (
    <DialogContext.Provider value={{ toggle: props.toggle }}>
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
            <div className="border-4 border-black view-dialog">
              <div className="flex flex-row-reverse bg-y-bg">
                <button onClick={() => props.setIsOpen(false)}>
                  <img
                    className="w-10 h-10"
                    src={CloseIcon}
                    alt={"Close Icon"}
                  />
                </button>
              </div>
              <div className=" flex flex-col bg-y-bg p-5">
                <h3 className="text-2xl text-black tracking-wider my-3">{props.title}</h3>
                <hr className="h-2"/>
                <div className="text-black text-xl">
                    {props.content}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </DialogContext.Provider>
  );
}
