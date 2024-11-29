import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
})

export const env = envSchema.parse(import.meta.env)

// Vite doesn't save environment variables in "process.env".
// Instead, it uses "import.meta.env" to access them.
// It is also worth noting that every environment variable must start with "VITE_".
// In this case, we have "VITE_API_URL".
