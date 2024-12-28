export default function FirstStepButtons({
  userData,
  step,
  setStep,
  seek,
}: {
  userData: any;
  step: any;
  setStep: any;
  seek: any;
}) {
  return (
    <div>
      {!seek && step === 1 && (
        <button
          onClick={() => setStep(2)}
          className="bg-gradient-to-b from-ctaStart to-ctaEnd rounded-md py-2 px-4 text-white"
        >
          Przejdź do panelu!
        </button>
      )}
      {seek && seek !== "ask" && step === 1 && (
        <button
          onClick={() => setStep(2)}
          className="bg-gradient-to-b from-ctaStart to-ctaEnd rounded-md py-2 px-4 text-white"
        >
          Znajdźmy pracę!
        </button>
      )}
      {/* {seek === "ask" && step === 1 && (
        <button
          style={{ borderRadius: "0px" }}
          onClick={() => setStep(2)}
          className="button !font-normal !px-12"
        >
          Wypróbuj za darmo!
        </button>
      )} */}
    </div>
  );
}
