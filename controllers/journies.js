const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Journey = require("../models/Journey");

module.exports = {
  //   getProfile: async (req, res) => {
  //     try {
  //       const posts = await Post.find({ user: req.user.id });
  //       res.render("profile.ejs", { posts: posts, user: req.user });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  //   getFeed: async (req, res) => {
  //     try {
  //       const posts = await Post.find().sort({ createdAt: "desc" }).lean();
  //       res.render("feed.ejs", { posts: posts, user: req.user });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  getJourney: async (req, res) => {
    try {
      const journey = await Journey.findById(req.params.id);
      //   const comments = await Comment.find({ post: req.params.id })
      //     .sort({ createdAt: "desc" })
      //     .lean();
      //   res.render("post.ejs", {
      //     post: post,
      //     user: req.user,
      //     comments: comments,
      //   });
      res.render("journey.ejs", {
        journey: journey,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createJourney: async (req, res) => {
    try {
      // Upload image to cloudinary
      //   const result = await cloudinary.uploader.upload(req.file.path);

      await Journey.create({
        title: req.body.title,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Journey has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeJourney: async (req, res) => {
    try {
      await Journey.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/journey/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteJourney: async (req, res) => {
    try {
      // Find journey by id
      let journey = await Journey.findById({ _id: req.params.id });
      //   // Delete image from cloudinary
      //   await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Journey.remove({ _id: req.params.id });
      console.log("Deleted Journey");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
