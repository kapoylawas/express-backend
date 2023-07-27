const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const checkUser = await User.findOne({ where: { username: username } });

      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: checkUser.id,
                name: checkUser.name,
                email: checkUser.email,
              },
            },
            "secret"
          );
          res
            .status(200)
            .json({ success: true, message: "Success Login", data: token });
        } else {
          res.status(422).json({ success: false, message: "Invalid password" });
        }
      } else {
        res
          .status(422)
          .json({ success: false, message: "Invalid Username and password" });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  register: async (req, res, next) => {
    try {
        const { name, username, email, photo, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
          res
            .status(403)
            .json({ message: "Password and confirm password don't match " });
        }

        if (!email) {
          return res.status(403).json({ error: 'Email tidak boleh kosong' });
        }
  
        const checkEmail = await User.findOne({ where: { email: email } });
        if (checkEmail) {
          return res.status(403).json({ message: "Duplicate Email" });
        }
  
        const user = await User.create({
          name,
          username,
          email,
          password: bcrypt.hashSync(password, 10),
          photo,
        });
  
        delete user.dataValues.password;
  
        res.status(201).json({
          message: "Success signup",
          data: user,
        });

      } catch (err) {
        next(err);
      }
    },
};
