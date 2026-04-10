/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ACTION_TYPES, STORAGE_KEYS } from "../utils/constants";
import { sanitizeStoredNotes } from "../utils/helpers";
import notesReducer from "./notesReducer";

const NotesContext = createContext(null);

export function NotesProvider({ children }) {
  const [storedNotes, setStoredNotes] = useLocalStorage(STORAGE_KEYS.NOTES, []);
  const [notes, dispatch] = useReducer(
    notesReducer,
    storedNotes,
    sanitizeStoredNotes,
  );

  useEffect(() => {
    setStoredNotes(notes);
  }, [notes, setStoredNotes]);

  const actions = useMemo(
    () => ({
      setNotes: (nextNotes) =>
        dispatch({ type: ACTION_TYPES.SET_NOTES, payload: nextNotes }),
      addNote: (note) => dispatch({ type: ACTION_TYPES.ADD_NOTE, payload: note }),
      updateNote: (id, updates) =>
        dispatch({
          type: ACTION_TYPES.UPDATE_NOTE,
          payload: { id, updates },
        }),
      deleteNote: (id) =>
        dispatch({ type: ACTION_TYPES.DELETE_NOTE, payload: { id } }),
      togglePin: (id) =>
        dispatch({ type: ACTION_TYPES.TOGGLE_PIN, payload: { id } }),
      toggleArchive: (id) =>
        dispatch({ type: ACTION_TYPES.TOGGLE_ARCHIVE, payload: { id } }),
      moveToTrash: (id) =>
        dispatch({ type: ACTION_TYPES.MOVE_TO_TRASH, payload: { id } }),
      restoreNote: (id) =>
        dispatch({ type: ACTION_TYPES.RESTORE_NOTE, payload: { id } }),
      reorderNotes: (orderedIds) =>
        dispatch({
          type: ACTION_TYPES.REORDER_NOTES,
          payload: { orderedIds },
        }),
    }),
    [],
  );

  const value = useMemo(
    () => ({
      notes,
      dispatch,
      ...actions,
    }),
    [actions, notes],
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotesContext must be used inside NotesProvider.");
  }
  return context;
}

export default NotesContext;
