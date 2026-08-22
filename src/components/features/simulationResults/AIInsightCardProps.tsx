import 'react-loading-skeleton/dist/skeleton.css'

import { Loader2, MessageCircle, Send } from 'lucide-react'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import { useInsight } from '@/hooks/useInsight'

import { Content } from '../Insights/Content'
import { Error } from '../Insights/Error'

interface AIInsightCardProps {
  simulationId: string
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
  const {
    insight,
    conversation,
    isLoading,
    isAsking,
    error,
    questionError,
    fetchInsight,
    askQuestion,
  } = useInsight(simulationId)
  const [question, setQuestion] = useState('')
  const conversationEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation, isAsking])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!question.trim() || isAsking) return

    const wasAnswered = await askQuestion(question)
    if (wasAnswered) {
      setQuestion('')
    }
  }

  return (
    <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
      <div className="mb-3 flex items-center gap-1.5">
        <span>✨</span>
        <span className="text-primary text-xs font-semibold tracking-widest uppercase">
          Insight Financeiro Personalizado
        </span>
      </div>

      {isLoading && (
        <div className="flex">
          <Skeleton
            count={10.5}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
      {!isLoading && error && (
        <Error
          simulationId={simulationId}
          message={error}
          onRetry={() => {
            fetchInsight(simulationId)
          }}
        />
      )}
      {!isLoading && insight && !error && (
        <>
          <div className="lg:scrollbar-thin lg:max-h-93 lg:overflow-y-auto lg:pr-2 lg:[scrollbar-color:var(--border)_transparent]">
            <Content insight={insight} />

            {conversation.length > 0 && (
              <div className="border-border mt-6 border-t pt-5">
                {conversation.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className="mb-5 last:mb-0"
                  >
                    <div
                      className={`text-primary mb-2 flex items-center gap-2 text-sm font-semibold ${message.role === 'model' ? 'justify-end' : ''}`}
                    >
                      <MessageCircle size={20} strokeWidth={1.8} />
                      <span>
                        {message.role === 'user' ? 'Você' : 'Resposta da IA'}
                      </span>
                    </div>
                    <p
                      className={`text-sm leading-relaxed whitespace-pre-line ${message.role === 'user' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                    >
                      {message.content}
                    </p>
                  </div>
                ))}
                <div ref={conversationEndRef} />
              </div>
            )}
            {conversation.length === 0 && <div ref={conversationEndRef} />}
          </div>

          {isAsking && (
            <p className="text-muted-foreground mt-3 text-sm italic">
              A IA está preparando sua resposta...
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="border-border mt-6 flex items-center gap-2 border-t pt-5"
          >
            <input
              value={isAsking ? '' : question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Faça uma pergunta sobre seu diagnóstico..."
              aria-label="Faça uma pergunta sobre seu diagnóstico"
              className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-13 min-w-0 flex-1 rounded-2xl border px-4 text-sm transition outline-none focus:ring-2"
              disabled={isAsking}
            />
            <button
              type="submit"
              aria-label={isAsking ? 'Enviando pergunta' : 'Enviar pergunta'}
              title={isAsking ? 'Enviando pergunta' : 'Enviar pergunta'}
              disabled={!question.trim() || isAsking}
              className="bg-primary text-primary-foreground flex size-13 shrink-0 items-center justify-center rounded-2xl transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAsking ? (
                <Loader2 size={22} className="animate-spin" />
              ) : (
                <Send size={22} />
              )}
            </button>
          </form>
          {questionError && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {questionError}
            </p>
          )}
        </>
      )}
    </div>
  )
}
