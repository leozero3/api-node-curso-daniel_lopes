const Posts = require("../models/posts");
const Users = require("../models/users");

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

  async update(req, res) {
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

    if (verifyPost.author_id !== req.userId) {
      return res
        .status(401)
        .json({ message: "Você nao tem permissao para deletar esse Post" });
    }

    const postUpdate = await Posts.update(req.body, { where: { id } });

    if (!postUpdate) {
      return res.status(400).json({ message: "Falha ao atualizar o Post" });
    }

    return res.status(200).json({ message: "Post atualizado com sucesso!!!" });
  }

  async addLike(req, res) {
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

    const postUpdate = await Posts.update(
      { number_likes: verifyPost.number_likes + 1 },
      { where: { id } }
    );

    if (!postUpdate) {
      return res.status(400).json({ message: "Falha ao atualizar o Post" });
    }

    return res
      .status(200)
      .json({ message: "Like !!!", number_likes: postUpdate.number_likes });
  }

  async listMyPosts(req, res) {
    const allPosts = await Posts.findAll({
      order: [["id", "DESC"]],
      where: {
        author_id: req.userId,
      },
    });

    if (!allPosts) {
      return res
        .status(400)
        .json({ message: "Falha ao carregar todos os Posts" });
    }
    const formattedData = [];

    for (const item of allPosts) {
      formattedData.push({
        id: item.id,
        image: item.image,
        description: item.description,
        number_likes: item.number_likes,
      });
    }

    res.status(200).json({ data: formattedData });
  }

  async listAllPosts(req, res) {
    const allPosts = await Posts.findAll({
      order: [["id", "DESC"]],
      attributes: ["id", "description", "image", "number_likes"],
      include: [
        {
          model: Users,
          as: "user",
          required: true,
          attributes: ["id", "user_name"],
        },
      ],
    });

    res.status(200).json({ data: allPosts });
  }
}

module.exports = new PostController();
