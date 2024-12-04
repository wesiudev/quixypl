"use client";
import moment from "moment";

export default function User() {
  moment.locale("pl");
  return (
    <div className="relative">
      {/* {user ? (
        <div className="relative pb-3 lg:pb-6 bg-white">
          <div className="grid grid-cols-1 h-max relative w-full mx-auto">
            <div className={`bg-white h-max w-full`}>
              <ServiceList projects={user?.projects} />
            </div>
            <AccountHistory />
          </div>
        </div>
      ) : (
        <Loading />
      )} */}
    </div>
  );
}
