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
  description: z.string(),
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

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: UpdateProfileAPICall,
    // onSuccess is a callback function executed after a successful profile update.
    // It updates the cached data of the 'managed-restaurant' query key
    // with the new name and description, ensuring the UI reflects the latest changes.
    onSuccess(_, { name, description }) {
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