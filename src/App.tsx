import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider.tsx'
import { router } from './routes.tsx'

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pizzashop-theme">
      <HelmetProvider>
        {/* Sets the page title dynamically using %s to represent the current page name. */}
        <Helmet titleTemplate="%s | Pizza Shop" />
        <Toaster richColors />
        <RouterProvider router={router} />
      </HelmetProvider>
    </ThemeProvider>
  )
}
