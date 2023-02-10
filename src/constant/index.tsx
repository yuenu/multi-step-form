import { Step1, Step2, Step3, Step4 } from '@/components'

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
