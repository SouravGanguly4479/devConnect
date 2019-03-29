//Contain details regarding the users 
const express =require('express');
const router = express.Router();

// @route GET api/profile/test
// @desc  test profile routes
// @acess Public

router.get('/profile', (req,res) => res.json({msg :'It Works....'}));


module.exports = router;