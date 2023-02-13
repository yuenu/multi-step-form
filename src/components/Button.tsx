import { clsx } from 'clsx'

interface Props {
  className?: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  text: string
  [x: string]: any
}

export function Button({
  type = 'button',
  className,
  text,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={clsx(
        'px-6 py-3 text-white bg-blue-marine rounded-md md:rounded-lg hover:opacity-90',
        className
      )}
      {...rest}>
      {text}
    </button>
  )
}
