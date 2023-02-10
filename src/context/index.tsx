import { useReducer, createContext } from 'react'

// CONSTANT
const SET_STEP = 'CHANGE_STEP'
const SET_PERSONINFO = 'SET_PERSONINFO'
const SET_PLAN = 'SET_PLAN'

const defaultState = {
  currentStep: 1,
  personalInfo: {
    name: '',
    email: '',
    phone: '',
  },
  plan: {
    select: 1,
    isYear: false,
  },
}

// TYPE DEFINITION
type DefaultStateType = typeof defaultState
type StepType = DefaultStateType['currentStep']
type PersonalInfoType = DefaultStateType['personalInfo']
type PlanType = DefaultStateType['plan']

export type ContextType = DefaultStateType & {
  setStep: (step: StepType) => void
  setPersonalInfo: (info: PersonalInfoType) => void
  setPlan: (plan: PlanType) => void
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
  | {
      type: typeof SET_PLAN
      payload: PlanType
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

  if (action.type === SET_PLAN) {
    return {
      ...state,
      plan: action.payload,
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

  const setStepHandler = (step: StepType) => {
    dispatchAction({ type: SET_STEP, payload: step })
  }

  const setPersonalInfoHandler = (info: PersonalInfoType) => {
    dispatchAction({ type: SET_PERSONINFO, payload: info })
  }

  const setPlanHandler = (plan: PlanType) => {
    dispatchAction({ type: SET_PLAN, payload: plan })
  }

  const contextValue = {
    currentStep: state.currentStep,
    personalInfo: state.personalInfo,
    plan: state.plan,
    setStep: setStepHandler,
    setPersonalInfo: setPersonalInfoHandler,
    setPlan: setPlanHandler,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}
