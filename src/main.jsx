import ReactDOM from "react-dom/client";
import App from "./App";
import { NotesProvider } from "./state/NotesContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotesProvider>
    <App />
  </NotesProvider>,
);
