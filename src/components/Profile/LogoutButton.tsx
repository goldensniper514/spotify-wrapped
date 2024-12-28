export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
    >
      Logout
    </button>
  );
}
