const Course = require('../models/courses');

exports.createCourse = (req, res, next) => {
    //construct a url to server.
    const url = req.protocol + "://" + req.get('host');
    console.log("hello");
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        rating: Number(req.body.rating),
        field: req.body.field,
        imagePath: url + "/images/" + req.file.filename,
        url: req.body.url,
    });
    console.log('done');
    course.save()
        .then((createdCourse) => {
            res.status(201).json({
                message: 'added succesfully',
                course: {
                    id: createdCourse._id,
                    //...createdPost
                    //or ca use 
                    title: createdCourse.title,
                    description: createdCourse.description,
                    imagePath: createdCourse.imagePath,
                    rating: createdCourse.rating,
                    field: createdCourse.field,  
                    url: createdCourse.url,        
                }
            });
        })
        .catch(err => {
            res.status(417).json({
                message: "Course not Added!! Some error occured!!"
            })
        })
}