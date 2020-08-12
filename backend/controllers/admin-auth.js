const _Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');


exports.checkLogin = (req, res, next) => {
    let authorizedAdmin;
    Admin.findOne({ email: req.body.email })
        .then(admin => {
            if (!admin) {
                return res.status(401).json({
                    message: 'Authentication Failed!!'
                })
            }
            authorizedAdmin = admin;
            //since bcrypt only provide facilty to encrypt , there is no way to decrypt it .
            // but it provide compare fucntion that will work.
            return _Bcrypt.compare(req.body.password, admin.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Invalid Login Credentials!!'
                })
            }
            //lets create a token , if user exists and it authenticated
            const token = jwt.sign({ email: authorizedAdmin.email, adminId: authorizedAdmin._id },"This is an admin auth", { expiresIn: '1h' });
            res.status(200).json({
                token: token,
                expirationTime: 3600,
                _id: authorizedAdmin._id,
                email: authorizedAdmin.email,
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Authentication Failed!!'
            })
        })
}