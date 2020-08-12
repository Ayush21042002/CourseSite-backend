const Course = require('../models/courses');

exports.getCourseById = (req, res) => {
    Course.findById(req.params.id)
        .then(course => {
            console.log("from db", course);
            if (course) {
                res.status(200).json(course);
            } else {
                res.status(404).json({
                    message: "Course not found"
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: "Some error occured during fetching Data!!"
            })
        });
}


exports.getAllCourses = (req, res) => {
    const _query = Course.find();
    const pageSize = +req.query.size; //+ parses the string to number.
    const currPage = +req.query.page;
    let fetchedCourses;
    if (pageSize > 0 && currPage > 0) {
        _query.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    _query
        .then(documents => {
            fetchedCourses = documents;
            return Course.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: "Posts Fetched Succesfully",
                courses: fetchedCourses,
                maxCourses: count
            })
        })
        .catch(err => {
            res.status(404).json({
                message: "Some error occured during fetching Data!!"
            })
        });


}