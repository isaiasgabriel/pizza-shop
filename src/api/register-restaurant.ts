import { api } from '@/lib/axios'

export interface RegisterRestaurantBody {
  email: string
  phone: string
  restaurantName: string
  managerName: string
}

export async function RegisterRestaurantAPICall({
  email,
  phone,
  restaurantName,
  managerName,
}: RegisterRestaurantBody) {
  await api.post('/restaurants', {
    email,
    phone,
    restaurantName,
    managerName,
  })
}
