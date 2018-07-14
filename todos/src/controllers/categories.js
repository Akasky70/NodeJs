import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import { findCategory } from '../validators/categoryValidator';
import * as categoryService from '../services/categoryService';

const router = Router();
/**
 * GET /api/todos
 */
router.get('/', (req, res, next) => {
   
    categoryService
        .getAllCategories()
        .then(categories =>{
            // throw 'error';
            res.json({ data: categories });
        })
        .catch(() => {
            res.status(500).json({ message: 'this is 500 error message'});
        });
});

/**
 * GET /api/todo/:id
 */
router.get('/:id', (req, res, next) => {
    categoryService
      .getCategory(req.params.id)
      .then(data => res.json({ data }))
      .catch(err => next(err));
});

/**
 * POST /api/todo
 */
router.post('/', (req, res, next) => {
    categoryService
      .createCategory(req.body)
      .then(data => res.status(HttpStatus.CREATED).json({ data }))
      .catch(err => next(err));
});
  
/**
 * PUT /api/todo/:id
 */
router.put('/:id',findCategory, (req, res, next) => {
    categoryService
      .updateCategory(req.params.id, req.body)
      .then(data => res.json({ data }))
      .catch(err => next(err));
});

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findCategory, (req, res, next) => {
    categoryService
      .deleteCategory(req.params.id)
      .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
      .catch(err => next(err));
  });
  
export default router;