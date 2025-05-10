require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const Jwt = require("jsonwebtoken");
const Jwt_Secret = process.env.JWT_SECRET;
const userRouter = express.Router();
const { UserModel, BlogModel } = require("../db/schema");
const { auth } = require("../middleware/auth");
const { PaginationMW } = require("../middleware/paginate");

userRouter.post("/signup", async function (req, res) {
  const { name, email, password } = req.body;

  const mySchema = z
    .object({
      name: z.string().min(3).max(15),
      email: z.string().min(8).max(25).email(),
      password: z.string().min(6).max(15),
    })
    .strict();

  try {
    const validUser = mySchema.safeParse({
      name,
      email,
      password,
    });
    if (validUser.success) {
      const hashed = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        name,
        email,
        password: hashed,
      });
      if (user) {
        res.status(200).json({
          message: "user created sucessfully",
          success: true,
        });
      } else {
        res.status(400).json({
          message: "error while creating user, please try again!",
          success: false,
        });
      }
    } else {
      res.json({
        message: `error as input did not match validation ${validUser.error.issues}`,
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: `The error os from /signup ${error}`,
      success: false,
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email,
  });
  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log(passwordMatch);

  if (passwordMatch) {
    const id = user._id;
    const token = Jwt.sign({ id }, Jwt_Secret);
    res.status(200).json({
      token,
      success: true,
    });
  } else {
    res.status(400).json({
      message: "no user found",
      success: false,
    });
  }
});

userRouter.get("/allblogs", PaginationMW(BlogModel), async function (req, res) {
  // const blogs = await BlogModel.find({}).populate("userId", "name");
  // res.json({
  //   blogs,
  // });
  res.json(res.paginatedresults);
});

//we cannot use the PaginatedMW here as it is doing more filtered query, if
//it is a generic/normal query like above one it would work
//sol) write all the paginated login in the route!!!
userRouter.get("/authorblogs", async function (req, res) {
  const { userId } = req.query;
  console.log(userId);

  const user = await UserModel.findOne({ _id: userId }).populate("blogs");
  if (user) {
    blogs = user.blogs;
    res.status(200).json({
      content: blogs,
      success: true,
    });
  } else {
    res.status(200).json({
      message: "user not found",
      success: false,
    });
  }
});

userRouter.get("/myblogs", auth, async function (req, res) {
  const userId = req.userId;

  const user = await UserModel.findOne({ _id: userId });

  const blogs = await BlogModel.find({
    _id: { $in: user.blogs },
  });

  if (blogs) {
    res.json({
      content: blogs,
      success: true,
      message: "got all blogs",
    });
  } else {
    res.json({
      success: false,
      message: "could not find blogs!",
    });
  }
});

userRouter.post("/createblog", auth, async function (req, res) {
  const { title, content, typeOf } = req.body;
  const userId = req.userId;

  const blog = await BlogModel.create({
    title,
    content,
    typeOf,
    userId,
  });

  await UserModel.updateOne(
    { _id: userId },
    {
      $push: { blogs: blog._id },
    }
  );
  res.json({
    content: blog,
    success: true,
  });
});

userRouter.put("/updateblog", auth, async function (req, res) {
  const { title, content, blogId, typeOf } = req.body;
  userId = req.userId;

  try {
    const toUpdateBlog = await BlogModel.findOneAndUpdate(
      { userId, _id: blogId },
      { $set: { title, content, typeOf } },
      { new: true }
    );
    res.json({
      content: toUpdateBlog,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong from server",
      success: false,
    });
  }
});

userRouter.delete("/deleteblog", auth, async function (req, res) {
  const blogId = req.body.blogId;
  const userId = req.userId;

  const deletedblog = await BlogModel.deleteOne({
    userId,
    _id: blogId,
  });
  res.json({
    constent: deletedblog,
    message: "sucesfully deleted!",
    success: true,
  });
});

module.exports = {
  userRouter,
};
