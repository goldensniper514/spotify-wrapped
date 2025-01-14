export function LogoutButton({ onLogout }: { onLogout: () => void }) {
  return (
    <button onClick={onLogout} className="btn-general">
      Logout
    </button>
  );
}
