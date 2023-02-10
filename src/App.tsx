import { useContext } from 'react'
import { STEP_LIST } from '@/constant'
import { StepItem } from '@/components'
import { ContextType, StoreContext } from '@/context'

function App() {
  const ctx = useContext(StoreContext) as ContextType

  return (
    <div className="app">
      <div className="container">
        <div className="sidebar">
          <ul className="w-full space-y-7">
            {STEP_LIST.map((step) => (
              <StepItem
                key={step.key}
                index={step.key}
                label={step.label}
                text={step.text}
              />
            ))}
          </ul>
        </div>
        <div className="content">
          {
            STEP_LIST.find((step) => step.key === ctx.currentStep)
              ?.component
          }
        </div>
      </div>
    </div>
  )
}

export default App
