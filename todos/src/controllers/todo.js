import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import { findTodo } from '../validators/todoValidator';
import * as todoServices from '../services/todoService';

const router = Router();
/**
 * GET /api/todos
 */
router.get('/', (req, res, next) => {
   
    todoServices
        .getAllTodos(req.query)
        // .getByCategory(req.query)
        .then(todos =>{
            // throw 'error';
            res.json({ data: todos });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'this is 500 error message'});
        });
});

/**
 * GET /api/todo/:id
 */
router.get('/:id', (req, res, next) => {

    // console.log(req.params.id);
    todoServices
        .getTodo(req.params.id)
        .then(data => {
            res.json({data : data});
        })
        .catch(() => {
            res.status(500).json({ message: 'this is 500 error message'});
        });

    //   .then(data => res.json({ data }))
    //   .catch(err => next(err));
});


/**
 * POST /api/todo
 */
router.post('/', (req, res, next) => {
    todoServices
        .createTodo(req.body)
        .then(data => {
            res.json({ data : data});
        })
        .catch(() => {
            res.status(500).json({ message: 'this is 500 error message'});
        });

    //   .then(data => res.status(HttpStatus.CREATED).json({ data }))
    //   .catch(err => next(err));
});

// DATA FORMAT FOR POST SHOULD BE JSON
// {
//     "title" : "assignment 3",
//     "description" : "this is assignment 3",
//     "is_completed" : "0"
//  }
  
/**
 * PUT /api/todo/:id
 */
router.put('/:id',findTodo, (req, res, next) => {
    todoServices
        .updateTodo(req.params.id, req.body)
        .then(date => {
            res.json({ data: data});
        })
        .catch(() => {
            res.status(500).json({ message: 'this is 500 error message'});
        });
    //   .then(data => res.json({ data }))
    //   .catch(err => next(err));
});

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findTodo, (req, res, next) => {
    todoServices
        .deleteTodo(req.params.id)
        .then( data => {
            res.json({ data: data });
        })
        .catch(() => {
            res.status(500).json({ message: 'this is 500 error message'});
        });
    //   .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    //   .catch(err => next(err));
  });
  
export default router;