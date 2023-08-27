// DarkModeToggle.js

import { useState } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark-mode"); // Add a class to the body to enable dark mode
  };

  return (
    <button onClick={handleDarkModeToggle}>
      {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
