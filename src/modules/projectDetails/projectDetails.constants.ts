import { Timestamp } from "firebase/firestore";

export const MODULE_NAME = 'postDetails';
export const MODULE_API = 'postDetailsAPI';
export const MODULE_TAG = 'PostDetails';
export const MODULE_URL = '/posts';

export const ProjectInitial = {
  id: '',
  projectName: '',
  projectDetails: '',
  projectCategory: '',
  dueDate: Timestamp.fromDate(new Date()),
  createdAt: Timestamp.fromDate(new Date()),
  ceatedBy: {
    id: '',
    displayName: '',
    photoURL: '',
  },
  assignTo: [],
  comments: [],
}