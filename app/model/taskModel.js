import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    // id: {
    //   type: Number,
    // },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
// taskSchema.pre("save", function (next) {
//   this.id = Math.floor(Math.random() * 1000000);
//   next();
// });
const Task = mongoose.model("Task", taskSchema);
export default Task;
