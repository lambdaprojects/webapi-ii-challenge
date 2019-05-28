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

router.post("/", async (req, res) => {
  try {
    const blog = await db.insert(req.body);
    res.status(201).json(blog);
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
module.exports = router;
