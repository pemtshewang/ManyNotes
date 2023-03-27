import React from "react";
import { NavLink } from "react-router-dom";
import AddButton from "../src/assets/add.png";
import DeleteButton from "../src/assets/delete.png";
import EditButton from "../src/assets/edit.png";
import DeleteDialog from "../src/components/DeleteModal";

const UserNoteList = () => {
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  return (
    <div className="flex flex-col w-max">
      <div className="flex brand py-5">
        <div className="text-xl font-bold font-raleway">My Notes</div>
        <NavLink className="ml-auto">
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
      <div className="border-2 border-black px-3 w-w-450">
        <p>23/23/23 14:22</p>
        <div className="flex mt-3">
          <NavLink className="underline" to="#">
            Notes 1
          </NavLink>
          <div className="ml-auto flex">
            <NavLink className="pl-3" title="Edit Button">
              <img className="h-5 w-5" src={EditButton} alt="edit button" />
            </NavLink>
            <NavLink
              className="pl-3"
              title="Delete Button"
              onClick={() => setIsDeleteOpen(true)}
            >
              <img className="h-5 w-5" src={DeleteButton} alt="delete button" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNoteList;
