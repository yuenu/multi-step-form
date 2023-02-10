import { useContext } from 'react'
import clsx from 'clsx'
import { PlanType } from '@/constant'
import { ContextType, StoreContext } from '@/context'

type PlanCardType = PlanType & {
  isYear: boolean
}

export function PlanCard({
  id,
  name,
  Image,
  monthPrice,
  yearPrice,
  isYear,
}: PlanCardType) {
  const ctx = useContext(StoreContext) as ContextType
  const price = isYear ? `$${yearPrice}/yr` : `$${monthPrice}/mo`

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
      <p className="text-blue-marine font-500">{name}</p>
      <p className="text-gray-cool">{price}</p>
      {isYear && (
        <p className="text-blue-marine text-sm font-400">
          2 months free
        </p>
      )}
    </button>
  )
}
