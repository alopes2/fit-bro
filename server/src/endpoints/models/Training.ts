import { Worksheet } from './Worksheet';

export interface Training {
  id: string;
  worksheets: Worksheet[];
  createdAt: Date;
}
