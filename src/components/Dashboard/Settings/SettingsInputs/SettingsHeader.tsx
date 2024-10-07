import { set_modals } from "@/redux/slices/modalsopen";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function SettingsHeader({
  setIsFullscreen,
  isFullscreen,
  changesWereMade,
  setError,
}: {
  setIsFullscreen: any;
  isFullscreen: any;
  changesWereMade: any;
  setError: any;
}) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <div className="bg-[#126b91] text-base text-white font-bold p-3 sticky left-0 top-[-1px] z-[5000] flex items-center justify-between w-full">
      <div className="ml-3">Skonfiguruj swoje konto</div>
      <div className="flex">
        <button
          className="lg:hidden"
          onClick={() => setIsFullscreen(!isFullscreen)}
        >
          <div className="mr-2.5 text-2xl aspect-square w-11 h-11 group-hover:rounded-l-none rounded-md bg-white hover:bg-gray-200 duration-100 text-black  items-center justify-center flex">
            {!isFullscreen && <AiOutlineFullscreen />}
            {isFullscreen && <AiOutlineFullscreenExit />}
          </div>
        </button>
        <button
          onClick={() => {
            if (!changesWereMade) {
              setIsFullscreen(false);
              dispatch(set_modals({ ...modals, config: false }));
            } else {
              setError(true);
            }

            setTimeout(() => {
              setError(false);
            }, 1200);
          }}
        >
          <div className="text-2xl aspect-square w-11 h-11 group-hover:rounded-l-none rounded-md bg-red-600 hover:bg-red-700 duration-100 text-white items-center justify-center flex">
            <IoClose />
          </div>
        </button>
      </div>
    </div>
  );
}
