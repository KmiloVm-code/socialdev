import Post from "../models/post.js";

export const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    await post.populate('author', 'name email avatar');
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email avatar');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email avatar');
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('author', 'name email avatar');
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.status(200).json({ message: "Post eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email avatar');
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    if (post.likes.includes(req.body.userId)) {
      post.likes.pull(req.body.userId);
    } else {
      post.likes.push(req.body.userId);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email avatar');
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    post.comments.push({
      user: req.body.userId,
      comment: req.body.comment,
    });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
