import PostModel from "../models/Post.js";



export const getAll = async (req, res) => {
  try{
    const posts = await PostModel.find()

    res.json(posts)
  }
  catch(err){
    console.log(err);
    res.status(500).json({
        message: "Не удалось получить статьи",
    })
  
  }
}


export const getOne = async (req, res) => {
  try {
    const post = await PostModel.findById(req._id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post)
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};


export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
        message: "Не удалось создать статью",
    })
  }
};


export const autoCreate = async (req, res) => {
  
//connect to gRPC server
  try {
    // const posts = await sendMessageToGenerate(req)
    //   if (posts === "NoN" | !Array.isArray(posts)) {
    //     res.status(500).json({
    //       message: "Не удалось созранить статьи",
    //   });
    //   return;
    // }
    // posts.forEach(async (post) => {
    //   const doc = new PostModel({
    //     title: post.title,
    //     text: post.text,
    //     user: req.userId,
    //   });
    //   await doc.save();
    // });
    // await sendMessageToGenerate(req, res)
    res.json(req.text)
    for (const post of req.text){
      const doc = new PostModel({
        title: post.title,
        text: post.text,
        user: req.userId,
      });
      await doc.save();
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
        message: "Не удалось созранить статьи",
    })
  
  }
} 