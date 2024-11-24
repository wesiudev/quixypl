import DashboardWrapper from "./DashboardWrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#126b91]">
      <DashboardWrapper>{children}</DashboardWrapper>
    </div>
  );
}
