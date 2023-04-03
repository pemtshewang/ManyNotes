import React from "react";
import { NavLink } from "react-router-dom";
import AddButton from "../src/assets/add.png";
import DeleteButton from "../src/assets/delete.png";
import EditButton from "../src/assets/edit.png";
import DeleteDialog from "../src/components/DeleteModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getUserNotes = async (id) => {
  const notes = await axios.get(`http://localhost:3000/api/user/${id}/notes`);
  return notes.data;
};

const UserNoteList = () => {
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", user.id],
    queryFn: () => getUserNotes(user.id),
  });
  return (
    <div className="flex flex-col w-max">
      <div className="flex brand py-5">
        <div className="text-xl font-bold font-raleway">My Notes</div>
        <NavLink
          className="ml-auto"
          onClick={navigate(`/user/${user.id}/notes/create`)}
        >
          <img className="h-9 w-9" src={AddButton} alt="add button" />
        </NavLink>
      </div>
      {isDeleteOpen && (
        <DeleteDialog
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          noteId={1}
        />
      )}
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : data.length > 0 ? (
        data.map((note) => {
          return (
            <div className="border-2 border-black px-3 w-w-450">
              <p>23/23/23 14:22</p>
              <div className="flex mt-3">
                <NavLink className="underline" to="#">
                  {note.title}
                </NavLink>
                <div className="ml-auto flex">
                  <NavLink className="pl-3" title="Edit Button">
                    <img
                      className="h-5 w-5"
                      src={EditButton}
                      alt="edit button"
                    />
                  </NavLink>
                  <NavLink
                    className="pl-3"
                    title="Delete Button"
                    onClick={() => setIsDeleteOpen(true)}
                  >
                    <img
                      className="h-5 w-5"
                      src={DeleteButton}
                      alt="delete button"
                    />
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center">No notes found</div>
      )}
    </div>
  );
};

export default UserNoteList;
