interface InputProps {
  label: string
  placeholder: string
  type?: React.HTMLInputTypeAttribute
}

export function Input({
  label,
  placeholder,
  type = 'text',
}: InputProps) {
  return (
    <div>
      <label className="block mb-1 font-thin text-sm" htmlFor={label}>
        {label}
      </label>
      <input
        id={label}
        type={type}
        name={label}
        placeholder={placeholder}
        className="h-12 border w-full py-2 px-4 text-blue-marine rounded-lg"
      />
    </div>
  )
}
