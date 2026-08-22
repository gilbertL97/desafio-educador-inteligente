import { Trash2, X } from 'lucide-react'
import { useEffect } from 'react'

import { Button } from '@/components/shared/Button'

interface ConfirmModalProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onCancel])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-description"
        onClick={(event) => event.stopPropagation()}
        className="bg-card relative w-full max-w-md rounded-2xl px-6 py-8 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]"
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={onCancel}
          className="hover:text-foreground text-muted-foreground absolute top-4 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center gap-5 text-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-500/10">
            <Trash2 size={26} className="text-red-500" />
          </div>

          <div>
            <h2
              id="confirm-modal-title"
              className="text-foreground text-lg font-semibold"
            >
              {title}
            </h2>
            <p
              id="confirm-modal-description"
              className="text-muted-foreground mt-1 text-sm"
            >
              {description}
            </p>
          </div>

          <div className="mt-2 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            <Button variant="primary" onClick={onCancel} className="rounded-xl">
              {cancelLabel}
            </Button>
            <Button variant="ghost" onClick={onConfirm} className="rounded-xl">
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
