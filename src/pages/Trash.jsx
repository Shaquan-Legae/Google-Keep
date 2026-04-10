import NotesGrid from "../Components/Notes/NotesGrid";
import { NOTE_VIEWS } from "../utils/constants";

export default function Trash({ searchQuery }) {
  return <NotesGrid view={NOTE_VIEWS.TRASH} searchQuery={searchQuery} />;
}
