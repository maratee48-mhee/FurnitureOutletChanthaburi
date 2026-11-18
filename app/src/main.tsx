import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, Outlet, RouterProvider, ScrollRestoration } from 'react-router'
import './index.css'
import { HomePage } from './pages/HomePage'
import { CategoryPage } from './pages/CategoryPage'
import { Seo } from './components/Seo'
import { startThemeClock } from './lib/daytime'

startThemeClock()

const router = createBrowserRouter([
  {
    element: <><Seo /><Outlet /><ScrollRestoration /></>,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/category/:id', element: <CategoryPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
