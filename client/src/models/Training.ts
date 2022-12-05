import { Worksheet } from './Worksheet'

export interface Training {
  id: string;
  createdAt: string;
  worksheets: Worksheet[];
}
