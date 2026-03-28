import Sidebar from "../components/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden paper-texture">
      <Sidebar />
      <div className="flex-1 ml-[220px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
