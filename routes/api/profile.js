//Contain details regarding the users 
const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load Profile Model
const Profile = require('../../models/Profile');
//Load User Model
const User = require('../../models/User');




// @route GET api/profile/test
// @desc  test profile routes
// @acess Public

router.get('/profile', (req,res) => res.json({msg :'It Works....'}));

// @route GET api/profile
// @desc  GEt current user profile
// @acess Private

router.get('/',passport.authenticate('jwt',{session:false}),(req,res) =>{
    /* res.json({msg: 'Hello'}); */

    const errors = {};
    Profile.findOne( {user:req.user.id})
            .then(profile =>{
                if(!profile){

                    errors.noprofile = 'There is no profile for this user';
                    res.status(404).json(errors);
                }else{
                res.json(profile);
                }
            }).catch(err => res.status(404).json(err));

});

module.exports = router;