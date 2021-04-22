const mongoose= require('mongoose')
const standupSchema = new mongoose.Schema({
    cardnumber:{type:String},
    cardowner:{type:String},
    expirymonth:{type:Number},
    expiryyear:{type:Number},
    cardtype:{type:String},
    username:{type:String},
   
})
module.exports=mongoose.model('Paymentcard',standupSchema)