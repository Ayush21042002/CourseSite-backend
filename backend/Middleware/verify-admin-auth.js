const jwt = require('jsonwebtoken')


//this fucntion is a middleware that will execute for the paths that areconfigured for authentication.
module.exports = (req, res, next) => {
    //token we are receiving is "Bearer *token*". 
    //can ommit bearer in other apps.
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, "This is an admin auth");

        //here to get the token and make it avaible to all the further procedure, we added a field to 
        //the request object, whichever route using this middleware , will receive this userData, as request
        //is transferred to next() middleware.
        req.userData = { email: decodedToken.email, adminId: decodedToken.adminId };
        next();
    } catch (error) {
        res.status(401).json({
            message: "Authentication Failed!!"
        })
    }

}