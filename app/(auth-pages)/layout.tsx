export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-[470px] p-8 rounded-lg bg-gradient-to-b from-background/90 to-muted/60 border border-primary/10 hover:brightness-110 hover:border-primary/20 transition-all duration-700">
        {children}
      </div>
    </div>
  );
}
