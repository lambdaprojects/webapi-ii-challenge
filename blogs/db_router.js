const router = require("express").Router();

const db = require("./db.js");

// middleware router.use(mw);

// for url with begins  with /api/hubs
router.get("/", async (req, res) => {
  try {
    const blogs = await db.find(req.query);
    res.status(200).json(blogs);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the blogs"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await db.findById(req.params.id);
    if (blog.length > 0) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the blog"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(":: POST REQUEST BODY ::" + JSON.stringify(req.body));
    let title = req.body.title;
    let content = req.body.content;
    if (!title || !body) {
      res.status(400).json({
        ErrorMesage: "Please provide title and contents for the post"
      });
    } else {
      const blog = await db.insert(req.body);
      res.status(201).json(blog);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ ErrorMessage: "Error adding blog" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const blog = await db.update(req.params.id, req.body);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ ErrorMessage: "The blog is not available" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ ErrorMessage: "Error in updation" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ SuccessMessage: "The blog is deleted" });
    } else {
      res.status(404).json({ message: "The blog cannot be deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the blog"
    });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const postComments = await db.findPostComments(req.params.id);
    if (postComments.length > 0) {
      res.status(200).json(postComments);
    } else {
      res.status(404).json({
        ErrorMessage: `There are no posts associated with the id ${id}`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in retrieving post comments"
    });
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    const comments = await db.findCommentById(req.params.id);
    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({
        ErrorMessage: `There are no comments associated with the comment id ${id}`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in retrieving comments"
    });
  }
});

router.post("/comments", async (req, res) => {
  try {
    console.log(":: WITHIN POST OF INSER COMMENTS::");
    const comment = await db.insertComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ ErrorMessage: "Error adding blog" });
  }
});
module.exports = router;
