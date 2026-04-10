import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useCallback, useRef, useState } from "react";
import { DEFAULT_NOTE_COLOR } from "../../utils/constants";
import { createNote, isNoteBlank } from "../../utils/helpers";
import useNotes from "../../hooks/useNotes";
import useOutsideClick from "../../hooks/useOutsideClick";
import ColorPicker from "../ui/ColorPicker";
import IconButton from "../ui/IconButton";

const defaultDraft = {
  title: "",
  content: "",
  color: DEFAULT_NOTE_COLOR,
};

export default function CreateNote() {
  const { addNote } = useNotes();
  const [isExpanded, setIsExpanded] = useState(false);
  const [draft, setDraft] = useState(defaultDraft);
  const containerRef = useRef(null);

  const resetDraft = useCallback(() => {
    setDraft(defaultDraft);
  }, []);

  const saveNote = useCallback(() => {
    if (isNoteBlank(draft)) {
      resetDraft();
      return;
    }

    addNote(createNote(draft));
    resetDraft();
  }, [addNote, draft, resetDraft]);

  const closeComposer = useCallback(() => {
    if (!isExpanded) {
      return;
    }

    saveNote();
    setIsExpanded(false);
  }, [isExpanded, saveNote]);

  useOutsideClick(containerRef, closeComposer, isExpanded);

  const updateDraft = (field, value) => {
    setDraft((previous) => ({ ...previous, [field]: value }));
  };

  const openComposer = () => {
    setIsExpanded(true);
  };

  const handleEscape = (event) => {
    if (event.key !== "Escape") {
      return;
    }
    event.preventDefault();
    closeComposer();
  };

  return (
    <div ref={containerRef} className="create-note form-container" role="presentation">
      {!isExpanded ? (
        <div className="create-collapsed-row">
          <input
            className="note-input note-input-collapsed"
            placeholder="Take a note..."
            value={draft.content}
            onFocus={openComposer}
            onClick={openComposer}
            onChange={(event) => {
              openComposer();
              updateDraft("content", event.target.value);
            }}
          />
          <div className="composer-quick-actions" onClick={(event) => event.stopPropagation()}>
            <IconButton label="Checklist">
              <CheckBoxOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton label="Brush note">
              <BrushOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton label="Image note">
              <ImageOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      ) : (
        <>
          <input
            className="note-input"
            placeholder="Title"
            value={draft.title}
            onChange={(event) => updateDraft("title", event.target.value)}
            onKeyDown={handleEscape}
            autoFocus
          />
          <textarea
            className="note-textarea note-textarea-expanded"
            placeholder="Take a note..."
            rows={4}
            value={draft.content}
            onChange={(event) => updateDraft("content", event.target.value)}
            onKeyDown={handleEscape}
          />
        <div className="create-actions" onClick={(event) => event.stopPropagation()}>
          <div className="create-actions-left">
            <ColorPicker
              selectedColor={draft.color}
              onChange={(color) => updateDraft("color", color)}
            />
          </div>
          <button type="button" className="save-btn" onClick={closeComposer}>
            Close
          </button>
        </div>
        </>
      )}
    </div>
  );
}
