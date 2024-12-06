"use client";
import { auth } from "@/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
async function getStripeCheckoutByQuixyPacket(uid: any, packet: string) {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/stripe/getStripeCheckoutByQuixyPacket?uid=${uid}&packet=${packet}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const data = req.json();

  return data;
}
function StripeButton({ item }: { item: any }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [success, setSuccess] = useState(false);
  const sendCheckoutRequest = async () => {
    setLoading(true);
    if (!loading && !user) {
      router.push("/login");
      setLoading(false);
    }
    await getStripeCheckoutByQuixyPacket(user?.uid!, item.plainName).then(
      (data: any) => {
        setLoading(false);
        setSuccess(true);
        if (data) {
          setLoading(false);
          router.replace(`${data?.url}`);
        }
      }
    );
  };
  return (
    <button
      className={`w-full disabled:cursor-not-allowed font-coco`}
      disabled={isLoading || success}
      onClick={sendCheckoutRequest}
    >
      <div
        style={{ boxShadow: "0px 0px 16px cyan" }}
        className={`w-full font-bold relative flex items-center justify-center text-center text-white bg-gradient-to-r from-primary to-cta px-6 py-1 mt-2 text-base `}
      >
        {isLoading && (
          <div className="bg-white h-full aspect-square  flex flex-row items-center justify-center px-2 font-bold mx-auto">
            <Image
              width={25}
              height={25}
              className="h-full w-auto"
              src="https://raw.githubusercontent.com/n3r4zzurr0/svg-spinners/abfa05c49acf005b8b1e0ef8eb25a67a7057eb20/svg-css/blocks-shuffle-2.svg"
              alt=""
            />
          </div>
        )}
        {!isLoading && (
          <>
            <div
              style={{ textShadow: "1px 1px 1px black" }}
              className="w-max text-sm sm:text-base group-hover:scale-y-100 duration-100 group-hover:delay-150 scale-y-0 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
            >
              Kup za {item.price},99 PLN
            </div>
            <div
              style={{ textShadow: "1px 1px 1px black" }}
              className={`text-lg group-hover:scale-y-0 duration-150 ease-in-out ${
                item.discount > 0 && "line-through text-gray-400"
              }`}
            >
              💎{item.quantity}{" "}
            </div>{" "}
            <div
              style={{ textShadow: "1px 1px 1px black" }}
              className={`${
                item.discount === 0 && "hidden"
              } text-lg group-hover:scale-y-0 duration-150 ease-in-out`}
            >
              {" "}
              💎{item.quantity + item.quantity * item.discount}
            </div>
          </>
        )}
      </div>
    </button>
  );
}

export default StripeButton;
