import * as noteRepository from "../../app/note/note.repository.js";
import * as userRepository from "../../app/user/user.repository.js";
import { Types } from "mongoose";

export async function validateUser(userId) {
  if (!Types.ObjectId.isValid(userId)) throw new Error("User id not valid.");

  const user = await userRepository.getUserById(userId);
  if (!user) throw new Error("user not found.");
  return user;
}

export async function validateNote(noteId) {
  if (!Types.ObjectId.isValid(noteId)) throw new Error("Note id not valid.");

  const note = await noteRepository.getNoteById(noteId);
  if (!note) throw new Error("Note not found.");
  return note;
}
