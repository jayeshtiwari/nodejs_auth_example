const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation , loginValidation } = require('../validation');

router.post('/login' , async (req , res) => {
    // Checking for error before saving the user
    const { error } = loginValidation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }

    // Checking for already existing User
    const user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.status(400).send("Email dosen't found");
    }

    const validPassword = await bcrypt.compare(req.body.password , user.password);
    if(!validPassword){
        return res.status(400).send("Please enter correct pass")
    }

    const token = jwt.sign({_id: user._id} , 'hfoiwewhuiw');

    res.header('auth-token',token).send(token)
})

router.post('/register', async (req, res) => {

    // Checking for error before saving the user
    const { error } = registerValidation(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    // Checking for already existing User
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist){
        return res.status(400).send("Email already exist");
    }

    // hashing of password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password , salt);

    // Creating User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {

        // Saving User
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }


})
module.exports = router;