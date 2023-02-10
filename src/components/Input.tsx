import clsx from 'clsx'

interface InputProps {
  label: string
  placeholder: string
  type?: React.HTMLInputTypeAttribute
  value: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  error: boolean
}

export function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
}: InputProps) {
  return (
    <div>
      <label
        className="mb-1 font-thin text-sm flex justify-between"
        htmlFor={label}>
        {label}
        {error && (
          <span className="text-red-strawberry font-bold">
            This firld is required
          </span>
        )}
      </label>
      <input
        id={label}
        type={type}
        name={label}
        value={value}
        placeholder={placeholder}
        className={clsx(
          'h-12 border w-full py-2 px-4 text-blue-marine rounded-lg focus:border-blue-marine',
          error && 'border-red-strawberry'
        )}
        onChange={onChange}
      />
    </div>
  )
}
