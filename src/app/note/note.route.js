import { Router } from "express";
import * as noteController from "./note.controller.js";

export const noteRouter = Router();

noteRouter.post("/:id", noteController.createNote);
// noteRouter.patch("/:noteId", noteController.updateNote);
noteRouter.put("/replace/:noteId", noteController.replaceNote);
noteRouter.patch("/all", noteController.updateAllTitles);
noteRouter.delete("/:noteId", noteController.deleteNote);
noteRouter.get("/paginate-sort", noteController.paginateNotes);
// noteRouter.get("/:noteId", noteController.getNoteByIdAndUserId);
noteRouter.get("/note-by-content", noteController.getNoteByContent);
noteRouter.get("/note-with-user", noteController.getNotesWithUser);
noteRouter.get("/aggregate", noteController.aggregateNotesWithUser);
noteRouter.delete("/", noteController.deleteNotes);
