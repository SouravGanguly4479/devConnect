//Post that usrs will make in the forum
const express =require('express');
const router = express.Router();

// @route GET api/posts/test
// @desc  test posts routes
// @acess Public

router.get('/posts', (req,res) =>res.json({msg :'It Works....'}));


module.exports = router;