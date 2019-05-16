import { IUser } from './user';

export interface INote {
  id: number;
  content: string;
  goldenThought: boolean;
  authorId: number;
  author: IUser;
  dateCreated: Date;
}
