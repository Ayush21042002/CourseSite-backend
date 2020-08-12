const Camp = require('../models/camps');

exports.createCamp = (req, res, next) => {
    //construct a url to server.
    const url = req.protocol + "://" + req.get('host');
    console.log("hello");
    const camp = new Camp({
        title: req.body.title,
        description: req.body.description,
        rating: Number(req.body.rating),
        field: req.body.field,
        imagePath: url + "/images/" + req.file.filename,
        url: req.body.url,
    });
    console.log('done');
    camp.save()
        .then((createdCamp) => {
            res.status(201).json({
                message: 'added succesfully',
                camp: {
                    id: createdCamp._id,
                    //...createdPost
                    //or ca use 
                    title: createdCamp.title,
                    description: createdCamp.description,
                    imagePath: createdCamp.imagePath,
                    rating: createdCamp.rating,
                    field: createdCamp.field,  
                    url: createdCamp.url,        
                }
            });
        })
        .catch(err => {
            res.status(417).json({
                message: "Camp not Added!! Some error occured!!"
            })
        })
}