//Only to be used for authentication of users
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

//Load User model 
const User = require('../../models/User');
// @route GET api/users/test
// @desc  test users routes
// @acess Public


router.get('/test', (req, res) => res.json({ msg: 'It Works....' }));

// @route GET api/users/register
// @desc  Register users
// @acess Public



router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',//Size
                    r: 'pg',//rating
                    d: 'mm' //default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) { throw err; }
                        else {
                            newUser.password = hash;
                            newUser.save()
                                .then(user => res.json(user))//.save() is a mongoose function which gives/return/promise the user which is created  
                                .catch(err => console.log(err));
                        }
                    })
                })


            }
        });
});



// @route GET api/users/login
// @desc  Login users / Returning Json Web token or JWT
// @acess Public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user by email
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ email: 'User Not found' });
            }
            //Check password

            bcrypt.compare(password, user.password) //fetch password from user in line 71
                .then(isMatch => {
                    if(!isMatch)
                    {
                        return res.status(400).json({password:'Incorrect password'});
                    }
                    else{
                        return res.json({msg:'Success...'});
                    }
                })


        })
});


module.exports = router;