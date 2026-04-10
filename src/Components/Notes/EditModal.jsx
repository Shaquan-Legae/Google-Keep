import AddAlertOutlinedIcon from "@mui/icons-material/AddAlertOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import { useEffect, useRef, useState } from "react";
import useNotes from "../../hooks/useNotes";
import useOutsideClick from "../../hooks/useOutsideClick";
import ColorPicker from "../ui/ColorPicker";
import IconButton from "../ui/IconButton";

export default function EditModal({ noteId, onClose }) {
  const { notes, moveToTrash, toggleArchive, togglePin, updateNote } = useNotes();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const modalRef = useRef(null);

  const note = notes.find((item) => item.id === noteId);

  useOutsideClick(modalRef, onClose, Boolean(note));

  useEffect(() => {
    if (!note) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [note, onClose]);

  if (!note) {
    return null;
  }

  const formattedUpdatedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(note.updatedAt));

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        className="modal"
        ref={modalRef}
        style={{ backgroundColor: note.color }}
        onClick={(event) => event.stopPropagation()}
      >
        <input
          className="note-input modal-title"
          value={note.title}
          onChange={(event) => updateNote(note.id, { title: event.target.value })}
          placeholder="Title"
        />

        <div className="modal-pin-wrap">
          <IconButton
            label={note.isPinned ? "Unpin note" : "Pin note"}
            active={note.isPinned}
            onClick={() => togglePin(note.id)}
          >
            {note.isPinned ? (
              <PushPinIcon fontSize="small" />
            ) : (
              <PushPinOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </div>

        <textarea
          className="note-textarea modal-textarea"
          rows={7}
          value={note.content}
          onChange={(event) => updateNote(note.id, { content: event.target.value })}
          placeholder="Take a note..."
        />

        {showColorPicker && (
          <ColorPicker
            selectedColor={note.color}
            onChange={(color) => {
              updateNote(note.id, { color });
              setShowColorPicker(false);
            }}
          />
        )}

        <div className="modal-actions">
          <div className="modal-action-icons modal-action-icons-left">
            <IconButton label="Formatting options">
              <FormatColorTextOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              label="Toggle color picker"
              active={showColorPicker}
              onClick={() => setShowColorPicker((previous) => !previous)}
            >
              <PaletteOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton label="Remind me">
              <AddAlertOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton label="Collaborator">
              <PersonAddAltOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton label="Add image">
              <ImageOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              label={note.isArchived ? "Unarchive note" : "Archive note"}
              onClick={() => toggleArchive(note.id)}
            >
              {note.isArchived ? (
                <UnarchiveOutlinedIcon fontSize="small" />
              ) : (
                <ArchiveOutlinedIcon fontSize="small" />
              )}
            </IconButton>
            <IconButton
              label="Move note to trash"
              onClick={() => {
                moveToTrash(note.id);
                onClose();
              }}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton label="More">
              <MoreVertOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton label="Undo">
              <UndoOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton label="Redo">
              <RedoOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
          <div className="modal-actions-right">
            <span className="modal-edited-at">Edited {formattedUpdatedDate}</span>
            <button type="button" className="save-btn modal-close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
