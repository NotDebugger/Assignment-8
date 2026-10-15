import * as noteService from "./note.service.js";

export async function createNote(req, res, next) {
  try {
    const id = req.params.id;
    await noteService.createNote(id, req.body);

    res.json({
      message: "Note created successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateNote(req, res, next) {
  try {
    const noteId = req.params.noteId;
    const userId = req.query.userId;

    const updatedNote = await noteService.updateNote(noteId, userId, req.body);

    res.json({
      message: "Note updated successfully",
      success: true,
      data: updatedNote,
    });
  } catch (err) {
    next(err);
  }
}

export async function replaceNote(req, res, next) {
  try {
    const noteId = req.params.noteId;
    const userId = req.query.userId;

    const replacedNote = await noteService.updateNote(noteId, userId, req.body);

    res.json({
      message: "Note replaced successfully",
      success: true,
      data: replacedNote,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAllTitles(req, res, next) {
  try {
    const userId = req.query.userId;

    await noteService.updateAllTitles(userId, req.body.title);

    res.json({
      message: "All notes updated successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteNote(req, res, next) {
  try {
    const noteId = req.params.noteId;
    const userId = req.query.userId;

    const deletedNote = await noteService.deleteNote(noteId, userId);

    res.json({
      message: "Note deleted successfully",
      success: true,
      data: deletedNote,
    });
  } catch (err) {
    next(err);
  }
}

export async function paginateNotes(req, res, next) {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const userId = req.query.userId;

    const notes = await noteService.paginateNotes(userId, page, limit);

    res.json({
      message: "Paginated list retrieved successfully",
      success: true,
      data: notes,
    });
  } catch (err) {
    next(err);
  }
}

export async function getNoteByIdAndUserId(req, res, next) {
  try {
    const noteId = req.params.noteId;
    const userId = req.query.userId;

    const note = await noteService.getNoteByIdAndUserId(noteId, userId);

    res.json({
      message: "note retrieved successfully",
      success: true,
      data: note,
    });
  } catch (err) {
    next(err);
  }
}

export async function getNoteByContent(req, res, next) {
  try {
    const userId = req.query.userId;
    const content = req.query.content;

    const note = await noteService.getNoteByContent(userId, content);

    res.json({
      message: "note retrieved successfully",
      success: true,
      data: note,
    });
  } catch (err) {
    next(err);
  }
}

export async function getNotesWithUser(req, res, next) {
  try {
    const userId = req.query.userId;

    const notes = await noteService.getNotesWithUser(userId);

    res.json({
      message: "notes retrieved successfully",
      success: true,
      data: notes,
    });
  } catch (err) {
    next(err);
  }
}

export async function aggregateNotesWithUser(req, res, next) {
  try {
    const userId = req.query.userId;
    const title = req.query.title;

    const notes = await noteService.aggregateNotesWithUser(userId, title);

    res.json({
      message: "notes retrieved successfully",
      success: true,
      data: notes,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteNotes(req, res, next) {
  try {
    const userId = req.query.userId;

    await noteService.deleteNotes(userId);

    res.json({
      message: "note deleted successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}
