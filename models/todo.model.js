const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: [true, "please enter something"],
    },
    date: {
      type: Number,
      default: Date.now,
      // required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
  // {
  //   collection: "my-todo",
  // }
);

const model = mongoose.model("TodoModel", TodoSchema);

module.exports = model; //optional line
