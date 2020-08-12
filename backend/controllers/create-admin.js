const _Bcrypt = require("bcryptjs");

const Admin = require("../models/admin");

exports.createUser = (req, res) => {
    console.log(req.body)
    _Bcrypt.hash(req.body.password, 10).then((hash) => {
        const admin = new Admin({
            email: req.body.email,
            //password should be saved in encrypted manner, we will use Bcrypt package for this.
            password: hash,
        });

        admin
            .save()
            .then((result) => {
                res.status(201).json({
                    message: "Succefully Registered",
                    addedAdmin: result.email,
                });
            })
            .catch((err) => {
                res.status(417).json({
                    message: "Already Registered!!",
                });
            });
    });
};
