import React from "react";
import useTheme from "../../context/themeContext";

function ToggleButton() {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <button onClick={setDarkMode}>
      {darkMode ? "Dark Mode" : "Light Mode"}
    </button>
  );
}

export default ToggleButton;
