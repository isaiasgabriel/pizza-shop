import { api } from '@/lib/axios'

export interface UpdateProfileBody {
  name: string
  description: string | null
}

export async function UpdateProfileAPICall({
  name,
  description,
}: UpdateProfileBody) {
  await api.put('/profile', { name, description })
}
