import { set_modals } from "@/redux/slices/modalsopen";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function SettingsHeader({
  changesWereMade,
  setError,
  user,
}: {
  changesWereMade: any;
  setError: any;
  user: any;
}) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <div className="bg-gradient-to-r from-primary to-cta text-base text-white font-bold p-3 z-[5000] flex items-center justify-between w-full">
      <div className="ml-3">MÓJ PROFIL</div>
      <div className="flex">
        <button
          onClick={() => {
            if (!changesWereMade) {
              dispatch(set_modals({ ...modals, config: false }));
            } else {
              setError(true);
            }

            setTimeout(() => {
              setError(false);
            }, 1200);
          }}
        >
          <div className="text-2xl aspect-square w-11 h-11 group-hover:rounded-l-none  bg-red-600 hover:bg-red-700 duration-100 text-white items-center justify-center flex">
            <IoClose />
          </div>
        </button>
      </div>
    </div>
  );
}
