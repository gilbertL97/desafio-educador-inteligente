import { simulationFormSteps } from '@/data/Simulatiom';

import { FormStep } from './FormStep';
import { StepProgress } from './Progres';

export function SimulationForm() {
  const currentStep = simulationFormSteps[5];
  return (
    <>
      <StepProgress currentStep={3} totalSteps={3} />
      <FormStep key={currentStep.id} {...currentStep} />
    </>
  );
}
