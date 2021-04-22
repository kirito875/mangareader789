const mongoose= require('mongoose')
const standupSchema = new mongoose.Schema({
    username:{type:String},
    order:{type:Array},
})
module.exports=mongoose.model('Order',standupSchema)