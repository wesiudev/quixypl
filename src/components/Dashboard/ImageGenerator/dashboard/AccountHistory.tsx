import moment from "moment";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaClock } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function AccountHistory() {
  const { user } = useSelector((state: any) => state.user);

  return (
    <div className="flex flex-col relative">
      <div className="h-full bg-white w-full font-gotham">
        <h1 className="mt-8 2xl:mt-0 text-3xl text-black  mb-6">
          Historia konta
        </h1>
        {user.history?.length && (
          <div className="max-h-[30vh] overflow-y-scroll">
            {user.history
              ?.slice()
              .reverse()
              .map((item: any, idx: number) => (
                <div className="flex flex-col p-4" key={idx}>
                  <div className="flex flex-row sm:items-center">
                    <FaClock className="w-6 h-6 mt-px mr-1 text-primary" />
                    <div className="flex flex-col sm:flex-row">
                      <span className="text-lg text-slate-800 font-light">
                        {moment(item.creationTime).format("DD-MM-yyyy hh:mm a")}{" "}
                      </span>
                      <div className="sm:ml-2 font-light text-xl text-[green]">
                        {moment(item.creationTime).fromNow()}
                      </div>
                    </div>
                  </div>
                  <span className="text-lg flex text-black drop-shadow-sm font-coco">
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
