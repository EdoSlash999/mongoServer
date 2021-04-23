import Student from "../models/student.model";
import _ from "lodash";

const create = (req, res) => {
  const student = Student(req.body);
  student.save((err, data) => {
    if (err) {
      return res.status(400).json(err.message);
    }
    res.status(201).json(data);
  });
};

function list(req, res) {
  Student.find((err, data) => {
    if (err) {
      return res.status(400).json(err.message);
    }
    res.status(200).json(data);
  });
}

function read(req, res) {
  const id = req.params.id;
  Student.findById(id).exec((err, data) => {
    if (err) {
      return res.status(400).json(err.message);
    }
    res.status(200).json(data);
  });
}

function update(req, res) {
  const id = req.params.id;
  Student.findById(id).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json("Student not found!");
    }
    const student = _.extend(data, req.body);
    student.save((err, data) => {
      if (err) {
        return res.status(400).json(err.message);
      }
      res.status(200).json(data);
    });
  });
}

function remove(req, res) {
  const id = req.params.id;
  Student.findById(id).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json("Student not found!");
    }
    data.remove((err, data) => {
      if (err) {
        return res.status(400).json(err.message);
      }
      res.status(200).json("Student deleted.");
    });
  });
}

export default { create, list, read, update, remove };
