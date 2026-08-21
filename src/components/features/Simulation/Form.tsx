import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { type SimulationFormData, simulationFormSteps } from '@/data/Simulatiom';
import { useSimulationStorage } from '@/hook/useSimulationStorage';

import { FormStep } from './FormStep';
import { StepProgress } from './Progres';

export function SimulationForm() {
  const { saveFormData } = useSimulationStorage();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const totalSteps = simulationFormSteps.length;
  const currentStep = simulationFormSteps[currentStepIndex];
  const [formData, setFormData] = useState<SimulationFormData>({} as SimulationFormData);

  const handleNextStep = (value: string) => {
    const updatedFormData = { ...formData, [currentStep.id]: value };
    setFormData(updatedFormData);

    if (currentStepIndex + 1 > totalSteps - 1) {
      const id = saveFormData(updatedFormData);
      navigate(`/resultado/${id}`);
      return;
    }
    setCurrentStepIndex((prev) => prev + 1);
  };
  const handlePreviousStep = () => {
    if (currentStepIndex === 0) {
      return;
    }

    setCurrentStepIndex((prev) => prev - 1);
  };

  return (
    <>
      <StepProgress currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
      <FormStep
        key={currentStep.id}
        {...currentStep}
        onBack={handlePreviousStep}
        onNext={handleNextStep}
        hiddeBackButton={currentStepIndex === 0}
      />
    </>
  );
}
