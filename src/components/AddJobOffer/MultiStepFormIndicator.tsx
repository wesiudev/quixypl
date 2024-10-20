import Link from "next/link";

export default function MultiStepFormIndicator() {
  return (
    <div>
      <div className="multistep-indicator">
        <div className="step completed">
          <span className="step-number">1</span>
          <span className="step-label">Wprowadzenie danych</span>
        </div>
        <div className="step-separator"></div>
        <div className="step active">
          <span className="step-number">2</span>
          <span className="step-label">Wybór pakietu</span>
        </div>
        <div className="step-separator"></div>
        <div className="step">
          <span className="step-number">3</span>
          <span className="step-label">Podsumowanie</span>
        </div>
      </div>
    </div>
  );
}
