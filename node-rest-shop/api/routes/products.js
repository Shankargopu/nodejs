const express = require("express");

const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/products");
const checkAuth = require("../middleware/check-auth");
const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (res, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("file type not accepted please upload jpeg/png files"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
// const insert = require('../../database/insert');
// const {retrieveById,retrieveAll}=require('../../database/fetch') ;
// const updateData = require('../../database/update');
// const deleteProduct=require('../../database/Delete')

router.get("/", productController.get_all_products);
router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  productController.post_product
);
router.get("/:productId", productController.get_single_product);
router.patch("/:id", checkAuth, productController.patch_product);
router.delete("/:id", checkAuth, productController.delete_product);

module.exports = router;
