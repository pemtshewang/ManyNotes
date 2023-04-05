import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddButton from "../src/assets/add.png";
import DeleteButton from "../src/assets/delete.png";
import EditButton from "../src/assets/edit.png";
import DeleteDialog from "../src/components/DeleteModal";
import axios from "axios";
import { useQuery, useMutation, QueryCache } from "@tanstack/react-query";
import NoteIdContext from "../context/noteIdContext";
import ViewDialog from "../src/components/ViewNote";

const getUserNotes = async (id) => {
  const notes = await axios.get(`http://localhost:3000/api/user/${id}/notes`);
  return notes.data;
};

const deleteUserNote = async (noteId) => {
  await axios.delete(`http://localhost:3000/api/notes/${noteId}`);
};

const UserNoteList = () => {
  const [deleteNoteId, setDeleteNoteId] = React.useState(0);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [isViewOpen, setIsViewOpen] = React.useState(false);
  const [data, setData] = React.useState({
    title: "",
    content: ""
  });
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    data: notes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["notes", user.id],
    queryFn: () => getUserNotes(user.id),
  });

  useEffect(() => {
    refetch();
  }, [isDeleteOpen]);

  const queryCache = new QueryCache();
  const deleteNoteMutation = useMutation(deleteUserNote, {
    onSuccess: () => {
      queryCache.invalidateQueries(["notes", user.id]);
    },
  });

  const handleDeleteNote = (id) => {
    setDeleteNoteId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteOpen(false);
  };

  const handleNoteDelete = async () => {
    await deleteNoteMutation.mutateAsync(deleteNoteId);
    setIsDeleteOpen(false);
  };

  return (
    <NoteIdContext.Provider value={{ deleteNoteId, setDeleteNoteId }}>
      <div className="flex flex-col">
        <div className="flex brand py-5">
          <div className="text-xl font-bold font-raleway">My Notes</div>
          <NavLink className="ml-auto" to={"create"}>
            <img className="h-9 w-9" src={AddButton} alt="add button" />
          </NavLink>
        </div>
        {isDeleteOpen && (
          <DeleteDialog
            isOpen={isDeleteOpen}
            setIsOpen={handleDeleteDialogClose}
            noteId={deleteNoteId}
            onDelete={handleNoteDelete}
          />
        )}
        {isViewOpen && (
          <ViewDialog isOpen={isViewOpen} setIsOpen={setIsViewOpen} title={data.title} content={data.content} />
        )}
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error</div>
        ) : notes.length > 0 ? (
          notes.map((note) => {
            return (
              <div
                key={note.id}
                className="border-2 border-black px-3 w-full mt-2"
              >
                <p>23/23/23 14:22</p>
                <div className="flex mt-3">
                  <NavLink
                    className="underline"
                    onClick={() => {
                      setData({
                        title:note.title,
                        content:note.content
                      })
                      setIsViewOpen(true)}
                    }

                  >
                    {note.title}
                  </NavLink>
                  <div className="ml-auto flex">
                    <NavLink
                      className="pl-3"
                      onClick={() => {
                        localStorage.setItem(
                          "editNote",
                          JSON.stringify({
                            id: note.id,
                            title: note.title,
                            content: note.content,
                          })
                        );
                      }}
                      to={`/user/${user.id}/notes/${note.id}/edit`}
                      title="Edit Button"
                    >
                      <img
                        className="h-5 w-5"
                        src={EditButton}
                        alt="edit button"
                      />
                    </NavLink>
                    <NavLink
                      className="pl-3"
                      title="Delete Button"
                      onClick={() => handleDeleteNote(note.id)}
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
          <div className="font-raleway text-tracking-wider font-semibold">
            You have no notes now, click the plus icon button to create one
          </div>
        )}
      </div>
    </NoteIdContext.Provider>
  );
};

export default UserNoteList;
