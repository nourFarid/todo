const router = require("express").Router();
const {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
  modifyState,
} = require("../controller/todo.controller");
router.post("/create", createTodo);
router.get("/get", getTodo);
router.put("/modify", updateTodo);
router.put("/modifyState", modifyState);
router.delete("/delete", deleteTodo);

module.exports = router;
