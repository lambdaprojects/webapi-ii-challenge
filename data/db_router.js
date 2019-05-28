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
    if (blog) {
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

module.exports = router;
