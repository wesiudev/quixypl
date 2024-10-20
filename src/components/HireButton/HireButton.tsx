"use client";
import { set_modals } from "@/redux/slices/modalsopen";
import { useDispatch, useSelector } from "react-redux";
export default function HireButton({
  talentSlugData,
}: {
  talentSlugData: any;
}) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <div>
      <button
        className={`bg-gradient-to-r from-primary to-cta px-2 py-1.5 rounded-md text-white font-gotham`}
        onClick={() =>
          dispatch(set_modals({ ...modals, currentChat: talentSlugData }))
        }
      >
        Napisz wiadomość
      </button>
    </div>
  );
}
