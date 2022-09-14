import { API } from "aws-amplify";
import { INewNote } from "../types";

const createNoteService = (note: INewNote) => {
  try {
    return API.post("notes", "/notes", {
      body: note,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
}

const getAllNotesService = async (userId: string) => {
  try {
    return API.get("notes", "/notes", {
      queryStringParameters: {
        userId,
      },
    });
  } catch (error) { 
    console.log(error);
    throw new Error(error as string);
  }
}

const getNoteService = async (noteId: string, userId: string) => {
  try {
    return API.get("notes", `/notes/${noteId}`, {
      queryStringParameters: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
}

const updateNoteService = async (noteId: string, userId: string, note: INewNote) => {
  try {
    return API.put("notes", `/notes/${noteId}`, {
      body: note,
      queryStringParameters: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
}

export default { createNoteService, getAllNotesService, getNoteService, updateNoteService };