function PaginationMW(model) {
  return async function (req, res, next) {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    try {
      const skip = (page - 1) * limit;
      const totalBlogs = await model.countDocuments();
      const blogs = await model
        .find({})
        .populate("userId", "name")
        .skip(skip)
        .limit(limit);
      const totalPages = Math.ceil(totalBlogs / limit);

      res.paginatedresults = {
        success: true,
        message: "successfully fetched documents",
        content: { totalPages, blogs, currentPage: page },
      };
      next();
    } catch (error) {
      res.status(400).json({ msg: "unable to fech blogs!" });
    }
  };
}

module.exports = {
  PaginationMW,
};
