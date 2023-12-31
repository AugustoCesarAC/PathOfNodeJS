const express = require("express");
const router = express.Router();

const Employee = require("../models/employee.models");
const { generateCrudMethods } = require("../services/employee.service");
const employeeCrud = generateCrudMethods(Employee);
const { validateDbId, raiseRecord404Error } = require("../middlewares/employee.middlewares");

router.get(
  "/test",
  (req, res, next) => {
    next({});
  },
  (req, res) => {
    res.send("foo2");
  }
);

router.get("/", (req, res, next) => {
  //Employee.find()
  employeeCrud
    .getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

router.get("/:id", validateDbId, (req, res, next) => {
  //Employee.findById(req.params.id)
  employeeCrud
    .getById(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  //Employee.create(req.body)
  employeeCrud
    .create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
});

router.put("/:id", validateDbId, (req, res) => {
  employeeCrud
    .update(req.params.id, req.body)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.delete("/:id", validateDbId, (req, res) => {
    employeeCrud.delete(req.params.id).then((data) => {
        if (data) res.send(data);
        else raiseRecord404Error(req, res);
      })
      .catch((err) => next(err));
});

module.exports = router;
