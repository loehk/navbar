export default function ({ toggleDarkMode }: { toggleDarkMode: () => void }) {
  return (
    <button
      style={{ position: 'fixed', zIndex: 99, top: 0, right: 0, padding: '0.5rem' }}
      onClick={toggleDarkMode}
    >
      TOGGLE DARK MODE
    </button>
  );
}
