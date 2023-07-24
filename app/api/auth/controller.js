const {User} = require('../../db/models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    signin : async(req,res, next) => {
        try {
            const {username, password} = req.body;
            const checkUser = await User.findOne({ where: {username: username} })
            
            if (checkUser) {
                const checkPassword = bcrypt.compareSync(password, checkUser.password)

                if (checkPassword) {
                    const token = jwt.sign({
                        user: {
                            name: checkUser.name,
                            email: checkUser.email
                        }
                    }, 'secret')
                    res.status(200).json({message: 'Success Login', data: token})
                } else {
                    res.status(403).json({message: 'Invalid password'});
                }
            } else {
                res.status(403).json({message: 'Invalid Username'});
            }
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}