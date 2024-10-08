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
          className="button !font-normal !px-12"
        >
          Pomyślmy nad biznesem!
        </button>
      )}
      {seek && seek !== "ask" && step === 1 && (
        <button
          style={{ borderRadius: "0px" }}
          onClick={() => setStep(2)}
          className="button !font-normal !px-12"
        >
          Znajdźmy pracę!
        </button>
      )}
      {seek === "ask" && step === 1 && (
        <button
          style={{ borderRadius: "0px" }}
          onClick={() => setStep(2)}
          className="button !font-normal !px-12"
        >
          Wypróbuj AI!
        </button>
      )}
    </div>
  );
}
