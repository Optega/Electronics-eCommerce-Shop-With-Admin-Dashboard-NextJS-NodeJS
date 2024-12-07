const express = require("express");

const router = express.Router();

const {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByTitle,
  getCategoryBySlug,
} = require("../controllers/category");

router.route("/").get(getAllCategories).post(createCategory);

router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);

router.route("/title/:title").get(getCategoryByTitle);
router.route("/slug/:slug").get(getCategoryBySlug);

module.exports = router;
