"use client";
import { auth } from "@/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getStripeCheckoutByQuixyPacket } from "../../utils/getStripeCheckoutByQuixyPacket";
/**
 * A component that renders a button that sends a request to the server to generate a stripe checkout link.
 * @param {Object} item - An object containing the item to purchase.
 * @param {string} item.plainName - The name of the item to purchase.
 * @param {number} item.price - The price of the item to purchase.
 * @param {number} item.quantity - The quantity of the item to purchase.
 * @param {number} item.discount - The discount of the item to purchase.
 * @returns {React.ReactElement} A component that renders a button that sends a request to the server to generate a stripe checkout link.
 */
function StripeButton({ item }: { item: any }) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [success, setSuccess] = useState(false);
  const sendCheckoutRequest = () => {
    setLoading(true);
    if (!loading && !user) {
      router.push("/login");
      setLoading(false);
    }
    getStripeCheckoutByQuixyPacket(user?.uid!, item.plainName).then(
      (data: any) => {
        setLoading(false);
        setSuccess(true);
        if (data) {
          setLoading(false);
          router.replace(`${data.url}`);
        }
      }
    );
  };
  return (
    <button
      className={`w-full disabled:cursor-not-allowed`}
      disabled={isLoading || success}
      onClick={sendCheckoutRequest}
    >
      <div
        style={{ boxShadow: "0px 0px 16px cyan" }}
        className={`w-full font-bold relative flex items-center justify-center text-center text-white bg-orange-500 px-6 py-1 rounded-b-xl mt-2 text-base rounded-xl`}
      >
        {isLoading && (
          <div className="bg-white h-full aspect-square rounded-md flex flex-row items-center justify-center px-2 font-bold mx-auto">
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
            <div className="w-max text-sm sm:text-base group-hover:scale-y-100 duration-100 group-hover:delay-150 scale-y-0 absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
              Kup za {item.price},99 PLN
            </div>
            <div
              className={`group-hover:scale-y-0 duration-150 ease-in-out ${
                item.discount > 0 && "line-through text-gray-400"
              }`}
            >
              💎{item.quantity}{" "}
            </div>{" "}
            <div
              className={`${
                item.discount === 0 && "hidden"
              } group-hover:scale-y-0 duration-150 ease-in-out`}
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
