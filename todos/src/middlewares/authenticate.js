
let jwt = require('jsonwebtoken');

/**
 * this generates the JWT access token
 * @param { object }    user
 * @returns token
 */
function generateToken( user ) {

    // ASYNCHRONOUS WAY
    // jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
    //     console.log(token)       
    //     return token;
    // });

    // SYNCHRONOUS WAY
    return jwt.sign({ user }, 'secretkey', { expiresIn: '60s' } );
}

/**
 * verifies the token
 * 
 */
function verifyToken(req, res, next) {
   
    const authToken = req.headers['authorization'];
    
    if(typeof authToken !== 'undefined') {
      // Split at the space
      const bearer = authToken.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
   
      jwt.verify(bearerToken, 'secretkey', (err) => {

        if(err) {
            // access token doesnt match
            res.status(403).json({ message: 'This resources are forbidden.'});
        } else {
            next();
        }
      });

    } else {
      // Forbidden
      res.status(403).json({ message: 'This resources are forbidden.'});
    }
  
}

export { generateToken, verifyToken };