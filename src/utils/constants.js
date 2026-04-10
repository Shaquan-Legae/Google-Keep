export const STORAGE_KEYS = {
  NOTES: "keep-clone-notes",
  THEME: "keep-clone-theme",
};

export const NOTE_VIEWS = {
  NOTES: "notes",
  ARCHIVE: "archive",
  TRASH: "trash",
};

export const ROUTES = {
  NOTES: "/",
  ARCHIVE: "/archive",
  TRASH: "/trash",
};

export const ACTION_TYPES = {
  ADD_NOTE: "ADD_NOTE",
  UPDATE_NOTE: "UPDATE_NOTE",
  DELETE_NOTE: "DELETE_NOTE",
  TOGGLE_PIN: "TOGGLE_PIN",
  TOGGLE_ARCHIVE: "TOGGLE_ARCHIVE",
  MOVE_TO_TRASH: "MOVE_TO_TRASH",
  RESTORE_NOTE: "RESTORE_NOTE",
  REORDER_NOTES: "REORDER_NOTES",
  SET_NOTES: "SET_NOTES",
};

export const DEFAULT_NOTE_COLOR = "#ffffff";

export const NOTE_COLORS = [
  "#ffffff",
  "#f28b82",
  "#fbbc04",
  "#fff475",
  "#ccff90",
  "#a7ffeb",
  "#cbf0f8",
  "#aecbfa",
  "#d7aefb",
  "#fdcfe8",
  "#e6c9a8",
  "#e8eaed",
];

export const EMPTY_STATE_COPY = {
  [NOTE_VIEWS.NOTES]: "Notes you add appear here",
  [NOTE_VIEWS.ARCHIVE]:
    "Your archived notes appear here",
  [NOTE_VIEWS.TRASH]:
    "No notes in Recycle Bin",
};
