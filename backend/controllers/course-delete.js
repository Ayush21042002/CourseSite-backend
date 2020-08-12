const Course = require('../models/courses');

exports.deleteCourse = (req, res) => {
    //console.log(req.userData.userId)
    Course.deleteOne({ _id: req.params.id})
        .then(result => {

            if (result.n === 0) {
                return res.status(401).json({
                    message: "Admin not authorized",

                })
            } else {
                res.status(200).json({
                    message: "Deleted Succesfully"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Delete Failed!!"
            })
        });


}