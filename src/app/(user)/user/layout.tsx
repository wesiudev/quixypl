import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import UserClient from "../../../components/UserClient";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full relative z-[9999] bg-primary">
      <UserClient />
      {children}
    </div>
  );
}
