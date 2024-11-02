"use client";
import { auth } from "@/firebase";
import { set_modals } from "@/redux/slices/modalsopen";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function HireButton({
  talentSlugData,
}: {
  talentSlugData: any;
}) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const [user, loading] = useAuthState(auth);
  return (
    <div>
      <button
        className={`bg-gradient-to-r from-primary to-cta px-2 py-1.5  text-white font-gotham rounded-lg`}
        onClick={() => {
          if (talentSlugData.uid === user?.uid) {
            return toast.error("Nie możesz aplikować do samego siebie");
          } else {
            dispatch(set_modals({ ...modals, currentChat: talentSlugData }));
          }
        }}
      >
        Napisz wiadomość
      </button>
    </div>
  );
}
