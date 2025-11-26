const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const eventSchema = Schema(
    
    {
        title: {
            type: String,
            required: true
        },
        desc_short: {
            type: String,
            required: true
        },
        desc_full: { 
            type: String, 
            required: true 
        },
        imageURL: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        category:  {
            type: String,
            required: true
        },
        ticket_price: {
            type: Number,
            required: true
        },
        added_by: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',                          
            required: true
        }
    }, { timestamps: true }

)



module.exports = mongoose.model('Event', eventSchema);