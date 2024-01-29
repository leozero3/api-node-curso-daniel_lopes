const { verify } = require("jsonwebtoken");
const Posts = require("../models/posts");

class PostController {
  async create(req, res) {
    const { image, description } = req.body;

    const newPost = await Posts.create({
      image,
      description,
      author_id: req.userId,
    });
    if (!newPost) {
      return res.status(400).json({ message: "Falha na criação do Post" });
    }
    return res.status(200).json({ data: { image, description } });
  }

  async delete(req, res) {
    const { id } = req.params;

    const verifyPost = await Posts.findOne({
      where: {
        id,
        author_id: req.userId,
      },
    });

    if (!verifyPost) {
      return res.status(404).json({ message: "Post nao existe" });
    }
    console.log(verifyPost);
    console.log(req.userId);

    if (verifyPost.author_id != req.userId) {
      return res
        .status(401)
        .json({ message: "Você nao tem permissao para deletar esse Post" });
    }

    const deletePost = await Posts.destroy({
      where: {
        id,
      },
    });

    if (!deletePost) {
      return res.status(400).json({ message: "falha ao deletar Post!" });
    }

    return res.status(200).json({ message: "Post deletado com Sucesso!!" });
  }
}

module.exports = new PostController();
