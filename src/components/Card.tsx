import { useContext, useState } from 'react'
import clsx from 'clsx'
import type { PlanType, AddonsType } from '@/constant'
import { ContextType, StoreContext } from '@/context'

type PlanCardType = PlanType & {
  isYear: boolean
}

export function PlanCard({
  id,
  name,
  Image,
  isYear,
  price,
}: PlanCardType) {
  const ctx = useContext(StoreContext) as ContextType
  const priceDisplay = `$${isYear ? 10 * price : price}/yr`

  function onSelect(id: number) {
    ctx.setPlan({
      select: id,
      isYear: ctx.plan.isYear,
    })
  }

  return (
    <button
      className={clsx(
        'outline outline-1 outline-gray-light p-4 rounded-lg flex-1 cursor-pointer hover:outline-blue-purplish transition-all text-left',
        ctx.plan.select === id &&
          'outline-blue-purplish bg-gray-alabaster'
      )}
      type="button"
      onKeyDown={() => onSelect(id)}
      onClick={() => onSelect(id)}>
      <Image className="mb-12" />
      <p className="text-blue-marine font-[500]">{name}</p>
      <p className="text-gray-cool">{priceDisplay}</p>
      {isYear && (
        <p className="text-blue-marine text-sm font-400">
          2 months free
        </p>
      )}
    </button>
  )
}

export function AddonsCard({
  id,
  name,
  description,
  price,
}: AddonsType) {
  const ctx = useContext(StoreContext) as ContextType
  const [checked, setChecked] = useState(ctx.addons[id])
  const preiceDisplay =
    '$' + (ctx.plan.isYear ? `${price * 10}/yr` : `${price}/mo`)

  function onClick() {
    setChecked((prev) => !prev)
    ctx.setAddons(id)
  }
  return (
    <button
      className="outline outline-1 outline-gray-light w-full p-5 rounded-lg flex items-center justify-between cursor-pointer"
      type="button"
      onClick={onClick}>
      <div className="flex items-center gap-5 text-sm">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={checked}
          onChange={(evt) => {
            // TODO: Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.
            console.log('onchange', evt.target.value)
          }}
          className={clsx(
            'w-4 h-4 text-blue-600 bg-gray-100 border-gray-light rounded',
            ' dark:focus:ring-blue-600 focus:ring-2',
            'dark:bg-gray-700'
          )}
        />
        <div className="text-left">
          <h4 className="text-blue-marine font-[500]">{name}</h4>
          <p className="text-gray-cool">{description}</p>
        </div>
      </div>

      <span className="text-blue-purplish text-sm opacity-80">
        {preiceDisplay}
      </span>
    </button>
  )
}
