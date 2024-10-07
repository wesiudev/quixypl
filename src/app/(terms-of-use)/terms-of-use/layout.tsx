export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#126b91] flex flex-col items-center justify-center w-full h-full">
      {children}
    </main>
  );
}
