'use client'

import { useState, useRef, useEffect } from 'react';

export default function PopupExample() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  // Optional: close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Toggle Popup
      </button>

      {open && (
        <div
          ref={popupRef}
          className="absolute left-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 z-20"
        >
          <p>This is a popup that won't block interaction with the rest of the page.</p>
        </div>
      )}
    </div>
  );
}
