import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./Components/layout/Header";
import Sidebar from "./Components/layout/Sidebar";
import Archive from "./pages/Archive";
import Home from "./pages/Home";
import Trash from "./pages/Trash";
import { ROUTES } from "./utils/constants";

const MOBILE_BREAKPOINT = "(max-width: 900px)";

const getInitialIsMobile = () =>
  typeof window !== "undefined"
    ? window.matchMedia(MOBILE_BREAKPOINT).matches
    : false;

function AppShell() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(getInitialIsMobile);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => !getInitialIsMobile());

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const handleMediaChange = (event) => {
      setIsMobile(event.matches);
      setIsSidebarOpen(!event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsSidebarOpen((previous) => !previous);
  };

  return (
    <div className="app-shell">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuToggle={handleMenuToggle}
      />

      <button
        type="button"
        className={`sidebar-overlay ${isMobile && isSidebarOpen ? "open" : ""}`}
        aria-label="Close sidebar"
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`layout ${isMobile ? "mobile" : "desktop"} ${
          isSidebarOpen ? "sidebar-open" : "sidebar-collapsed"
        }`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          isMobile={isMobile}
          onNavigate={() => {
            if (isMobile) {
              setIsSidebarOpen(false);
            }
          }}
        />

        <main className="page-content">
          <Routes>
            <Route
              path={ROUTES.NOTES}
              element={<Home searchQuery={searchQuery} />}
            />
            <Route
              path={ROUTES.ARCHIVE}
              element={<Archive searchQuery={searchQuery} />}
            />
            <Route
              path={ROUTES.TRASH}
              element={<Trash searchQuery={searchQuery} />}
            />
            <Route path="*" element={<Navigate to={ROUTES.NOTES} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
