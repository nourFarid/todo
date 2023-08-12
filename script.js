const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");

const dotenv = require("dotenv").config();
const port = process.env.port || 4000;
const connectDb = require("./DB");
connectDb();
const todo = require("./router/todo.router");
const Todo = require("./models/todo.model");

app.use("/", express.static(path.resolve(__dirname, "assets")));

app.use(bodyParser.json());

app.use("/api", todo);

// app.delete("/api/delete", async (req, res) => {
//   const { note } = req.body;
//   console.log(note, "/api/delete");

//   const response = await Todo.deleteOne({ note });

//   console.log(response, "/api/delete response");

//   res.json({ status: "ok" });
// });

// app.put("/api/modify", async (req, res) => {
//   const { old: oldTitle, new: newTitle } = req.body;

//   const response = await Todo.updateOne(
//     {
//       note: oldTitle,
//     },
//     {
//       $set: {
//         note: newTitle,
//       },
//     }
//   );

//   console.log(response);

//   res.json({ status: "ok" });
// });
// app.put("/api/modifyState", async (req, res) => {
//   const response = await Todo.updateOne(
//     {
//       done: false,
//     },
//     {
//       $set: {
//         done: true,
//       },
//     }
//   );

//   console.log(response);

//   res.json({ status: "ok" });
// });

// app.get("/api/get", async (req, res) => {
//   const notes = await Todo.find({});
//   // console.log('Response => ', notes)
//   res.json(notes);
// });

// app.post("/api/create", async (req, res) => {
//   const note = req.body;
//   console.log(note);

//   // * CREATE (_C_RUD)
//   const response = await Todo.create(note);

//   console.log(response);

//   res.json({ status: "ok" });
// });

// app.listen(13371, "127.0.0.1", () => {
//   console.log("Server up");
// });
app.listen(port, "localhost", () => {
  console.log("\n server is running and listening on port ", port);
});
