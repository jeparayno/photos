const User = require('../models/user.models');

const index = (req, res) => {
    res.json({
        message: "You are ready to be connected"
    });
}

const register = async(req,res) => {
    try {

        const {name,email,password} = req.body
        const user = await User.create({name,email,password})
        const token = user.createJWT()
        res.status(201).json({user:{email:user.email,name:user.name}, token})


    }catch(error) {
        res.status(500).json(error)
    }
}

const login = async(req,res) => {
    const {email,password} = req.body

    if(!email || !password) {
        res.status(500).json({msg:"please provide all values"})
        return;
    }
    const user = await User.findOne({email}).select('+password')

    if(!user){
        res.status(500).json({msg:'Invalid credentials'})
        return;
    }
    
    const isCorrect = await user.comparePassword(password)

    if(!isCorrect) {
        res.status(500).json({msg:'Invalid credentials'})
        return;
    }

    const token = user.createJWT()
    user.password = undefined
    res.status(201).json({user,token})

}

const getAll = async(req, res) => {
    User.find()
        .then((allUser) => {
            res.json(allUser);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
}

const getOneUser = async(req, res) => {
    User.findOne({ _id: req.params.id})
        .then((oneUser) => {
            res.json(oneUser);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
}

module.exports = {
    index,
    register,
    login,
    getAll,
    getOneUser
}