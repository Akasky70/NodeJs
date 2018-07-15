import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import { findUser, userValidator } from '../validators/userValidator';
import { authenticate } from '../middlewares/auth';

const router = Router();


/**
 * GET /api/users/login
 */
router.get('/login', (req, res, next) => {
  
  //console.log(req.headers);
  userService
    .loginUser(req.headers)
    .then(data => res.json({ 
      status: 'You are logged in',
      data:data 
    }))
    .catch(err => next(err));

});


/**
 * GET /api/users
 */
router.get('/', authenticate, (req, res, next) => {
  userService
    .getAllUsers()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});



/**
 * GET /api/users/logout
 */
router.get('/logout', (req, res, next) => {
  
  //console.log(req.headers);
  userService
    .logoutUser(req.headers)
    .then(data => res.json({ 
      status: 'You are logged out',
      data:data 
    }))
    .catch(err => next(err));

});

/**
 * GET /api/users/:id
 */
router.get('/:id', authenticate, (req, res, next) => {
  userService
    .getUser(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/users
 */
router.post('/',authenticate, userValidator,  (req, res, next) => {
  userService
    .createUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/users/:id
 */
router.put('/:id', authenticate, findUser, userValidator, (req, res, next) => {
  userService
    .updateUser(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', authenticate, findUser, (req, res, next) => {
  userService
    .deleteUser(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
