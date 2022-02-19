const mongoose = require('mongoose')

//event schema
const eventSchema = new mongoose.Schema({
    event_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    
    location:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    
}, {
    timestamps: true
})


module.exports = mongoose.model("Events", eventSchema)