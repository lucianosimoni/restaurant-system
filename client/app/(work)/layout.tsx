import AppNavibar from "@/components/Navbar";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppNavibar />
      {children}
    </div>
  );
}
