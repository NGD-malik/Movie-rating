const User = require('../models/user');
const jwtHelpers = require('../utils/jwtHelpers');
const { hashPassword, comparedPassword } = require('../utils/helpers');

exports.login = async (req, res) => {

    const {email, password} = req.body;

    if (!email || !password){
        return res.status(400).json({
            message: 'Email and Password required!'
        })
    };

    const userDB = await User.findOne({ email });
    if (!userDB){
        return res.status(401).json({
            message: 'Failed authentication!'
        });
    };

    if ( comparedPassword(password, userDB.password) ){
        return res.status(200).json({
            message: 'Logged In!',
            data: {
                id: userDB.id,
                name: userDB.name,
                accessToken: jwtHelpers.sign({sub: userDB.id})
            }
        });
    }else{
        return res.status(401).json({
            message: 'Not Allowed!'
        })
    }


};

exports.register = async (req, res) => {

    const {name , email} = req.body;
    const userDB = await User.findOne({ email });
    const password = hashPassword(req.body.password);

    if (userDB){
        res.status(400).json({
            message: 'user alerady exists!'
        })
    }else{
        const user = User({
            name,
            email,
            password
        });
    
        try {
            await user.save();
            res.json({
                success: true
            });
        } catch (err) {
            res.status(500).json({
                message: 'something went wrong!'
            })
        }
    };
};

exports.me = async (req, res) => {

    const user = await User.findById(req.userId);

    res.json({
        success: true,
        data: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
};