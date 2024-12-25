import { HiOutlineDocumentSearch } from "react-icons/hi";

export default function Documents({
  user,
  setFormState,
  formState,
  handleUpload,
}: {
  user: any;
  setFormState: any;
  formState: any;
  handleUpload: any;
}) {
  return (
    <div>
      <div className="bg-gray-300 border-gray-500 border rounded-md flex flex-col max-h-[30vh] w-full overflow-y-scroll scrollbar">
        <div className="mb-3 text-white bg-gradient-to-r from-ctaStart to-primaryEnd px-[1rem] py-[0.5rem] rounded-tl-md rounded-br-3xl w-max max-w-full">
          DOKUMENTY
        </div>
        {!user?.documents?.length && (
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 flex items-center justify-center p-3 rounded-full bg-gradient-to-b from-primaryStart to-primaryEnd">
              <HiOutlineDocumentSearch className="text-4xl text-white" />
            </div>
            <div className="text-black text-center pb-2">Brak dokumentów</div>
          </div>
        )}
        <div className="flex flex-col gap-2 p-[1rem]">
          {user?.documents?.map((item: any, i: any) => (
            <div key={i}>
              <button
                className="text-sm text-white text-center p-2 rounded-md bg-gray-500"
                onClick={() => setFormState({ ...formState, document: item })}
              >
                {item?.fileName}
              </button>
            </div>
          ))}
          <div className="flex flex-col">
            <label
              className="text-white text-center p-2 rounded-md bg-gray-500"
              htmlFor="file"
            >
              Dodaj plik
            </label>
            <input
              required
              className="hidden border-gray-300 text-white py-0.5 outline-none focus:outline-none border-transparent"
              id="file"
              type="file"
              name="file"
              onChange={handleUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
