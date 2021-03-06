import Joi from 'joi';
import validate from '../utils/validate';
import * as todoService from '../services/todoService';

const SCHEMA = {
  name: Joi.string()
    .label('Name')
    .max(90)
    .required()
};

// /**
//  * Validate create/update user request.
//  *
//  * @param  {object}   req
//  * @param  {object}   res
//  * @param  {function} next
//  * @return {Promise}
//  */
// function todoValidator(req, res, next) {
//   return validate(req.body, SCHEMA)
//     .then(() => next())
//     .catch(err => next(err));
// }

/**
 * Validate users existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findTodo(req, res, next) {
  return todoService
    .getTodo(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findTodo };
