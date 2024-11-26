export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <div className="bg-[#126b91]">
        <Providers>
          <DashboardHeader />
          <div className="flex">
            <Chat />
            <div className="w-full h-screen">{children}</div>
          </div>
        </Providers>
      </div> */}
      {children}
    </>
  );
}
