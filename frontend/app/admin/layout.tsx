import AdminGuard from "@/components/auth/AdminGuard";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Topbar />
          <main className="flex-1 px-4 py-6 md:px-8">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
