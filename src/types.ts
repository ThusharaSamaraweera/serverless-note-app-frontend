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
  userId: string;
  title: string;
  content: string;
  categoryId: number;
}

export interface INote {
  noteId: string;
  userId: string;
  title: string;
  content: string;
  categoryId: number;
  createdAt: string;
  modifiedAt: string;
}
