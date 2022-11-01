const Product = require("../models/productModel");
const Mongoose = require("mongoose");
exports.get_all_products = (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then((docs) => {
      if (docs.length >= 1) {
        const response = {
          count: docs.length,
          product: docs.map((doc) => {
            return {
              id: doc._id,
              name: doc.name,
              price: doc.price,
              Image: doc.productImage,
              request: {
                method: "GET",
                URL: "localhost:8000/products/" + doc._id,
              },
            };
          }),
        };
        res.status(201).json(response);
      } else {
        res.status(200).json({
          message: "No documents exist in the collection",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_single_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          product: {
            doc,
          },
          request: {
            type: "GET",
            description: "Follow the url to list all the products",
            url: "http://localhost:8000/products",
          },
        });
      } else {
        res.status(200).json({
          message: `no such document with id ${id} exists`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.post_product = (req, res, next) => {
  const product = new Product({
    _id: new Mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created Product Successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          id: result._id,
          request: {
            type: "GET",
            url: "http:localhost:8000/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.patch_product = (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product updated successfully",
        request: {
          type: "GET",
          url: "http://localhost:8000/products/" + id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.delete_product = (req, res, next) => {
  const id = req.params.id;
  Product.findById({ _id: id })
    .then((result) => {
      if (result != null) {
        Product.remove({ _id: id })
          .exec()
          .then((result) => {
            console.log(result);
            res.status(200).json({
              message: "Product deleted successfully",
              request: {
                type: "POST",
                url: "http://localhost:8000/products",
                body: { name: "String", price: "Number" },
              },
            });
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        res.status(200).json({
          message: "No such document exists with id " + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
