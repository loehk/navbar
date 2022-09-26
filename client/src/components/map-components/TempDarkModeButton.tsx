
export default function ({darkMode, toggleDarkMode}: {darkMode: boolean, toggleDarkMode: () => void } ) {


  return (
    <button
      style={{ position: 'fixed', zIndex: 99, top: 0, right: 0, padding: '0.5rem', margin: '0.5rem', cursor: 'pointer' }}
      onClick={toggleDarkMode}
    >
      TOGGLE {!darkMode ? "DARK" : "LIGHT"} MODE
    </button>
  );
}
