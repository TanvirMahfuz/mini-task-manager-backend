import express from "express";
const route = express.Router();
import * as taskController from "../app/controller/taskController.js";
import * as userController from "../app/controller/userController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";
route.post("/registration", userController.registration);
route.post("/login", userController.login);
route.get("/profileDetails", authMiddleware, userController.profileDetails);
route.post("/profileUpdate", authMiddleware, userController.updateProfile);
route.get("/emailVerify", authMiddleware, userController.emailVerify);
route.post("/codeVerify", authMiddleware, userController.codeVerify);
route.post("/resetPassword", userController.resetPassword);

route.post("/createTask", authMiddleware, taskController.createTask);
route.put("/updateTaskStatus", authMiddleware, taskController.updateTaskStatus);
route.get(
  "/taskListByStatus/:status",
  authMiddleware,
  taskController.TaskListByStatus
);
route.get("/countTask", authMiddleware, taskController.CountTask);
route.delete("/deleteTask/:id", authMiddleware, taskController.deleteTask);

export default route;
