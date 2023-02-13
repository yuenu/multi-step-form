import clsx from 'clsx'

export function Heading({ text }: { text: string }) {
  return (
    <h2
      className={clsx(
        'text-blue-marine font-bold text-[1.7rem] mb-2',
        'md:text-[2rem] md:mb-1'
      )}>
      {text}
    </h2>
  )
}

export function Description({ text }: { text: string }) {
  return (
    <p
      className={clsx(
        'text-gray-cool text-lg font-thin',
        'md:text-base'
      )}>
      {text}
    </p>
  )
}
