import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FeatherIcon from "feather-icons-react";

export default function MyDialog(props, { children }) {
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
    >
      <Dialog onClose={() => props.setIsOpen(false)}>
        {/* The backdrop, rendered as a sibling to the panel container */}
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          aria-hidden="true"
        />
        {/* Full-screen container to center the panel */}
        <Dialog.Panel className="z-50 flex items-center justify-center">
          <div className="flex flex-row-reverse">
            <div>
              <button>
                <FeatherIcon icon="close" size="24" />
              </button>
            </div>
          </div>
          {children}
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}
