import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/components/layout/RootLayout';
import { SimulationFormPages } from '@/pages/SimulationFormPages';

import { SimulationResultsPage } from './pages/SimulationResultPage';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <SimulationFormPages />,
      },
      {
        path: '/resultado',
        element: <SimulationResultsPage />,
      },
      {
        path: '/historico',
        element: <h1>Histórico de Simulações</h1>,
      },
    ],
  },
]);
