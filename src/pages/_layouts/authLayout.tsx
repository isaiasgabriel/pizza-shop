import { Pizza } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    // Create 2 columns that occupies the whole screen:
    <div className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">Pizza Shop</span>
        </div>
        <footer className="text-sm">
          Partner dashboard - Pizza shop - {new Date().getFullYear()}
        </footer>
      </div>
      {/* Position changed to relative so in the child component we can use absolute positioning
      to create a button that's stays on top right */}
      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
