const Users = require('../Models/userModel')

//audmin validations
const authAdmin = async (req, res, next) =>{
    try {
        // Get user information by id
        const user = await Users.findOne({
            _id: req.user.id
        })

        //check the user role 
        
        if(user.role === 0)
            return res.status(400).json({msg: "Admin resources access denied"})

            // if user is admin call neext
        next()
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin