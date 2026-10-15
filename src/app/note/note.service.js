import * as noteRepository from "./note.repository.js";
import { Types } from "mongoose";
import {
  validateUser,
  validateNote,
} from "../../common/validation/validate.js";

export async function createNote(id, noteData) {
  await validateUser(id);

  noteData.userId = id;

  const createdNote = await noteRepository.createNote(noteData);

  return createdNote;
}

export async function updateNote(noteId, userId, data) {
  await validateNote(noteId);
  await validateUser(userId);

  const updatedNote = await noteRepository.updateNote(noteId, userId, data);
  if (!updatedNote) throw new Error("You are not the owner.");

  return updatedNote;
}

export async function replaceNote(noteId, userId, data) {
  await validateNote(noteId);
  await validateUser(userId);

  const replacedNote = await noteRepository.updateNote(noteId, userId, data);
  if (!replacedNote) throw new Error("You are not the owner.");

  return replacedNote;
}

export async function updateAllTitles(userId, title) {
  await validateUser(userId);

  const res = await noteRepository.updateAllTitles(userId, title);

  return res;
}

export async function deleteNote(noteId, userId) {
  await validateNote(noteId);
  await validateUser(userId);

  const deletedNote = await noteRepository.deleteNote(noteId, userId);
  if (!deletedNote) throw new Error("You are not the owner.");

  return deletedNote;
}

export async function paginateNotes(userId, page, limit) {
  await validateUser(userId);

  const notes = await noteRepository.paginateNotes(userId, page, limit);

  return notes;
}

export async function getNoteByIdAndUserId(noteId, userId) {
  await validateNote(noteId);
  await validateUser(userId);

  const note = await noteRepository.getNoteByIdAndUserId(noteId, userId);
  if (!note) throw new Error("Note not found.");

  return note;
}

export async function getNoteByContent(userId, content) {
  await validateUser(userId);

  const note = await noteRepository.getNoteByContent(userId, content);
  if (!note) throw new Error("Note not found.");

  return note;
}

export async function getNotesWithUser(userId) {
  await validateUser(userId);

  return await noteRepository.getNotesWithUser(userId);
}

export async function aggregateNotesWithUser(userId, title) {
  await validateUser(userId);

  return await noteRepository.aggregateNotesWithUser(
    new Types.ObjectId(userId),
    title,
  );
}

export async function deleteNotes(userId) {
  await validateUser(userId);

  return await noteRepository.deleteNotes(userId);
}
