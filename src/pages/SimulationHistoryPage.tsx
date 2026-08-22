import { Clock, Plus, Wallet } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { HistoryCard } from '@/components/features/simulationHistory/HistoryCard'
import { Button } from '@/components/shared/Button'
import { ConfirmModal } from '@/components/shared/ConfirmModal'
import { PageHero } from '@/components/shared/PageHero'
import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function SimulationHistoryPage() {
  const navigate = useNavigate()
  const { getAllSimulations, deleteSimulation } = useSimulationStorage()

  const [simulations, setSimulations] = useState<SimulationRecord[]>(() =>
    getAllSimulations(),
  )

  const [pendingDelete, setPendingDelete] = useState<SimulationRecord | null>(
    null,
  )

  const handleConfirmDelete = () => {
    if (!pendingDelete) {
      return
    }

    deleteSimulation(pendingDelete.id)
    setSimulations(getAllSimulations())
    setPendingDelete(null)
  }

  const handleDelete = (id: string) => {
    setPendingDelete(simulations.find((record) => record.id === id) ?? null)
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de Simulações"
        subtitle="Acesse, acompanhe e gerencie as simulações que você já salvou."
      />

      {simulations.length === 0 ? (
        <div className="bg-card flex flex-col items-center gap-4 rounded-2xl px-6 py-16 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
          <div className="bg-muted-primary flex h-14 w-14 items-center justify-center rounded-full">
            <Clock size={28} className="text-primary" />
          </div>
          <div>
            <h2 className="text-foreground text-lg font-semibold">
              Nenhuma simulação encontrada
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Crie sua primeira simulação para começar a planejar seus
              objetivos.
            </p>
          </div>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => void navigate('/')}
          >
            Nova simulação
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {simulations.map((simulation) => (
            <HistoryCard
              key={simulation.id}
              simulation={simulation}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {simulations.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="secondary"
            icon={Wallet}
            onClick={() => void navigate('/')}
          >
            Nova simulação
          </Button>
        </div>
      )}

      <ConfirmModal
        open={pendingDelete !== null}
        title="Excluir simulação"
        description={
          pendingDelete
            ? `Tem certeza que deseja excluir "${pendingDelete.goalName}" do histórico? Essa ação não pode ser desfeita.`
            : ''
        }
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </main>
  )
}
