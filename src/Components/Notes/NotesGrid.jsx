import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useMemo, useState } from "react";
import useNotes from "../../hooks/useNotes";
import {
  getEmptyStateMessage,
  getVisibleNotes,
  reorderList,
} from "../../utils/helpers";
import { NOTE_VIEWS } from "../../utils/constants";
import EditModal from "./EditModal";
import NoteCard from "./NoteCard";

export default function NotesGrid({ view, searchQuery = "" }) {
  const { notes, reorderNotes } = useNotes();
  const [editingNoteId, setEditingNoteId] = useState(null);

  const visibleNotes = useMemo(
    () => getVisibleNotes(notes, view, searchQuery),
    [notes, searchQuery, view],
  );
  const activeEditingNoteId =
    editingNoteId && notes.some((note) => note.id === editingNoteId)
      ? editingNoteId
      : null;

  const handleDragEnd = ({ destination, source }) => {
    if (!destination || destination.index === source.index) {
      return;
    }

    const reorderedNotes = reorderList(
      visibleNotes,
      source.index,
      destination.index,
    );
    reorderNotes(reorderedNotes.map((note) => note.id));
  };

  return (
    <>
      {view === NOTE_VIEWS.TRASH && (
        <p className="trash-notice">Notes in Recycle Bin are deleted after 7 days.</p>
      )}

      {!visibleNotes.length ? (
        <div className="empty-state">
          <div className="empty-icon-wrap">
            {view === NOTE_VIEWS.ARCHIVE ? (
              <ArchiveOutlinedIcon className="empty-icon" />
            ) : view === NOTE_VIEWS.TRASH ? (
              <DeleteOutlineOutlinedIcon className="empty-icon" />
            ) : (
              <LightbulbOutlinedIcon className="empty-icon" />
            )}
          </div>
          <p>{getEmptyStateMessage(view)}</p>
        </div>
      ) : (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={`${view}-droppable`}>
          {(provided) => (
            <section
              className="notes notes-grid"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {visibleNotes.map((note, index) => (
                <Draggable key={note.id} draggableId={note.id} index={index}>
                  {(draggableProvided, snapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <NoteCard
                        note={note}
                        view={view}
                        onEdit={setEditingNoteId}
                        isDragging={snapshot.isDragging}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
      )}

      <EditModal noteId={activeEditingNoteId} onClose={() => setEditingNoteId(null)} />
    </>
  );
}
