const Camp = require('../models/camps');

exports.deleteCamp = (req, res) => {
    //console.log(req.userData.userId)
    Camp.deleteOne({ _id: req.params.id})
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