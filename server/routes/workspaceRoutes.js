import express from "express";
import { addMember,getUserWorkspaces } from "../controllers/workspaceController.js";
const workspaceRouter = express.Router();

workspaceRouter.post("/add-member", addMember);
workspaceRouter.get("/", getUserWorkspaces);

export default workspaceRouter;
