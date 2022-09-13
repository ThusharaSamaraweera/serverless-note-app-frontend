import { IProfile } from "../types";
import { API } from "aws-amplify";

const createUserService = (profile: any) => {
  try {
    return API.post("users", "/users", {
      body: profile,
    });
    
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
}

export default {createUserService};