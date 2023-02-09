import { useState } from 'react'
import { STEP_LIST } from '@/constant'
import { StepItem, Step1 } from '@/components'

function App() {
  const [currentStep, setCurrentStep] = useState(1)
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
                active={currentStep === step.key}
                onClick={() => {
                  setCurrentStep(step.key)
                }}
              />
            ))}
          </ul>
        </div>
        <div className="content">
          <Step1 />
        </div>
      </div>
    </div>
  )
}

export default App
