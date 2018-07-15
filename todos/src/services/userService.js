import Boom from 'boom';
import User from '../models/user';
import bcrypt from 'bcrypt-nodejs';
import { generateAccessToken, updateRefreshToken } from '../utils/tokensBuilder';
  
/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(user) {
  
  let hashPassword = bcrypt.hashSync(user.password);

  return new User({ 
    name: user.name,
    email: user.email,
    password: hashPassword,
    is_active: user.is_active
  }).save().then(user => user.refresh());
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {

  let hashPassword = bcrypt.hashSync(user.password);

  return new User({ id })
    .save({ 
      name: user.name,
      email: user.email,
      password: hashPassword,
      is_active: user.is_active

    }).then(user => user.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}

/**
 * Login user date
 * 
 * @param {Object} user
 * @return {Promise} 
 */
export function loginUser ( userData ) {

  let password = null; 
  
  return User.forge({ email: userData.email })
    .fetch()
    .then(user => {
     
      if (!user) {
        throw new Boom.notFound('User not found');
      }
      
      password = user.get('password');

      if( bcrypt.compareSync( userData.password, password ) ) {

        let token = generateAccessToken(user);
        
        // UPDATES REFRESH TOKEN IN DB
        updateRefreshToken(user, token.refreshToken )

        return { token, user };
       
      } else {

        throw new Boom.notFound('Password incorrect');
      }
    });
}

/**
 * logout user 
 */
export function logoutUser (user) {

  return updateRefreshToken( user );

}


