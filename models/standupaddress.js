const mongoose= require('mongoose')
const standupSchema = new mongoose.Schema({
    username:{type:String},
    address:{type:String},
    city:{type:String},
    pincode:{type:String},
    state:{type:String},
    country:{type:String},
})
module.exports=mongoose.model('Addresse',standupSchema)