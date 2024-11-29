import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'

import { GetManagedRestaurantAPICall } from '@/api/get-managed-restaurant'
import { GetProfileAPICall } from '@/api/get-profile'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
  // If you need to use the user profile data in different parts of your application,
  // instead of making another API call to fetch it, React Query allows us to reuse this data
  // if it has already been fetched elsewhere in the application. This is why you need
  // the queryKey: to identify the request and enable its optimization.
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: GetProfileAPICall,
  })

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: GetManagedRestaurantAPICall,
  })

  return (
    <DropdownMenu>
      {/* Using `asChild` allows us to render the `Button` component as the dropdown trigger,
      enabling full control over styling with Tailwind and avoiding extra DOM elements. */}
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          className="flex select-none items-center gap-2"
        >
          {managedRestaurant?.name}
          {/* 
              Using "?." ensures that we safely access properties on potentially null or undefined objects.
              Without it, if the API call fails and the profile object is null, trying to access profile.email would result in an error.
          */}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      {/* Aligns the dropdown menu's right edge with the trigger's right edge, positioning it to the right. */}
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>{profile?.name}</span>
          <span
            className="text-xs font-normal text-muted-foreground"
            /*
          text-xs: text xtra small
          text-muted-foreground: a light gray tone
           */
          >
            {profile?.email}
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
