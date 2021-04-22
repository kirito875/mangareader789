const Standup = require('../../models/standup')
const Standupcart=require('../../models/standupcart')
const Standupuser=require('../../models/userstandup')
const Standupadmin=require('../../models/adminstandup')
const Standuporder=require('../../models/ordersstandup')
const Standupaddress=require('../../models/standupaddress')
const Standupcards=require('../../models/standupcards')
const jwt=require("jsonwebtoken");
module.exports = function (router){

    router.post('/standup',function(req, res){
        let note = new Standup(req.body)
        note.save(function(err,note){
            if(err){
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })
   

    router.get('/standup',function(req,res){
        Standup.find({},(err,stand)=>{
            if(err){
                res.json({success:false, message:err});
            }
            else{
                if(!stand)
                {
                    res.json({success:false, message:"no standup found"});
                }
                else{
                    res.send({success:true, standup:stand});
                }
            }
        })
    })
  router.delete("/deleteitem/:id",(req,res)=>{
        if(!req.params.id){
            res.json({success:false,message:"no id provided"})
        }
        else{
            Standup.findOne({_id:req.params.id},(err,standup)=>{
                if(err){res.json({success:false,message:"invalid id"})
                        }
                else{
                    standup.remove((err)=>{
                        if(err){res.json({success:false,message:err})
                    }
                    else{
                        res.json({success:false,message:"item removed"})
                    }
                    })
                }        
            })
        }
    })






    router.post('/addcart',function(req, res){
        let note = new Standupcart(req.body)
        note.save(function(err,note){
            if(err){
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })
    
     router.get('/addcart',async function(req,res){
        Standupcart.find({},(err,stand)=>{
            if(err){
                res.json({success:false, message:err});
            }
            else{
                if(!stand)
                {
                    res.json({success:false, message:"no standup found"});
                }
                else{
                    res.send({success:true, standup:stand});
                }
            }
        })
    })
    router.delete("/deletecartitem/:id",(req,res)=>{
        if(!req.params.id){
            res.json({success:false,message:"no id provided"})
        }
        else{
            Standupcart.findOne({_id:req.params.id},(err,standup)=>{
                if(err){res.json({success:false,message:"invalid id"})
                        }
                else{
                    standup.remove((err)=>{
                        if(err){res.json({success:false,message:err})
                    }
                    else{
                        res.json({success:false,message:"item removed"})
                    }
                    })
                }        
            })
        }
    })
   
    router.post("/newuser",(req,res)=>{
        let user = Standupuser(req.body);
        let userdata = req.body;
        let usernameloc = userdata.username;
        let emailloc=userdata.email;
        Standupuser.findOne({username:usernameloc},(err,userfound)=>{
            if(!userfound){
                Standupuser.findOne({email:emailloc},(err,emailfound)=>{
                    if(!emailfound){
                        user.save(function(err,note){
                            if(err){
                                return res.status(400).json(err)
                            }
                            else{
                                res.send({message:"signup successfull",note:note})
                            }
                        })
                    }
                    else{
                        res.send({message:"email already exists"})
                    }
                })
            }
            else{
              res.send({message:"username already exists"})
            }
        })

    })

    router.post("/verifyuser",(req,res)=>{
        let givenuser=req.body;
        let givenemail=givenuser.email;
        let givenpassword=givenuser.password;
        Standupuser.findOne({email:givenemail},(err,emailfound)=>{
            if(!emailfound){
                res.send({message:"please register on this mail"})
            }
            else{
               if(emailfound.password==givenpassword){
                 jwt.sign({username:emailfound.username},"abcd",{expiresIn:"2d"},function(err, token) {
                   
                    res.send({message:"login success mama",token:token,userobj:emailfound})
                  })
                 
               } 
               else{
                   res.send({message:"wrong password"})
               }
            }
        })
    })

    router.post("/newadmin",(req,res)=>{
        let user = Standupadmin(req.body);
        let userdata = req.body;
        let usernameloc = userdata.username;
        let emailloc=userdata.email;
        Standupadmin.findOne({username:usernameloc},(err,userfound)=>{
            if(!userfound){
                Standupadmin.findOne({email:emailloc},(err,emailfound)=>{
                    if(!emailfound){
                        user.save(function(err,note){
                            if(err){
                                return res.status(400).json(err)
                            }
                            else{
                                res.send({message:"signup successfull",note:note})
                            }
                        })
                    }
                    else{
                        res.send({message:"email already exists"})
                    }
                })
            }
            else{
              res.send({message:"username already exists"})
            }
        })

    })

    router.post("/verifyadmin",(req,res)=>{
        let givenuser=req.body;
        let givenemail=givenuser.email;
        let givenpassword=givenuser.password;
        Standupadmin.findOne({email:givenemail},(err,emailfound)=>{
            if(!emailfound){
                res.send({message:"please register on this mail"})
            }
            else{
               if(emailfound.password==givenpassword){
                 jwt.sign({username:emailfound.username},"abcd",{expiresIn:"2d"},function(err, token) {
                   
                    res.send({message:"login success mama",token:token,userobj:emailfound})
                  })
                 
               } 
               else{
                   res.send({message:"wrong password"})
               }
            }
        })
    })

    router.delete("/selectedProductsAll/:username", (req, res) => {
        let userna=req.params.username
        
              
                
               Standupcart.remove({ username:userna }, 
                (err) => {
                  if (err) console.log("error");
                  else console.log("standup deleted");
                  
                })
              
                
            })

         router.post('/order',function(req, res){
                let note = new Standuporder(req.body)
                note.save(function(err,note){
                    if(err){
                        return res.status(400).json(err)
                    }
                    res.status(200).json(note)
                })
            })
            router.get('/ordersget',function(req,res){
                Standuporder.find({},(err,stand)=>{
                    if(err){
                        res.json({success:false, message:err});
                    }
                    else{
                        if(!stand)
                        {
                            res.json({success:false, message:"no standup found"});
                        }
                        else{
                            res.send({success:true, standup:stand});
                        }
                    }
                })
            })

            router.delete("/orders", (req, res) => {
                
                      
                        
                       Standuporder.remove({}, 
                        (err) => {
                          if (err) console.log("error");
                          else console.log("standup deleted");
                          
                        })
                      
                        
                    })

              router.post('/newaddress',function(req, res){
                        let note = new Standupaddress(req.body)
                        note.save(function(err,note){
                            if(err){
                                return res.status(400).json(err)
                            }
                            res.status(200).json(note)
                        })
                    })

                    router.get('/address',function(req,res){
                        Standupaddress.find({},(err,stand)=>{
                            if(err){
                                res.json({success:false, message:err});
                            }
                            else{
                                if(!stand)
                                {
                                    res.json({success:false, message:"no standup found"});
                                }
                                else{
                                    res.send({success:true, standup:stand});
                                }
                            }
                        })
                    })

                    router.post('/newcard',function(req, res){
                        let note = new Standupcards(req.body)
                        note.save(function(err,note){
                            if(err){
                                return res.status(400).json(err)
                            }
                            res.status(200).json(note)
                        })
                    }) 

                    router.get('/cards',function(req,res){
                        Standupcards.find({},(err,stand)=>{
                            if(err){
                                res.json({success:false, message:err});
                            }
                            else{
                                if(!stand)
                                {
                                    res.json({success:false, message:"no standup found"});
                                }
                                else{
                                    res.send({success:true, standup:stand});
                                }
                            }
                        })
                    })

                    router.delete("/deleteallcards", (req, res) => {
                       
                        
                              
                                
                               Standupcards.remove({  }, 
                                (err) => {
                                  if (err) console.log("error");
                                  else console.log("standup deleted");
                                  
                                })
                              
                                
                            })





}