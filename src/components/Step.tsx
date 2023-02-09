import { clsx } from 'clsx'
import { Input, Button } from '.'

interface StepProps {
  label: string
  text: string
  index: number
  active: boolean
  onClick?: React.MouseEventHandler<HTMLLIElement>
}

export function StepItem({
  index,
  label,
  text,
  active,
  onClick,
}: StepProps) {
  return (
    <li
      role="presentation"
      className="text-white flex gap-4 items-center text-sm cursor-pointer"
      onClick={onClick}>
      <div
        className={clsx(
          'border font-bold rounded-full w-9 h-9 leading-8 text-center',
          active && 'bg-blue-light text-blue-marine'
        )}>
        {index}
      </div>
      <div>
        <span className="text-blue-pastel font-light">{label}</span>
        <p className="font-bold uppercase tracking-widest">{text}</p>
      </div>
    </li>
  )
}

export function Step1() {
  return (
    <form className="h-full flex flex-col">
      <h2 className="text-blue-marine font-bold text-[2rem] mb-1">
        Personal info
      </h2>
      <p className="text-gray-cool">
        Please provide your name, email address, and phone number.
      </p>

      <div className="mt-10 space-y-6">
        <Input label="Name" placeholder="e.g. Stephen King" />
        <Input
          type="email"
          label="Email Address"
          placeholder="e.g. stephenking@lorem.com"
        />
        <Input
          type="tel"
          label="Phone Number"
          placeholder="e.g. +1 234 567 890"
        />
      </div>

      <Button
        type="submit"
        text="Next Step"
        className="mt-auto self-end"
      />
    </form>
  )
}
