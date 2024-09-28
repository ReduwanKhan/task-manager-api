import express from "express";
export const router = express.Router();

import * as TaskController from "../app/controllers/TaskController.js";
import * as UsersController from "../app/controllers/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";

//Users
router.post("/Registration", UsersController.Registration);
router.post("/Login", UsersController.Login);
router.get("/ProfileDetails", AuthMiddleware, UsersController.ProfileDetails);
router.post("/ProfileUpdate", AuthMiddleware, UsersController.ProfileUpdate);
router.post("/EmailVerify/:email", UsersController.EmailVerify);
router.post("/CodeVerify", UsersController.CodeVerify);
router.post("/ResetPassword", UsersController.ResetPassword);

//Tasks
router.post("/CreateTask", TaskController.CreateTask);
router.get("/UpdateTaskStatus", TaskController.UpdateTaskStatus);
router.get("/TaskListByStatus", TaskController.TaskListByStatus);
router.get("/DeleteTask", TaskController.DeleteTask);
router.get("/CountTask", TaskController.CountTask);
