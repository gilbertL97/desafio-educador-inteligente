import { PiggyBank } from 'lucide-react';

import { FormStep } from './FormStep';
import { StepProgress } from './Progres';

export function SimulationForm() {
  return (
    <>
      <StepProgress currentStep={3} totalSteps={3} />
      <FormStep
        icon={PiggyBank}
        title="Renda  Mensal Bruta"
        question="Quanto e depositado na sua conta todo mes (somando todas as fontes)"
        inputProps={{
          type: 'text',
          placeholder: '5.000.00',
          prefix: 'R$ ',
        }}
      />
    </>
  );
}
