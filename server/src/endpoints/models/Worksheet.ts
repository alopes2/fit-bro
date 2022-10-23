import { Exercise } from './Exercise';
export interface Worksheet {
  id: string;
  exercises: Exercise[];
  createdAt: Date;
};
