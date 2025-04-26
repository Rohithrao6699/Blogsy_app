const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  blogs: [{ type: schema.Types.ObjectId, ref: "blogs" }],
});

const blogSchema = new schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  typeOf: { type: String, required: true },
  userId: { type: schema.Types.ObjectId, ref: "users" },
});

const UserModel = mongoose.model("users", userSchema);
const BlogModel = mongoose.model("blogs", blogSchema);

module.exports = {
  UserModel,
  BlogModel,
};
