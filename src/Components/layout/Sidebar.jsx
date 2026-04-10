import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

const navItems = [
  {
    to: ROUTES.NOTES,
    label: "Notes",
    icon: <LightbulbOutlinedIcon fontSize="small" />,
    end: true,
    static: false,
  },
  {
    to: null,
    label: "Reminders",
    icon: <NotificationsNoneOutlinedIcon fontSize="small" />,
    static: true,
  },
  {
    to: null,
    label: "Edit labels",
    icon: <EditOutlinedIcon fontSize="small" />,
    static: true,
  },
  {
    to: ROUTES.ARCHIVE,
    label: "Archive",
    icon: <ArchiveOutlinedIcon fontSize="small" />,
    end: false,
    static: false,
  },
  {
    to: ROUTES.TRASH,
    label: "Bin",
    icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
    end: false,
    static: false,
  },
];

export default function Sidebar({ isOpen, isMobile, onNavigate }) {
  return (
    <aside
      className={`sidebar ${isOpen ? "open" : "collapsed"} ${
        isMobile ? "mobile" : "desktop"
      }`}
    >
      <nav className="sidebar-nav">
        {navItems.map((item) =>
          item.static ? (
            <button
              key={item.label}
              type="button"
              className="nav-link nav-static"
              aria-label={item.label}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={onNavigate}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ),
        )}
      </nav>

      <p className="sidebar-footer">Open-source licences</p>
    </aside>
  );
}
