import Joi from 'joi';
import validate from '../utils/validate';
import * as categoryService from '../services/categoryService';

const SCHEMA = {
  name: Joi.string()
    .label('Name')
    .max(90)
    .required()
};

/**
 * Validate users existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findCategory(req, res, next) {
  return categoryService
    .getCategory(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findCategory };
