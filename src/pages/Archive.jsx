import NotesGrid from "../Components/Notes/NotesGrid";
import { NOTE_VIEWS } from "../utils/constants";

export default function Archive({ searchQuery }) {
  return <NotesGrid view={NOTE_VIEWS.ARCHIVE} searchQuery={searchQuery} />;
}
