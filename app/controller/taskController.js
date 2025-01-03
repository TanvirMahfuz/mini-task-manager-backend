import mongoose from "mongoose";
import Task from "../model/taskModel.js";
export const createTask = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.headers.id;
    const newTask = await Task.create(data);
    if (!newTask) {
      return res.json({
        status: false,
        message: "Task not created",
      });
    }
    return res.json({
      status: true,
      message: "task created Successfully",
      task: newTask,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
export const updateTaskStatus = async (req, res) => {
  try {
    const stat = req.body.status;
    const taskId = req.body.taskId;
    const uid = req.headers.id;
    const task = await Task.findOneAndUpdate(
      {_id: taskId, userId: uid},
      {status: stat},
      {new: true}
    );
    if (!task) {
      return res.json({
        status: false,
        message: "Task not found",
      });
    }
    return res.json({
      status: true,
      message: "task status updated",
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
export const TaskListByStatus = async (req, res) => {
  try {
    const uid = req.headers.id;
    const status = req.params.status;
    const task = await Task.find({userId: uid, status: status});
    if (!task) {
      return res.json({
        status: false,
        message: "Task not found",
      });
    }
    return res.json({
      status: true,
      message: "search successful",
      tasks: task,
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const uid = req.headers.id;
    console.log(taskId);
    const task = await Task.findById(taskId);
    console.log(task);
    const del_task = await Task.findOneAndDelete(
      {_id: taskId, userId: uid},
      {new: true}
    );
    console.log(del_task);
    if (!task) {
      return res.json({
        status: false,
        message: "Task not found",
      });
    }
    return res.json({
      status: true,
      message: "task deleted Successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
export const CountTask = async (req, res) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const uid = new ObjectId(req.headers.id); // Convert user ID from headers
    const tasks = await Task.aggregate([
      {
        $match: {
          userId: uid, // Match tasks by user ID
        },
      },
      {
        $group: {
          _id: "$status", // Group by the 'status' field
          count: {$sum: 1}, // Count the number of tasks per status
        },
      },
    ]);

    return res.json({
      status: true,
      message: "Count successful",
      count: tasks, // Array of grouped counts
    });
  } catch (error) {
    console.error(error.message);
    return res.json({
      status: false,
      message: error.message,
    });
  }
};
