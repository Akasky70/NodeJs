import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import { findTodo } from '../validators/todoValidator';
import * as todoServices from '../services/todoService';
import { verifyToken } from '../middlewares/authenticate';

const router = Router();
/**
 * GET /api/todos
 */
router.get('/', verifyToken, (req, res, next) => {
   
    todoServices
    .getAllTodos(req.query, req.token)
    .then(todos =>{
        
        res.json({ data: todos });
    })
    .catch((err) => {
        
        res.status(500).json({ message: 'this is 500 error message'});
    });
});

/**
 * GET /api/todo/:id
 */
router.get('/:id', verifyToken, (req, res, next) => {

    todoServices
        .getTodo(req.params.id)
        .then(data => {
            res.json({data : data});
        })
        .catch(() => {
            res.status(500).json({ message: 'this is 500 error message'});
        });
});


/**
 * POST /api/todo
 */
router.post('/', verifyToken, (req, res, next) => {
    todoServices
        .createTodo(req.body)
        .then(data => {
            res.json({ data : data});
        })
        .catch(() => {
            res.status(500).json({ message: 'this is 500 error message'});
        });
});

/**
 * PUT /api/todo/:id
 */
router.put('/:id', verifyToken, findTodo, (req, res, next) => {
    todoServices
        .updateTodo(req.params.id, req.body)
        .then(data => {
            res.json({ data: data});
        })
        .catch(() => {
            res.status(500).json({ message: 'this is 500 error message'});
        });
    
});

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', verifyToken, findTodo, (req, res, next) => {
    todoServices
        .deleteTodo(req.params.id)
        .then( data => {
            res.json({ data: data });
        })
        .catch(() => {
            res.status(500).json({ message: 'this is 500 error message'});
        });
  });
  
export default router;