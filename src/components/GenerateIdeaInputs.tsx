/**
 * Komponent GenerateIdeaInputs
 *
 * Umożliwia uzytkownikowi wprowadzenie danych do generowania pomysłu na
 * biznes. Dla każdego z pól jest wygenerowany odpowiedni label, select
 * albo input. Wartości z tych pól są przekazywane za pomocą propsa
 * `setConfig` do komponentu nadrzędnego.
 *
 * @param {object} config - obiekt z danymi uzytkownika
 * @param {function} setConfig - funkcja, kt ora aktualizuje stan `config`
 * @returns {JSX.Element} - komponent z formularzem
 */
export default function GenerateIdeaInputs({
  config,
  setConfig,
}: {
  config: any;
  setConfig: any;
}) {
  const places = ["🌐 Przez internet", "🏢 Na żywo"];
  return (
    <>
      <div className="flex flex-row flex-wrap lg:grid lg:grid-cols-2 -ml-4 px-6 pb-6 font-gotham lg:px-12">
        <div className="flex flex-col mt-4 ml-4 w-full lg:w-auto">
          <label htmlFor="place">Miejsce:</label>
          <select
            id="place"
            className="font-light text-lg rounded-lg px-4 py-2 w-full"
            onChange={(e) => setConfig({ ...config, place: e.target.value })}
          >
            <option>Gdzie będziesz zarabiać?</option>
            {places.map((place, i) => (
              <option value={place} key={i} className="font-bold">
                {place}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mt-4 ml-4 w-full lg:w-auto">
          <label htmlFor="investment">Inwestycja:</label>
          <select
            id="investment"
            className="font-light text-lg rounded-lg px-4 py-2 w-full"
            onChange={(e) =>
              setConfig({ ...config, investment: e.target.value })
            }
          >
            <option>Jaki masz budżet?</option>
            <option value="0zl" className="font-bold">
              💸 0zł
            </option>
            <option value="0-4999zl" className="font-bold">
              💸 0-4999zł
            </option>
            <option value="5000-9999zl" className="font-bold">
              💸 5000-9999zł
            </option>
            <option value="10000-19999zl" className="font-bold">
              💸 10000-19999zł
            </option>
            <option value="20000-49999zl" className="font-bold">
              💸 20000-49999zł
            </option>
            <option value="50000-99999zl" className="font-bold">
              💸 50000-99999zł
            </option>
            <option value="powyzej 100tys" className="font-bold">
              💸 powyżej 100tys.
            </option>
          </select>
        </div>
        <div className="flex flex-col mt-4 ml-4 w-full lg:w-auto">
          <label htmlFor="product">Produkt:</label>
          <select
            id="product"
            className="font-light text-lg rounded-lg px-4 py-2 w-full"
            onChange={(e) => setConfig({ ...config, product: e.target.value })}
          >
            <option>Czy posiadasz produkt?</option>
            <option value="Nie" className="font-bold">
              ❌ Nie
            </option>
            <option value="Tak" className="font-bold">
              ✅ Tak
            </option>
          </select>
        </div>
      </div>
      {config?.product === "Tak" && (
        <div className="pb-6 px-6 lg:px-12">
          <h2 className="font-gotham">Dodatkowe informacje:</h2>
          <textarea
            value={config.additional}
            className="rounded-lg w-full font-gotham font-light text-black"
            placeholder="Opisz produkt"
            maxLength={300}
            onChange={(e) =>
              setConfig({ ...config, additional: e.target.value })
            }
          />
        </div>
      )}
    </>
  );
}
