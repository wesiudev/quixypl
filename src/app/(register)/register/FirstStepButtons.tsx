export default function FirstStepButtons({
  userData,
  step,
  setStep,
  seek,
}: {
  userData: any;
  step: any;
  setStep: any;
  seek: boolean;
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
      {seek && step === 1 && (
        <button
          style={{ borderRadius: "0px" }}
          onClick={() => setStep(2)}
          className="button !font-normal !px-12"
        >
          Znajdźmy pracę!
        </button>
      )}
    </div>
  );
}
