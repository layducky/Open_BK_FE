export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main>
      <div className="w-full flex flex-col items-center gap-8 overscroll-y-auto min-h-screen bg-gray-300">
        <div className="dashboard-bottom flex flex-row w-full h-fit relative">
          <div className="w-fit h-fit flex-1">{children}</div>
        </div>
      </div>
    </main>
  );
}
