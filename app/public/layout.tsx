import { MainNav } from "@/components/front/section/main-nav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="fixed top-4 left-0 right-0 z-50 w-full px-4">
        <div className="mx-auto w-fit">
          <MainNav />
        </div>
      </header>
      <main className="pt-20">{children}</main>
    </div>
  );
}
