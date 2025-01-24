import { Sidebar } from './Sidebar/Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-spotify-black">
      <Sidebar />
      <main className="min-[768px]:ml-[100px] pb-16 min-[768px]:pb-0">
        {children}
      </main>
    </div>
  );
}
