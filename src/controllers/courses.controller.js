import Course from "../models/course.model";
import _ from "lodash";

const create = (req, res) => {
  const course = Course(req.body);
  course.save((err, data) => {
    if (err) {
      return res.status(400).json(err.message);
    }
    res.status(201).json(data);
  });
};

function list(req, res) {
  Course.find((err, data) => {
    if (err) {
      return res.status(400).json(err.message);
    }
    res.status(200).json(data);
  });
}

function read(req, res) {
  const id = req.params.id;
  Course.findById(id).exec((err, data) => {
    if (err) {
      return res.status(400).json(err.message);
    }
    res.status(200).json(data);
  });
}

function update(req, res) {
  const id = req.params.id;
  Course.findById(id).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json("Course not found!");
    }
    const course = _.extend(data, req.body);
    course.save((err, data) => {
      if (err) {
        return res.status(400).json(err.message);
      }
      res.status(200).json(data);
    });
  });
}

function remove(req, res) {
  const id = req.params.id;
  Course.findById(id).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json("Course not found!");
    }
    data.remove((err, data) => {
      if (err) {
        return res.status(400).json(err.message);
      }
      res.status(200).json("Course deleted.");
    });
  });
}

export default { remove, update, read, list, create };
