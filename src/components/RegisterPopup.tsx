import Link from "next/link";

/**
 * A component that renders a register popup
 * @param {{
 *  view: "register" | "login",
 *  registerPopupOpen: boolean,
 *  setView: (view: "register" | "login") => void,
 *  userData: {
 *    email: string,
 *    password: string,
 *    repeatPassword: string,
 *  },
 *  setUserData: (userData: {
 *    email: string,
 *    password: string,
 *    repeatPassword: string,
 *  }) => void,
 *  isThinking: boolean,
 *  config: {
 *    terms: "accepted" | "not-accepted",
 *  },
 *  setConfig: (config: {
 *    terms: "accepted" | "not-accepted",
 *  }) => void,
 *  createAccount: () => void,
 *  signIn: () => void,
 * }} props
 * @returns A component that renders a register popup
 * @example
 * <RegisterPopup
 *  view="register"
 *  registerPopupOpen={true}
 *  setView={() => {}}
 *  userData={{ email: "", password: "", repeatPassword: "" }}
 *  setUserData={() => {}}
 *  isThinking={false}
 *  config={{ terms: "not-accepted" }}
 *  setConfig={() => {}}
 *  createAccount={() => {}}
 *  signIn={() => {}}
 * />
 */
export default function RegisterPopup({
  view,
  registerPopupOpen,
  setView,
  userData,
  setUserData,
  isThinking,
  config,
  setConfig,
  createAccount,
  signIn,
}: any) {
  return (
    <div
      className={`ease-in-out top-0 fixed left-1/2 -translate-x-1/2 w-full justify-center ${
        registerPopupOpen
          ? "z-[9999999999999999999999] flex duration-700"
          : "hidden"
      }`}
    >
      <div className="p-6 rounded-b-xl bg-white w-[90%] sm:max-w-[40rem]">
        <h2 className="text-4xl font-gotham text-black font-bold drop-shadow-xl shadow-black mb-3">
          {view === "register"
            ? "Dołącz i odbierz darmowe Quixies💎"
            : "Zaloguj się do swojego konta"}
        </h2>
        <p className="font-gotham font-light text-black text-lg sm:text-base md:text-lg">
          {view === "register"
            ? "🚀 Twoje pomysły są już wygenerowane! Zaloguj się do swojego profilu i rozwijaj ten najlepszy!"
            : "Dziękujemy, że wybierasz nasze usługi. Życzymy miłego korzystania z serwisu."}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4">
          <div className="w-full">
            <label htmlFor="email" className="text-black font-gotham font-bold">
              Email
            </label>
            <input
              required
              value={userData.email}
              className="text-black font-gotham font-light w-full p-2"
              type="email"
              id="email"
              placeholder="Wpisz Email"
              onChange={(e: any) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="password"
              className="text-black font-gotham font-bold"
            >
              Hasło
            </label>
            <input
              required
              value={userData.password}
              className="text-black font-gotham font-light w-full p-2"
              type="password"
              id="password"
              placeholder="Wpisz hasło"
              onChange={(e: any) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          {view === "register" && (
            <div className="w-full">
              <label
                htmlFor="repeatPassword"
                className="text-black font-gotham font-bold"
              >
                Powtórz hasło
              </label>
              <input
                required
                value={userData.repeatPassword}
                className="text-black font-gotham font-light w-full p-2"
                type="password"
                id="repeatPassword"
                placeholder="Powtórz hasło"
                onChange={(e: any) =>
                  setUserData({ ...userData, repeatPassword: e.target.value })
                }
              />
            </div>
          )}
          {view === "register" && (
            <div className="h-full items-end justify-end flex">
              <button
                disabled={isThinking}
                onClick={() => createAccount()}
                className="duration-150 disabled:cursor-not-allowed disabled:bg-gray-500 bg-[#126b91] text-white font-bold h-[42px] w-full p-2"
              >
                {isThinking ? "Tworzę konto..." : "Zarejestruj się"}
              </button>
            </div>
          )}
          {view === "login" && (
            <div className="h-full items-end justify-end flex">
              <button
                disabled={isThinking}
                onClick={() => signIn()}
                className="duration-150 disabled:cursor-not-allowed disabled:bg-gray-500 bg-[#126b91] text-white font-bold h-[42px] w-full p-2"
              >
                {isThinking ? "Loguję konto" : "Zaloguj się"}
              </button>
            </div>
          )}
        </div>
        {view === "register" && (
          <div className="font-gotham text-black font-light flex flex-row items-center mt-4">
            <button
              onClick={() => {
                if (config.terms !== "accepted") {
                  setConfig({ ...config, terms: "accepted" });
                } else {
                  setConfig({ ...config, terms: "not-accepted" });
                }
              }}
              className="mr-2 w-6 h-6 flex items-center justify-center border-gray-400 border"
            >
              <div
                className={`w-4 h-4 ${
                  config.terms === "accepted"
                    ? "bg-green-500"
                    : "bg-zinc-300 hover:bg-green-300"
                }`}
              ></div>
            </button>
            Akceptuję{" "}
            <Link
              href="/terms-of-use"
              className="mx-1 text-primary"
              target="_blank"
            >
              regulamin
            </Link>
            Quixy.pl
          </div>
        )}
        {view === "register" && (
          <div className="font-gotham text-black font-light flex flex-row items-center mt-4">
            <button
              onClick={() => {
                setUserData({ ...userData, logout: !userData.logout });
              }}
              className="mr-2 w-6 h-6 flex items-center justify-center border-gray-400 border"
            >
              <div
                className={`w-4 h-4 ${
                  userData.logout === true
                    ? "bg-green-500"
                    : "bg-zinc-300 hover:bg-green-300"
                }`}
              ></div>
            </button>
            Nie wylogowuj mnie z konta
          </div>
        )}
        <div className="text-justify flex mt-3 font-gotham text-black font-light">
          {view === "register" ? (
            <>
              Posiadasz już konto?{" "}
              <button
                onClick={() => setView("login")}
                className="underline hover:no-underline ml-1 text-primary"
              >
                Zaloguj się
              </button>
            </>
          ) : (
            <>
              Nie posiadasz konta?
              <button
                onClick={() => setView("register")}
                className="underline hover:no-underline ml-1 text-primary"
              >
                Zarejestruj się
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
