import { Todo } from '../types/todo';
import { model, Schema } from 'mongoose';

const todoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A todo must have a name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'A todo must have a description'],
    },
    status: {
      type: String,
      enum: ['incomplete', 'complete'],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  { timestamps: true }
);

todoSchema.pre('save', function (next) {
  this.status = 'incomplete';
  next();
});

const Todo = model<Todo>('Todo', todoSchema);

module.exports = Todo;
