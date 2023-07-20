const Movie = require('../models/movie');
const jwtHelpers = require('../utils/jwtHelpers');

exports.create = async (req, res) => {

    const { name, category, description} = req.body;
    const movie = Movie({name , category, description});

    try {
        await movie.save();
        res.json({
            success: true,
            data: movie,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong!'
        })
    }



};

exports.list = async (req, res) => {
    res.json({
        success: true,
    });
};

exports.find = async (req, res) => {

    const {id} = req.params;
    const movie = await Movie.findById(id);

    if (!movie){
        return res.status(404).send();
    }

        res.json({
            success: true,
            data: movie
        });
};

exports.update = async (req, res) => {
    
    const {id} = req.params;
    const { name, category, description} = req.body;

    await Movie.updateOne({_id: id}, {
        $set: {
            name,
            category,
            description
        }
    });

    // if (!movie){
    //     return res.status(404).send();
    // }    
    
    res.json({
        success: true,
    });
};

exports.delete = async (req, res) => {
    res.json({
        success: true,
    });
};