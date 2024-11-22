import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { Building, ChevronDown, LogOut } from 'lucide-react'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  return (
    <DropdownMenu>
      {/* Using `asChild` allows us to render the `Button` component as the dropdown trigger,
      enabling full control over styling with Tailwind and avoiding extra DOM elements. */}
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="flex select-none items-center gap-2"
        >
          Pizza Shop
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      {/* Aligns the dropdown menu's right edge with the trigger's right edge, positioning it to the right. */}
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Bashar Jackson</span>
          <span
            className="text-xs font-normal text-muted-foreground"
            /*
          text-xs: text xtra small
          text-muted-foreground: a light gray tone
           */
          >
            bashar@woo.com
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Building
            className="mr-2 h-4 w-4"
            /* mr: margin-right 0.5rem > 8px 
              w-4: width 4 > 1rem > 16px 
              h-4: height 4 > 1rem > 16px
            */
          />
          <span>Store profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
