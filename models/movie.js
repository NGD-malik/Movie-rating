const mongoose = require('mongoose');
const ModelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 50,
    },
    category:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [
            {
                user:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',  
                },
                comment: String,
                rate: Number
            }
        ],
        default: []
    }
},{
    timestamps: true    
});

ModelSchema.set('toJSON', {
    virtuals: true,
    virsionKey: false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

module.exports = mongoose.model('Movie', ModelSchema);
