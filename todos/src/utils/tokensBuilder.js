import uuid from 'uuid/v4';
import User from '../models/user';
import jwt from 'jsonwebtoken';

/**
 * this generates the JWT access token
 * @param { object }    user
 * @returns token
 */
function generateAccessToken( user ) {

    // GENERATING REFRESH TOKEN
    let refreshToken = generateRefreshToken( user );

    let accessToken = jwt.sign({ user }, 'secretkey', { expiresIn: '60s' } );
    return { accessToken, refreshToken };

}

/**
 * Generates refresh token
 */
function generateRefreshToken () {

    return uuid();
   
}

/**
 * 
 * @param {object} user 
 * @param {string} refresh_token 
 * 
 */
function updateRefreshToken( user, refresh_token ) {

    if( typeof refresh_token !== "undefined" ) {
  
      return User.where({ email:user.get('email') })
          .save({ refresh_token: refresh_token },{patch:true});
  
    } else {
  
      return User.where({ email:user.email })
        .save({ refresh_token: null },{patch:true})
        .then( user => {
          
          return { message: "user loged out"}
        })
    }
}

/**
 * Function to compare refresh token
 */
function verifyRefreshToken ( refreshToken, userId ) {

    return User.where({ refresh_token: refreshToken, id: userId }).count();
     
}


export { generateAccessToken, updateRefreshToken, verifyRefreshToken }