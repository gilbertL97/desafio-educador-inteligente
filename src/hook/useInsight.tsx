import { useCallback, useEffect, useRef, useState } from 'react';

import { buildAIPrompt } from '@/data/aiPrompt';
import { getInsight, type InsightData } from '@/service/aiService';

import { useSimulationStorage } from './useSimulationStorage';

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false);
  const { getFormData } = useSimulationStorage();

  const [insight, setInsight] = useState<InsightData | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Necessário o uso do useCallback pois temos que colocar essa função
  // Como array de dependências do useEffect
  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setError('Simulação não encontrada.');
        return;
      }

      isRequestPending.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const prompt = buildAIPrompt(simulation);
        const data = await getInsight(prompt);
        setInsight(data);
      } catch {
        setError('Erro ao gerar o diagnóstico. Tente novamente.');
      } finally {
        isRequestPending.current = false;
        setIsLoading(false);
      }
    },
    [getFormData],
  );

  useEffect(() => {
    // Evita loop infinito de requisições para a API do Gemini
    if (insight || isLoading || error || isRequestPending.current) {
      return;
    }

    fetchInsight(id);
  }, [id, insight, isLoading, error, fetchInsight]);

  return { insight, isLoading, error, fetchInsight };
};
