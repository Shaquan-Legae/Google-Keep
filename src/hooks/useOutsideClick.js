import { useEffect } from "react";

export default function useOutsideClick(ref, onOutsideClick, isActive = true) {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const handleInteraction = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      onOutsideClick(event);
    };

    document.addEventListener("mousedown", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("mousedown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [isActive, onOutsideClick, ref]);
}
