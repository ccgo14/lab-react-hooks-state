import React from 'react'

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button onClick={onToggle}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  )
}

export default DarkModeToggle