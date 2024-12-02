import { api } from '@/lib/axios'

export async function signOutAPICall() {
  await api.post('/sign-out')
}
