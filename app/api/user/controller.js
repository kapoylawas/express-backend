const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");

module.exports = {
  user: async (req, res, next) => {
    try {
      const { id } = req.params;

      const checkID = await User.findOne({
        where: { id: id },
      });

      if (!checkID) {
        return res.status(404).json({ message: "id USER not found" });
      } else {
        const userByID = await User.findAll({
          where: { id: id },
          attributes: [
            "name",
            "username",
            "email",
            "password",
            "photo",
            "createdAt",
            "updatedAt",
          ],
        });
        //status message
        res.status(200).json({
          message: "Success get user by id",
          data: userByID,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  updatePassword: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { newpassword, confirmnewpassword } = req.body;

      if (newpassword !== confirmnewpassword) {
        res
          .status(403)
          .json({ message: "Password and confirm password don't match " });
      } else {
        const checkPassword = await User.findOne({
          where: {
            id: id,
          },
        });

        const updatePassword = await checkPassword.update({
          password: bcrypt.hashSync(confirmnewpassword, 10),
        });

        res.status(200).json({
          message: "Successfully Change Password",
          data: updatePassword,
        });
      }
    } catch (err) {
      next(err);
    }
  },
};
