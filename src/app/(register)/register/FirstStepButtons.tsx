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
          style={{ borderRadius: "0px" }}
          onClick={() => setStep(2)}
          className="bg-gradient-to-r from-primary to-cta py-2 !font-normal !px-4 text-white"
        >
          Zatrudnij talent!
        </button>
      )}
      {seek && seek !== "ask" && step === 1 && (
        <button
          style={{ borderRadius: "0px" }}
          onClick={() => setStep(2)}
          className="bg-gradient-to-r from-primary to-cta py-2 !font-normal !px-4 text-white"
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
