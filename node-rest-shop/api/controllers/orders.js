const Order = require("../models/orderModel");
const mongoose = require("mongoose");
const Product = require("../models/productModel");
exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("_id product quantity")
    .populate("product", "_id name")
    .exec()
    .then((docs) => {
      if (docs.length > 0) {
        const response = {
          count: docs.length,
          orders: docs.map((doc) => {
            return {
              id: doc._id,
              product: doc.product,
              quantity: doc.quantity,
              request: {
                type: "GET",
                url: "http://localhost:8000/orders/" + doc._id,
              },
            };
          }),
        };
        res.status(200).json(response);
      } else {
        const response = {
          message: "No orders to fetch",
          description: "follow the url to create order",
          url: "http://localhost:8000/orders",
          type: "POST",
          body: { productId: "productId", quantity: "Number" },
        };
        res.status(200).json({
          response,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.orders_get_by_id = (req, res, next) => {
  Order.findById(req.params.id)
    .select("_id product quantity")
    .populate("product", "_id name")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(200).json({
          message:
            "No such document exist you can place order by following request",
          request: {
            type: "POST",
            url: "http://localhost:8000/orders",
            body: { productId: "ID", quantity: "Number" },
          },
        });
      }
      res.status(200).json({
        message: "order fetched sucessfully",
        order: result,
        request: {
          type: "GET",
          description: "GET ALL ORDERS",
          url: "http://localhost:8000/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.post_order = (req, res, next) => {
  Product.findById(req.body.productId)
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(200).json({
          message:
            "The product id which enetered is not found. please enter valid product id",
        });
      }

      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      order.save().then((result) => {
        res.status(201).json({
          message: "order created",
          createdOrder: {
            _id: result._id,
            product: result.product,
            quantity: result.quantity,
          },
          request: {
            type: "GET",
            url: "http://localhost:8000/orders" + result._id,
          },
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.delete_order = (req, res, next) => {
  Order.findById(req.params.id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(200).json({
          message: "The document with id " + req.params.id + " is not exist",
          request: {
            type: "GET",
            description: "GET ALL ORDERS",
            url: "http://localhost:8000/orders",
          },
        });
      }
      Order.remove({ _id: req.params.id })
        .exec()
        .then((result) => {
          res.status(200).json({
            message: "order with id" + req.params.id + " deleted successfully",
            request: {
              type: "POST",
              description: "You can place order by following url",
              url: "http://localhost:8000/orders",
              body: { productId: "ID", quantity: "Number" },
            },
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
