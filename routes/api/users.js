//Only to be used for authentication of users
const express =require('express');
const router = express.Router();

// @route GET api/users/test
// @desc  test users routes
// @acess Public


router.get('/test', (req,res) => res.json({msg :'It Works....'}));


module.exports = router;