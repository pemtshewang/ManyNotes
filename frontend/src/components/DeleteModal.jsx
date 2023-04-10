import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import NoteIdContext from "../../context/noteIdContext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

export default function DeleteDialog(props) {
  const { deleteNoteId, setDeleteNoteId } = useContext(NoteIdContext);
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const cookieArray = decodeURIComponent(document.cookie).split(";");
  const token = cookieArray[0].split("=")[1];
  useEffect(() => {
    const fetchUser = async () => {
      const userFromStorage = await getUserFromStorage();
      setUser(userFromStorage);
    };
    fetchUser();
  }, []);

  const getUserFromStorage = async () => {
    return new Promise((resolve) => {
      const user = localStorage.getItem("user");
      if (user) {
        resolve(JSON.parse(user));
      } else {
        resolve(null);
      }
    });
  };
  const deleteNote = async (noteId) => {
    if (!user) {
      throw new Error("User is not logged in");
    }

    const endpoint = `http://localhost:3000/api/user/${user.id}/note/delete/${noteId}`;
    await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

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
            <h4 className="font-raleway font-bold text-xl">
              Do you want to delete this note?
            </h4>
            <div className="flex p-3">
              <button
                className="border-2 border-black p-2 font-semibold"
                onClick={async () => {
                  console.log(deleteNoteId);
                  await deleteNote(deleteNoteId);
                  props.setIsOpen(false) && navigate(`/user/${user.id}/notes`);
                }}
              >
                Delete
              </button>
              <button
                className="ml-auto border-2 border-black p-2 font-semibold"
                onClick={() => props.setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}
