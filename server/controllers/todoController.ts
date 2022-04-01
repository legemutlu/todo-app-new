const importFactory = require('./controllerFactory');
const Todo = require('../models/todoModel');

exports.getAllTodos = importFactory.getAll(Todo);
exports.getTodoById = importFactory.getOne(Todo);
exports.createTodo = importFactory.createOne(Todo);
exports.updateTodo = importFactory.updateOne(Todo);
exports.deleteTodo = importFactory.deleteOne(Todo);
