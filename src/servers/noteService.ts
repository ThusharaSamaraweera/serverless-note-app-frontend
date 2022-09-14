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

export default { createNoteService, getAllNotesService };