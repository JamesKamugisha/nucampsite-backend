const express = require("express");
const Partner = require("../models/partner");
const authenticate = require("../authenticate");

const partnerRouter = express.Router();

partnerRouter
  .route("/")
  .get((req, res, next) => {
    Partner.find()
      .then((partners) => res.status(200).json(partners))
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Partner.create(req.body)
      .then((partner) => {
        res.status(200).json(partner);
      })
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /partners");
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Partner.deleteMany()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  });

partnerRouter
  .route("/:partnerId")
  .get(authenticate.verifyUser, (req, res) => {
    Partner.findById(req.params.partnerId)
      .then((partner) => {
        res.status(200).json(partner);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })
  .put(authenticate.verifyUser, (req, res) => {
    Partner.findByIdAndUpdate(
      req.params.partnerId,
      { $set: req.body },
      { new: true }
    )
      .then((partner) => {
        res.status(200).json(partner);
      })
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res) => {
    Partner.findByIdAndDelete(req.params.partnerId)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => next(err));
  });

module.exports = partnerRouter;
