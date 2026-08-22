# Planej.ai

Aplicação web de planejamento financeiro pessoal desenvolvida com React, TypeScript e Google Gemini. O usuário informa sua renda, despesas, dívidas e uma meta financeira para receber um diagnóstico personalizado.

## Solução implementada

### Simulação financeira

- Formulário em etapas para coletar os dados financeiros do usuário.
- Máscara e formatação para valores monetários.
- Cálculo da economia mensal necessária para atingir a meta.
- Identificação da viabilidade da meta com base na renda, nos gastos e no prazo.
- Salvamento de cada simulação no `localStorage` com ID único e data de criação.

### Insight financeiro com IA

- Geração de diagnóstico personalizado usando a API do Google Gemini.
- Análise de viabilidade, diagnóstico financeiro, sugestões práticas, renda extra, investimentos e mensagem final.
- Estados de carregamento com skeleton e tratamento de erros com opção de tentar novamente.
- Diagnóstico compatível com tema claro e escuro.

### Histórico de simulações

- Listagem das simulações salvas, da mais recente para a mais antiga.
- Visualização dos detalhes e dos insights já gerados.
- Exclusão de simulações com modal de confirmação.
- Navegação entre formulário, histórico e resultados.

### Conversa contextual com a IA

- Campo de perguntas integrado ao card de insight personalizado.
- Prompt contextual com os dados da simulação, o diagnóstico original e o histórico da conversa.
- Perguntas e respostas exibidas no mesmo contêiner de rolagem do diagnóstico.
- Respostas da IA em parágrafos curtos e legíveis.
- Mensagens do usuário e da IA com diferenciação visual nos temas claro e escuro.
- Rolagem automática para a última mensagem após uma nova resposta.
- Input e botão desativados durante o processamento, com ícone de carregamento.
- A pergunta permanece no input quando a requisição falha para permitir o reenvio.
- Histórico da conversa salvo no `localStorage` junto com a simulação.
- Compatibilidade com simulações antigas sem histórico de conversa.

## Tecnologias

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Google Gemini API
- `localStorage`

## Como executar

```bash
pnpm install
pnpm dev
```

Crie um arquivo `.env` na raiz do projeto com a chave da API:

```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```

Para validar o build de produção:

```bash
pnpm build
```
