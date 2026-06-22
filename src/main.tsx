import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { routes } from './routes/index.tsx'
import { TokenProvider } from './hooks/useToken.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TokenProvider>
      <RouterProvider router={routes}/>
    </TokenProvider>
  </StrictMode>,
)
