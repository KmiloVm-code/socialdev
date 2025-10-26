import Post from "../models/post.js";
import { put } from "@vercel/blob";

export const createPost = async (req, res) => {
  try {
    const authorId = req.userId;

    const postData = {
      title: req.body.title,
      content: req.body.content,
      author: authorId,
    };

    // Manejar imagen (req.files.image es un array con un solo archivo)
    if (req.files && req.files.image && req.files.image.length > 0) {
      const imageFile = req.files.image[0];
      const filename = `post-uploads/images/${Date.now()}-${imageFile.originalname}`;
      const imageBlob = await put(filename, imageFile.buffer, {
        access: 'public',
        contentType: imageFile.mimetype
      });
      postData.image = {
        url: imageBlob.url,
        filename: imageFile.originalname,
        mimetype: imageFile.mimetype,
        size: imageFile.size
      };
    }
  
    // Manejar archivos adjuntos (req.files.attachments es un array)
    if (req.files && req.files.attachments && req.files.attachments.length > 0) {
      postData.attachments = [];
      for (const file of req.files.attachments) {
        const filename = `post-uploads/attachments/${Date.now()}-${file.originalname}`;
        const attachmentBlob = await put(filename, file.buffer, {
          access: 'public',
          contentType: file.mimetype
        });
        postData.attachments.push({
          url: attachmentBlob.url,
          filename: file.originalname,
          mimetype: file.mimetype,
          size: file.size
        });
      }
    }

    const post = new Post(postData);
    await post.save();
    await post.populate("author", "name email avatar");

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email avatar")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email avatar"
    );
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
    }).populate("author", "name email avatar");
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
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email avatar"
    );
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    if (post.likes.includes(req.userId)) {
      post.likes.pull(req.userId);
    } else {
      post.likes.push(req.userId);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email avatar"
    );
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
