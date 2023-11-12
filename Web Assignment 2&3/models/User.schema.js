const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    id: Number,
    FullName :String,
    email:String,
    Password:String,
    role: String,
    isBlocked: Boolean,
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]

},{timestamps:true})
const model = mongoose.model("User" , userSchema);
module.exports = model;

