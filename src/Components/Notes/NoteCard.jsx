import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import checkIcon from "../../assets/icons/CheckIcon.svg";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import { useState } from "react";
import useNotes from "../../hooks/useNotes";
import { NOTE_VIEWS } from "../../utils/constants";
import ColorPicker from "../ui/ColorPicker";
import IconButton from "../ui/IconButton";
import "./NoteCard.css";

export default function NoteCard({
  note,
  view,
  onEdit,
  isDragging = false,
}) {
  const {
    deleteNote,
    moveToTrash,
    restoreNote,
    toggleArchive,
    togglePin,
    updateNote,
  } = useNotes();

  const [showColorPicker, setShowColorPicker] = useState(false);

  const isTrashView = view === NOTE_VIEWS.TRASH;

  const handleCardClick = () => {
    if (isTrashView) return;
    onEdit(note.id);
  };

  const stopEvent = (event) => {
    event.stopPropagation();
  };

  const handlePin = (event) => {
    stopEvent(event);
    togglePin(note.id);
  };

  const handleArchiveToggle = (event) => {
    stopEvent(event);
    toggleArchive(note.id);
  };

  const handleMoveToTrash = (event) => {
    stopEvent(event);
    moveToTrash(note.id);
  };

  const handleRestore = (event) => {
    stopEvent(event);
    restoreNote(note.id);
  };

  const handleDeleteForever = (event) => {
    stopEvent(event);
    deleteNote(note.id);
  };

  const handleColorChange = (color) => {
    updateNote(note.id, { color });
    setShowColorPicker(false);
  };

  return (
    <article
      className={`note-card ${isDragging ? "dragging" : ""}`}
      style={{ backgroundColor: note.color }}
      onClick={handleCardClick}
      onMouseLeave={() => setShowColorPicker(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* SELECT CHECK */}
      <button
        type="button"
        className="note-select-btn"
        aria-label="Select note"
        onClick={stopEvent}
        tabIndex={-1}
      >
        <img src={checkIcon} alt="Select note" className="check-icon" />
      </button>

      {/* HEADER */}
      <div className="note-header">
        <h3>{note.title || ""}</h3>

        {!isTrashView && (
          <IconButton
            label={note.isPinned ? "Unpin note" : "Pin note"}
            className="pin-btn"
            active={note.isPinned}
            onClick={handlePin}
          >
            {note.isPinned ? (
              <PushPinIcon fontSize="small" />
            ) : (
              <PushPinOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </div>

      {/* CONTENT */}
      {note.content && <p className="note-content">{note.content}</p>}

      {/* ACTIONS */}
      <div className="note-actions" onClick={stopEvent} role="presentation">
        {isTrashView ? (
          <>
            <IconButton label="Restore note" onClick={handleRestore}>
              <RestoreFromTrashOutlinedIcon fontSize="small" />
            </IconButton>

            <IconButton label="Delete forever" onClick={handleDeleteForever}>
              <DeleteForeverOutlinedIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              label="Background options"
              active={showColorPicker}
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker((prev) => !prev);
              }}
            >
              <PaletteOutlinedIcon fontSize="small" />
            </IconButton>

            <IconButton
              label={note.isArchived ? "Unarchive note" : "Archive note"}
              onClick={handleArchiveToggle}
            >
              {note.isArchived ? (
                <UnarchiveOutlinedIcon fontSize="small" />
              ) : (
                <ArchiveOutlinedIcon fontSize="small" />
              )}
            </IconButton>

            <IconButton label="Move to trash" onClick={handleMoveToTrash}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>

            <IconButton label="Edit note" onClick={() => onEdit(note.id)}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>

            <IconButton label="More options">
              <MoreVertOutlinedIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </div>

      {/* COLOR PICKER (ANCHOR POSITIONED) */}
      {showColorPicker && (
        <div className="color-picker-wrapper">
          <ColorPicker
            selectedColor={note.color}
            onChange={handleColorChange}
          />
        </div>
      )}
    </article>
  );
}