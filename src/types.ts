export interface IProfile {
  firstName: string;
  lastName: string;
  username: string;
  birthDate: string;
  country: string;
  state: string;
  phoneNumber: number;
  mobileNumber: number;
}

export interface IAuthUser {
  id: string;
  email: string;
}

export interface INewNote {
  title: string;
  content: string;
}