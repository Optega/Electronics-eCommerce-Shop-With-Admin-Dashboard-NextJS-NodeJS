const express = require("express");

const router = express.Router();

const {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByName,
} = require("../controllers/category");

router.route("/").get(getAllCategories).post(createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

router.route("/name/:name").get(getCategoryByName);

module.exports = router;
