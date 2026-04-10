import CreateNote from "../Components/Notes/CreateNote";
import NotesGrid from "../Components/Notes/NotesGrid";
import { NOTE_VIEWS } from "../utils/constants";

export default function Home({ searchQuery }) {
  return (
    <>
      <CreateNote />
      <NotesGrid view={NOTE_VIEWS.NOTES} searchQuery={searchQuery} />
    </>
  );
}
