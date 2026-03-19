// text, password, number, date
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-xs font-black text-slate-400 uppercase ml-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-50/50 transition-all sm:text-sm"
      />
    </div>
  );
}

// select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-xs font-black text-slate-400 uppercase ml-1">
          {label}
        </label>
      )}
      <select
        {...props}
        className="block w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-50/50 transition-all sm:text-sm appearance-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// checkbox, radio
interface SelectionProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, ...props }: SelectionProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group p-1">
      <div className="relative flex items-center">
        <input {...props} type="checkbox" className="peer sr-only" />
        <div className="h-5 w-5 rounded-md border-2 border-slate-300 bg-white transition-all peer-checked:bg-blue-600 peer-checked:border-blue-600 shadow-sm" />
        <svg
          className="absolute w-3 h-3 text-white left-1 hidden peer-checked:block stroke-[4px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
        {label}
      </span>
    </label>
  );
}

export function Radio({ label, ...props }: SelectionProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group p-1">
      <div className="relative flex items-center">
        <input {...props} type="radio" className="peer sr-only" />
        <div className="h-5 w-5 rounded-full border-2 border-slate-300 bg-white transition-all peer-checked:border-blue-600 shadow-sm" />
        <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full left-[5px] hidden peer-checked:block" />
      </div>
      <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">
        {label}
      </span>
    </label>
  );
}

// file
export function FileInput({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-xs font-black text-slate-400 uppercase ml-1">
          {label}
        </label>
      )}
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-[24px] bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="text-sm text-slate-500 font-bold group-hover:text-blue-600">
            파일을 클릭하거나 드래그하세요
          </p>
          <p className="text-xs text-slate-400 mt-1 uppercase font-medium">
            PNG, JPG, PDF up to 10MB
          </p>
        </div>
        <input {...props} type="file" className="hidden" />
      </label>
    </div>
  );
}
