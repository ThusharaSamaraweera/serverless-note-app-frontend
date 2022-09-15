import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-toastify";

import { useAppContext } from "../lib/context/contextLib";
import noteService from "../servers/noteService";

import { INote } from "../types";
import NoteCart from "../components/NoteCart";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [noteList, setNoteList] = useState<INote[]>([]);
  const { isAuthenticated, authUser, setError } = useAppContext();

  const getNotes = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      setIsLoading(true);
      const notes = await noteService.getAllNotesService(authUser.id);
      if (notes.status === "success") {
        setNoteList(notes.data);
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getNotes();
  }, [isAuthenticated, authUser.id]);

  const renderNotesList = (notes: INote[]) => {
    return (
      <>
        <LinkContainer to="/create-new-note">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-3 font-weight-bold"> Create a new note</span>
          </ListGroup.Item>
        </LinkContainer>

        {notes.length === 0 && (
          <div className="my-2">You have not yet added any notes.</div>
        )}

        {notes.map(({ noteId, title, createdAt, modifiedAt }) => (
          <NoteCart
            key={noteId}
            title={title}
            noteId={noteId}
            createdAt={createdAt}
            modifiedAt={modifiedAt}
          />
        ))}
      </>
    );
  };

  const renderNotes = () => {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>

        <ListGroup>
          {!isLoading ? (
            renderNotesList(noteList)
          ) : (
            <div className="text-center">
              <div className="spinner-border mr-4" role="status"></div>
              <span className="ml-4 sr-only"> Loading...</span>
            </div>
          )}
        </ListGroup>
      </div>
    );
  };

  const renderLander = () => {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p className="text-muted">A simple note taking app</p>
      </div>
    );
  };

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
