import { SimulationForm } from '@/components/features/Simulation/Form';
import { SimulationHero } from '@/components/features/Simulation/Hero';

export function SimulationFormPages() {
  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <SimulationHero />
      <SimulationForm />
    </main>
  );
}
