import { useReducer, createContext } from 'react'

// CONSTANT
const SET_STEP = 'CHANGE_STEP'
const SET_PERSONINFO = 'SET_PERSONINFO'

const defaultState = {
  currentStep: 1,
  personalInfo: {
    name: '',
    email: '',
    phone: '',
  },
}

// TYPE DEFINITION
type DefaultStateType = typeof defaultState
type StepType = DefaultStateType['currentStep']
type PersonalInfoType = DefaultStateType['personalInfo']

export type ContextType = DefaultStateType & {
  setStep: (step: number) => void
  setPersonalInfo: (info: PersonalInfoType) => void
}
type Action =
  | {
      type: typeof SET_STEP
      payload: StepType
    }
  | {
      type: typeof SET_PERSONINFO
      payload: PersonalInfoType
    }

// CONTEXT
export const StoreContext = createContext<ContextType | null>(null)

// REDUCER
export const reudcer = (state: DefaultStateType, action: Action) => {
  if (action.type === SET_STEP) {
    return {
      ...state,
      currentStep: action.payload,
    }
  }

  if (action.type === SET_PERSONINFO) {
    return {
      ...state,
      personalInfo: action.payload,
    }
  }

  return state
}

// PROVIDER
export const StoreProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatchAction] = useReducer(reudcer, defaultState)

  const setStepHandler = (step: number) => {
    dispatchAction({ type: SET_STEP, payload: step })
  }

  const setPersonalInfoHandler = (info: PersonalInfoType) => {
    dispatchAction({ type: SET_PERSONINFO, payload: info })
  }

  const contextValue = {
    currentStep: state.currentStep,
    personalInfo: state.personalInfo,
    setStep: setStepHandler,
    setPersonalInfo: setPersonalInfoHandler,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}
