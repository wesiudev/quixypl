import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full relative z-[9999] bg-primary">{children}</div>;
}
