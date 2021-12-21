export interface IUser {
  displayName: string;
  id: string;
  photoURL: string;
}

export interface IProject {
  id: string;
  projectName: string;
  projectDetails: string;
  projectCategory: string;
  dueDate: any;
  createdAt: any;
  createdBy: IUser;
  assignTo: IUser[];
  comments: [];
}