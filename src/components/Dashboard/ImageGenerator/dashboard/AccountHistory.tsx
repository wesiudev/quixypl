import moment from "moment";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AccountHistory() {
  const { user } = useSelector((state: any) => state.user);

  return (
    <div className="flex flex-col relative px-4">
      <h2 className="text-3xl font-extrabold text-black">Twoje działania</h2>
      <div className="h-full bg-white w-full">
        {user?.history?.length && (
          <div className="max-h-[30vh] overflow-y-scroll">
            {user?.history
              ?.slice()
              .reverse()
              .map((item: any, idx: number) => (
                <div className="flex flex-col py-2" key={idx}>
                  <div className="flex">
                    <FaClock className="w-6 h-6 mt-px mr-1 text-gray-500" />
                    <div className="flex items-center">
                      <span className="text-base text-slate-800 font-light">
                        {moment(item.creationTime).format("DD-MM-yyyy hh:mm a")}{" "}
                      </span>
                      <div className="ml-2 font-coco text-base lg:text-xl text-cta">
                        {moment(item.creationTime).fromNow()}
                      </div>
                    </div>
                  </div>
                  <span className="text-lg flex text-black drop-shadow-sm">
                    <BsArrowReturnRight className="mt-0.5 min-w-5 min-h-5 mr-1 ml-[9px]" />
                    {item.action}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
