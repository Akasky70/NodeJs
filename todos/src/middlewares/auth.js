import jwt from 'jsonwebtoken';
import * as UserServices from '../services/userService';
import { verifyRefreshToken } from '../utils/tokensBuilder';


/**
 * verifies the token
 * 
 */
async function authenticate(req, res, next) {
   
    const authToken = req.headers.authorization;
    const isRefresh = await authenticateRefreshToken( req.headers );

    if(typeof authToken !== 'undefined') {
   
      jwt.verify(authToken, 'secretkey', (err) => {

        if(err) {
            if( isRefresh ) {
                next();
            } else {
                // access token doesnt match
                res.status(403).json({ message: 'This resource is forbidden, acess key expired'});
            }
        } else {
            next();
        }
      });

    } else {
      // Forbidden
      res.status(403).json({ message: 'This resource is forbidden, no access token found'});
    }
  
}

/**
 * authenticate with refresh token
 */
async function authenticateRefreshToken( reqHeaders ){

    let userId = reqHeaders.user_id;
    let refreshToken = reqHeaders.refresh_token;

    if( refreshToken && userId){

        let isValid = 0;

        await verifyRefreshToken( refreshToken, userId )
        .then(count => {
            isValid = count; 
        })
        
        if (isValid == 1) return true;
        else return false;
       
    } else {

        return false;
    }

}

export { authenticate };