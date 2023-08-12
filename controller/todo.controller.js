const { response } = require("express");
// const TodoModel = require("../models/todo.model");

const Todo = require("../models/todo.model");

//*CREATE
const createTodo = async (req, res) => {
  try {
    const note = req.body;
    console.log(note);
    // * CREATE (_C_RUD)
    const response = await Todo.create(note);
    console.log(response);
    res.json({ status: "ok" });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

//*GET
const getTodo = async (req, res) => {
  try {
    const notes = await Todo.find({});
    console.log("Response => ", notes);
    res.json(notes);
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

const deleteTodo = async (req, res) => {
  {
    const { note } = req.body;
    console.log(note, "/api/delete");

    const response = await Todo.deleteOne({ note });

    console.log(response, "/api/delete response");

    res.json({ status: "ok" });
  }
};
const updateTodo = async (req, res) => {
  try {
    const { old: oldTitle, new: newTitle } = req.body;

    const response = await Todo.updateOne(
      {
        note: oldTitle,
      },
      {
        $set: {
          note: newTitle,
        },
      }
    );

    console.log(response);

    res.json({ status: "ok" });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};
const modifyState = async (req, res) => {
  try {
    const response = await Todo.updateOne(
      {
        done: false,
      },
      {
        $set: {
          done: true,
        },
      }
    );

    console.log(response);

    res.json({ status: "ok" });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

module.exports = {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  modifyState,
};
