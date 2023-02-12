import { useState, useEffect, useContext } from 'react'
import clsx from 'clsx'
import { Input, Button, PlanCard, AddonsCard } from '.'
import { ContextType, StoreContext } from '@/context'
import { PLAN_LIST, ADDONS_LIST } from '@/constant'

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

  useEffect(() => {
    if (ctx.personalInfo.name) {
      setName((prev) => ({ ...prev, value: ctx.personalInfo.name }))
      setEmail((prev) => ({ ...prev, value: ctx.personalInfo.email }))
      setPhone((prev) => ({ ...prev, value: ctx.personalInfo.phone }))
    }
  }, [
    ctx.personalInfo.email,
    ctx.personalInfo.name,
    ctx.personalInfo.phone,
  ])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // TODO: Refactor to no using multiple state
    setName((prev) => ({ ...prev, error: !name.value }))
    setEmail((prev) => ({ ...prev, error: !email.value }))
    setPhone((prev) => ({ ...prev, error: !phone.value }))

    if (!!name.value && !!email.value && !!phone.value) {
      ctx.setPersonalInfo({
        name: name.value,
        email: email.value,
        phone: phone.value,
      })
      ctx.setStep(2)
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
  const ctx = useContext(StoreContext) as ContextType
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    ctx.setStep(3)
  }

  function onSwitchPlan() {
    ctx.setPlan({
      select: ctx.plan.select,
      isYear: !ctx.plan.isYear,
    })
  }

  return (
    <form className="h-full flex flex-col" onSubmit={onSubmit}>
      <h2 className="text-blue-marine font-bold text-[2rem] mb-1">
        Select your plan
      </h2>
      <p className="text-gray-cool">
        You have the option of monthly or yearly billing.
      </p>

      <div className="mt-10 flex gap-5 mb-10">
        {PLAN_LIST.map((plan) => (
          <PlanCard
            id={plan.id}
            key={plan.id}
            name={plan.name}
            Image={plan.Image}
            price={plan.price}
            isYear={ctx.plan.isYear}
          />
        ))}
      </div>

      <div className="bg-gray-alabaster h-12 rounded-lg flex justify-center items-center">
        <button type="button">
          <label
            htmlFor="Toggle1"
            className="inline-flex items-center space-x-4 cursor-pointer text-blue-marine text-sm">
            <span>Monthly</span>
            <span className="relative">
              <input
                checked={ctx.plan.isYear}
                onChange={() => onSwitchPlan()}
                id="Toggle1"
                type="checkbox"
                className="hidden peer transition-all"
              />
              <div className="w-10 h-6 rounded-full shadow-inner dark:bg-blue-marine transition-colors"></div>
              <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-white "></div>
            </span>
            <span>Yearly</span>
          </label>
        </button>
      </div>

      <div className="mt-auto flex justify-between">
        <Button
          type="button"
          text="Go Back"
          className="bg-transparent text-blue-marine"
          onClick={() => ctx.setStep(1)}
        />
        <Button type="submit" text="Next Step" />
      </div>
    </form>
  )
}

export function Step3() {
  const ctx = useContext(StoreContext) as ContextType
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    ctx.setStep(4)
  }
  return (
    <form className="h-full flex flex-col" onSubmit={onSubmit}>
      <h2 className="text-blue-marine font-bold text-[2rem] mb-1">
        Pick add-ons
      </h2>
      <p className="text-gray-cool">
        Add-ons help enhance your gaming experience.
      </p>

      <div className="mt-10 flex flex-col gap-5">
        {ADDONS_LIST.map((add) => (
          <AddonsCard
            id={add.id}
            key={add.id}
            name={add.name}
            description={add.description}
            price={add.price}
          />
        ))}
      </div>

      <div className="mt-auto flex justify-between">
        <Button
          type="button"
          text="Go Back"
          className="bg-transparent text-blue-marine"
          onClick={() => ctx.setStep(2)}
        />
        <Button type="submit" text="Next Step" />
      </div>
    </form>
  )
}

export function Step4() {
  const ctx = useContext(StoreContext) as ContextType
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    ctx.setStep(5)
  }
  return (
    <form className="h-full flex flex-col" onSubmit={onSubmit}>
      <h2 className="text-blue-marine font-bold text-[2rem] mb-1">
        Finishing up
      </h2>
      <p className="text-gray-cool">
        Double-check everything looks OK before confirming.
      </p>

      <div className="mt-auto flex justify-between">
        <Button
          type="button"
          text="Go Back"
          className="bg-transparent text-blue-marine"
          onClick={() => ctx.setStep(3)}
        />
        <Button type="submit" text="Next Step" />
      </div>
    </form>
  )
}
