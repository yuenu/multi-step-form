import { clsx } from 'clsx'

interface Props {
  className?: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  text: string
}

export function Button({ type = 'button', className, text }: Props) {
  return (
    <button
      type={type}
      className={clsx(
        'px-6 py-3 text-white bg-blue-marine rounded-lg hover:opacity-90',
        className
      )}>
      {text}
    </button>
  )
}
