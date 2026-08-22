import { ExternalLink, Goal, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import type { SimulationRecord } from '@/data/simulation'
import { parseCurrency } from '@/utils/currency'
import { calcMonthlySavings } from '@/utils/simulation'

interface HistoryCardProps {
  simulation: SimulationRecord
  onDelete: (id: string) => void
}

export function HistoryCard({ simulation, onDelete }: HistoryCardProps) {
  const navigate = useNavigate()
  const monthlySavings = calcMonthlySavings(simulation)
  const goalAmount = parseCurrency(simulation.goalAmount).toLocaleString(
    'pt-BR',
    { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  )

  const createdAt = simulation.createdAt
    ? new Date(simulation.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <div className="bg-card grid gap-5 rounded-2xl px-6 py-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] md:grid-cols-[minmax(220px,1.4fr)_minmax(120px,1fr)_minmax(100px,0.8fr)_minmax(150px,1fr)_auto] md:items-center md:gap-6">
      <div className="flex min-w-0 items-center gap-4 lg:gap-3">
        <div className="bg-muted-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <Goal size={21} className="text-primary" />
        </div>
        <div className="min-w-0">
          <h2 className="text-foreground truncate font-semibold">
            {simulation.goalName}
          </h2>
          {createdAt && (
            <p className="text-muted-foreground text-xs">{createdAt}</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
          Custo da meta
        </p>
        <p className="text-foreground mt-1 text-sm font-semibold">
          R$ {goalAmount}
        </p>
      </div>

      <div>
        <p className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
          Prazo
        </p>
        <p className="text-foreground mt-1 text-sm font-semibold">
          {simulation.goalDeadline} meses
        </p>
      </div>

      <div>
        <p className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
          Economia mensal
        </p>
        <p className="text-foreground mt-1 text-sm font-semibold">
          R${' '}
          {monthlySavings.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-black/10 pt-4 md:border-t-0 md:border-l md:pl-3 lg:pl-5">
        <button
          type="button"
          aria-label={`Excluir simulação ${simulation.goalName}`}
          title="Excluir simulação"
          onClick={() => onDelete(simulation.id)}
          className="text-muted-foreground flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors hover:text-red-500"
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
        <button
          type="button"
          onClick={() => void navigate(`/resultado/${simulation.id}`)}
          className="bg-secondary-button text-foreground hover:bg-muted-primary flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors"
        >
          <ExternalLink size={14} />
          <span className="hidden lg:inline">Ver detalhes</span>
        </button>
      </div>
    </div>
  )
}
