const mongoose= require('mongoose')
const standupSchema = new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
})
module.exports = mongoose.model('Admin',standupSchema)