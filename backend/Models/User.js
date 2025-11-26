const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const userSchema = Schema(
    
   {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false 
    },
    imageURL: String,
    provider: {
        type: String,
        required: true, 
        default: 'credentials' 
    }
}, { timestamps: true }

)



module.exports = mongoose.model('User', userSchema);