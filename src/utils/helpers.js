import { v4 as uuid } from "uuid";
import {
  DEFAULT_NOTE_COLOR,
  EMPTY_STATE_COPY,
  NOTE_VIEWS,
} from "./constants";

const getNow = () => Date.now();

const safeTrim = (value) =>
  typeof value === "string" ? value.trim() : "";

const isTruthyBoolean = (value) => Boolean(value);

export const createNote = ({
  title = "",
  content = "",
  color = DEFAULT_NOTE_COLOR,
}) => {
  const now = getNow();

  return {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : uuid(),
    title: safeTrim(title),
    content: safeTrim(content),
    color,
    isPinned: false,
    isArchived: false,
    isTrashed: false,
    createdAt: now,
    updatedAt: now,
  };
};

const normalizeNote = (note, fallbackTimestamp = getNow()) => {
  if (!note || typeof note !== "object") {
    return null;
  }

  return {
    id: typeof note.id === "string" && note.id ? note.id : uuid(),
    title: typeof note.title === "string" ? note.title : "",
    content: typeof note.content === "string" ? note.content : "",
    color: typeof note.color === "string" && note.color ? note.color : DEFAULT_NOTE_COLOR,
    isPinned: isTruthyBoolean(note.isPinned),
    isArchived: isTruthyBoolean(note.isArchived),
    isTrashed: isTruthyBoolean(note.isTrashed),
    createdAt: Number.isFinite(note.createdAt) ? note.createdAt : fallbackTimestamp,
    updatedAt: Number.isFinite(note.updatedAt) ? note.updatedAt : fallbackTimestamp,
  };
};

export const sanitizeStoredNotes = (incomingNotes) => {
  if (!Array.isArray(incomingNotes)) {
    return [];
  }

  return incomingNotes
    .map((note) => normalizeNote(note))
    .filter(Boolean);
};

export const isNoteBlank = ({ title = "", content = "" }) =>
  !safeTrim(title) && !safeTrim(content);

const matchesView = (note, view) => {
  if (view === NOTE_VIEWS.ARCHIVE) {
    return note.isArchived && !note.isTrashed;
  }

  if (view === NOTE_VIEWS.TRASH) {
    return note.isTrashed;
  }

  return !note.isArchived && !note.isTrashed;
};

const matchesSearch = (note, searchQuery) => {
  const query = safeTrim(searchQuery).toLowerCase();
  if (!query) {
    return true;
  }

  return `${note.title} ${note.content}`.toLowerCase().includes(query);
};

export const getVisibleNotes = (notes, view, searchQuery = "") => {
  const matching = notes.filter(
    (note) => matchesView(note, view) && matchesSearch(note, searchQuery),
  );

  const pinned = [];
  const regular = [];

  matching.forEach((note) => {
    if (note.isPinned) {
      pinned.push(note);
      return;
    }
    regular.push(note);
  });

  return [...pinned, ...regular];
};

export const reorderList = (list, startIndex, endIndex) => {
  const nextList = [...list];
  const [moved] = nextList.splice(startIndex, 1);
  nextList.splice(endIndex, 0, moved);
  return nextList;
};

export const getEmptyStateMessage = (view) =>
  EMPTY_STATE_COPY[view] ?? "No notes found.";
