import { ACTION_TYPES } from "../utils/constants";
import { sanitizeStoredNotes } from "../utils/helpers";

const touch = (note, updates) => ({
  ...note,
  ...updates,
  updatedAt: Date.now(),
});

const updateById = (state, id, updater) =>
  state.map((note) => (note.id === id ? updater(note) : note));

export default function notesReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_NOTES: {
      return sanitizeStoredNotes(action.payload);
    }

    case ACTION_TYPES.ADD_NOTE: {
      const [nextNote] = sanitizeStoredNotes([action.payload]);
      if (!nextNote) {
        return state;
      }
      return [nextNote, ...state];
    }

    case ACTION_TYPES.UPDATE_NOTE: {
      const { id, updates } = action.payload ?? {};
      if (!id || !updates || typeof updates !== "object") {
        return state;
      }
      return updateById(state, id, (note) => touch(note, updates));
    }

    case ACTION_TYPES.DELETE_NOTE: {
      const noteId = action.payload?.id ?? action.payload;
      if (!noteId) {
        return state;
      }
      return state.filter((note) => note.id !== noteId);
    }

    case ACTION_TYPES.TOGGLE_PIN: {
      const noteId = action.payload?.id ?? action.payload;
      if (!noteId) {
        return state;
      }

      return updateById(state, noteId, (note) => {
        if (note.isTrashed) {
          return note;
        }
        return touch(note, { isPinned: !note.isPinned });
      });
    }

    case ACTION_TYPES.TOGGLE_ARCHIVE: {
      const noteId = action.payload?.id ?? action.payload;
      if (!noteId) {
        return state;
      }

      return updateById(state, noteId, (note) =>
        touch(note, {
          isArchived: !note.isArchived,
          isTrashed: false,
        }),
      );
    }

    case ACTION_TYPES.MOVE_TO_TRASH: {
      const noteId = action.payload?.id ?? action.payload;
      if (!noteId) {
        return state;
      }

      return updateById(state, noteId, (note) =>
        touch(note, {
          isTrashed: true,
          isArchived: false,
          isPinned: false,
        }),
      );
    }

    case ACTION_TYPES.RESTORE_NOTE: {
      const noteId = action.payload?.id ?? action.payload;
      if (!noteId) {
        return state;
      }

      return updateById(state, noteId, (note) =>
        touch(note, {
          isTrashed: false,
          isArchived: false,
        }),
      );
    }

    case ACTION_TYPES.REORDER_NOTES: {
      const orderedIds = action.payload?.orderedIds ?? [];
      if (!Array.isArray(orderedIds) || orderedIds.length < 2) {
        return state;
      }

      const reorderedSet = new Set(orderedIds);
      const targetIndexes = [];
      state.forEach((note, index) => {
        if (reorderedSet.has(note.id)) {
          targetIndexes.push(index);
        }
      });

      if (targetIndexes.length < 2) {
        return state;
      }

      const noteMap = new Map(state.map((note) => [note.id, note]));
      const reorderedNotes = orderedIds
        .map((id) => noteMap.get(id))
        .filter(Boolean);

      if (reorderedNotes.length !== targetIndexes.length) {
        return state;
      }

      const nextState = [...state];
      targetIndexes.forEach((stateIndex, reorderIndex) => {
        nextState[stateIndex] = reorderedNotes[reorderIndex];
      });

      return nextState;
    }

    default:
      return state;
  }
}
