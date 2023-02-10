import { useState, useContext } from 'react'
import { clsx } from 'clsx'
import { Input, Button } from '.'
import { ContextType, StoreContext } from '@/context'

interface StepProps {
  label: string
  text: string
  index: number
}

export function StepItem({ index, label, text }: StepProps) {
  const ctx = useContext(StoreContext) as ContextType

  return (
    <li
      role="presentation"
      className="text-white flex gap-4 items-center text-sm cursor-pointer"
      onClick={() => ctx.setStep(index)}>
      <div
        className={clsx(
          'border font-bold rounded-full w-9 h-9 leading-8 text-center',
          ctx.currentStep === index &&
            'bg-blue-light text-blue-marine'
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
  const [name, setName] = useState({ value: '', error: false })
  const [email, setEmail] = useState({ value: '', error: false })
  const [phone, setPhone] = useState({ value: '', error: false })

  const ctx = useContext(StoreContext) as ContextType

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setName((prev) => ({ ...prev, error: !name.value }))
    setEmail((prev) => ({ ...prev, error: !email.value }))
    setPhone((prev) => ({ ...prev, error: !phone.value }))

    if (!!name.value && !!email.value && !!phone.value) {
      ctx.setStep(ctx.currentStep + 1)
    }
  }

  return (
    <form className="h-full flex flex-col" onSubmit={onSubmit}>
      <h2 className="text-blue-marine font-bold text-[2rem] mb-1">
        Personal info
      </h2>
      <p className="text-gray-cool">
        Please provide your name, email address, and phone number.
      </p>

      <div className="mt-10 space-y-6">
        <Input
          value={name.value}
          error={name.error}
          onChange={(e) =>
            setName((prev) => ({ ...prev, value: e.target.value }))
          }
          type="text"
          label="Name"
          placeholder="e.g. Stephen King"
        />
        <Input
          value={email.value}
          error={email.error}
          onChange={(e) =>
            setEmail((prev) => ({ ...prev, value: e.target.value }))
          }
          type="email"
          label="Email Address"
          placeholder="e.g. stephenking@lorem.com"
        />
        <Input
          value={phone.value}
          error={phone.error}
          onChange={(e) =>
            setPhone((prev) => ({ ...prev, value: e.target.value }))
          }
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

export function Step2() {
  return <div>Step2</div>
}

export function Step3() {
  return <div>Step3</div>
}

export function Step4() {
  return <div>Step4</div>
}
