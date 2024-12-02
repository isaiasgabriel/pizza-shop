import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { GetManagedRestaurantAPICall } from '@/api/get-managed-restaurant'
import { GetProfileAPICall } from '@/api/get-profile'
import { signOutAPICall } from '@/api/sign-out'

import { StoreProfileModalDialog } from './store-profile-modal-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  // If you need to use the user profile data in different parts of your application,
  // instead of making another API call to fetch it, React Query allows us to reuse this data
  // if it has already been fetched elsewhere in the application. This is why you need
  // the queryKey: to identify the request and enable its optimization.
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: GetProfileAPICall,
    staleTime: Infinity,
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: GetManagedRestaurantAPICall,
      staleTime: Infinity,
      // refetchOnWindowFocus: true,
      //
      // By default, this property is set to `true` even if you don't explicitly specify it.
      // This means React Query will automatically fetch the API every time the user loses
      // and regains window focus.
      //
      // If the information you're fetching changes frequently, consider setting a `staleTime`
      // (e.g., `staleTime: 1000`) to ensure it displays the most up-to-date information.
      //
      // On the other hand, if the information rarely changes—such as in this case where we're
      // dealing with the restaurant name—you can set `staleTime: Infinity`. This ensures the
      // data is only refetched if the page is reloaded or a manual method is triggered to fetch
      // the information again.
    })

  const navigate = useNavigate()

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOutAPICall,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
      // replace will substitute the route
      // so it won't be ale to go back to the dashboard
    },
  })

  return (
    <Dialog>
      <DropdownMenu>
        {/* Using `asChild` allows us to render the `Button` component as the dropdown trigger,
      enabling full control over styling with Tailwind and avoiding extra DOM elements. */}
        <DropdownMenuTrigger asChild>
          <Button
            variant={'outline'}
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurant?.name
            )}
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
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Store profile</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
            disabled={isSigningOut}
          >
            <button className="w-full" onClick={() => signOutFn()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileModalDialog />
    </Dialog>
  )
}
