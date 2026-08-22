import { useCallback, useEffect, useRef, useState } from 'react'

import { buildAIPrompt, buildInsightConversationPrompt } from '@/data/aiPrompt'
import type {
  InsightConversationMessage,
  SimulationRecord,
} from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import {
  getInsight,
  getInsightAnswer,
  type InsightData,
} from '@/services/aiService'

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false)
  const { getFormData, updateSimulation } = useSimulationStorage()

  const [insight, setInsight] = useState<InsightData | null>(() => {
    const simulation = getFormData(id)

    if (simulation?.insight) {
      return simulation.insight
    }

    return null
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isAsking, setIsAsking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [questionError, setQuestionError] = useState<string | null>(null)
  const [conversation, setConversation] = useState<
    InsightConversationMessage[]
  >(() => getFormData(id)?.conversation ?? [])

  // Necessário o uso do useCallback pois temos que colocar essa função
  // Como array de dependências do useEffect
  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId)

      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      isRequestPending.current = true
      setIsLoading(true)
      setError(null)

      try {
        const prompt = buildAIPrompt(simulation)
        const data = await getInsight(prompt)
        setInsight(data)

        updateSimulation(simulationId, {
          ...simulation,
          insight: data,
        } as SimulationRecord)
      } catch {
        setError('Erro ao gerar o diagnóstico. Tente novamente.')
      } finally {
        isRequestPending.current = false
        setIsLoading(false)
      }
    },
    [getFormData, updateSimulation],
  )

  const askQuestion = useCallback(
    async (question: string) => {
      const trimmedQuestion = question.trim()
      const simulation = getFormData(id)

      if (!trimmedQuestion || !simulation?.insight || isAsking) {
        return false
      }

      const userMessage: InsightConversationMessage = {
        role: 'user',
        content: trimmedQuestion,
      }
      const nextConversation = [...conversation, userMessage]

      setConversation(nextConversation)
      setIsAsking(true)
      setQuestionError(null)

      try {
        const prompt = buildInsightConversationPrompt(
          simulation,
          trimmedQuestion,
          conversation,
        )
        const answer = await getInsightAnswer(prompt)
        const updatedConversation = [
          ...nextConversation,
          { role: 'model' as const, content: answer },
        ]

        setConversation(updatedConversation)
        updateSimulation(id, {
          ...simulation,
          conversation: updatedConversation,
        } as SimulationRecord)
        return true
      } catch {
        setConversation(conversation)
        setQuestionError('Não foi possível responder agora. Tente novamente.')
        return false
      } finally {
        setIsAsking(false)
      }
    },
    [conversation, getFormData, id, isAsking, updateSimulation],
  )

  useEffect(() => {
    // Evita loop infinito de requisições para a API do Gemini
    if (insight || isLoading || error || isRequestPending.current) {
      return
    }

    fetchInsight(id)
  }, [id, insight, isLoading, error, fetchInsight])

  return {
    insight,
    conversation,
    isLoading,
    isAsking,
    error,
    questionError,
    fetchInsight,
    askQuestion,
  }
}
