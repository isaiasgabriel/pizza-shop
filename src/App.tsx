import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes.tsx'

export function App() {
  return (
    <HelmetProvider>
      {/* Sets the page title dynamically using %s to represent the current page name. */}
      <Helmet titleTemplate="%s | Pizza Shop" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
