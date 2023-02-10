import { Step1, Step2, Step3, Step4, Icon } from '@/components'

export const STEP_LIST = [
  {
    key: 1,
    label: 'Step 1',
    text: 'Your info',
    component: <Step1 />,
  },
  {
    key: 2,
    label: 'Step 2',
    text: 'Select plan',
    component: <Step2 />,
  },
  {
    key: 3,
    label: 'Step 3',
    text: 'Add-ons',
    component: <Step3 />,
  },
  {
    key: 4,
    label: 'Step 4',
    text: 'Summary',
    component: <Step4 />,
  },
]

export const PLAN_LIST = [
  {
    id: 1,
    name: 'Arcade',
    monthPrice: '9',
    yearPrice: '90',
    Image: Icon.Arcade,
  },
  {
    id: 2,
    name: 'Advanced',
    monthPrice: '12',
    yearPrice: '120',
    Image: Icon.Advanced,
  },
  {
    id: 3,
    name: 'Pro',
    monthPrice: '15',
    yearPrice: '150',
    Image: Icon.Pro,
  },
]

// Refer: https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : never

export type PlanType = ArrayElement<typeof PLAN_LIST>
// export type PlanType = Omit<ArrayElement<typeof PLAN_LIST>, 'id'>
