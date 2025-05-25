export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main>
      <div className="px-1 md:px-12 py-4 items-center overscroll-y-auto min-h-screen">
          {children}
      </div>
    </main>
  );
}
