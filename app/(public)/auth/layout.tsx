export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-4 p-0 sm:p-4 md:p-10">
      {children}
    </div>
  );
}
