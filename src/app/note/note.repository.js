import { Types } from "mongoose";
import { Note } from "./note.model.js";

export async function createNote(noteData) {
  return await Note.create(noteData);
}

export async function getNoteById(id) {
  return await Note.findById(id);
}

export async function updateNote(noteId, userId, data) {
  return Note.findOneAndUpdate(
    { _id: noteId, userId },
    { $set: data },
    { new: true },
  );
}

export async function replaceNote(noteId, userId, data) {
  return Note.findOneAndReplace(
    { _id: noteId, userId },
    { $set: data },
    { new: true },
  );
}

export async function updateAllTitles(userId, title) {
  return Note.updateMany({ userId }, { $set: { title } });
}

export async function deleteNote(noteId, userId) {
  return Note.findOneAndDelete({ _id: noteId, userId });
}

export async function paginateNotes(userId, page, limit) {
  return Note.find({ userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
}

export async function getNoteByIdAndUserId(noteId, userId) {
  return Note.findOne({ _id: noteId, userId });
}

export async function getNoteByContent(userId, content) {
  return Note.findOne({ userId, content });
}

export async function getNotesWithUser(userId) {
  return Note.find({ userId })
    .select("title userId createdAt")
    .populate("userId", "email -_id");
}

export async function aggregateNotesWithUser(userId, title) {
  const pipeline = [
    {
      $match: {
        userId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $project: {
        title: 1,
        content: 1,
        userId: 1,
        createdAt: 1,
        "user.name": 1,
        "user.email": 1,
      },
    },
  ];

  if (title) pipeline.push({ $match: { title } });
  return Note.aggregate(pipeline);
}

export async function deleteNotes(userId) {
  return Note.deleteMany({ userId });
}
