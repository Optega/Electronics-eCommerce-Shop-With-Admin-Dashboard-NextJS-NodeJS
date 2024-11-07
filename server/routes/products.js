const express = require("express");

const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductById,
  getMinMaxPrices,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/min-max-prices").get(getMinMaxPrices);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
