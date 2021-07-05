const router = require('express').Router();
const verify = require('../routes/verifyToken')

router.get('/', verify ,  (req , res) =>{
    res.send({posts:{
        name:"jayesh",
        age:28,
    }})
})
module.exports = router;