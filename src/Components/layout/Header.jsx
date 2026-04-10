import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import keepLogo from "../../assets/images/google-keep-logo.png";
import IconButton from "../ui/IconButton";

export default function Header({ searchQuery, onSearchChange, onMenuToggle }) {
  return (
    <nav className="header">
      <div className="brand-row">
        <IconButton
          label="Toggle sidebar"
          className="menu-toggle"
          onClick={onMenuToggle}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <img src={keepLogo} alt="Google Keep" className="brand-logo" />
        <h1 className="brand">Keep</h1>
      </div>

      <div className="header-actions">
        <label className="search-wrap" htmlFor="note-search">
          <SearchIcon className="search-icon" fontSize="small" />
          <input
            id="note-search"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <div className="header-icon-group">
          <IconButton label="Refresh">
            <RefreshIcon fontSize="small" />
          </IconButton>
          <IconButton label="List view">
            <ViewAgendaOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton label="Settings">
            <SettingsOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton label="Google apps">
            <AppsOutlinedIcon fontSize="small" />
          </IconButton>
          <button type="button" className="profile-chip" aria-label="Profile">
            K
          </button>
        </div>
      </div>
    </nav>
  );
}
