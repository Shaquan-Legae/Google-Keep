import { useNotesContext } from "../state/NotesContext";

export default function useNotes() {
  return useNotesContext();
}
