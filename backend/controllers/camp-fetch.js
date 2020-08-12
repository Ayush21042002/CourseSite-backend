const Camp = require('../models/camps');

exports.getCampById = (req, res) => {
    Camp.findById(req.params.id)
        .then(camp => {
            console.log("from db", camp);
            if (camp) {
                res.status(200).json(camp);
            } else {
                res.status(404).json({
                    message: "Post not found"
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: "Some error occured during fetching Data!!"
            })
        });
}


exports.getAllCamps = (req, res) => {
    const _query = Camp.find();
    const pageSize = +req.query.size; //+ parses the string to number.
    const currPage = +req.query.page;
    let fetchedCamps;
    if (pageSize > 0 && currPage > 0) {
        _query.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    _query
        .then(documents => {
            fetchedCamps = documents;
            return Camp.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: "Posts Fetched Succesfully",
                camps: fetchedCamps,
                maxPosts: count
            })
        })
        .catch(err => {
            res.status(404).json({
                message: "Some error occured during fetching Data!!"
            })
        });


}