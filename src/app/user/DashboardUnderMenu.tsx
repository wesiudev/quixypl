"use client";
import MultiStepVerification from "@/components/Dashboard/Settings/SettingsInputs/MultiStepVerification";
import { set_modals } from "@/redux/slices/modalsopen";
import Image from "next/image";
import { useState } from "react";
import { FaCoins, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import DashboardUserInfo from "./DashboardUserInfo";
import ServiceList from "@/components/Dashboard/ProjectList";
import AccountHistory from "@/components/Dashboard/ImageGenerator/dashboard/AccountHistory";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import moment from "moment";
export default function DashboardUnderMenu() {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const { user } = useSelector((state: any) => state.user);
  const [isAnimating, setIsAnimating] = useState(false);
  function generateLeadsChartData(data: any, key: string) {
    // Find unique month names from leads
    const uniqueMonths = new Set(
      data?.map((lead: any) => moment(lead.createdAt)?.format("MM.YYYY"))
    );
    const uniqueMonthNames = Array?.from(uniqueMonths).sort();

    // {'czerwiec 2024', 'maj 2024'}
    const chartData = uniqueMonthNames?.map((month: any) => ({
      miesiac: month,
      [key]: data?.filter(
        (lead: any) => moment(lead.createdAt).format("MM.YYYY") === month
      )?.length,
    }));

    return chartData;
  }
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
              <div className="flex flex-row">
                <button
                  onClick={() =>
                    dispatch(set_modals({ ...modals, config: true }))
                  }
                  className=""
                >
                  {user?.photoURL && (
                    <div className="rounded-full w-24 aspect-square overflow-hidden relative">
                      <Image
                        style={{ boxShadow: "inset 0px 0px 8px black" }}
                        src={user?.photoURL}
                        width={256}
                        height={256}
                        alt=""
                        className="shadow-sm shadow-black rounded-full bg-white absolute inset-0 object-cover w-full h-full"
                      />
                    </div>
                  )}
                  {!user?.photoURL && (
                    <div
                      style={{ boxShadow: "inset 0px 0px 8px black" }}
                      className="rounded-full bg-gradient-to-r from-primary to-cta w-24 aspect-square text-white flex items-center justify-center"
                    >
                      <FaUser className="text-3xl lg:text-5xl" />
                    </div>
                  )}
                </button>
                {!user?.configured && (user?.seek === "ask" || !user?.seek) && (
                  <div className="pl-4 pt-4">
                    <h2 className="text-white bg-gradient-to-r from-zinc-800 via-gray-700 to-zinc-950 w-max rounded-xl px-2 font-extrabold">
                      Nie skonfigurowano profilu
                    </h2>
                    <p className="text-black max-w-lg font-coco my-1 text-sm">
                      Określ typ profilu w zakładce{" "}
                      <b className="italic">MÓJ PROFIL</b>, by rozpocząć swoją
                      przygodę w Quixy
                    </p>
                  </div>
                )}
                {user?.configured && user?.seek !== "ask" && (
                  <div className="flex flex-col h-max px-3">
                    {!user?.name && (
                      <h2 className="text-sm text-black drop-shadow-lg font-bold font-coco italic">
                        {user?.seek && "Imię (lub imię i nazwisko)"}
                        {(!user?.seek || user?.seek === "ask") &&
                          "Nazwa firmy/dane rekrutera"}
                      </h2>
                    )}
                    <h3
                      className={`text-lg sm:text-xl font-extrabold text-black`}
                    >
                      {user?.name ? user?.name : "Nie podano"}
                    </h3>
                    <h3 className="text-black">{user?.title && user?.title}</h3>
                    <h3 className="text-black text-sm">
                      {user?.pseudo && user?.pseudo}
                    </h3>
                    <button
                      onClick={() =>
                        dispatch(set_modals({ ...modals, quixies: true }))
                      }
                      className="flex items-center mt-1"
                    >
                      <div className="gap-2 flex items-center justify-center px-2 py-1.5 h-8 bg-gradient-to-r from-primary to-cta rounded-lg">
                        <FaCoins className="text-lg text-white" />
                        <div className="font-extrabold text-white font-coco">
                          {user?.tokens?.toFixed(2)}
                        </div>
                      </div>
                    </button>
                  </div>
                )}{" "}
              </div>
              <DashboardUserInfo />
              <ServiceList projects={user?.projects} />
              <div className="my-4 bg-blue-100 p-4 rounded-xl">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart
                    data={generateLeadsChartData(user?.leads, "leady")}
                    margin={{
                      top: 5,
                      right: 0,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="miesiac" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="leady" stroke="blue" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
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
