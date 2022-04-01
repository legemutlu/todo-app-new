import { Document } from 'mongoose';

export interface Todo extends Document {
  name: string;
  description: string;
  status: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}
