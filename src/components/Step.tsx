import { useState, useEffect, useContext } from 'react'
import clsx from 'clsx'
import {
  Input,
  Button,
  PlanCard,
  AddonsCard,
  Icon,
  Heading,
  Description,
} from '.'
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
      className="text-white flex gap-4 items-center text-sm">
      <div
        className={clsx(
          'border font-bold rounded-full w-9 h-9 leading-8 text-center',
          (ctx.currentStep === index ||
            (ctx.currentStep === 5 && index === 4)) &&
            'bg-blue-light text-blue-marine'
        )}>
        {index}
      </div>
      <div className={clsx('hidden', 'md:block')}>
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
      <Heading text="Personal info" />
      <Description text="Please provide your name, email address, and phone number." />

      <div className={clsx('mt-6 space-y-6', 'md:mt-10')}>
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
      <div
        className={clsx(
          'absolute bottom-0 left-0 bg-white h-[10vh] flex items-center justify-end px-5 w-full mt-auto',
          'md:relative md:h-auto md:px-0'
        )}>
        <Button type="submit" text="Next Step" />
      </div>
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
      <Heading text="Select your plan" />
      <Description text="You have the option of monthly or yearly billing." />

      <div
        className={clsx(
          'my-6 flex flex-col gap-5',
          'md:flex-row md:my-10'
        )}>
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

      <div
        className={clsx(
          'absolute bottom-0 left-0 bg-white h-[10vh] flex items-center justify-between px-5 w-full mt-auto',
          'md:relative md:h-auto md:px-0'
        )}>
        <Button
          type="button"
          text="Go Back"
          className="bg-transparent text-gray-cool hover:text-blue-marine"
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
      <Heading text="Pick add-ons" />
      <Description text="Add-ons help enhance your gaming experience." />

      <div className={clsx('mt-6 flex flex-col gap-5', 'md:mt-10')}>
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

      <div
        className={clsx(
          'absolute bottom-0 left-0 bg-white h-[10vh] flex items-center justify-between px-5 w-full mt-auto',
          'md:relative md:h-auto md:px-0'
        )}>
        <Button
          type="button"
          text="Go Back"
          className="bg-transparent text-gray-cool hover:text-blue-marine"
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

  const isYear = ctx.plan.isYear

  const targetPlan = PLAN_LIST.find(
    (plan) => plan.id === ctx.plan.select
  )

  const planName =
    targetPlan!.name + `(${isYear ? 'Yearly' : 'Monthly'})`

  const planPrice = isYear
    ? `$${targetPlan!.price * 10}/yr`
    : `$${targetPlan!.price}/mo`

  const addonsItems = ADDONS_LIST.filter(
    (addons) => ctx.addons[addons.id]
  )

  const totalPrice = () => {
    let total = targetPlan!.price
    addonsItems.forEach((addons) => {
      total += addons.price
    })

    return isYear ? total * 10 : total
  }

  return (
    <form className="h-full flex flex-col" onSubmit={onSubmit}>
      <Heading text="Finishing up" />
      <Description text="Double-check everything looks OK before confirming." />

      <div className={clsx('mt-6', 'md:mt-10')}>
        <div className=" bg-gray-alabaster rounded-md px-6 divide-y">
          <div className="pt-4 pb-6 text-sm flex items-center justify-between">
            <div>
              <h3 className="font-[600] text-blue-marine mb-1">
                {planName}
              </h3>
              <button
                className="text-gray-cool underline"
                type="button"
                onClick={() => ctx.setStep(2)}>
                Change
              </button>
            </div>
            <span className="font-[700] text-blue-marine">
              {planPrice}
            </span>
          </div>
          <div className="py-6 text-sm text-gray-cool space-y-3">
            {addonsItems.map((item) => (
              <div
                className="flex justify-between items-center"
                key={item.id}>
                <h3>{item.description}</h3>
                <p className="text-blue-marine">
                  ${isYear ? item.price * 10 : item.price}/$
                  {isYear ? 'yr' : 'mo'}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 flex justify-between items-center">
          <h3 className="text-gray-cool">
            Total (per {isYear ? 'year' : 'month'})
          </h3>
          <p className="font-bold text-lg text-blue-purplish">
            ${totalPrice()}/{isYear ? 'yr' : 'mo'}
          </p>
        </div>
      </div>

      <div
        className={clsx(
          'absolute bottom-0 left-0 bg-white h-[10vh] flex items-center justify-between px-5 w-full mt-auto',
          'md:relative md:h-auto md:px-0'
        )}>
        <Button
          type="button"
          text="Go Back"
          className="bg-transparent text-gray-cool hover:text-blue-marine"
          onClick={() => ctx.setStep(3)}
        />
        <Button
          type="submit"
          text="Confirm"
          className="bg-blue-purplish"
        />
      </div>
    </form>
  )
}

export function Step5() {
  return (
    <div
      className={clsx(
        'w-full h-full flex flex-col justify-center items-center py-20',
        'md:py-0'
      )}>
      <Icon.Thanks className="mb-6" />
      <h3
        className={clsx(
          'text-3xl text-blue-marine font-bold mb-4',
          'md:text-2xl'
        )}>
        Thank you!
      </h3>
      <p
        className={clsx(
          'text-gray-cool text-center text-lg',
          'md:text-base'
        )}>
        Thanks for confirming your subscription! We hope you have fun
        using our platform. If you ever need support, please feel free
        to email us at support@loremgaming.com.
      </p>
    </div>
  )
}
