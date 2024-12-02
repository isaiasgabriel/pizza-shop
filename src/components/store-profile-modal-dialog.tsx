import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  GetManagedRestaurantAPICall,
  GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { UpdateProfileAPICall } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileModalDialog() {
  // At first glance, it might seem like we're making another API request.
  // However, if you inspect the network tab in the DevTools, you'll notice
  // that the managed restaurant data is fetched only once.
  // As long as we use the same `queryKey`, no additional API requests will be made.
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: GetManagedRestaurantAPICall,
    staleTime: Infinity,
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  const queryClient = useQueryClient()

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileSchema) {
    // Retrieve the current data cached under the 'managed-restaurant' query key
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    // If cached data exists, update the query data for this key
    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        {
          // Copy the existing data (...cached) and overwrite it with the updated name and description
          ...cached,
          name,
          description,
        },
      )
    }
    return { cached }
    // Return the previous cached data. This allows us to revert the cache to its original state
    // in case an error occurs during the update process.
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: UpdateProfileAPICall,

    // Instead of waiting for confirmation from the backend to update the information,
    // we optimistically update the cached data immediately.
    // This approach prevents the user from perceiving any delay in the update process.
    // In summary, this is a trick to make the system feel faster. For this reason, we use onMutate instead of onSuccess.
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description })

      return { previousProfile: cached } // Return the previous cached data so it can be used to roll back changes if an error occurs
    },

    // If an error occurs, the previous cached data (stored in the context) is used to revert the changes.
    // This ensures the cache is restored to its original state if the update fails.
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
  })

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success('Profile updated with success')
    } catch {
      toast.error('Failed to updated profile, try again')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Store Profile</DialogTitle>
        <DialogDescription>
          Update the informations visible to your clients
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name:
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Description:
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" type="button">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
