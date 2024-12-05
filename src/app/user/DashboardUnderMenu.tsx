"use client";
import MultiStepVerification from "@/components/Dashboard/Settings/SettingsInputs/MultiStepVerification";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardUserInfo from "./DashboardUserInfo";
import ServiceList from "@/components/Dashboard/ProjectList";
import AccountHistory from "@/components/Dashboard/ImageGenerator/dashboard/AccountHistory";

export default function DashboardUnderMenu() {
  const { user } = useSelector((state: any) => state.user);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div>
      <div className="flex flex-col group">
        <div className="flex items-start justify-between bg-white px-4 lg:px-6 pt-4 lg:pt-6 h-max relative w-full">
          <div
            className={`flex flex-col-reverse lg:grid ${
              user?.seek === "ask" ||
              !user?.pseudo ||
              !user?.name ||
              !user?.emailVerified ||
              !user?.configured ||
              !user?.access
                ? "grid-cols-1 lg:grid-cols-2"
                : ""
            }  w-full`}
          >
            <div>
              <DashboardUserInfo />
              <ServiceList projects={user?.projects} />
              <AccountHistory />
            </div>
            <div>
              {(user?.seek === "ask" ||
                !user?.pseudo ||
                !user?.name ||
                !user?.emailVerified ||
                !user?.configured ||
                !user?.access) && (
                <MultiStepVerification
                  seek={user?.seek}
                  pseudo={user?.pseudo}
                  name={user?.name}
                  emailVerified={user?.emailVerified}
                  configured={user?.configured}
                  user={user}
                  setIsAnimating={setIsAnimating}
                  isAnimating={isAnimating}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// USER STATISTICS
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Bar,
//   BarChart,
// } from "recharts";
// <div className="my-4 bg-blue-100 p-4 rounded-xl">
//                 <ResponsiveContainer width="100%" height={350}>
//                   <LineChart
//                     data={generateLeadsChartData(user?.leads, "leady")}
//                     margin={{
//                       top: 5,
//                       right: 0,
//                       left: 0,
//                       bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="miesiac" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="leady" stroke="blue" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
// function generateLeadsChartData(data: any, key: string) {
//   // Find unique month names from leads
//   const uniqueMonths = new Set(
//     data?.map((lead: any) => moment(lead.createdAt)?.format("MM.YYYY"))
//   );
//   const uniqueMonthNames = Array?.from(uniqueMonths).sort();

//   // {'czerwiec 2024', 'maj 2024'}
//   const chartData = uniqueMonthNames?.map((month: any) => ({
//     miesiac: month,
//     [key]: data?.filter(
//       (lead: any) => moment(lead.createdAt).format("MM.YYYY") === month
//     )?.length,
//   }));

//   return chartData;
// }
