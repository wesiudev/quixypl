interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  isTextArea?: boolean;
  options?: { value: string; label: string }[];
  type?: string;
  placeholder: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  isTextArea = false,
  options,
  type = "text",
  placeholder,
}) => {
  return (
    <div>
      <label
        className="font-gotham text-black drop-shadow-lg mt-2"
        htmlFor={id}
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="p-2 border-2 border-primary text-black  w-full"
        />
      ) : options ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="p-2 border-2 border-primary text-black  w-full"
        >
          <option value="">Wybierz</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="p-2 border-2 border-primary text-black  w-full font-gotham font-light"
        />
      )}
    </div>
  );
};
