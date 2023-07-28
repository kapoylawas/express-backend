const { Post, User } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = {
  getAllPosting: async (req, res, next) => {
    try {
      const { keyword = "" } = req.query;
      const { page = 1, pageSize = 5 } = req.query

     const offset = (page - 1) * pageSize;
     const totalCount = await Post.count();
     const totalPages = Math.ceil(totalCount / pageSize);

      let condition = {
        user: req.user.id,
      };

      if (keyword !== "") {
        condition = { ...condition, caption: { [Op.like]: `%${keyword}%` } };
      }

      const postings = await Post.findAll({
        offset,
        limit: Number(pageSize),
        where: condition,
        include: {
          model: User,
          attributes: ["id", "name", "username", "email"],
        },
      });

      res.status(200).json({
        message: "Success getl all posting",
        data: postings,
        currentPage: Number(page),
        totalPages,
        totalItems: totalCount,
      });
    } catch (err) {
      next(err);
    }
  },

  createPost: async (req, res, next) => {
    try {
      let users = req.user.id;
      const names = req.user
      const { caption, tags, likes, image } = req.body;

      const posting = await Post.create({
        caption,
        tags,
        likes,
        image,
        user: users,
      });

      res.status(201).json({
        message: "succes create books",
        data: posting ,
        name: names
      });
    } catch (err) {
      next(err);
    }
  },
};
