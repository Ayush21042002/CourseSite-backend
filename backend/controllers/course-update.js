const Course = require('../models/courses');

exports.updateCourse = (req, res) => {
    let imagePath;

    if (req.file) {
        const url = req.protocol + "://" + req.get('host');
        imagePath = url + "/images/" + req.file.filename
    } else {
        imagePath = req.body.imagePath;
    }
    const course = new Course({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        rating: Number(req.body.rating),
        field: req.body.field,
        url: req.body.url,
    });
    //creator is added to prevent , the user who doesnot belong to post to do changes.
    Course.updateOne({ _id: req.params.id,}, course)
        .then(result => {
            if (result.n === 0) {
                return res.status(401).json({
                    message: "User not authorized",
                    course: null
                })
            }
            res.status(200).json({
                message: "updated succesfully",
                course: course
            })
        })
        .catch(err => {
            res.status(417).json({
                message: "Course Edit Failed!!"
            })
        });
}