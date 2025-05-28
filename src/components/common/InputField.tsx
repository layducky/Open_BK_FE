const getInputClass = (error: any) => {
  return `text-black text-base w-full min-w-[30vw] px-5 py-3 rounded-lg border dark:border-stone-400 caret-dodger-blue-500 focus:outline-dodger-blue-500 ${
    error ? " border-2 border-red-500 focus:outline-red-500" : ""
  }`;
};

const InputField = ({
  label,
  id,
  register,
  value,
  error,
  placeholder,
  type = "text",
  disabled,
  options,
}: {
  label: string;
  id: string;
  register: any;
  value?: any;
  error: any;
  placeholder: string;
  type?: string;
  disabled: boolean;
  options?: { value: string; label: string }[]; // Add options for select
}) => {
  return (
    <div className="flex flex-col gap-2 relative">
      <label htmlFor={id} className="font-semibold text-lg">
        {label}
      </label>
      {type === "select" ? (
        <select
          {...register(id)}
          id={id}
          className={getInputClass(error)}
          disabled={disabled}
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...register(id)}
          id={id}
          type={type}
          className={getInputClass(error)}
          placeholder={placeholder}
          disabled={disabled}
          {...(value ? { value } : {})}
        />
      )}
      <span className="text-red-500 text-sm absolute -bottom-5">
        {error?.message}
      </span>
    </div>
  );
};

export default InputField;