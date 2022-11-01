const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const orderController = require("../controllers/orders");
router.get("/", checkAuth, orderController.orders_get_all);

router.post("/", checkAuth, orderController.post_order);

router.get("/:id", checkAuth, orderController.orders_get_by_id);
router.delete("/:id", checkAuth, orderController.delete_order);

module.exports = router;
