const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

const {
    getAllTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo,
} = todoController;

router
    .route('/')
    .get(getAllTodos)
    .post(createTodo);
router
    .route('/:id')
    .get(getTodoById)
    .patch(
        updateTodo
    )
    .delete(deleteTodo);

module.exports = router;