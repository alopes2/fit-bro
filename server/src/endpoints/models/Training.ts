import { Worksheet } from './Worksheet';
export interface Training {
  id: string;
  createdAt: Date;
  worksheets?: Worksheet[]
}
